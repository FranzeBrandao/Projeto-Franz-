/**
 * Nenhum serviço é exibido até ser confirmado pelo cliente — ver PROMPT MESTRE §5 "Serviços".
 * Esta lista representa apenas placeholders estruturais, não uma oferta real.
 */
const SERVICOS_PLACEHOLDER = [
  "[ SERVIÇO A CONFIRMAR ]",
  "[ SERVIÇO A CONFIRMAR ]",
  "[ SERVIÇO A CONFIRMAR ]",
  "[ SERVIÇO A CONFIRMAR ]",
];

export function Servicos() {
  return (
    <section id="servicos" className="border-b border-border py-16 md:py-24">
      <div className="container-page">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Serviços</h2>
        <p className="mt-4 max-w-2xl text-lg text-foreground/70">
          [ Apenas os serviços confirmados pelo cliente serão publicados aqui. ]
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICOS_PLACEHOLDER.map((servico, index) => (
            <div
              key={index}
              className="rounded-xl border border-dashed border-border bg-card p-6 text-center text-sm font-medium text-foreground/60"
            >
              {servico}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
