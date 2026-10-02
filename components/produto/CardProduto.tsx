import { BellRing, MessageCircle } from "lucide-react";
import { linkAviseMeWhatsapp, linkPedidoWhatsapp } from "@/content/pedidos";
import { disponivel, percentualDesconto, precoFinal, slugProduto, type Produto } from "@/lib/produtos";
import { ImagemProduto } from "./ImagemProduto";
import { Preco } from "./Preco";

/**
 * Card da vitrine (DESIGN.md §4.2).
 *
 * O cartão inteiro leva à página do produto (o link do nome se estende por
 * cima do card); o botão de compra fica acima desse link e abre o WhatsApp
 * de pedidos com a mensagem pronta (quantidade 1 — na página do produto o
 * cliente escolhe a quantidade).
 */
export function CardProduto({ produto, prioridade = false }: { produto: Produto; prioridade?: boolean }) {
  const temEstoque = disponivel(produto);
  const desconto = percentualDesconto(produto);
  const href = `/produto/${slugProduto(produto)}/`;

  return (
    <article
      className={`card-produto group relative flex h-full flex-col rounded-2xl border border-linha bg-cartao p-3 shadow-1 transition duration-300 ease-curva sm:p-4 ${
        temEstoque ? "hover:-translate-y-1 hover:shadow-3" : ""
      } active:scale-[.98]`}
    >
      {/* Selo: desconto ou indisponível */}
      {!temEstoque ? (
        <span className="rotulo absolute left-3 top-3 z-[1] rounded-md bg-linha px-2 py-1 text-[11px] text-texto-suave">
          Indisponível
        </span>
      ) : desconto > 0 ? (
        <span className="rotulo absolute left-3 top-3 z-[1] rounded-md bg-vermelho px-2 py-1 text-[12px] text-white">
          -{desconto}%
        </span>
      ) : null}

      <div
        className={`aspect-square overflow-hidden rounded-xl ${temEstoque ? "" : "opacity-60 grayscale"}`}
      >
        <div className="h-full w-full transition-transform duration-500 ease-curva group-hover:scale-[1.06]">
          <ImagemProduto produto={produto} prioridade={prioridade} />
        </div>
      </div>

      <p className="rotulo mt-3 text-[12px] text-texto-suave">{produto.marca}</p>
      <h3 className="mt-0.5 line-clamp-2 min-h-[2.6em] font-texto text-[15px] font-medium leading-[1.3] text-texto">
        <a
          href={href}
          className="rounded-sm outline-none after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:after:outline focus-visible:after:outline-[3px] focus-visible:after:outline-azul-logo/50"
        >
          {produto.nome}
        </a>
      </h3>
      <p className="mt-1 text-[13px] text-texto-suave">{produto.apresentacao}</p>

      <div className="mt-3">
        <Preco produto={produto} />
      </div>

      {/* Ação — fica acima do link do card (relative z-[2]) */}
      <div className="card-acao relative z-[2] mt-auto pt-3">
        {temEstoque ? (
          <a
            href={linkPedidoWhatsapp({
              nome: produto.nome,
              apresentacao: produto.apresentacao,
              preco: precoFinal(produto),
              quantidade: 1,
            })}
            target="_blank"
            rel="noopener noreferrer"
            data-pedido
            className="btn btn-whatsapp w-full px-2.5 text-[13px] leading-tight tracking-[.02em]"
          >
            <MessageCircle className="icone-toque h-[18px] w-[18px]" aria-hidden="true" />
            <span className="rotulo-normal">Comprar pelo WhatsApp</span>
            <span className="rotulo-enviado">Abrindo WhatsApp…</span>
            <span className="sr-only">: {produto.nome}</span>
          </a>
        ) : (
          <a
            href={linkAviseMeWhatsapp({ nome: produto.nome, apresentacao: produto.apresentacao })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-contorno w-full px-2.5 text-[13px] leading-tight tracking-[.02em]"
          >
            <BellRing className="h-[18px] w-[18px]" aria-hidden="true" />
            Avise-me pelo WhatsApp
            <span className="sr-only">: {produto.nome}</span>
          </a>
        )}
      </div>
    </article>
  );
}
