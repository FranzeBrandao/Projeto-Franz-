# Farmácia Bem Estar — Site e loja

Site da Farmácia Bem Estar (Sobral - CE), publicado em
<https://farmaciabemestarsobral.com>. Vitrine de produtos com compra pelo
WhatsApp — sem carrinho, sem pagamento online, sem banco de dados.

Feito em Next.js + TypeScript + Tailwind CSS e **exportado como site
estático** (só HTML, CSS, JS e imagens), então roda em qualquer plano da
Hostinger. O padrão visual está em [`DESIGN.md`](DESIGN.md).

## Páginas

| Endereço | O que é |
|---|---|
| `/` | Página inicial: banner, categorias, ofertas, prateleiras e a parte institucional |
| `/categoria/<nome>/` | Uma página por categoria, com filtros (marca, faixa de preço, promoção), ordenação e "Mostrar mais" |
| `/produto/?e=<código de barras>` | Página do produto, com quantidade e "Pedir pelo WhatsApp" |
| `/busca/?q=...` | Busca de produtos |
| `/como-pedir-e-entregar/`, `/trocas-e-devolucoes/` | Como pedir pelo WhatsApp, entrega e trocas |
| `/politica-privacidade/`, `/termos-de-uso/` | Páginas legais |
| `/compreaqui/` | Link na bio (vem do repositório [Link-na-bio](https://github.com/FranzeBrandao/Link-na-bio), sem mudanças) |
| `/sitemap.xml`, `/robots.txt` | Gerados sozinhos, com as páginas e categorias (os produtos são lidos no navegador e ainda não entram no sitemap) |

## O que você edita no dia a dia

### Produtos — vêm do catálogo (nada para editar aqui)

**Preço, promoção, estoque e foto NÃO ficam neste repositório.** O site lê,
no navegador, o arquivo `https://farmaciabemestarsobral.com/catalogo/produtos.json`,
que o robô do repositório
[catalogo-bem-estar](https://github.com/FranzeBrandao/catalogo-bem-estar)
atualiza a partir das planilhas do Infarma (preço e estoque em
`entrada/<CATEGORIA>/`, promoção em `entrada/PROMOCAO/`, fotos em
`entrada/fotos/`). Atualizou lá, mudou aqui, sem publicar o site de novo.

- Produto **sem estoque não aparece** no site (só por link direto, como "indisponível").
- Se o arquivo não carregar, o site mostra uma mensagem amigável com botão do WhatsApp.
- Cada produto do catálogo é ligado a um departamento do site por
  `config/departamentos.json` **do repositório do catálogo**
  (`FRALDAS` → `fraldas` etc.). Os departamentos do site são os de
  `content/categorias.ts`; produto de categoria sem departamento aqui
  só aparece na busca e nas ofertas.
- **Disponibilidade** (mostrar a quantidade, só "Últimas unidades" ou
  nada): `content/disponibilidade.ts`, uma linha.
- **Medicamentos:** todo produto do departamento `medicamentos` fica
  *restrito* (sem promoção, fora das ofertas e com "Consultar pelo
  WhatsApp" no lugar de "Pedir") até a responsável técnica liberar o
  código de barras em `content/regras-farmacia.ts`. Liberar só
  medicamentos isentos de prescrição. Não usar "leve X pague Y" (RDC
  96/2008 da ANVISA). O aviso "SE PERSISTIREM OS SINTOMAS, O MÉDICO
  DEVERÁ SER CONSULTADO." aparece sozinho.
- ⚠️ A pasta `catalogo/` do servidor pertence ao outro repositório. O
  build deste site **não** gera nada em `catalogo/` e o `produtos.json`
  nunca deve ser copiado para `public/`.

### Categorias — `content/categorias.ts`

As 8 categorias do menu: Medicamentos, Perfumaria, Fraldas, Absorventes,
Higiene Pessoal, Dermocosméticos, Infantil, Vitaminas e Suplementos.

### WhatsApp — `content/pedidos.ts`

```ts
export const WHATSAPP_PEDIDOS = "5588997269402";
```

É o **único número de WhatsApp do site** (botões de compra, botão
flutuante, topo, contato e rodapé). Trocando aqui, muda em tudo. A
mensagem pronta do pedido também fica neste arquivo.

O telefone de **ligações**, o endereço, o horário, o e-mail e o CNPJ ficam
em `content/empresa.ts`.

### Outros textos

- `content/banners.ts` — slides do banner principal (texto, botão e foto).
- `content/loja.ts` — texto da entrega grátis (acima de R$ 10,00).
- `content/institucional.ts` — "Quem somos", história e fotos da galeria.

### Widget da Digisac

O espaço está reservado e comentado em `app/layout.tsx`, dentro do
`<head>`. É só colar o código do widget ali.

## Como publicar (GitHub → Hostinger)

O fluxo é: **alterar aqui → enviar para a branch `main` no GitHub → o robô
envia o site por FTPS para a `public_html`**. Não precisa gerar nada no
computador.

```
main  ──(robô do GitHub gera o site e envia por FTPS)──►  public_html
                                                          └─ catalogo/  (outro robô; nunca é tocado)
```

- O robô é o arquivo `.github/workflows/publicar-hostinger.yml`. A cada
  alteração na `main`, ele confere o código, gera o site, coloca a
  `/compreaqui/` junto e envia **só o que mudou**.
- Antes de enviar, ele confere que a conta FTP está na `public_html`
  (precisa achar a pasta `catalogo` lá). Se não estiver, para sem enviar nada.
- Ele **nunca** envia nem apaga nada dentro de `catalogo/` e nunca apaga
  arquivos que ele mesmo não enviou.
- O andamento aparece na aba **Actions** do GitHub (verde = deu certo).

> ⚠️ **Não use a conexão Git da Hostinger** (hPanel → Git → Implantar /
> Reimplantar). Ela apaga tudo o que não está no repositório, inclusive
> a pasta `public_html/catalogo` do catálogo (testado em 08/10/2026).

### Configurar (uma vez só)

1. hPanel → **Arquivos → Contas FTP**: crie uma conta FTP só para o site,
   com a pasta **`public_html`** (deixe o campo de pasta em branco). Não
   use a conta do catálogo, que fica presa em `public_html/catalogo`.
2. GitHub → este repositório → **Settings → Secrets and variables →
   Actions** → crie `FTP_SERVIDOR`, `FTP_USUARIO` e `FTP_SENHA` com os
   dados dessa conta.
3. hPanel → **Git**: desconecte o repositório (os arquivos que já estão
   no site continuam lá).

### No dia a dia

1. Altere o que precisar (layout, textos) na `main`. Preço, estoque,
   promoção e foto não passam por aqui (vêm do catálogo).
2. Espere o robô ficar verde na aba **Actions** (uns 2 a 3 minutos).

## Rodando no computador (opcional)

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # confere o código
npm run build    # gera o site estático em out/
```

## Estrutura do código

- `app/` — páginas (rotas). `layout.tsx` tem fontes, `<head>` e Digisac.
- `components/` — partes das páginas (header, banner, card de produto, prateleira, filtros…).
- `content/` — **tudo o que você edita**: produtos, categorias, WhatsApp, empresa, banners.
- `lib/` — regras (preço promocional, indisponível, links).
- `public/` — logo, imagens, `.htaccess`.
- `imagens-novas/` — fotos originais recebidas (não vão para o site; as
  versões otimizadas ficam em `public/images/`).

Os textos de Política de Privacidade e Termos de Uso ainda são
provisórios e precisam ser redigidos/revisados por profissional
competente.
