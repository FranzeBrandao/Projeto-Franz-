import { sobre } from "@/content/institucional";
import { TituloSecao } from "@/components/ui/TituloSecao";

export function Sobre() {
  // Sem texto institucional confirmado, a seção não é publicada.
  if (!sobre.texto) return null;

  return (
    <section id="sobre" className="py-16 md:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <TituloSecao etiqueta="Farmácia de bairro desde 2019" titulo="Quem somos" />
          <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-foreground/70">
            {sobre.texto}
          </p>
        </div>

        {sobre.pilares.length > 0 && (
          <div className="flex flex-col gap-4 lg:col-span-5 lg:pt-14">
            {sobre.pilares.map(({ titulo, texto }) => (
              <div
                key={titulo}
                className="flex gap-5 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-9 w-1 shrink-0 rounded-full bg-primary"
                />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{texto}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
