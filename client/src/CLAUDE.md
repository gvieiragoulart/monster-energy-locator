# client/src — Código-fonte do Frontend

## Arquitetura

O app segue **Atomic Design** para organização dos componentes:

```
components/
├── ui/            # Átomos — componentes shadcn/ui (não editar manualmente)
├── molecules/     # Moléculas — componentes compostos pequenos
│   ├── SearchBar.tsx       # Input de busca com debounce
│   ├── FlavorFilter.tsx    # Seletor de sabor Monster
│   ├── LocationCard.tsx    # Card de local na listagem
│   └── ManusDialog.tsx     # Dialog de info da plataforma
├── organisms/     # Organismos — seções completas da UI
│   ├── MapContainer.tsx    # Mapa Leaflet com marcadores
│   ├── Map.tsx             # Componente base do mapa
│   ├── LocationDetails.tsx # Painel de detalhes do local selecionado
│   └── ErrorBoundary.tsx   # Boundary de erro global
├── templates/     # Templates — layouts de página
│   └── MainLayout.tsx      # Layout principal (header + sidebar + mapa)
└── pages/         # Páginas — rotas
    ├── Home.tsx            # Página principal (orquestra tudo)
    └── NotFound.tsx        # 404
```

## Fluxo de Dados

```
App.tsx (providers: QueryClient, UserLocation, Tooltip)
  └─ Home.tsx
       ├─ useFilteredLocations()
       │    ├─ useLocations(lat, lng)  → GET /api/locations via react-query
       │    │    └─ locationService.getLocations(lat, lng) → fetch /api/locations
       │    └─ useUserLocation()       → geolocalização do browser
       │    └─ Filtragem client-side: busca textual + filtro por sabor
       ├─ Sidebar: SearchBar + FlavorFilter + LocationCards + LocationDetails
       └─ MapContainer: mapa Leaflet com marcadores
```

O servidor retorna locais já ordenados por distância com o campo `distance` preenchido.
O client faz apenas filtragem local (busca textual e sabor) sobre os dados já recebidos.

## Tipos Principais (`types/location.ts`)

Re-exporta de `@shared/types`:
- `MonsterFlavor` — enum com os sabores (Original, Ultra, Zero, Mango Loco, Nitro, Ultra Sunrise)
- `EnergyDrinkLocation` — local com id, name, flavors[], lat/lng, address, distance?

Tipo local:
- `UseLocationsResult` — interface para o retorno do hook useLocations

## Hooks

- `useFilteredLocations` — hook central: recebe locais da API (via useLocations com lat/lng), aplica busca textual e filtro por sabor client-side.
- `useLocations(lat?, lng?)` — wrapper react-query. Só dispara a query quando lat/lng estão disponíveis (`enabled`). Query key inclui coordenadas.
- `useUserLocation` — acessa o contexto de geolocalização

## Serviços (`services/locationService.ts`)

- `locationService.getLocations(lat, lng)` — faz `fetch('/api/locations?lat=X&lng=Y')` e retorna `data` do JSON de resposta.

## Tema e Estilos

O tema neon cyberpunk é definido em `index.css` com variáveis CSS:
- Cores principais: `--primary` (#00ff88 verde neon), `--sidebar-primary` (#9d00ff roxo)
- Classes utilitárias customizadas: `.neon-text`, `.neon-glow`, `.neon-border`, `.pulse-neon`, etc.
- Background: #0a0e27 (azul profundo)

## Ao Modificar

- **Novos componentes UI base:** usar `npx shadcn@latest add <componente>` — não criar manualmente em `ui/`
- **Novos sabores:** adicionar ao enum `MonsterFlavor` em `shared/types.ts` e ao array de filtros em `FlavorFilter.tsx`
- **Novos locais:** adicionar via seed do banco (`server/db/seed.ts`) ou inserção direta no SQLite
- **Estilo:** manter o padrão neon cyberpunk — usar as variáveis CSS e classes neon existentes
- **Imports:** sempre usar alias `@/` (resolve para `client/src/`), tipos compartilhados via `@shared/`
