/**
 * Cabeçalho das seções: rótulo condensado, título em slab e um traço
 * vermelho que cresce quando a seção entra na tela (DESIGN.md §7).
 */
export function TituloSecao({
  etiqueta,
  titulo,
  descricao,
  escuro = false,
  id,
}: {
  etiqueta?: string;
  titulo: string;
  descricao?: string;
  escuro?: boolean;
  id?: string;
}) {
  return (
    <div className="max-w-2xl" data-revelar>
      {etiqueta && (
        <p className={`rotulo text-[13px] ${escuro ? "text-white/70" : "text-vermelho"}`}>{etiqueta}</p>
      )}
      <h2
        id={id}
        className={`mt-1 text-[26px] font-bold leading-tight sm:text-4xl ${escuro ? "text-white" : "text-texto"}`}
      >
        {titulo}
      </h2>
      <span aria-hidden="true" className="titulo-traco mt-3 block h-1 w-12 rounded-full bg-vermelho" />
      {descricao && (
        <p className={`mt-4 text-[17px] leading-relaxed ${escuro ? "text-white/75" : "text-texto-suave"}`}>
          {descricao}
        </p>
      )}
    </div>
  );
}
