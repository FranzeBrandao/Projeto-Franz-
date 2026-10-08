"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Clock,
  Facebook,
  Instagram,
  Menu,
  MessageCircle,
  Search,
  Truck,
  X,
} from "lucide-react";
import { empresa } from "@/content/empresa";
import { ENTREGA_GRATIS } from "@/content/loja";
import { linkPedidoGeral, WHATSAPP_PEDIDOS_EXIBICAO } from "@/content/pedidos";
import { useProdutos } from "@/components/dados/ProdutosProvider";
import { emReais, hrefProduto, percentualDesconto, precoFinal, produtosDaCategoria } from "@/lib/produtos";
import { asset } from "@/lib/asset";
import { whatsappHref } from "@/lib/contato";
import { IconeCategoria } from "@/components/produto/IconeCategoria";

export interface CategoriaMenu {
  slug: string;
  nome: string;
}

const hrefCategoria = (slug: string, sub?: string) =>
  `/categoria/${slug}/${sub ? `?sub=${encodeURIComponent(sub)}` : ""}`;

/** Avisos da faixa do topo (DESIGN.md §4.3). */
const AVISOS = [
  { icone: Truck, texto: ENTREGA_GRATIS.curto },
  { icone: Clock, texto: "Aberto todos os dias até 22h" },
  { icone: MessageCircle, texto: `Pedidos pelo WhatsApp ${WHATSAPP_PEDIDOS_EXIBICAO}` },
];

export function HeaderCliente({ menu }: { menu: CategoriaMenu[] }) {
  const caminho = usePathname();
  const [compacto, setCompacto] = useState(false);
  const [gavetaAberta, setGavetaAberta] = useState(false);
  const [megaAberto, setMegaAberto] = useState<string | null>(null);
  const timerMega = useRef<number | undefined>(undefined);
  const gaveta = useRef<HTMLDivElement>(null);
  const botaoGaveta = useRef<HTMLButtonElement>(null);

  // Header encolhe ao rolar (verificado a cada frame, no máximo)
  useEffect(() => {
    let agendado = false;
    function verificar() {
      agendado = false;
      // Encolhe depois de 120px e só volta ao normal abaixo de 40px. A folga
      // (80px) precisa ser maior que o quanto o topo encolhe (até 48px): ao
      // encolher, a página sobe e a rolagem diminui; com um limite só, o topo
      // ficava abrindo e fechando sem parar ("tremendo").
      setCompacto((atual) => (atual ? window.scrollY > 40 : window.scrollY > 120));
    }
    function aoRolar() {
      if (!agendado) {
        agendado = true;
        requestAnimationFrame(verificar);
      }
    }
    verificar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Menu lateral: trava a rolagem da página, prende o foco e fecha com Esc
  useEffect(() => {
    if (!gavetaAberta) return;
    const painel = gaveta.current;
    const focaveis = () =>
      Array.from(painel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focaveis()[0]?.focus();
    document.body.style.overflow = "hidden";

    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setGavetaAberta(false);
        botaoGaveta.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const lista = focaveis();
      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo?.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro?.focus();
      }
    }
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [gavetaAberta]);

  // Mega menu: abre com 150ms de atraso para não abrir ao passar o mouse sem querer
  function agendarMega(slug: string | null, atraso = 150) {
    window.clearTimeout(timerMega.current);
    timerMega.current = window.setTimeout(() => setMegaAberto(slug), atraso);
  }

  const categoriaAberta = menu.find((c) => c.slug === megaAberto);

  // "Em destaque" do menu: os 2 produtos com maior desconto da categoria
  // (ou os primeiros, se não houver promoção). Vêm do catálogo, no navegador.
  const { visiveis } = useProdutos();
  const destaquesAbertos = categoriaAberta
    ? [...produtosDaCategoria(visiveis, categoriaAberta.slug)]
        .sort((a, b) => percentualDesconto(b) - percentualDesconto(a))
        .slice(0, 2)
        .map((p) => ({ nome: p.nome, marca: p.marca, preco: emReais(precoFinal(p)), href: hrefProduto(p) }))
    : [];

  return (
    <>
      <header className={`sticky top-0 z-40 bg-cartao transition-shadow duration-200 ${compacto ? "shadow-2" : ""}`}>
        {/* Faixa do topo — some quando o header encolhe */}
        <div
          className={`grid bg-noite text-white transition-[grid-template-rows] duration-200 ease-curva ${
            compacto ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
          }`}
        >
          <div className="overflow-hidden">
            {/* Celular: os avisos rolam como um letreiro */}
            <div className="flex h-8 items-center overflow-hidden md:hidden" aria-hidden="true">
              <div className="animar-letreiro flex shrink-0 gap-10 whitespace-nowrap pr-10">
                {[...AVISOS, ...AVISOS].map(({ icone: Icone, texto }, i) => (
                  <span key={i} className="rotulo inline-flex items-center gap-1.5 text-[12px]">
                    <Icone className="h-3.5 w-3.5 text-white/70" />
                    {texto}
                  </span>
                ))}
              </div>
            </div>
            <ul className="sr-only md:not-sr-only container-page md:flex md:h-8 md:items-center md:justify-center md:gap-8">
              {AVISOS.map(({ icone: Icone, texto }) => (
                <li key={texto} className="rotulo inline-flex items-center gap-1.5 text-[13px]">
                  <Icone className="h-3.5 w-3.5 text-white/70" aria-hidden="true" />
                  {texto}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barra principal */}
        <div className="container-page">
          <div
            className={`flex items-center gap-3 transition-[padding] duration-200 sm:gap-5 ${
              compacto ? "py-2" : "py-3 lg:py-4"
            }`}
          >
            <button
              ref={botaoGaveta}
              type="button"
              onClick={() => setGavetaAberta(true)}
              aria-label="Abrir menu de categorias"
              aria-expanded={gavetaAberta}
              aria-controls="menu-lateral"
              className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-azul transition hover:bg-gelo active:scale-95 lg:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            <Link href="/" className="shrink-0 rounded-md" aria-label={`${empresa.nome} — página inicial`}>
              {/* Logo oficial (public/logo-oficial.webp). <img> comum: site estático. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/logo-oficial.webp")}
                alt={empresa.nome}
                width={812}
                height={250}
                className={`w-auto transition-[height] duration-200 ease-curva ${
                  compacto ? "h-[30px] sm:h-[34px]" : "h-[34px] sm:h-11"
                }`}
              />
            </Link>

            <form action="/busca/" role="search" className="hidden flex-1 md:block">
              <BuscaCampo />
            </form>

            <div className="ml-auto flex items-center gap-2">
              <a
                href={linkPedidoGeral()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp min-h-11 px-3 text-[14px] sm:px-4"
              >
                <MessageCircle className="icone-toque h-5 w-5" aria-hidden="true" />
                <span className="hidden sm:inline">Fazer pedido</span>
                <span className="sr-only sm:hidden">Fazer pedido pelo WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Busca em linha própria no celular */}
          <form action="/busca/" role="search" className="pb-3 md:hidden">
            <BuscaCampo />
          </form>
        </div>

        {/* Menu de categorias + mega menu (computador) */}
        <nav
          aria-label="Categorias"
          className="relative hidden border-t border-linha lg:block"
          onMouseLeave={() => agendarMega(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setMegaAberto(null);
          }}
          onKeyDown={(e) => e.key === "Escape" && setMegaAberto(null)}
        >
          <ul className="container-page flex items-center justify-between">
            {menu.map((c) => {
              const ativo = caminho?.startsWith(`/categoria/${c.slug}`);
              return (
                <li key={c.slug} onMouseEnter={() => agendarMega(c.slug)} onFocus={() => agendarMega(c.slug, 0)}>
                  <a
                    href={hrefCategoria(c.slug)}
                    aria-expanded={megaAberto === c.slug}
                    aria-current={ativo ? "page" : undefined}
                    className={`group relative block py-3 text-[15px] font-rotulo font-semibold uppercase tracking-[.04em] transition-colors hover:text-azul ${
                      ativo || megaAberto === c.slug ? "text-azul" : "text-texto"
                    }`}
                  >
                    {c.nome}
                    {/* Sublinhado vermelho que cresce do centro */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-[3px] origin-center rounded-full bg-vermelho transition-transform duration-200 ease-curva ${
                        ativo || megaAberto === c.slug ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {categoriaAberta && (
            <div
              key={categoriaAberta.slug}
              onMouseEnter={() => window.clearTimeout(timerMega.current)}
              className="mega-menu absolute inset-x-0 top-full border-t border-linha bg-cartao shadow-3"
            >
              <div className="container-page grid grid-cols-[1fr_1.3fr_1fr] gap-10 py-8">
                <div>
                  <p className="rotulo flex items-center gap-2 text-[13px] text-vermelho">
                    <IconeCategoria slug={categoriaAberta.slug} className="h-4 w-4" />
                    {categoriaAberta.nome}
                  </p>
                  <a
                    href={hrefCategoria(categoriaAberta.slug)}
                    className="rotulo mt-4 inline-flex items-center gap-1 text-[14px] text-azul hover:underline"
                  >
                    Ver tudo em {categoriaAberta.nome}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>

                <div>
                  <p className="rotulo text-[13px] text-texto-suave">Em destaque</p>
                  {destaquesAbertos.length === 0 && (
                    <p className="mt-3 text-[14px] text-texto-suave">Novidades em breve nesta categoria.</p>
                  )}
                  <ul className="mt-3 space-y-3">
                    {destaquesAbertos.map((p) => (
                      <li key={p.href}>
                        <a
                          href={p.href}
                          className="flex items-center gap-4 rounded-xl border border-linha p-3 transition hover:-translate-y-0.5 hover:border-azul/40 hover:shadow-2"
                        >
                          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gelo text-azul">
                            <IconeCategoria slug={categoriaAberta.slug} className="h-6 w-6" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[15px] font-medium text-texto">{p.nome}</span>
                            <span className="block text-[13px] text-texto-suave">{p.marca}</span>
                          </span>
                          <span className="font-display text-lg font-bold text-azul">R$ {p.preco}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={whatsappHref ?? "/#contato"}
                  target={whatsappHref ? "_blank" : undefined}
                  rel={whatsappHref ? "noopener noreferrer" : undefined}
                  className="group/card relative flex min-h-[200px] overflow-hidden rounded-2xl bg-noite text-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset("/images/kamila-proprietaria-720.webp")}
                    alt=""
                    loading="lazy"
                    className="absolute inset-y-0 right-0 h-full w-1/2 object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-r from-noite via-noite/90 to-transparent" />
                  <span className="relative flex max-w-[62%] flex-col justify-end p-5">
                    <span className="font-display text-xl font-bold leading-tight">
                      Dúvida sobre um produto?
                    </span>
                    <span className="mt-1 text-[14px] text-white/80">Fale com a nossa farmacêutica.</span>
                    <span className="rotulo mt-3 inline-flex items-center gap-1 text-[13px] text-white">
                      Chamar no WhatsApp <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Menu lateral (celular) */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${gavetaAberta ? "" : "pointer-events-none"}`}
        aria-hidden={!gavetaAberta}
      >
        <div
          onClick={() => setGavetaAberta(false)}
          className={`absolute inset-0 bg-noite/50 transition-opacity duration-300 ${
            gavetaAberta ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          id="menu-lateral"
          ref={gaveta}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de categorias"
          inert={!gavetaAberta}
          className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-cartao shadow-4 transition-transform duration-300 ease-curva ${
            gavetaAberta ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between bg-azul-logo px-4 py-3 textura-cruz">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/logo-oficial.webp")} alt={empresa.nome} width={812} height={250} className="h-9 w-auto" />
            <button
              type="button"
              onClick={() => {
                setGavetaAberta(false);
                botaoGaveta.current?.focus();
              }}
              aria-label="Fechar menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-white transition hover:bg-white/10 active:scale-95"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Categorias" className="flex-1 overflow-y-auto px-2 py-3">
            <p className="rotulo px-3 pb-2 text-[13px] text-vermelho">Categorias</p>
            <ul>
              {menu.map((c) => (
                <li key={c.slug}>
                  <a
                    href={hrefCategoria(c.slug)}
                    className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-[16px] font-medium text-texto transition hover:bg-gelo active:scale-[.98]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gelo text-azul">
                      <IconeCategoria slug={c.slug} className="h-[18px] w-[18px]" />
                    </span>
                    {c.nome}
                    <ChevronRight className="ml-auto h-4 w-4 text-texto-suave" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="rotulo mt-4 border-t border-linha px-3 pb-2 pt-4 text-[13px] text-vermelho">A farmácia</p>
            <ul>
              {[
                { href: "/#servicos", texto: "Serviços" },
                { href: "/#sobre", texto: "Quem somos" },
                { href: "/#localizacao", texto: "Como chegar" },
                { href: "/#contato", texto: "Fale com a gente" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setGavetaAberta(false)}
                    className="flex min-h-12 items-center rounded-xl px-3 text-[16px] text-texto transition hover:bg-gelo"
                  >
                    {l.texto}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 border-t border-linha px-5 py-4">
            <a
              href={empresa.redesSociais.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Farmácia Bem Estar"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gelo text-azul transition hover:bg-azul hover:text-white"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={empresa.redesSociais.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da Farmácia Bem Estar"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gelo text-azul transition hover:bg-azul hover:text-white"
            >
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href={`tel:${empresa.telefone.e164}`} className="ml-auto text-[14px] font-semibold text-azul">
              {empresa.telefone.exibicao}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/** Campo de busca (pílula larga) — envia para /busca/?q=… */
function BuscaCampo() {
  return (
    <label className="group flex h-12 items-center gap-3 rounded-full bg-gelo px-4 ring-azul/40 transition focus-within:bg-cartao focus-within:ring-2">
      <Search className="h-5 w-5 shrink-0 text-azul transition-transform group-focus-within:scale-110" aria-hidden="true" />
      <span className="sr-only">Buscar produtos</span>
      <input
        type="search"
        name="q"
        placeholder="O que você procura hoje?"
        autoComplete="off"
        className="h-full w-full bg-transparent text-[16px] text-texto placeholder:text-texto-suave focus:outline-none"
      />
    </label>
  );
}
