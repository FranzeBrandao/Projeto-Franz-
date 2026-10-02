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
| `/categoria/<nome>/` | Uma página por categoria, com filtro (subcategoria, marca, promoção, disponíveis) |
| `/produto/<nome>/` | Uma página por produto, com quantidade e "Comprar pelo WhatsApp" |
| `/busca/?q=...` | Busca de produtos |
| `/politica-privacidade/`, `/termos-de-uso/` | Páginas legais |
| `/compreaqui/` | Link na bio (vem do repositório [Link-na-bio](https://github.com/FranzeBrandao/Link-na-bio), sem mudanças) |
| `/sitemap.xml`, `/robots.txt` | Gerados sozinhos, já com categorias e produtos |

## O que você edita no dia a dia

### Produtos — `content/produtos.json`

**Todos os produtos ficam neste único arquivo.** Cada produto tem:

| Campo | Exemplo | Observação |
|---|---|---|
| `ean` | `"7891234567890"` | Código de barras |
| `nome` | `"Dipirona Monoidratada 500mg"` | |
| `marca` | `"Vitalar"` | |
| `categoria` | `"medicamentos"` | Uma das 8 categorias (veja abaixo) |
| `subcategoria` | `"Dor e febre"` | Texto livre — vira o filtro da categoria |
| `apresentacao` | `"Caixa com 10 comprimidos"` | |
| `preco` | `7.9` | Use ponto, não vírgula |
| `preco_promocional` | `5.9` ou `null` | `null` = sem promoção |
| `estoque` | `40` | `0` = aparece "Indisponível" com "Avise-me pelo WhatsApp" |
| `imagem` | `"/produtos/dipirona.webp"` ou `""` | Foto dentro de `public/`. Vazio = imagem provisória da categoria |
| `destaque` | `true` | `true` = entra em "Ofertas da semana" na página inicial |

Fotos de produto: salve em `public/produtos/` (de preferência `.webp`,
quadrada, uns 800×800px) e coloque o caminho no campo `imagem`.

> ⚠️ Os 32 produtos atuais são **fictícios**, só para demonstração
> (marcas inventadas e EANs de uso interno começando com `200`). Troque
> pelos produtos reais antes de divulgar a loja.
>
> Na categoria **Medicamentos**, cadastre só medicamentos isentos de
> prescrição (MIP) e não use "leve X pague Y" (RDC 96/2008 da ANVISA). O
> aviso "SE PERSISTIREM OS SINTOMAS, O MÉDICO DEVERÁ SER CONSULTADO."
> aparece sozinho.

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

O fluxo é: **alterar aqui → enviar para a branch `main` no GitHub → a
Hostinger atualiza pelo Git**. Não precisa gerar nada no computador.

```
main  ──(robô do GitHub gera o site)──►  hostinger  ──(hPanel → Git)──►  public_html
```

- O robô é o arquivo `.github/workflows/publicar-hostinger.yml`. A cada
  alteração na `main`, ele confere o código, gera o site, coloca a
  `/compreaqui/` junto e salva tudo pronto na branch **`hostinger`**.
- O andamento aparece na aba **Actions** do GitHub (verde = deu certo).
- A Hostinger lê **só** a branch `hostinger`.

### Configurar na Hostinger (uma vez só)

1. **Faça backup** do que está hoje no site: hPanel → Arquivos →
   Gerenciador de Arquivos → `public_html` → selecione tudo → Compactar →
   baixe o `.zip`.
2. Depois do backup, **esvazie a pasta `public_html`**. A Hostinger só
   instala o Git numa pasta vazia. A `/compreaqui/` volta sozinha, porque
   ela vem dentro da branch `hostinger`.
3. hPanel → **Avançado → Git**:
   - Repositório: `https://github.com/FranzeBrandao/Projeto-Franz-.git`
     (ou escolha o repositório pela conta do GitHub conectada)
   - Branch: **`hostinger`**
   - Diretório: deixe em branco (= `public_html`)
   - Clique em **Criar** e depois em **Implantar**.
4. (Opcional, recomendado) **Implantação automática**: na mesma tela,
   clique em *Implantação automática*, copie o endereço do webhook e cole
   no GitHub em Settings → Webhooks → Add webhook (Payload URL = endereço
   copiado, evento *Just the push event*). Assim a Hostinger atualiza
   sozinha sempre que o robô salvar a branch `hostinger`. Sem isso, é só
   clicar em **Implantar** no hPanel depois de cada atualização.
5. Confira: abra o site, `/compreaqui/`, `/sitemap.xml`, uma categoria e
   um produto. Ative o SSL grátis (hPanel → Segurança → SSL) se ainda
   não estiver ativo — o `.htaccess` força HTTPS.

### No dia a dia

1. Altere o que precisar (ex.: `content/produtos.json`) na `main`.
2. Espere o robô ficar verde na aba **Actions** (uns 2 minutos).
3. Com a implantação automática, pronto. Sem ela: hPanel → Git → Implantar.

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
