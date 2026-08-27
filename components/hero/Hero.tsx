import { Clock, MapPin, MessageCircle } from "lucide-react";
import { empresa } from "@/content/empresa";
import { heroImagens } from "@/content/institucional";
import { asset } from "@/lib/asset";

const [imagemPrincipal, imagemSecundaria] = heroImagens;

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden border-b border-border">
      {/* Fundo suave para dar profundidade ao topo sem concorrer com as fotos. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
      />

      <div className="container-page relative grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
            Farmácia em Sobral - CE
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
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

        {imagemPrincipal ? (
          /* Composição com as duas fotos reais da farmácia: a fachada como
             imagem principal e a farmacêutica responsável em destaque
             sobreposto, no formato de um cartão com legenda.
             <img> em vez de next/image: o site é exportado como estático
             (images.unoptimized). */
          <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0 lg:max-w-[520px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(imagemPrincipal.src)}
              alt={imagemPrincipal.alt}
              className="aspect-[4/5] w-full rounded-2xl border border-border object-cover object-top shadow-xl"
            />

            {imagemSecundaria && (
              <figure className="absolute bottom-5 left-0 w-32 overflow-hidden rounded-2xl bg-background shadow-2xl ring-1 ring-border sm:w-40 lg:-left-10 lg:w-44">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(imagemSecundaria.src)}
                  alt={imagemSecundaria.alt}
                  className="aspect-[3/4] w-full object-cover object-[50%_28%]"
                />
                {imagemSecundaria.legenda && (
                  <figcaption className="px-3 py-2.5">
                    <span className="block text-xs font-semibold text-foreground">
                      {imagemSecundaria.legenda.titulo}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-foreground/60">
                      {imagemSecundaria.legenda.papel}
                    </span>
                  </figcaption>
                )}
              </figure>
            )}
          </div>
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
