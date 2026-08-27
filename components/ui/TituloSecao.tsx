/**
 * Cabeçalho padrão das seções: uma etiqueta curta, o título e uma linha
 * de apoio. Mantém o mesmo ritmo de tipografia na página inteira, no
 * fundo claro e no escuro.
 */
export function TituloSecao({
  etiqueta,
  titulo,
  descricao,
  escuro = false,
}: {
  etiqueta: string;
  titulo: string;
  descricao?: string;
  escuro?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p
        className={`flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${
          escuro ? "text-ink-muted" : "text-primary"
        }`}
      >
        <span
          aria-hidden="true"
          className={`h-px w-7 ${escuro ? "bg-white/25" : "bg-primary/40"}`}
        />
        {etiqueta}
      </p>
      <h2
        className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${
          escuro ? "text-ink-foreground" : "text-foreground"
        }`}
      >
        {titulo}
      </h2>
      {descricao && (
        <p className={`mt-4 text-lg ${escuro ? "text-ink-muted" : "text-foreground/70"}`}>
          {descricao}
        </p>
      )}
    </div>
  );
}
