import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/contato";

export function WhatsappFloat() {
  const hasWhatsapp = whatsappHref !== null;

  return (
    <a
      href={whatsappHref ?? "#contato"}
      aria-label="Falar no WhatsApp com a Farmácia Bem Estar"
      title={
        hasWhatsapp
          ? "Falar no WhatsApp"
          : "WhatsApp ainda não confirmado — ir para a seção de contato"
      }
      target={hasWhatsapp ? "_blank" : undefined}
      rel={hasWhatsapp ? "noopener noreferrer" : undefined}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:scale-105"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
