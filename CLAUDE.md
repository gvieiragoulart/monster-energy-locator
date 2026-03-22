# Monster Energy Locator

## Sobre o Projeto

Aplicativo web para localizar pontos de venda de Monster Energy. Interface estilo Google Maps com mapa interativo (Leaflet/OpenStreetMap) e painel lateral com busca, filtros por sabor e detalhes dos locais. Tema visual: neon cyberpunk.

## Stack

- **Frontend:** React 19 + TypeScript 5.6
- **Backend:** Express + better-sqlite3
- **Build:** Vite 7 (client) + esbuild (server)
- **Estilo:** Tailwind CSS 4 + shadcn/ui (Radix primitives)
- **Mapa:** Leaflet + react-leaflet
- **Roteamento:** wouter (client), Express Router (server)
- **Estado servidor:** @tanstack/react-query
- **Validação:** zod (client e server)
- **Rate limiting:** express-rate-limit
- **Pacotes:** npm (legacy-peer-deps necessário por conflito do vite-plugin-jsx-loc)

## Comandos

```bash
npm run dev            # Sobe backend (3001) + frontend (3000) juntos
npm run dev:client     # Apenas Vite dev server (porta 3000)
npm run dev:server     # Apenas backend Express com hot-reload (porta 3001)
npm run build          # Build produção (Vite + esbuild)
npm start              # Serve produção (Express serve frontend estático)
npm run check          # Type-check (tsc --noEmit)
npm run format         # Prettier
```

## Estrutura de Diretórios

```
├── client/                 # Frontend React
│   ├── index.html
│   ├── public/
│   └── src/                # Código-fonte (ver CLAUDE.md dentro de src/)
├── server/                 # Backend Express (MVC)
│   ├── index.ts            # Entry point, bootstrap
│   ├── db/                 # Conexão SQLite, migrations, seed
│   ├── models/             # Queries ao banco
│   ├── controllers/        # Handlers de request
│   ├── routes/             # Definição de rotas
│   ├── middleware/         # Rate limiter, validação
│   └── utils/              # Helpers (haversine, etc.)
├── shared/                 # Tipos e constantes compartilhados (client + server)
│   ├── types.ts            # MonsterFlavor, EnergyDrinkLocation
│   └── const.ts            # Constantes globais
├── data/                   # SQLite DB (gitignored)
├── vite.config.ts          # Config Vite (aliases, proxy)
├── components.json         # Config shadcn/ui
└── package.json
```

## Path Aliases

- `@` → `client/src` (vite.config.ts + tsconfig.json)
- `@shared` → `shared/` (vite.config.ts + tsconfig.json)
- Server usa imports relativos com extensão `.js`

## API

### `GET /api/locations?lat={lat}&lng={lng}&radius={radius}`

Retorna locais próximos ordenados por distância.

- `lat` (obrigatório): latitude (-90 a 90)
- `lng` (obrigatório): longitude (-180 a 180)
- `radius` (opcional, default 50): raio em km

Resposta: `{ data: EnergyDrinkLocation[] }`

Rate limit: 100 requests / 15 min por IP.

## Convenções

- **Idioma do código:** nomes de variáveis/funções em inglês, textos da UI em português (pt-BR)
- **Componentes:** Atomic Design — `ui/` (átomos shadcn), `molecules/`, `organisms/`, `templates/`, `pages/`
- **Tipos compartilhados:** definidos em `shared/types.ts`, re-exportados por `client/src/types/location.ts`
- **Server MVC:** routes → middleware (validate + rate limit) → controller → model → DB
- **Validação:** zod schemas no server (`server/middleware/validate.ts`)
- **DB:** SQLite via better-sqlite3, flavors armazenados como JSON string na coluna `flavors`
