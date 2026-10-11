"use client";

import { useState } from "react";
import { Minus, MessageCircle, Plus } from "lucide-react";
import { linkPedidoWhatsapp, WHATSAPP_PEDIDOS_EXIBICAO } from "@/content/pedidos";
import { emReais, levePague, totalDaQuantidade, type Produto } from "@/lib/produtos";

/**
 * Quantidade (− 1 +) e botão "Pedir pelo WhatsApp" da página do produto.
 * A mensagem pronta já leva a quantidade escolhida.
 */
export function SeletorCompra({ produto }: { produto: Produto }) {
  const lp = levePague(produto);
  const estoque = produto.estoque;
  const maximo = Math.max(1, Math.min(estoque, 20));
  const [quantidade, setQuantidade] = useState(1);
  const mudar = (delta: number) => setQuantidade((q) => Math.min(maximo, Math.max(1, q + delta)));
  const total = totalDaQuantidade(produto, quantidade);
  // Leve/Pague: quantas faltam para completar o próximo grupo
  const falta = lp ? lp.leve - (quantidade % lp.leve) : 0;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-xl border border-linha bg-cartao" role="group" aria-label="Quantidade">
          <button
            type="button"
            onClick={() => mudar(-1)}
            disabled={quantidade <= 1}
            aria-label="Diminuir quantidade"
            className="flex h-12 w-12 items-center justify-center rounded-l-xl text-azul transition hover:bg-gelo active:scale-90 disabled:text-indisponivel disabled:hover:bg-transparent"
          >
            <Minus className="h-5 w-5" aria-hidden="true" />
          </button>
          <output aria-live="polite" className="w-10 text-center font-display text-xl font-bold numeros-tabulares">
            {quantidade}
          </output>
          <button
            type="button"
            onClick={() => mudar(1)}
            disabled={quantidade >= maximo}
            aria-label="Aumentar quantidade"
            className="flex h-12 w-12 items-center justify-center rounded-r-xl text-azul transition hover:bg-gelo active:scale-90 disabled:text-indisponivel disabled:hover:bg-transparent"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {quantidade > 1 && (
          <p className="text-[15px] text-texto-suave">
            Total: <strong className="font-semibold text-texto">R$ {emReais(total)}</strong>
          </p>
        )}
      </div>
      {lp && maximo >= lp.leve && (
        <p className="mt-3 text-[14px] font-semibold text-vermelho">
          {quantidade >= lp.leve && falta === lp.leve
            ? `Promoção Leve ${lp.leve} Pague ${lp.pague} aplicada.`
            : `Leve ${lp.leve} e pague ${lp.pague}: ${falta === 1 ? "falta 1 unidade" : `faltam ${falta} unidades`}.`}
        </p>
      )}

      <a
        href={linkPedidoWhatsapp({
          nome: produto.nome,
          marca: produto.marca,
          ean: produto.ean,
          preco: produto.preco,
          precoPromocional: produto.preco_promocional,
          leve: produto.leve,
          pague: produto.pague,
          quantidade,
          total,
        })}
        target="_blank"
        rel="noopener noreferrer"
        data-pedido
        className="btn btn-whatsapp mt-4 w-full min-h-14 text-[16px] sm:w-auto sm:px-8"
      >
        <MessageCircle className="icone-toque h-5 w-5" aria-hidden="true" />
        <span className="rotulo-normal">Pedir pelo WhatsApp</span>
        <span className="rotulo-enviado">Abrindo WhatsApp…</span>
      </a>
      <p className="mt-2 text-[13px] text-texto-suave">
        Seu pedido vai pronto para o WhatsApp de pedidos {WHATSAPP_PEDIDOS_EXIBICAO}. É só enviar.
      </p>
    </div>
  );
}
