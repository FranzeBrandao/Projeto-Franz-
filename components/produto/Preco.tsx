import { disponivel, emReais, precoFinal, temPromocao, type Produto } from "@/lib/produtos";

/**
 * Preço na etiqueta de gôndola. Em promoção: etiqueta vermelha com o
 * preço antigo riscado ao lado. Indisponível: etiqueta apagada.
 */
export function Preco({ produto, grande = false }: { produto: Produto; grande?: boolean }) {
  const promocao = temPromocao(produto);
  const classeEstado = !disponivel(produto) ? "apagada" : promocao ? "promocao" : "";

  return (
    <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
      <span className={`etiqueta-preco ${classeEstado} ${grande ? "text-[32px]" : "text-[22px] sm:text-2xl"}`}>
        <span className={`font-texto font-semibold ${grande ? "text-base" : "text-xs"}`}>R$</span>
        {emReais(precoFinal(produto))}
      </span>
      {promocao && (
        <span className="pb-1 text-[13px] text-texto-suave">
          <span className="sr-only">Preço anterior: </span>
          de <s>R$ {emReais(produto.preco)}</s>
        </span>
      )}
    </div>
  );
}
