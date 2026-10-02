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
          <p className="mt-6 whitespace-pre-line text-[17px] leading-relaxed text-texto-suave" data-revelar>
            {sobre.texto}
          </p>
        </div>

        {sobre.pilares.length > 0 && (
          <div className="flex flex-col gap-4 lg:col-span-5 lg:pt-14">
            {sobre.pilares.map(({ titulo, texto }) => (
              <div
                key={titulo}
                data-revelar
                className="flex gap-4 rounded-2xl bg-cartao p-6 shadow-sm ring-1 ring-linha"
              >
                {/* Cruz da logo em vermelho, no lugar de uma faixa lateral */}
                <svg viewBox="0 0 56 56" aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-vermelho">
                  <path d="M21 4h14v17h17v14H35v17H21V35H4V21h17z" fill="currentColor" />
                </svg>
                <div>
                  <h3 className="font-display text-lg font-semibold text-texto">
                    {titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-texto-suave">{texto}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
