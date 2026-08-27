import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { empresa } from "@/content/empresa";
import { TituloSecao } from "@/components/ui/TituloSecao";

export function Localizacao() {
  const mapsQuery = encodeURIComponent(empresa.endereco.completo);
  const comoChegarHref = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
  const mapaEmbedHref = `https://maps.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <section id="localizacao" className="border-y border-border bg-muted/50 py-16 md:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div>
          <TituloSecao etiqueta="Gerardo Cristino, Sobral" titulo="Localização" />

          <dl className="mt-8 space-y-5">
            <div className="flex items-start gap-3.5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/45">
                  Endereço
                </dt>
                <dd className="mt-1 text-foreground/80">{empresa.endereco.completo}</dd>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/45">
                  Telefone
                </dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${empresa.telefone.e164}`}
                    className="text-foreground/80 underline-offset-4 hover:text-primary hover:underline"
                  >
                    {empresa.telefone.exibicao}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/45">
                  Horário
                </dt>
                <dd className="mt-1 text-foreground/80">
                  {empresa.horarioFuncionamento.map((item) => (
                    <span key={item.dias} className="block">
                      <span className="font-medium">{item.dias}:</span> {item.horario}
                    </span>
                  ))}
                </dd>
              </div>
            </div>
          </dl>

          <a
            href={comoChegarHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            <Navigation className="h-5 w-5" aria-hidden="true" />
            Como chegar
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-border">
          <iframe
            title={`Mapa de localização da ${empresa.nome}`}
            src={mapaEmbedHref}
            className="h-full min-h-[380px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
