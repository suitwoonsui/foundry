# Community Foundry

A hub where supporters can directly fuel specific projects and in return receive recognition, access, rewards, or stake in the ecosystem.

## Repo layout

- **`frontend/`** — Next.js app on **port 8001** in local dev (`npm install` and `npm run dev` from `frontend/`; shooter game UI uses **8000**)
- **`docs/`** — concept and product notes (see `docs/README.md`)
- **`backend/`** — (planned) Foundry API server; see [docs/06-backend-and-aqueduct-platform-api.md](docs/06-backend-and-aqueduct-platform-api.md) for how to wire it to Aqueduct Platform over HTTP, using `apps/shooter-game/backend` as the reference implementation.

## Quick start

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:8001](http://localhost:8001). Planned Foundry **backend** uses **3002** (Aqueduct Platform typically **3000**, shooter backend **3001**); see [docs/06-backend-and-aqueduct-platform-api.md](docs/06-backend-and-aqueduct-platform-api.md).
