# Community Foundry — Aqueduct modules vs current scope

This document ties **what the Foundry app has today** (code + Phase 1 product intent) to **Aqueduct Platform modules** so you know what to plan for in the backend and API integration.

The canonical platform module list in this repo is summarized in `apps/shooter-game/backend/lib/LIB_ARCHITECTURE.md` (platform module map paragraph).

---

## 1. What exists in the repo today

| Area | Status |
|------|--------|
| **Frontend** (`apps/foundry/frontend`) | Next.js site: project hub (filters, search, cards), project detail `/p/[slug]`, paths, titles, updates, about. |
| **Data** | Static/mock: `lib/projects.ts` — funding targets, raised amounts, tiers, milestones, wallet *labels* (strings only). |
| **Backend** | Not present yet; no HTTP calls to Aqueduct. |
| **On-chain / wallets** | Not integrated. Phase 1 docs explicitly allow illustrative funding UI without real payments. |

**Conclusion for “so far”:** no Aqueduct module is **required** yet. The site is informational. The first integration step is usually **Helm** (remote app config) or **Sonar** (read-only transparency), depending on whether you prioritize feature copy over wallet/balance display.

---

## 2. Module map: Foundry intent → Aqueduct modules

Below, “product intent” comes from the Foundry docs (`01-core-concept…`, `02-pillars…`, `05-phase-1…`) and from tier/perk language already in `lib/projects.ts` (badges, NFTs, discounts, soulbound “later”).

| Foundry capability (current or planned) | Aqueduct module(s) | Typical platform surface | Notes |
|----------------------------------------|---------------------|---------------------------|--------|
| Remote config: tiers copy, feature flags, which categories are live | **Helm** | `/api/app-config` | Low effort; no chain. Good first integration. |
| **Advancement / tier / label** rules stored on-chain per app (badges, rank thresholds, discount keys—key–value map) | **Insignia** | `/api/insignia` | Complements **Helm** when config should live in the chart **Insignia** registry; admin writes need **CorridorAdminCap** and platform contract IDs (`INSIGNIA_REGISTRY_OBJECT_ID_*`, `AQUEDUCT_INSIGNIA_PACKAGE_ID_*`). See `Aqueduct Platform/backend/app/api/insignia/route.ts`. |
| Show real **per-project wallet** balance / activity for transparency | **Sonar** (via platform) | `/api/sonar` (and batch variants) | Platform performs chain reads; Foundry backend should not talk to RPC directly for this if you follow the shooter pattern. |
| **Donate / purchase** perks as defined SKUs (store flow) | **Terminal**, **Provisions** | `/api/store/*`, catalog / provisions | Aligns with “contribution tier → perk” if modeled as catalog items. |
| Build & submit **signed** transactions from the browser or server | **Channel** | `/api/channel/batch`, `/api/channel/execute` | Platform builds bytes; user or app wallet signs; execute submits. |
| **Badge / soulbound NFT** perks for supporters | **Shipyard** | `/api/nfts/*` (mint, has-badge, etc.) | Matches tier copy (“Dynamic badge NFT”, “soulbound marker”). |
| **Distribute** rewards after milestones or funding thresholds | **Sustain** (+ often **Glacier** for vault-style flows) | Sustain build-distribute, event/vault helpers; see shooter `platformRewardsClient` / Station–Glacier lifecycle | Needed when fulfillment is automated on-chain, not manual. |
| **Vault**-style funding path (per pillar/path docs) | **Glacier** | Vault APIs (add, release-distribute, etc.) | Use if product chooses pooled/vault mechanics vs direct wallet labels only. |
| **Consumables** (credits, tickets, or other spend-down entitlements managed in-platform) | **Reservoir** | `/api/reservoir/*` | **Reservoir** is a **consumables repository**: balances that are **held and consumed** through platform APIs (consume-credit, verify-tickets, merge, etc.). The shooter’s **game-pass / play credits** are the primary example in this repo—not user wallet coin balances, and not a substitute for reading SUI in a project treasury address (use **Sonar** for that). Foundry would use Reservoir only if it introduces a similar consumable model. |
| Contributor **stats** or leaderboard surfaces | **Hydroscope** | `/api/stats/*`, leaderboard | Optional; fits “recognition” narrative. |
| Structured **events** (e.g. competitive or scored community programs) | **Station**, **Regatta** | `/api/station*`, `/api/regatta/*` | Optional for Foundry unless you run regatta-like programs. |
| **Definitions** driving dynamic UI (large blobs, keyed config) | **Aquifer** | Definitions APIs | Optional; Helm often enough early. |
| **Claims** (user-claimed entitlements) | **Anchor** | Anchor/claims routes | If perks are claim-based rather than instant mint/store only. |
| **Pricing** (fees, SUI↔display conversion) | **Gauge** | Price / gauge routes | If you show fiat hints or need platform fee alignment. |
| **Audit / compliance trail** | **Logbook** | Platform-internal / audit surfaces | Usually secondary; platform holds detail. |

---

## 3. Reservoir consumables in Foundry — idea backlog

**Purpose:** brainstorm **where a consumables repository** (balances you **increment** when someone earns or buys, and **decrement** when they use something) could strengthen Foundry—without committing to build any of it. **Trim later.** Many items can instead be one-shot mints, flags in Helm, or plain chain transfers; this list is intentionally **generous**.

**Not consumables:** displaying SUI in a treasury address, generic coin balances in a user’s wallet, or permanent soulbound “you have it” state (those lean **Sonar**, **Shipyard**, **Helm**, **Anchor**, etc.).

### 3.1 Tiers, perks, and project detail (closest to current mock tiers)

- **Playtest / build access** — N sessions or N downloads per supporter; each launch consumes one credit (ties to “Closed build access”, “Playtester” tiers).
- **AMA / Q&A priority** — queue skips or guaranteed questions; consume per use (“Priority AMA questions”).
- **Roadmap / milestone votes** — spend-down voting tokens per funding round or season (“Roadmap voting session”).
- **Whitelist / allowlist entries** — N guaranteed mint or drop slots; consume when claiming (“Whitelist-first drops”).
- **Early recap / insider links** — N-time access keys or time-boxed “peek” credits (“Early recap links”).
- **Contributor spotlight / title slots** — rotating title: consume to activate a week in the spotlight, or N shout-outs (“Title in contributor spotlight”).
- **Office hours or 1:1 blocks** — bookable slots backed by consumable tokens issued to patrons.
- **Feedback or design-review tokens** — submit N structured reviews per quarter.
- **Cosmetic or name-in-credits redemptions** — spend credits to trigger a one-time on-chain or off-chain fulfillment workflow.
- **Patch-notes / changelog “insider” digest** — N issues unlocked per credit pack.

### 3.2 Hub-wide, discovery, and marketing

- **Project boost / featuring credits** — project owners (or treasury) spend to surface on home, category top, or newsletter slots for a period.
- **Trending / impact signal boosts** — consumable “signal” that nudges sort weight (with caps and transparency to avoid pay-to-rig).
- **Category takeover or tag highlight** — time-limited visibility consumable for a campaign.
- **Cross-promo between projects** — “Foundry credits” earned on project A redeemable for a perk or boost on project B (ecosystem glue).
- **Season or quarterly battle pass** — bundle of small consumables across several projects (heavy product, but Reservoir-friendly).

### 3.3 Funding mechanics and treasury-adjacent (still not “wallet balance display”)

- **Matching pool draws** — each eligible donation mints or credits a match token; matcher’s pool consumes when applied.
- **Milestone unlock keys** — when a funding bar hits a threshold, supporters with unused “milestone keys” can consume to unlock a perk wave.
- **Stretch-goal triggers** — consumable “pledge amplifiers” that count toward a goal only when spent during a window.
- **Refund / rollover credits** — if a project cancels, supporters receive consumable credits redeemable only on other Foundry projects.
- **Recurring supporter stamps** — monthly patronage grants a consumable stamp; N stamps unlock a tier bump or merch code.

### 3.4 Paths, pillars, and recognition (Seven Pillars / paths narrative)

- **Path progression chits** — generic “I showed up” consumables convertible at thresholds into titles or Discord roles (fulfillment may be off-platform).
- **Herald / Council / Orator-style ceremony tokens** — consume to nominate, second, or schedule a recognition moment.
- **Vault-path participation** — consumable receipts for deposits or vault actions that later unlock perks (pairs with **Glacier** for the on-chain vault side).
- **Recognition budget** — community managers issue N “kudos credits” per month; recipients spend them to claim small perks.

### 3.5 Events, Spaces, and community programs

- **Event RSVP or attendance proofs** — attendance mints a consumable; spend at merch table or for recording access.
- **AMA series season pass** — one consumable pool for a run of Spaces (enter N events).
- **Workshop or hackathon** — consume for mentor slot, judging credit, or submission upload.
- **IRL / conference** — redeem consumables for swag pickup codes or side-event entry.

### 3.6 Content, media, and drops

- **Art / music drop windows** — entry pass consumable per wave or per edition.
- **Bonus episode / deep-dive unlock** — N credits for premium posts or files.
- **License or API trial extensions** — developer tools projects issue time-boxed consumable extensions.

### 3.7 Partners, listings, and B2B-style rows (from category list)

- **DEX / CEX listing review tokens** — partner spends consumable to enter review queue (governance + transparency rules separate).
- **Integration spike credits** — N hours of eng review consumable by partners.
- **Co-marketing slots** — consumable for joint tweet/Live slot booking.

### 3.8 Fairness, limits, and abuse resistance

- **Soft rate limits** — expensive actions (search scrape, bulk export) cost consumables for verified supporters.
- **Human-verification or invite quotas** — consumable invites that refill slowly (sybil friction, not a silver bullet).
- **Appeal or dispute tokens** — limited consumables to escalate a moderation or listing dispute.

### 3.9 How this pairs with other modules

| Pattern | Often pairs with |
|--------|------------------|
| User **buys** a pack of N uses | **Terminal** / **Provisions** (SKU) → credits **Reservoir** |
| User **earns** N uses from a milestone | **Sustain** / **Glacier** / custom backend → **Reservoir** |
| User **spends** one use at click time | **Reservoir** `consume` / verify flows; may trigger **Channel** tx afterward |
| Permanent proof of support | **Shipyard** / **Anchor** / on-chain NFT—not always a consumable |

---

## 4. Modules unlikely to matter at Foundry launch

| Module | Why defer |
|--------|-----------|
| **Regatta** / heavy **Station** | Unless Foundry runs scored tournaments or formal events through the same machinery as the shooter. |
| **Reservoir** | Unless any idea in **§3** (or a slimmer subset) ships; transparency for “how much SUI is in a project wallet” is **Sonar**, not Reservoir. |
| **Hydroscope** | Until you expose global stats or leaderboards for supporters. |

---

## 5. Suggested sequencing (after backend exists)

1. **Helm** — config without chain risk.  
2. **Insignia** (optional) — if path/rank/tier rules should be chart-backed alongside **Helm** JSON; otherwise defer until you need on-chain advancement config.  
3. **Sonar** (read-only) — real balances for project wallets if transparency is the next story.  
4. **Channel** — once any transaction is required from the Foundry UX.  
5. **Terminal + Provisions + Shipyard** — when tiers become real purchases and NFT/badge fulfillment.  
6. **Sustain / Glacier** — when rewards or vault releases are automated and tied to milestones.

This order can shift if you prioritize vault-based funding (**Glacier**) before a classic store catalog. If you lean into **consumables**, plan **Reservoir** alongside **Terminal**/**Sustain** (see **§3.9**).

---

## 6. References

| Document | Relevance |
|----------|-----------|
| `apps/foundry/docs/06-backend-and-aqueduct-platform-api.md` | How to call the platform from a future Foundry backend. |
| `apps/shooter-game/backend/lib/LIB_ARCHITECTURE.md` | Module map and game ↔ platform boundary. |
| `apps/shooter-game/contracts/suitwo_game/BADGES_GAMECONFIG_ITEMCATALOG_PLATFORM.md` | API path ↔ platform service table. |
| `apps/foundry/docs/05-phase-1-site-ia-and-ux.md` | Phase 1 scope (site-only, payments later). |

---

*Summary: with only the current Foundry frontend, **zero** Aqueduct modules are wired. **§2** maps product intent to modules; **§3** is an expandable backlog of **consumable** ideas you can trim later.*
