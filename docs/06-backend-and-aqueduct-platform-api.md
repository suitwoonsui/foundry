# Community Foundry — backend and Aqueduct Platform API

This guide explains how to **add a backend** for the Community Foundry app and **connect it to the Aqueduct Platform over HTTP**, using **`apps/shooter-game/backend`** as the working reference in this monorepo.

It assumes you already have (or will run) the **Aqueduct Platform** backend (`Aqueduct Platform/backend`) and have registered a **Foundry-specific** ecosystem and app on that platform. Corridor capability object IDs are **per app**; do not reuse another app’s corridor values from docs or env examples.

---

## 1. Why a backend, and how it relates to the platform

**Role split**

| Layer | Responsibility |
|--------|----------------|
| **Foundry backend** | Foundry-only HTTP API: auth, business rules, aggregations, secrets (API keys), optional chain signing for your own Move package. |
| **Aqueduct Platform** | Shared services: catalog/store, **Reservoir** (**consumables repository**—credits, tickets, and other consumables tracked and consumed via platform APIs; the shooter’s game-pass play credits are one use case—not “show the user’s SUI/coin wallet balance”), tournaments/events (Station/Regatta), stats (Hydroscope), app config (Helm), **Insignia** (on-chain **advancement / tier / label** key–value config per app—badges, ranks, discount rules, etc.), Shipyard/NFTs, Sustain/rewards, Channel (build + execute txs), Sonar (read/simulate chain through the platform), Glacier vaults, etc. |

**Design rule (same as shooter-game):** for platform-backed features, the Foundry backend should talk to the platform **only via its public HTTP API**. The platform owns RPC/Sonar and ecosystem routing; your app sends **corridor identity + API key** and calls documented routes.

Canonical architecture notes for agents: `apps/shooter-game/backend/lib/LIB_ARCHITECTURE.md`. Product/module map: repo root `docs/results.md` (when present in your checkout) and `Aqueduct Platform/docs/PLATFORM_BACKEND_LAYOUT.md`. **Which modules matter for Foundry’s current UI vs roadmap:** [07-aqueduct-modules-scope.md](07-aqueduct-modules-scope.md).

---

## 2. Suggested layout in this repo

Today Foundry has `frontend/` and `docs/`. When you add a server, mirror the shooter pattern:

```
apps/foundry/
├── frontend/          # Next.js UI (existing)
├── backend/           # New: Next.js API routes (recommended) or any Node HTTP server
│   ├── app/api/       # Route handlers
│   ├── config/        # Network + contract JSON (corridor IDs live here, not only in .env)
│   └── lib/           # Thin modules: platform client, domain services
└── contracts/         # Optional: Foundry-specific Move package(s)
```

**Port discipline (local dev)** — use fixed ports so everything can run side by side:

| Service | Port |
|---------|------|
| Aqueduct Platform backend | **3000** (typical default) |
| Shooter game **frontend** | **8000** |
| Shooter game **backend** | **3001** (`next dev -p 3001` in `apps/shooter-game/backend`) |
| Foundry **frontend** | **8001** |
| Foundry **backend** | **3002** (`next dev -p 3002` when you add `apps/foundry/backend`) |

Point `PLATFORM_BACKEND_URL` at the platform (e.g. `http://localhost:3000`). If you temporarily run the platform on another port, update that URL accordingly.

---

## 3. Environment variables (Foundry backend `.env`)

These mirror the shooter-game backend; names are illustrative—values must be **your Foundry deployment’s**, not copied from another app.

| Variable | Purpose |
|----------|---------|
| `PLATFORM_BACKEND_URL` | Base URL of Aqueduct Platform (no trailing slash). In production this must be set explicitly (no reliance on a hardcoded host). Optional alias: `NEXT_PUBLIC_PLATFORM_BACKEND_URL` where the codebase supports it. |
| `ECOSYSTEM_ID` | Your Foundry ecosystem id (lowercase UUID/string as used by the platform). |
| `APP_ID` | Your Foundry app id within that ecosystem. |
| `ECOSYSTEM_<NORMALIZED>_API_KEY` | API key the platform issued for that ecosystem. Normalization matches the shooter client: uppercase, hyphens → underscores (see `getApiKeyForEcosystem` in shooter `platform-client.ts`). Fallbacks like `API_KEY` / `ADMIN_API_KEY` may exist for single-tenant setups. |

**Corridor capability object IDs** (CorridorCap / optional CorridorAdminCap for admin routes) should live in **per-network contract JSON** under the backend `config/` tree—the shooter uses `config/contracts.<network>.json` and reads `corridorCapabilityObjectId` / `appAdminCapId`. **Do not** paste corridor IDs from the platform app or from shooter-game config; mint and record caps for **Foundry’s** `(ecosystem, app)` pair.

**Minting / registration:** Harbor-side operations use the platform wallet and scripts under `Aqueduct Platform/contracts/platform` (for example app admin cap registration). Game-style apps point the script’s app env file at **this app’s** backend `.env` (`ECOSYSTEM_ID`, `APP_ID`, game wallet keys as documented there). Follow `Aqueduct Platform/wallet-module/DEPLOYMENT.md` and platform docs for your network; keep platform vs app secrets separated per those instructions.

---

## 4. HTTP contract when calling the platform

The shooter implementation is the reference: `apps/shooter-game/backend/lib/services/platform/client/platform-client.ts` (`callPlatformBackend`).

**Required / usual headers**

| Header | When |
|--------|------|
| `Content-Type: application/json` | Typical JSON bodies |
| `X-Corridor-Capability-Object-Id` | **Required** for routed platform calls — identifies the app corridor; platform derives ecosystem/app from it |
| `X-Corridor-Admin-Capability-Object-Id` | Admin-only flows (e.g. some Regatta/Sustain/catalog build paths) |
| `X-API-Key` | From `getApiKeyForEcosystem(ECOSYSTEM_ID)` — platform validates per ecosystem |

**Important:** the current client intentionally does **not** send `X-Ecosystem-Id` / `X-App-Id` on outbound calls; identity comes from the **corridor cap**. Keep `ECOSYSTEM_ID` in `.env` for API key selection and logging, not as a substitute for the wrong corridor id.

**Optional:** `X-Request-Id` for tracing (shooter generates one if missing).

**Minimal pattern (conceptual TypeScript)**

```typescript
const baseUrl = process.env.PLATFORM_BACKEND_URL!.replace(/\/$/, '');
const url = `${baseUrl}/api/store/catalog`; // example path

const res = await fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-Corridor-Capability-Object-Id': corridorCapObjectId,
    'X-API-Key': ecosystemApiKey,
  },
});
if (!res.ok) throw new Error(await res.text());
const data = await res.json();
```

For real usage, prefer a small shared helper like `callPlatformBackend(path, { method, body, corridorCapabilityObjectId })` and reuse shooter’s `buildPlatformCallOptions` pattern so every route passes caps consistently.

---

## 5. Platform API surface (where to look in shooter)

The shooter backend centralizes higher-level clients in the same `platform-client.ts` file (thousands of lines, but searchable). A compact map also lives in:

`apps/shooter-game/contracts/suitwo_game/BADGES_GAMECONFIG_ITEMCATALOG_PLATFORM.md` (section **Aqueduct Platform API wiring**)

Abbreviated mapping (paths are under the platform host):

| Area | Example platform paths | Shooter client (search in `platform-client.ts`) |
|------|------------------------|--------------------------------------------------|
| Events / tournaments | `/api/station`, `/api/station/past`, `/api/regatta/*` | `platformEventsClient`, `platformTournamentClient` |
| Tx build / submit | `/api/channel/batch`, `/api/channel/execute` | `buildBatchViaChannel`, `platformTxClient.executeSigned` |
| Reservoir (consumables) | `/api/reservoir/*` | `platformGamePassClient` and related flows (consumables repo—e.g. shooter play credits—not general wallet token balances) |
| Store / catalog | `/api/store/*`, provisions-related routes | `platformStoreClient`, catalog init flows |
| App config | `/api/app-config` | `platformAppConfigClient` |
| Stats / leaderboard | `/api/stats/*` | `platformStatsClient` |
| Shipyard / badges | `/api/nfts/*` | badge helpers, `getHasSoulboundBadge`, mint flows |
| **Insignia** (advancement markers / tier config) | `/api/insignia` | `getInsigniaService` — GET reads app-scoped config map; POST/DELETE require **CorridorAdminCap** and platform env `INSIGNIA_REGISTRY_OBJECT_ID_*`, `AQUEDUCT_INSIGNIA_PACKAGE_ID_*` |
| Sonar (chain read via platform) | `/api/sonar`, batch variants | used when platform is configured for reads |

**Transaction flow:** platform **builds** transaction bytes (`channel/batch` or a dedicated build route); your wallet (player or server-held key) **signs**; you **submit** via `channel/execute`. The platform does not sign on your behalf for those execute flows.

Shooter exposes **browser-safe proxies** under `apps/shooter-game/backend/app/api/platform/**` (for example `platform/tx/execute` → platform `channel/execute`). You can copy that pattern so the Foundry frontend never sees the ecosystem API key.

---

## 6. Implementation checklist for Foundry

1. **Create `apps/foundry/backend`** (Next.js App Router recommended to match shooter and platform).
2. **Set `.env`** with `PLATFORM_BACKEND_URL`, `ECOSYSTEM_ID`, `APP_ID`, and the ecosystem API key variable the platform expects.
3. **Add `config/contracts.<network>.json`** with Foundry’s corridor cap ids (and any Move object ids your backend still needs locally).
4. **Implement a single `lib/platform-client.ts`** (copy/adapt from shooter’s `callPlatformBackend` + error handling only as needed—keep the file small at first).
5. **Add route handlers** for Foundry features; each handler that touches the platform should use the shared client and `buildPlatformCallOptions(request)`-style helpers if you forward corridor caps from the client.
6. **CORS / cookies:** if the Foundry frontend and backend are on different origins, configure CORS and credentials the same way you would for any SPA + API pair.
7. **Smoke test:** with platform running, call one read-only route (e.g. catalog or app-config) and one authenticated flow you care about, and confirm corridor + API key errors are resolved.

---

## 7. Further reading (paths in this repo)

| Document | Topic |
|----------|--------|
| `apps/shooter-game/backend/lib/LIB_ARCHITECTURE.md` | Game ↔ platform boundaries |
| `apps/shooter-game/backend/lib/services/platform/client/platform-client.ts` | Production client implementation |
| `docs/GAME_BACKEND_VIA_PLATFORM_API_HANDOFF.md` | Historical handoff: moving chain usage behind platform API + Sonar |
| `docs/platform/GAME_REWIRE_TO_PLATFORM_PLAN.md` | Alignment tasks and env discipline |
| `Aqueduct Platform/backend/app/api/API_AUDIT.md` | Platform route inventory (if present) |
| `Aqueduct Platform/docs/PLATFORM_BACKEND_LAYOUT.md` | Platform backend structure |

---

*Summary: add a dedicated Foundry backend, keep secrets and corridor caps in Foundry’s own config, and integrate with Aqueduct exclusively through HTTP using corridor capability headers and the ecosystem API key—using shooter-game’s `platform-client` and API routes as the concrete reference.*
