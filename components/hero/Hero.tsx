import { Clock, MapPin, Truck } from "lucide-react";
import { banners } from "@/content/banners";
import { empresa } from "@/content/empresa";
import { ENTREGA_GRATIS } from "@/content/loja";
import { linkPedidoGeral } from "@/content/pedidos";
import { asset } from "@/lib/asset";
import { whatsappHref } from "@/lib/contato";
import { HeroCarrossel } from "./HeroCarrossel";

/** Converte o "link" do banner no endereço real. */
function resolverLink(link: string): string {
  if (link === "whatsapp-pedidos") return linkPedidoGeral();
  if (link === "whatsapp-contato") return whatsappHref ?? "/#contato";
  return link;
}

/**
 * Topo da página inicial: carrossel + coluna lateral (só no computador)
 * com entrega grátis e horário.
 */
export function Hero() {
  return (
    <section id="inicio" aria-labelledby="titulo-pagina" className="pt-4 sm:pt-6">
      <h1 id="titulo-pagina" className="sr-only">
        {empresa.nome} — farmácia em Sobral - CE com pedidos pelo WhatsApp
      </h1>
      <div className="container-page grid gap-5 lg:grid-cols-[1fr_300px]">
        <HeroCarrossel banners={banners} hrefs={banners.map((b) => resolverLink(b.link))} />

        <div className="hidden grid-rows-2 gap-5 lg:grid">
          <a
            href={linkPedidoGeral()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex overflow-hidden rounded-2xl bg-noite p-5 text-white shadow-1 transition duration-300 ease-curva hover:-translate-y-1 hover:shadow-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/images/entrega-balcao.webp")}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-noite via-noite/70 to-noite/20" />
            <span className="relative mt-auto">
              <Truck className="h-7 w-7 text-white transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              <span className="mt-2 block font-display text-[22px] font-bold leading-tight">{ENTREGA_GRATIS.curto}</span>
              <span className="rotulo mt-2 block text-[13px] text-white/80">Pedir pelo WhatsApp →</span>
            </span>
          </a>

          <div className="flex flex-col rounded-2xl border border-linha bg-cartao p-5 shadow-1">
            <Clock className="h-7 w-7 text-azul" aria-hidden="true" />
            <p className="mt-2 font-display text-[22px] font-bold leading-tight text-texto">Aberto todos os dias</p>
            <ul className="mt-2 space-y-0.5 text-[14px] text-texto-suave">
              {empresa.horarioFuncionamento.map((h) => (
                <li key={h.dias}>
                  {h.dias}: <span className="font-semibold text-texto">{h.horario}</span>
                </li>
              ))}
            </ul>
            <a href="#localizacao" className="rotulo link-sublinhado mt-auto inline-flex items-center gap-1 self-start pt-3 text-[13px] text-azul">
              <MapPin className="h-4 w-4" aria-hidden="true" /> Como chegar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
