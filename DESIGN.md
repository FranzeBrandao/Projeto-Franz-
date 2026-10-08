# DESIGN.md — Farmácia Bem Estar · E-commerce

> Padrão visual do site farmaciabemestarsobral.com. Todo componente novo
> segue este documento. Se algo aqui mudar, muda primeiro aqui e depois no código.
>
> **Status:** rascunho para aprovação.

---

## 1. Tema visual e atmosfera

**Em uma frase:** a farmácia de bairro que você conhece, com a vitrine de uma
grande rede — clara, organizada e rápida no celular, mas com a cara da loja
da Av. Sen. Fernandes Távora, não de um template.

**De onde vem a identidade** (tudo tirado da própria loja, não da Pague Menos):

| Elemento real da loja | Vira no site |
|---|---|
| Placa da logo: cruz branca em azul elétrico, "Bem Estar" em vermelho dentro de uma tarja branca | **Tarja** — o selo branco com borda que emoldura preços, títulos de seção e o carimbo "Bem Estar" |
| Bordas vermelhas das prateleiras (visíveis nas fotos do balcão e das fraldas) | **Prateleira** — a vitrine de produtos é apoiada numa régua vermelha fina, como a gôndola real |
| Painel quadriculado azul/branco dos eventos | Textura de fundo do banner e do rodapé (quase invisível, 2–4% de opacidade) |
| Letreiro "FARMÁCIA" em caixa-alta condensada | Etiquetas, menu e rótulos em caixa-alta condensada |

**Palavras-chave:** confiável · próxima · ágil · organizada · calorosa.

**Assinatura do site (o detalhe que fica na memória):** *a vitrine em prateleira*.
Cada fileira de produtos "pousa" numa régua vermelha, e o preço aparece numa
etiqueta de gôndola (tarja branca, número grande em slab vermelho). Ao rolar,
os produtos sobem e assentam na prateleira um a um. É a única ousadia do
layout — o resto fica disciplinado e limpo.

---

## 2. Paleta de cores

Cores **medidas da logo oficial** (`public/logo-oficial.webp`) e da fachada.

```css
:root {
  /* Marca — direto da logo */
  --azul-logo: #032EFD;        --azul-logo-rgb: 3 46 253;     /* fundo da placa da logo: banner, selos, ícones grandes */
  --azul: #1A3BD6;             --azul-rgb: 26 59 214;         /* ações principais, links, preço normal (contraste 7:1 no branco) */
  --azul-hover: #122BA8;       --azul-hover-rgb: 18 43 168;
  --vermelho: #D01119;         --vermelho-rgb: 208 17 25;     /* "Bem Estar", preço promocional, régua da prateleira, % OFF */
  --vermelho-hover: #A80D14;   --vermelho-hover-rgb: 168 13 20;

  /* Azul-noite da fachada — a cor escura da marca (nunca preto/cinza genérico) */
  --noite: #0B1B3F;            --noite-rgb: 11 27 63;         /* rodapé, faixa de confiança, mega menu destacado */
  --noite-2: #14275A;          --noite-2-rgb: 20 39 90;

  /* Superfícies */
  --fundo: #F5F7FC;            --fundo-rgb: 245 247 252;      /* fundo da página: branco levemente azulado (não creme) */
  --cartao: #FFFFFF;           --cartao-rgb: 255 255 255;
  --gelo: #E8EEFF;             --gelo-rgb: 232 238 255;       /* chips de categoria, placeholder de imagem, hover suave */
  --linha: #DCE2F0;            --linha-rgb: 220 226 240;

  /* Texto */
  --texto: #121A33;            --texto-rgb: 18 26 51;
  --texto-suave: #4A5578;      --texto-suave-rgb: 74 85 120;  /* 7,4:1 no branco */

  /* Funcionais */
  --whatsapp: #0F8044;         --whatsapp-rgb: 15 128 68;     /* botão "Comprar pelo WhatsApp" — verde escurecido p/ texto branco passar 4,5:1 (5,0:1) */
  --whatsapp-hover: #0A6332;   --whatsapp-hover-rgb: 10 99 50;
  --indisponivel: #8A93AD;     --indisponivel-rgb: 138 147 173;
  --aviso: #FFF4D6;            --aviso-rgb: 255 244 214;      /* fundo do aviso de medicamentos */
  --aviso-borda: #E8B931;      --aviso-borda-rgb: 232 185 49;
}
```

**Regras de uso**
- Azul = ação e navegação. Vermelho = preço/oferta e a assinatura da prateleira. Nunca dois botões vermelhos lado a lado.
- O verde só existe no botão de WhatsApp e no botão flutuante — é o que o cliente reconhece.
- Proporção aproximada na tela: 70% branco/fundo · 20% azul · 7% vermelho · 3% verde.
- Sem gradientes coloridos. Única exceção: uma sombra azul-noite → transparente sobre as fotos do banner, para o texto ficar legível.

---

## 3. Tipografia

Três famílias, carregadas pelo `next/font` (arquivos ficam no próprio site, sem
depender do Google na hora de abrir — bom para velocidade e Lighthouse).

| Papel | Fonte | Por quê |
|---|---|---|
| **Display** (títulos, preços) | **Zilla Slab** 600/700 | Serifa "slab" parente direta do "Bem Estar" da logo. Usada com moderação. |
| **Rótulo** (menu, etiquetas, selos, botões) | **Barlow Condensed** 600/700, caixa-alta, espaçamento +0,04em | Ecoa o letreiro "FARMÁCIA". Condensada = cabe muito no celular. |
| **Texto** (nomes de produto, parágrafos) | **Figtree** 400/500/600 | Legível em tamanho pequeno, números claros, sem cara de "fonte padrão". |

```css
--fonte-display: "Zilla Slab", Georgia, serif;
--fonte-rotulo: "Barlow Condensed", "Arial Narrow", sans-serif;
--fonte-texto: "Figtree", system-ui, -apple-system, "Segoe UI", sans-serif;
```

**Escala** (celular → computador, com `clamp()`):

| Token | Celular | Computador | Uso |
|---|---|---|---|
| `--t-hero` | 34px | 56px | Título do banner (Zilla 700, entrelinha 1.05) |
| `--t-h2` | 26px | 36px | Título de seção (Zilla 700) |
| `--t-h3` | 19px | 22px | Título de card/bloco (Figtree 600) |
| `--t-preco` | 24px | 28px | Preço no card (Zilla 700, números tabulares) |
| `--t-texto` | 16px | 17px | Texto corrido (Figtree 400, entrelinha 1.6) |
| `--t-produto` | 15px | 15px | Nome do produto no card (Figtree 500, máx. 2 linhas) |
| `--t-rotulo` | 13px | 14px | Menu, selos, botões (Barlow Cond. 600, caixa-alta) |
| `--t-mini` | 12px | 12px | Marca do produto, aviso legal (Barlow Cond. 600) |

**Proibido:** Inter, Roboto, Arial como fonte principal; mais de 3 famílias; texto
corrido abaixo de 14px; caixa-alta em frases longas.

---

## 4. Componentes

Todos com estados **normal · hover · pressionado · foco (teclado) · desativado**.

### 4.1 Botões

```css
.btn {
  min-height: 48px; padding: 0 20px; border-radius: 12px;
  font: 600 var(--t-rotulo)/1 var(--fonte-rotulo); text-transform: uppercase; letter-spacing: .04em;
  display: inline-flex; align-items: center; gap: 8px;
  transition: transform .15s ease, background-color .15s ease, box-shadow .15s ease;
}
.btn:hover    { transform: translateY(-1px); box-shadow: var(--sombra-2); }
.btn:active   { transform: translateY(0) scale(.97); box-shadow: none; }
.btn:focus-visible { outline: 3px solid rgb(var(--azul-logo-rgb) / .45); outline-offset: 2px; }
.btn:disabled { background: var(--linha); color: var(--indisponivel); box-shadow: none; transform: none; cursor: not-allowed; }

.btn-primario  { background: var(--azul); color: #fff; }       .btn-primario:hover  { background: var(--azul-hover); }
.btn-whatsapp  { background: var(--whatsapp); color: #fff; }   .btn-whatsapp:hover  { background: var(--whatsapp-hover); }
.btn-contorno  { background: transparent; color: var(--azul); box-shadow: inset 0 0 0 2px var(--azul); }
.btn-contorno:hover { background: var(--gelo); }
```

Microinteração: no botão de WhatsApp o ícone dá um "toque" (rotação de 12° e volta) no hover.

### 4.2 Card de produto (vitrine)

```
┌──────────────────────────┐
│ [-15%]            [♡]    │  ← selo vermelho só quando tem preço promocional
│                          │
│        [ imagem ]        │  ← proporção 1:1, fundo branco, zoom 1.06 no hover
│                          │
│ MARCA                    │  ← Barlow Cond. 12px, texto-suave
│ Nome do produto em até   │  ← Figtree 500, 2 linhas, reticências
│ duas linhas…             │
│ Caixa com 20 comprimidos │  ← apresentação, 13px
│ ┌────────────┐           │
│ │ R$ 19,90   │ de 24,90  │  ← etiqueta de gôndola (tarja) + preço antigo riscado
│ └────────────┘           │
│ [ COMPRAR PELO WHATSAPP ]│  ← no computador surge de baixo no hover; no celular sempre visível
└──────────────────────────┘
═════════ régua vermelha da prateleira (4px) ═════════
```

| Estado | Visual |
|---|---|
| Normal | Cartão branco, borda `--linha`, raio 16px, `--sombra-1` |
| Hover (computador) | Sobe 4px, `--sombra-3`, imagem com zoom 1.06, botão desliza de baixo (opacidade 0→1, 8px→0) |
| Foco | Contorno azul 3px no cartão inteiro (o cartão é navegável por teclado) |
| Pressionado | Escala .98 |
| **Indisponível** (estoque 0) | Imagem em tons de cinza 60%, selo "INDISPONÍVEL" cinza no lugar do desconto, preço em `--indisponivel`, **sem botão de compra** — no lugar, texto "Avise-me pelo WhatsApp" opcional (a decidir) |

**Etiqueta de preço (tarja):** fundo branco, borda 2px `--azul` (normal) ou `--vermelho` (promoção), raio 6px, canto inferior direito com um pequeno "dente" cortado (como etiqueta de gôndola). Preço em Zilla Slab 700.

**Imagem provisória** (produto sem foto): fundo `--gelo` com a cruz da logo em azul a 12% de opacidade, ícone da categoria ao centro e a legenda "Foto em breve" em Barlow Condensed. Nunca imagem quebrada nem foto de banco fingindo ser o produto.

### 4.3 Cabeçalho

- **Faixa de topo** (32px, `--noite`): "Entrega grátis em Sobral" · horário · telefone. No celular, só uma frase rolando suavemente.
- **Barra principal** (branca): logo · busca (pílula larga, fundo `--gelo`) · "Lojas" · ícone da cesta/lista com contador.
- **Menu de categorias** (Barlow Condensed caixa-alta): as 8 categorias. Item ativo/hover ganha sublinhado vermelho que cresce do centro (0→100% da largura, 200ms).
- **Ao rolar** (> 80px): a faixa de topo some, a logo diminui de 44px → 34px de altura, sombra `--sombra-2` aparece. Transição 200ms.
- **Celular:** logo + busca em segunda linha + botão "☰" que abre o **menu lateral** (desliza da esquerda, fundo escurecido, foco preso dentro, fecha com Esc/toque fora).

### 4.4 Mega menu (computador)

Abre no hover (com 150ms de atraso para não abrir sem querer) ou no clique/Enter.
Três colunas: subcategorias da categoria · 2 produtos em destaque · card com
foto real da loja ("Fale com a farmacêutica"). Entra com fade + deslize de 8px.

### 4.5 Banner principal (carrossel)

- 3 a 4 slides. Fotos reais da loja + texto curto + 1 botão.
- Transição: **crossfade de 600ms** + zoom lento da foto (1.0 → 1.05 em 6s, efeito "Ken Burns").
- Troca automática a cada 6s; **pausa** no hover, no foco e quando a aba não está visível.
- Pontinhos de navegação (alvo de toque 44px) + setas no computador + arrastar no celular.
- Botão de pausar visível (acessibilidade).
- O primeiro slide é carregado com prioridade; os outros só depois (lazy).

### 4.6 Chips de categoria (atalhos da home)

Círculo `--gelo` 72px com ícone azul + nome embaixo. Hover: círculo vira `--azul-logo`, ícone vira branco e dá um pulinho (translateY -3px). Rolagem horizontal no celular.

### 4.7 Selos

| Selo | Estilo |
|---|---|
| Desconto `-15%` | Fundo `--vermelho`, texto branco, Barlow Cond. 700 |
| Destaque | Fundo `--azul-logo`, texto branco |
| Indisponível | Fundo `--linha`, texto `--texto-suave` |
| MIP (medicamento isento de prescrição) | Contorno `--azul`, texto `--azul` |

### 4.8 Aviso obrigatório de medicamentos

Faixa com fundo `--aviso`, borda esquerda **não** (evitar cara de alerta genérico) — borda inteira 1px `--aviso-borda`, ícone de informação, texto em caixa-alta Barlow Cond. 14px:
**"SE PERSISTIREM OS SINTOMAS, O MÉDICO DEVERÁ SER CONSULTADO."**
Aparece no topo e no fim da listagem de Medicamentos e em cada página de produto da categoria.

### 4.9 Links

Cor `--azul`, sublinhado de 2px que aparece da esquerda no hover. Foco: contorno 3px.

### 4.10 Botão flutuante do WhatsApp

Mantido (canto inferior direito, 56px). Ganha um pulso suave a cada 8s (para no `prefers-reduced-motion`). Usa o mesmo número dos pedidos — (88) 99726-9402 é o único WhatsApp do site (decisão do cliente: o número da API da Meta passou a cobrar por mensagem).

---

## 5. Layout

- **Container:** máx. 1240px; margens laterais 16px (celular) · 24px (tablet) · 32px (computador).
- **Espaçamentos** (base 4px): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
- **Entre seções:** 48px no celular, 80px no computador.
- **Vitrine:** 2 colunas (celular) · 3 (tablet) · 4 (computador) · 5 (≥1400px). Espaço entre cards 12px (celular) / 20px.
- **Raio:** 16px cards e banner · 12px botões · 999px busca e chips · 6px etiquetas.

**Página inicial — celular**
```
┌────────────────────┐
│ ▓ entrega grátis ▓ │ faixa de topo
│ [logo]   [☰] [🧺] │
│ [ 🔍 buscar...   ] │
├────────────────────┤
│  BANNER carrossel  │ foto real + 1 frase + botão
│  • • • •           │
├────────────────────┤
│ (o)(o)(o)(o)(o) →  │ chips de categoria (rolagem)
├────────────────────┤
│ Ofertas da semana  │
│ [card][card]       │
│ ══════════════════ │ ← régua vermelha (prateleira)
│ [card][card]       │
│ ══════════════════ │
├────────────────────┤
│ ▓ Entrega grátis · │ faixa de confiança (azul-noite)
│ ▓ Farmacêutica ·   │ com fotos reais pequenas
│ ▓ Aberto até 22h   │
├────────────────────┤
│ Vitrine por        │ uma prateleira por categoria
│ categoria …        │
├────────────────────┤
│ Quem somos · fotos │ institucional (mantido, mais abaixo)
│ Serviços · Mapa    │
├────────────────────┤
│ RODAPÉ azul-noite  │
└────────────────────┘
```

**Página inicial — computador**
```
┌──────────────────────────────────────────────────────────┐
│ ▓ Entrega grátis em Sobral · Seg–Sáb 7h–22h · (88) ...  ▓│
│ [LOGO]  [ 🔍 O que você procura?          ]  Lojas  🧺(2) │
│ MEDICAMENTOS  PERFUMARIA  FRALDAS  ABSORVENTES  HIGIENE … │
├──────────────────────────────────────────────────────────┤
│ ┌──────────────── BANNER (2/3) ─────────┐ ┌─ lateral ──┐ │
│ │ foto da loja + título + botão          │ │ Entrega    │ │
│ │ • • • •                         ‹  ›   │ │ grátis     │ │
│ └────────────────────────────────────────┘ ├────────────┤ │
│                                            │ Fale com a │ │
│                                            │ farmacêut. │ │
│                                            └────────────┘ │
│  (o)  (o)  (o)  (o)  (o)  (o)  (o)  (o)   categorias      │
│  Ofertas da semana                              Ver todas →│
│  [card] [card] [card] [card] [card]                       │
│  ════════════════════════════════════════ prateleira       │
└──────────────────────────────────────────────────────────┘
```

**Página de categoria:** título + contador ("12 produtos") · filtros simples (marca, subcategoria, só com desconto, só disponíveis, ordenar por preço) — no celular os filtros abrem numa gaveta de baixo · vitrine em prateleiras.

**Página de produto:** foto grande (ou provisória) · marca · nome · apresentação · preço · seletor de quantidade (− 1 +) · **Comprar pelo WhatsApp** · aviso de medicamentos quando for o caso · "Você também pode gostar" (mesma categoria).

---

## 6. Profundidade (sombras)

Sombras tingidas de azul-noite, nunca cinza puro.

```css
--sombra-1: 0 1px 2px rgb(var(--noite-rgb) / .06), 0 1px 1px rgb(var(--noite-rgb) / .04);   /* card em repouso */
--sombra-2: 0 4px 12px -2px rgb(var(--noite-rgb) / .10);                                    /* header ao rolar, botão hover */
--sombra-3: 0 14px 32px -12px rgb(var(--noite-rgb) / .22);                                  /* card em hover, mega menu */
--sombra-4: 0 24px 60px -20px rgb(var(--noite-rgb) / .35);                                  /* menu lateral, gaveta de filtros */
```

---

## 7. Animação e interação

**Nível escolhido: L2 — fluido.** Tudo em CSS + `IntersectionObserver`. **Nenhuma
biblioteca de animação** (sem GSAP, sem Lenis) — o site precisa voar no celular.

| Onde | O quê | Duração / curva |
|---|---|---|
| Banner | Crossfade entre slides + zoom lento da foto | 600ms `ease-out` / 6s linear |
| Título do banner | Palavras sobem e aparecem em sequência (60ms entre palavras) | 500ms |
| Ao rolar | Seções: fade + sobe 16px. Cards da vitrine: "assentam na prateleira" em cascata (50ms entre cards, máx. 8) | 450ms `cubic-bezier(.2,.7,.2,1)` |
| Títulos de seção | Sublinhado vermelho cresce da esquerda quando o título entra na tela | 400ms |
| Header | Encolhe ao rolar | 200ms |
| Card produto | Elevação, zoom da imagem, botão surgindo | 200–300ms |
| Adicionar à lista/cesta | Ícone da cesta dá um "pulo" e o contador troca com flip | 300ms |
| Botões | Sobe 1px no hover, afunda no clique | 150ms |
| Menu lateral / mega menu | Desliza + fade | 250ms / 180ms |

```css
/* Scroll reveal — o JS só adiciona .visivel quando o elemento entra na tela */
.revelar { opacity: 0; transform: translateY(16px); transition: opacity .45s var(--curva), transform .45s var(--curva); }
.revelar.visivel { opacity: 1; transform: none; }
:root { --curva: cubic-bezier(.2,.7,.2,1); }

/* Movimento reduzido: tudo aparece direto, carrossel para de girar sozinho */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
  .revelar { opacity: 1; transform: none; }
}
```

**Regras de desempenho:** animar só `transform` e `opacity`; nada de `filter: blur()` em
elemento que se move; `backdrop-filter` só no header (≤ 12px); observers desligados
depois que o elemento já apareceu; carrossel pausa fora da tela.

**Detalhe escondido (o "toque de carinho"):** quando o cliente toca em "Comprar pelo
WhatsApp", a cruz da logo no header gira 90° e volta — um "piscar" da marca. Só quem
presta atenção percebe.

---

## 8. Faça / Não faça

**Faça**
1. Use fotos reais da loja e da equipe em todo lugar que pedir "gente" — é o diferencial contra as grandes redes.
2. Mostre o preço sempre na etiqueta de gôndola; preço promocional em vermelho com o antigo riscado ao lado.
3. Deixe o botão de compra visível sem hover no celular.
4. Escreva botões com o que acontece: "Comprar pelo WhatsApp", "Ver todos de Fraldas".
5. Mostre o aviso de medicamentos em toda tela com medicamento.
6. Mantenha alvos de toque com no mínimo 44×44px.
7. Leia preços, estoque e imagens **só** do arquivo de produtos.
8. Teste cada tela em 360px de largura antes de considerar pronta.

**Não faça**
1. Não copie logo, textos, fotos ou layout idêntico da Pague Menos (ela é só referência de estrutura).
2. Não use "Leve 2 pague 1", brindes ou "compre e ganhe" em **medicamentos** (RDC 96/2008 da ANVISA). Nas outras categorias pode.
3. Não cadastre medicamento que exige receita (tarja vermelha/preta) — só MIP.
4. Não use gradiente colorido de fundo, emoji como ícone ou cards com faixa colorida na lateral.
5. Não mostre imagem quebrada nem foto de banco fingindo ser o produto.
6. Não espalhe números pelo código: o WhatsApp vem só de `WHATSAPP_PEDIDOS` e o telefone de ligação só de `content/empresa.ts`.
7. Não anime nada que trave o celular (vídeo de fundo, 3D, parallax pesado).
8. Não use vermelho em botões de ação — vermelho é preço e oferta.

---

## 9. Responsivo

| Faixa | Largura | Principais mudanças |
|---|---|---|
| Celular (prioridade) | até 639px | Menu lateral; busca em linha própria; vitrine 2 colunas; filtros em gaveta; botão de compra sempre visível; carrossel com arrastar |
| Tablet | 640–1023px | Vitrine 3 colunas; banner sem coluna lateral |
| Computador | 1024–1399px | Mega menu; vitrine 4 colunas; hover revela botão; banner + coluna lateral |
| Grande | 1400px+ | Vitrine 5 colunas; container 1240px centralizado |

- Sem rolagem horizontal da página em nenhuma largura (só em carrosséis de chips, de propósito).
- Imagens em WebP, com `width`/`height` declarados (sem "pulos" na tela), `loading="lazy"` fora da primeira tela, tamanhos: 400px (card), 800px (produto), 1600px (banner).
- Contraste mínimo 4,5:1 em texto; foco visível em tudo que é clicável; `lang="pt-BR"`; textos alternativos nas fotos.

---

## Anexo — estrutura técnica prevista

- `/catalogo/produtos.json` (do repositório catalogo-bem-estar) — fonte única dos produtos, lida no navegador por `components/dados/ProdutosProvider.tsx`
  (`ean, nome, marca, categoria, subcategoria, apresentacao, preco, preco_promocional, estoque, imagem, destaque`).
- `content/pedidos.ts` — `WHATSAPP_PEDIDOS = "5588997269402"` e o modelo da mensagem.
- Rotas estáticas: `/`, `/categoria/[slug]/`, `/produto/[slug]/`, `/compreaqui/`,
  `/politica-privacidade/`, `/termos-de-uso/` — todas entram no `sitemap.xml`.
- Espaço marcado no `<head>` para o widget da Digisac.
- Continua `output: "export"` (site estático na Hostinger).
