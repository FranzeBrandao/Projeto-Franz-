import { historia } from "@/content/institucional";

export function Historia() {
  // Sem história confirmada, a seção não é publicada.
  if (!historia.texto && historia.marcos.length === 0) return null;

  return (
    <section id="historia" className="border-b border-border bg-muted/40 py-16 md:py-24">
      <div className="container-page">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Nossa história</h2>

        {historia.texto && (
          <p className="mt-4 max-w-2xl text-lg text-foreground/70">{historia.texto}</p>
        )}

        {historia.marcos.length > 0 && (
          <ol className="mt-12 flex snap-x gap-8 overflow-x-auto pb-4">
            {historia.marcos.map((marco) => (
              <li
                key={`${marco.ano}-${marco.texto}`}
                className="flex min-w-[240px] snap-start flex-col gap-3 rounded-xl border border-border bg-card p-6"
              >
                <span className="font-heading text-2xl font-bold text-primary">
                  {marco.ano}
                </span>
                <span className="text-sm text-foreground/70">{marco.texto}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
