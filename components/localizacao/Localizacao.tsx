import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { empresa } from "@/content/empresa";

export function Localizacao() {
  const mapsQuery = encodeURIComponent(empresa.endereco.completo);
  const comoChegarHref = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
  const mapaEmbedHref = `https://maps.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <section id="localizacao" className="border-b border-border bg-muted/40 py-16 md:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Localização</h2>

          <div className="mt-6 flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-foreground/80">{empresa.endereco.completo}</p>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <a href={`tel:${empresa.telefone.e164}`} className="text-foreground/80 hover:text-primary">
              {empresa.telefone.exibicao}
            </a>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <ul className="text-foreground/80">
              {empresa.horarioFuncionamento.map((item) => (
                <li key={item.dias}>
                  <span className="font-medium">{item.dias}:</span> {item.horario}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={comoChegarHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            <Navigation className="h-5 w-5" aria-hidden="true" />
            Como chegar
          </a>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <iframe
            title={`Mapa de localização da ${empresa.nome}`}
            src={mapaEmbedHref}
            className="h-full min-h-[320px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
