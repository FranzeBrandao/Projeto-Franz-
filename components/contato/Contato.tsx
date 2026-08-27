import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { empresa } from "@/content/empresa";
import { TituloSecao } from "@/components/ui/TituloSecao";
import { whatsappHref } from "@/lib/contato";

export function Contato() {
  const canais = [
    {
      icon: MessageCircle,
      titulo: "Falar no WhatsApp",
      valor: empresa.whatsapp.exibicao,
      href: whatsappHref ?? "#contato",
      externo: Boolean(whatsappHref),
      destaque: true,
    },
    {
      icon: Phone,
      titulo: "Ligar agora",
      valor: empresa.telefone.exibicao,
      href: `tel:${empresa.telefone.e164}`,
      externo: false,
      destaque: false,
    },
    // O cartão de e-mail só aparece quando houver endereço confirmado.
    ...(empresa.email
      ? [
          {
            icon: Mail,
            titulo: "Enviar e-mail",
            valor: empresa.email,
            href: `mailto:${empresa.email}`,
            externo: false,
            destaque: false,
          },
        ]
      : []),
    {
      icon: MapPin,
      titulo: "Como chegar",
      valor: `${empresa.endereco.cidade} - ${empresa.endereco.uf}`,
      href: "#localizacao",
      externo: false,
      destaque: false,
    },
  ];

  return (
    <section
      id="contato"
      className="textura-cruz border-t border-ink-line bg-ink py-16 md:py-24"
    >
      <div className="container-page">
        <TituloSecao
          etiqueta="Estamos por aqui"
          titulo="Fale com a gente"
          descricao="Tire dúvidas, peça orientação sobre produtos ou combine sua entrega."
          escuro
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {canais.map(({ icon: Icon, titulo, valor, href, externo, destaque }) => (
            <a
              key={titulo}
              href={href}
              target={externo ? "_blank" : undefined}
              rel={externo ? "noopener noreferrer" : undefined}
              className={
                destaque
                  ? "group rounded-2xl bg-primary p-6 transition-colors hover:bg-primary-hover"
                  : "group rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10 transition-colors hover:bg-white/[0.11]"
              }
            >
              <Icon
                className={`h-6 w-6 ${destaque ? "text-primary-foreground" : "text-white/55"}`}
                aria-hidden="true"
              />
              <span
                className={`mt-5 block font-heading font-semibold ${
                  destaque ? "text-primary-foreground" : "text-ink-foreground"
                }`}
              >
                {titulo}
              </span>
              <span
                className={`mt-1 block break-words text-[13px] ${
                  destaque ? "text-primary-foreground/80" : "text-ink-muted"
                }`}
              >
                {valor}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
