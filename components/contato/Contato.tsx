import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { empresa } from "@/content/empresa";

export function Contato() {
  const whatsappHref = empresa.whatsapp.e164
    ? `https://wa.me/${empresa.whatsapp.e164.replace("+", "")}`
    : undefined;

  return (
    <section id="contato" className="py-16 md:py-24">
      <div className="container-page">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Fale com a gente</h2>
        <p className="mt-4 max-w-2xl text-lg text-foreground/70">
          Estamos à disposição para tirar dúvidas, orientar sobre produtos e agendar
          atendimento.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={whatsappHref ?? "#contato"}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary"
          >
            <MessageCircle className="h-7 w-7 text-secondary" aria-hidden="true" />
            <span className="font-semibold text-foreground">Falar no WhatsApp</span>
            <span className="text-sm text-foreground/60">{empresa.whatsapp.exibicao}</span>
          </a>

          <a
            href={`tel:${empresa.telefone.e164}`}
            className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary"
          >
            <Phone className="h-7 w-7 text-secondary" aria-hidden="true" />
            <span className="font-semibold text-foreground">Ligar agora</span>
            <span className="text-sm text-foreground/60">{empresa.telefone.exibicao}</span>
          </a>

          {/* O cartão de e-mail só aparece quando houver endereço confirmado. */}
          {empresa.email && (
            <a
              href={`mailto:${empresa.email}`}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary"
            >
              <Mail className="h-7 w-7 text-secondary" aria-hidden="true" />
              <span className="font-semibold text-foreground">Enviar e-mail</span>
              <span className="text-sm text-foreground/60">{empresa.email}</span>
            </a>
          )}

          <a
            href="#localizacao"
            className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary"
          >
            <MapPin className="h-7 w-7 text-secondary" aria-hidden="true" />
            <span className="font-semibold text-foreground">Como chegar</span>
            <span className="text-sm text-foreground/60">{empresa.endereco.cidade} - {empresa.endereco.uf}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
