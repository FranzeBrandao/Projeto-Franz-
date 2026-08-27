import { historia } from "@/content/institucional";
import { TituloSecao } from "@/components/ui/TituloSecao";

export function Historia() {
  // Sem história confirmada, a seção não é publicada.
  if (!historia.texto && historia.marcos.length === 0) return null;

  return (
    <section id="historia" className="py-14 md:py-20">
      {/* Título à esquerda e marcos à direita: com poucos marcos a seção
          continua cheia, em vez de deixar meia página vazia. */}
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-4">
          <TituloSecao
            etiqueta="Linha do tempo"
            titulo="Nossa história"
            descricao={historia.texto || undefined}
          />
        </div>

        {historia.marcos.length > 0 && (
          <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {historia.marcos.map((marco) => (
              <li
                key={`${marco.ano}-${marco.texto}`}
                className="rounded-2xl bg-card p-7 shadow-sm ring-1 ring-border"
              >
                <span className="font-heading text-4xl font-bold tracking-tight text-primary">
                  {marco.ano}
                </span>
                <p className="mt-3 leading-relaxed text-foreground/70">{marco.texto}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
