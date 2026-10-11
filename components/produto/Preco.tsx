import {
  disponivel,
  emReais,
  levePague,
  precoFinal,
  precoNoLeve,
  temPromocao,
  type Produto,
} from "@/lib/produtos";

/**
 * Preço na etiqueta de gôndola, no estilo das grandes redes:
 * - normal:       etiqueta azul
 * - De / Por:     "De R$ x" azul e riscado em cima; "Por" + etiqueta vermelha
 * - Leve / Pague: "Levando 3, pague" + etiqueta vermelha com o preço de cada
 *                 um + "R$ x 1 unid." em cinza
 * Indisponível: tudo apagado.
 */
export function Preco({ produto, grande = false }: { produto: Produto; grande?: boolean }) {
  const ativo = disponivel(produto);
  const promocao = temPromocao(produto);
  const lp = levePague(produto);
  const classeEstado = !ativo ? "apagada" : promocao || lp ? "promocao" : "";
  const corPromo = ativo ? "text-vermelho" : "text-indisponivel";
  const tamanhoEtiqueta = grande ? "text-[32px]" : "text-[22px] sm:text-2xl";
  const tamanhoRotulo = grande ? "text-base" : "text-[13px]";

  const etiqueta = (valor: number) => (
    <span className={`etiqueta-preco ${classeEstado} ${tamanhoEtiqueta}`}>
      <span className={`font-texto font-semibold ${grande ? "text-base" : "text-xs"}`}>R$</span>
      {emReais(valor)}
    </span>
  );

  if (lp) {
    return (
      <div className="flex flex-col items-start gap-y-1">
        <span className={`${tamanhoRotulo} font-semibold ${corPromo}`}>Levando {lp.leve}, pague</span>
        <div className="flex items-end gap-x-2">
          <span className="sr-only">Na promoção Leve {lp.leve} Pague {lp.pague}: </span>
          {etiqueta(precoNoLeve(produto) as number)}
          <span className={`pb-1.5 ${tamanhoRotulo} font-semibold ${corPromo}`}>cada</span>
        </div>
        <span className={`${grande ? "text-[15px]" : "text-[12px]"} text-texto-suave numeros-tabulares`}>
          <span className="sr-only">Uma unidade: </span>
          {promocao && <s className="mr-1">R$ {emReais(produto.preco)}</s>}R$ {emReais(precoFinal(produto))} 1 unid.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-y-1">
      {promocao && (
        <span className={`${tamanhoRotulo} font-semibold ${ativo ? "text-azul" : "text-indisponivel"}`}>
          <span className="sr-only">Preço anterior: </span>
          De <s className="decoration-[1.5px]">R$ {emReais(produto.preco)}</s>
        </span>
      )}
      <div className="flex items-end gap-x-2">
        {promocao && (
          <span aria-hidden="true" className={`pb-1.5 ${tamanhoRotulo} font-semibold ${corPromo}`}>
            Por
          </span>
        )}
        {promocao && <span className="sr-only">Preço com desconto: </span>}
        {etiqueta(precoFinal(produto))}
      </div>
    </div>
  );
}
