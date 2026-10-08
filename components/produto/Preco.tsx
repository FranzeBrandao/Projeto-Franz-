import { disponivel, emReais, precoFinal, temPromocao, type Produto } from "@/lib/produtos";

/**
 * Preço na etiqueta de gôndola. Em promoção: "De R$ x" riscado em cima e
 * "por" + etiqueta vermelha com o preço novo. Indisponível: etiqueta apagada.
 */
export function Preco({ produto, grande = false }: { produto: Produto; grande?: boolean }) {
  const promocao = temPromocao(produto);
  const classeEstado = !disponivel(produto) ? "apagada" : promocao ? "promocao" : "";

  return (
    <div className="flex flex-col items-start gap-y-1">
      {promocao && (
        <span className="text-[13px] text-texto-suave">
          <span className="sr-only">Preço anterior: </span>
          De <s>R$ {emReais(produto.preco)}</s>
        </span>
      )}
      <div className="flex items-end gap-x-2">
        {promocao && (
          <span aria-hidden="true" className="pb-1.5 text-[13px] font-medium text-texto-suave">
            por
          </span>
        )}
        <span className={`etiqueta-preco ${classeEstado} ${grande ? "text-[32px]" : "text-[22px] sm:text-2xl"}`}>
          <span className={`font-texto font-semibold ${grande ? "text-base" : "text-xs"}`}>R$</span>
          {emReais(precoFinal(produto))}
        </span>
      </div>
    </div>
  );
}
