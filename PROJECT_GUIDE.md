# Monster Energy Locator - Guia do Projeto

## 📱 Visão Geral

O **Monster Energy Locator** é um aplicativo web moderno que permite aos usuários localizar sabores de Monster Energy mais próximos de suas localizações. A interface é inspirada no Google Maps, com o mapa como foco principal e um painel lateral para busca, filtros e detalhes dos locais.

## 🎨 Design & Estética

### Tema: Modern Neon Cyberpunk

O projeto utiliza um design neon cyberpunk futurista com as seguintes características:

**Paleta de Cores:**
- **Fundo Principal:** #0a0e27 (azul profundo)
- **Neon Verde:** #00ff88 (primário - sabores/locais)
- **Neon Roxo:** #9d00ff (secundário - destaques)
- **Neon Cyan:** #00d4ff (informações/detalhes)
- **Texto:** #ffffff (branco puro)

**Elementos Visuais:**
- Efeitos de glow neon em elementos interativos
- Animações pulsantes em marcadores selecionados
- Bordas neon em cards e containers
- Transições suaves de 300-400ms com cubic-bezier

**Tipografia:**
- Display: Space Mono (títulos)
- Body: Roboto Mono (conteúdo)
- Hierarquia clara com pesos variados

## 🗺️ Funcionalidades Principais

### 1. Mapa Interativo
- Mapa do OpenStreetMap com Leaflet
- Marcadores customizados em neon verde para sabores
- Marcador cyan para localização do usuário
- Zoom e pan interativos
- Popups com informações dos locais

### 2. Busca e Filtros
- **Busca por texto:** Nome do local, sabor ou endereço
- **Filtro por sabor:** Original, Ultra, Zero, Mango Loco, Nitro
- **Localização do usuário:** Acesso à geolocalização com cálculo de distância

### 3. Painel Lateral
- **Lista de locais:** Cards com informações resumidas
- **Detalhes do local:** Informações expandidas quando selecionado
- **Scroll infinito:** ScrollArea para navegação suave

### 4. Responsividade
- Layout flexível que se adapta a diferentes tamanhos de tela
- Sidebar de 320px para desktop
- Mapa ocupa espaço restante

## 📁 Estrutura do Projeto

```
client/
├── src/
│   ├── components/
│   │   ├── MapContainer.tsx       # Mapa interativo com Leaflet
│   │   ├── LocationCard.tsx       # Card de local na lista
│   │   ├── LocationDetails.tsx    # Detalhes expandidos do local
│   │   ├── SearchBar.tsx          # Barra de busca
│   │   ├── FlavorFilter.tsx       # Filtro por sabor
│   │   └── ui/                    # Componentes shadcn/ui
│   ├── pages/
│   │   ├── Home.tsx               # Página principal
│   │   └── NotFound.tsx
│   ├── contexts/
│   │   └── ThemeContext.tsx       # Contexto de tema
│   ├── lib/
│   │   └── utils.ts               # Utilitários
│   ├── App.tsx                    # Router principal
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Estilos globais + tema neon
├── public/
│   ├── favicon.ico
│   └── robots.txt
└── index.html
```

## 🚀 Tecnologias Utilizadas

- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Utility-first CSS
- **Shadcn UI** - Componentes de UI
- **Leaflet** - Mapa interativo
- **Lucide React** - Ícones
- **Framer Motion** - Animações (pré-instalado)

## 🎯 Fluxo de Usuário

1. **Abertura:** Usuário vê o mapa centralizado em São Paulo com 8 locais de exemplo
2. **Busca:** Pode buscar por nome, sabor ou endereço
3. **Filtro:** Pode filtrar por sabor específico
4. **Localização:** Clica em "Usar Minha Localização" para obter sua posição
5. **Seleção:** Clica em um local (no mapa ou na lista) para ver detalhes
6. **Detalhes:** Painel lateral mostra informações completas do local selecionado

## 🔧 Customização

### Adicionar Novos Sabores

Edite o array `MOCK_LOCATIONS` em `client/src/pages/Home.tsx`:

```typescript
{
  id: '9',
  name: 'Nome do Local',
  flavor: 'Monster [Sabor]',
  latitude: -23.5XXX,
  longitude: -46.6XXX,
  address: 'Endereço completo',
  distance: 1.5,
}
```

### Alterar Cores do Tema

Edite as variáveis CSS em `client/src/index.css`:

```css
:root {
  --primary: #00ff88;        /* Cor primária */
  --secondary: #9d00ff;      /* Cor secundária */
  --accent: #00d4ff;         /* Cor de destaque */
  /* ... */
}
```

### Integrar com API Real

Substitua `MOCK_LOCATIONS` por chamadas a uma API:

```typescript
useEffect(() => {
  fetch('/api/locations')
    .then(res => res.json())
    .then(data => setLocations(data));
}, []);
```

## 📊 Dados Mock

O projeto inclui 8 locais de exemplo em São Paulo:

1. Loja Center - Monster Original (0.5 km)
2. Supermercado XYZ - Monster Ultra (1.2 km)
3. Conveniência 24h - Monster Zero (0.8 km)
4. Mercado Premium - Monster Mango Loco (2.1 km)
5. Posto de Gasolina - Monster Nitro (1.5 km)
6. Farmácia do Bairro - Monster Original (1.1 km)
7. Bar do Zé - Monster Ultra (0.9 km)
8. Café Gourmet - Monster Zero (1.3 km)

## 🎨 Componentes Customizados

### Neon Effects

- `.neon-glow` - Glow suave
- `.neon-glow-intense` - Glow intenso
- `.neon-border` - Borda neon
- `.neon-text` - Texto neon verde
- `.neon-text-purple` - Texto neon roxo
- `.neon-text-cyan` - Texto neon cyan
- `.pulse-neon` - Animação pulsante
- `.glow-on-hover` - Glow ao passar o mouse

## 🔐 Segurança

- Sem dados sensíveis armazenados
- Geolocalização requer permissão do usuário
- Dados mock apenas para demonstração

## 📱 Responsividade

- **Desktop:** Layout com sidebar (320px) + mapa
- **Tablet:** Sidebar reduzida ou colapsável
- **Mobile:** Versão otimizada (implementação futura)

## 🚀 Deploy

O projeto está pronto para deploy na plataforma Manus:

1. Clique em "Publish" na interface de gerenciamento
2. Configure domínio customizado se desejado
3. Acesse via URL pública

## 📝 Próximas Melhorias

- [ ] Integração com API de locais reais
- [ ] Versão mobile com layout responsivo
- [ ] Autenticação de usuário
- [ ] Favoritos/Bookmarks
- [ ] Histórico de buscas
- [ ] Compartilhamento de locais
- [ ] Avaliações e comentários
- [ ] Notificações de novos sabores

## 🤝 Suporte

Para dúvidas ou sugestões, entre em contato através da plataforma Manus.

---

**Versão:** 1.0.0  
**Data:** Março 2026  
**Desenvolvido com ❤️ usando React + TypeScript + Vite**
