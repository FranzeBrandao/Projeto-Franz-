import { MapPin, MessageCircle } from "lucide-react";
import { empresa } from "@/content/empresa";

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

        <div
          className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-border bg-muted text-center"
          role="img"
          aria-label="Imagem demonstrativa — foto real da fachada da farmácia será inserida quando fornecida"
        >
          <span className="px-6 text-sm font-medium text-muted-foreground">
            [ IMAGEM DEMONSTRATIVA ]
            <br />
            Foto real da fachada/loja a ser inserida
          </span>
        </div>
      </div>
    </section>
  );
}
