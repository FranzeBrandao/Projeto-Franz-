# Farmácia Bem Estar — Site institucional

Site institucional da Farmácia Bem Estar (Sobral - CE), em Next.js (App Router)
+ TypeScript + Tailwind CSS. O projeto é exportado como site estático, pronto
para a hospedagem compartilhada da Hostinger, e a arquitetura já está preparada
para evoluir para e-commerce nas próximas fases.

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # ESLint
npm run build    # gera o site estático em out/
```

## Publicar na Hostinger

O site é 100% estático — não precisa de Node.js no servidor, funciona em
qualquer plano da Hostinger.

### 1. Definir o domínio (importante)

O endereço do site é usado no `sitemap.xml`, no `robots.txt` e nas tags de
compartilhamento. Antes do build, edite `content/site.ts` e troque o valor de
`siteUrl` pelo domínio real. Alternativamente, defina a variável de ambiente:

```bash
NEXT_PUBLIC_SITE_URL="https://seudominio.com.br" npm run build
```

### 2. Gerar os arquivos

```bash
npm run build
```

Isso cria a pasta `out/` com o site pronto (HTML, CSS, JS, imagens, além do
`robots.txt`, `sitemap.xml` e `.htaccess`).

### 3. Subir para o servidor

No hPanel da Hostinger:

1. Abra **Arquivos → Gerenciador de Arquivos**.
2. Entre na pasta `public_html` do domínio.
3. Apague o conteúdo antigo, se houver (ex.: `default.php`).
4. Envie **todo o conteúdo de dentro da pasta `out/`** para o `public_html`
   — os arquivos em si, não a pasta `out` inteira.
5. Confirme que o `.htaccess` foi junto. Ele é um arquivo oculto: se não
   aparecer, ative "Mostrar arquivos ocultos" nas configurações do gerenciador.

Também é possível enviar por FTP, apontando para o mesmo `public_html`.

### 4. Conferir

- Acesse o domínio e verifique se a página abre com HTTPS.
- Teste `seudominio.com.br/robots.txt` e `/sitemap.xml`.
- Teste as páginas `/politica-privacidade/` e `/termos-de-uso/`.

### Atualizações futuras

Rode `npm run build` de novo e reenvie o conteúdo de `out/`. O `.htaccess`
já configura o cache para que as mudanças no HTML apareçam imediatamente.

## Estrutura

- `app/` — rotas (App Router); `page.tsx` é a Home.
- `components/` — um componente por seção da Home.
- `content/empresa.ts` — dados cadastrais (endereço, CNPJ, telefone, horário,
  redes sociais, convênios).
- `content/institucional.ts` — textos editoriais e fotos. **As seções que
  dependem deste arquivo só aparecem no site quando houver conteúdo real.**
  Enquanto estiverem vazias, a seção é omitida e o menu se ajusta sozinho —
  o visitante nunca vê texto de rascunho.
- `content/site.ts` — endereço público do site.
- `public/` — logo, `.htaccess` e imagens.

## Status do conteúdo

Publicado com dados reais:

| Item | Status |
|---|---|
| Endereço, telefone, WhatsApp | ✅ |
| Horário de funcionamento | ✅ |
| Razão social, CNPJ, farmacêutica responsável | ✅ |
| Serviços e convênios | ✅ |
| Instagram e Facebook | ✅ |

Aguardando material do cliente (as seções ficam ocultas até lá):

| Item | Onde entra |
|---|---|
| Texto "quem somos", missão e valores | `content/institucional.ts` → `sobre` |
| Ano de fundação e marcos da história | `content/institucional.ts` → `historia` |
| Fotos reais da farmácia e da equipe | `content/institucional.ts` → `galeria` / `heroImagens` + `public/images/` |

### Link de prévia (GitHub Pages)

Na hospedagem definitiva o site fica na raiz do domínio e nada precisa ser
ajustado. No link de prévia ele fica numa subpasta, e aí o build precisa
saber disso — o `basePath` do Next.js não reescreve `<img src="/...">`:

```bash
NEXT_PUBLIC_BASE_PATH=/Projeto-Franz- npm run build
```

(junto com `basePath`/`assetPrefix` em `next.config.mjs`, que só valem para
a prévia). Sem essa variável as imagens quebram na prévia.
| Arquivo original da logo | `public/logo.svg` (hoje é uma reconstrução aproximada) |
| E-mail de contato | `content/empresa.ts` → `email` |
| Domínio definitivo | `content/site.ts` → `siteUrl` |

Os textos de Política de Privacidade e Termos de Uso são placeholders
estruturais e precisam ser redigidos/revisados por profissional competente
antes de valerem juridicamente.

## Próximas fases

Catálogo de produtos, carrinho, checkout, cadastro de clientes e painel
administrativo. Quando entrar o e-commerce, o `output: "export"` do
`next.config.mjs` sai e o projeto passa a rodar em servidor Node
(VPS ou plano com Node.js na Hostinger).
