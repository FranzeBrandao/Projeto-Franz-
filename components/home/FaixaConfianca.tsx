import { Clock, Stethoscope, Truck } from "lucide-react";
import { empresa } from "@/content/empresa";
import { AVISO_ENTREGA, ENTREGA_GRATIS } from "@/content/loja";
import { asset } from "@/lib/asset";

/**
 * Faixa azul-noite com os três motivos para comprar na Bem Estar,
 * cada um com uma foto real da loja (DESIGN.md §5).
 */
export function FaixaConfianca() {
  const itens = [
    {
      icone: Truck,
      titulo: ENTREGA_GRATIS.curto,
      texto: `Peça pelo WhatsApp e receba em casa. ${AVISO_ENTREGA.curto}`,
      foto: "/images/entrega-balcao.webp",
      alt: "Atendente entregando um pedido no balcão da Farmácia Bem Estar",
    },
    {
      icone: Stethoscope,
      titulo: "Farmacêutica na loja",
      texto: "Orientação com a farmacêutica Kamila Balreira e equipe.",
      foto: "/images/kamila-atendimento.webp",
      alt: "Farmacêutica Kamila Balreira atendendo dentro da Farmácia Bem Estar",
    },
    {
      icone: Clock,
      titulo: "Aberto todos os dias até 22h",
      texto: empresa.horarioFuncionamento.map((h) => `${h.dias}: ${h.horario}`).join(" · "),
      foto: "/images/balcao-equipe.webp",
      alt: "Equipe da Farmácia Bem Estar atendendo no balcão",
    },
  ];

  return (
    <section aria-label="Por que comprar na Farmácia Bem Estar" className="textura-cruz my-8 bg-noite py-10 text-white md:my-12 md:py-14">
      <ul className="container-page grid gap-4 md:grid-cols-3 md:gap-6">
        {itens.map(({ icone: Icone, titulo, texto, foto, alt }, i) => (
          <li
            key={titulo}
            data-revelar
            style={{ ["--atraso" as string]: `${i * 90}ms` }}
            className="group flex items-center gap-4 rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10 transition duration-300 hover:bg-white/[0.1] md:flex-col md:items-stretch md:p-4"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl md:h-40 md:w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(foto)}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0">
              <Icone className="h-6 w-6 text-white/80" aria-hidden="true" />
              <h3 className="mt-1.5 text-[19px] font-bold leading-snug md:text-[21px]">{titulo}</h3>
              <p className="mt-1 text-[14px] leading-snug text-white/75">{texto}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
