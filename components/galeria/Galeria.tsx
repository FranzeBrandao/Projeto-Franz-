const SLOTS = [
  "Fachada",
  "Interior da farmácia",
  "Equipe",
  "Atendimento",
  "Produtos",
  "Estrutura",
];

export function Galeria() {
  return (
    <section id="galeria" className="border-b border-border py-16 md:py-24">
      <div className="container-page">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Nossa farmácia em fotos</h2>
        <p className="mt-4 max-w-2xl text-lg text-foreground/70">
          Fotos reais da Farmácia Bem Estar serão adicionadas aqui. Nenhuma imagem de
          banco de imagens é apresentada como se fosse da loja.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {SLOTS.map((slot) => (
            <div
              key={slot}
              role="img"
              aria-label={`Imagem demonstrativa — foto real de "${slot}" a ser inserida`}
              className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-muted p-4 text-center"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Imagem demonstrativa
              </span>
              <span className="text-sm font-medium text-foreground/70">{slot}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
