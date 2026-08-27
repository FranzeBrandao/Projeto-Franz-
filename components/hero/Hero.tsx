import { Clock, MapPin, MessageCircle } from "lucide-react";
import { empresa } from "@/content/empresa";
import { heroImagem } from "@/content/institucional";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden border-b border-border">
      <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
            Farmácia em Sobral - CE
          </p>
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Saúde e bem-estar com quem cuida de você de perto
          </h1>
          <p className="mt-5 max-w-xl text-lg text-foreground/70">
            {/* Descrição curta institucional — será ajustada com o material real fornecido pelo cliente. */}
            A {empresa.nome} oferece atendimento farmacêutico próximo, produtos de
            qualidade e orientação de confiança para o seu dia a dia.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Falar no WhatsApp
            </a>
            <a
              href="#localizacao"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <MapPin className="h-5 w-5" aria-hidden="true" />
              Como chegar
            </a>
          </div>
        </div>

        {heroImagem ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={heroImagem.src}
            alt={heroImagem.alt}
            className="aspect-[4/3] w-full rounded-xl border border-border object-cover"
          />
        ) : (
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Estamos abertos para você
            </h2>

            <div className="mt-6 flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
              <ul className="text-foreground/80">
                {empresa.horarioFuncionamento.map((item) => (
                  <li key={item.dias}>
                    <span className="font-medium">{item.dias}</span>: {item.horario}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex items-start gap-3 border-t border-border pt-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
              <p className="text-foreground/80">{empresa.endereco.completo}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
