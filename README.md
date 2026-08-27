# Farmácia Bem Estar — Site institucional

Site institucional da Farmácia Bem Estar (Sobral - CE), construído em Next.js
(App Router) + TypeScript + Tailwind CSS, com arquitetura preparada para
evoluir para uma plataforma de e-commerce em fases futuras.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

```bash
npm run build   # build de produção
npm run start   # roda o build de produção
npm run lint    # lint
```

## Estrutura

- `app/` — rotas (App Router). `page.tsx` é a Home institucional.
- `components/` — um componente por seção da Home (header, hero, sobre,
  serviços, produtos, história, galeria, localização, contato, footer,
  botão flutuante de WhatsApp).
- `content/empresa.ts` — dados institucionais (endereço, telefone, WhatsApp,
  horário, redes sociais). Campos marcados `[A CONFIRMAR]` são placeholders
  aguardando informação real do cliente — **nunca preencher com dado
  inventado**.

## Status do conteúdo (fase 1 — institucional)

| Dado | Status |
|---|---|
| Endereço | ✅ confirmado |
| Telefone | ✅ confirmado |
| WhatsApp | ⏳ aguardando confirmação (mesmo número do telefone?) |
| Horário de funcionamento | ⏳ aguardando grade completa |
| Texto "quem somos" / missão / valores | ⏳ aguardando material do cliente |
| Nossa história | ⏳ aguardando material do cliente |
| Serviços oferecidos | ⏳ aguardando confirmação |
| Redes sociais | ⏳ aguardando links |
| Fotos reais | ⏳ aguardando material do cliente |
| Logo | ⏳ aguardando arquivo — quando chegar, a paleta de cores é recalibrada a partir dela |

## Próximas fases

Catálogo de produtos, carrinho, checkout, cadastro de clientes e painel
administrativo entram depois da aprovação da página institucional — ver
histórico de conversa para o briefing completo (PROMPT MESTRE).
