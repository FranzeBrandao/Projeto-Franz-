const MARCOS_PLACEHOLDER = [
  { ano: "[ANO]", texto: "[ MARCO HISTÓRICO A CONFIRMAR ]" },
  { ano: "[ANO]", texto: "[ MARCO HISTÓRICO A CONFIRMAR ]" },
  { ano: "[ANO]", texto: "[ MARCO HISTÓRICO A CONFIRMAR ]" },
];

export function Historia() {
  return (
    <section id="historia" className="border-b border-border bg-muted/40 py-16 md:py-24">
      <div className="container-page">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Nossa história</h2>
        <p className="mt-4 max-w-2xl text-lg text-foreground/70">
          [ A história real da Farmácia Bem Estar — fundação, marcos e crescimento —
          será inserida aqui assim que o cliente fornecer as informações. Nenhum
          acontecimento é inventado. ]
        </p>

        <ol className="mt-12 flex snap-x gap-8 overflow-x-auto pb-4">
          {MARCOS_PLACEHOLDER.map((marco, index) => (
            <li
              key={index}
              className="flex min-w-[240px] snap-start flex-col gap-3 rounded-xl border border-dashed border-border bg-card p-6"
            >
              <span className="font-heading text-2xl font-bold text-primary">{marco.ano}</span>
              <span className="text-sm text-foreground/70">{marco.texto}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
