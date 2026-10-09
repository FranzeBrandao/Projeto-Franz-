import { MessageCircle } from "lucide-react";
import { linkPedidoGeral } from "@/content/pedidos";

/** Esqueleto enquanto o catálogo carrega (evita a página "pular"). */
export function CarregandoProdutos({ quantidade = 8 }: { quantidade?: number }) {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Carregando produtos…</span>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4" aria-hidden="true">
        {Array.from({ length: quantidade }, (_, i) => (
          <li key={i} className="h-[300px] animate-pulse rounded-2xl border border-linha bg-gelo/70" />
        ))}
      </ul>
    </div>
  );
}

/** Mensagem amigável quando os produtos não carregam: nunca uma página em branco. */
export function ErroProdutos() {
  return (
    <div role="alert" className="rounded-2xl border border-dashed border-linha bg-cartao px-6 py-12 text-center">
      <p className="font-display text-xl font-bold text-texto">Não conseguimos carregar os produtos agora</p>
      <p className="mx-auto mt-2 max-w-md text-texto-suave">
        Tente de novo em instantes. Se preferir, chame a gente no WhatsApp: fazemos seu pedido por lá.
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={() => window.location.reload()} className="btn btn-contorno">
          Tentar de novo
        </button>
        <a href={linkPedidoGeral()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Pedir pelo WhatsApp
        </a>
      </div>
    </div>
  );
}
