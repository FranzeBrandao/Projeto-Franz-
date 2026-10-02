"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { Banner } from "@/content/banners";
import { asset } from "@/lib/asset";

const INTERVALO = 6000;

/**
 * Banner principal em carrossel (DESIGN.md §4.5).
 *
 * - Troca com crossfade de 600ms; a foto do slide ativo faz um zoom lento.
 * - Troca sozinho a cada 6s; pausa com o mouse em cima, com o foco do
 *   teclado dentro, quando a aba fica escondida e para quem pediu menos
 *   movimento no sistema. Tem botão de pausar.
 * - No celular dá para arrastar com o dedo.
 * - Os links já chegam resolvidos do servidor (`hrefs`).
 */
export function HeroCarrossel({ banners, hrefs }: { banners: Banner[]; hrefs: string[] }) {
  const [ativo, setAtivo] = useState(0);
  const [pausadoUsuario, setPausadoUsuario] = useState(false);
  const [pausadoInteracao, setPausadoInteracao] = useState(false);
  // Lido direto do sistema na primeira renderização no navegador
  const [movimentoReduzido, setMovimentoReduzido] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const inicioToque = useRef<number | null>(null);
  const total = banners.length;

  const ir = useCallback((i: number) => setAtivo((i + total) % total), [total]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aoMudar = () => setMovimentoReduzido(mq.matches);
    mq.addEventListener("change", aoMudar);
    return () => mq.removeEventListener("change", aoMudar);
  }, []);

  // Pausa quando a aba não está visível
  useEffect(() => {
    const aoMudar = () => setPausadoInteracao(document.hidden);
    document.addEventListener("visibilitychange", aoMudar);
    return () => document.removeEventListener("visibilitychange", aoMudar);
  }, []);

  const girando = !pausadoUsuario && !pausadoInteracao && !movimentoReduzido;

  useEffect(() => {
    if (!girando) return;
    const t = window.setTimeout(() => ir(ativo + 1), INTERVALO);
    return () => window.clearTimeout(t);
  }, [ativo, girando, ir]);

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Destaques da Farmácia Bem Estar"
      className="relative overflow-hidden rounded-2xl bg-azul-logo text-white shadow-3"
      onMouseEnter={() => setPausadoInteracao(true)}
      onMouseLeave={() => setPausadoInteracao(false)}
      onFocusCapture={() => setPausadoInteracao(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPausadoInteracao(false);
      }}
      onTouchStart={(e) => (inicioToque.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (inicioToque.current === null) return;
        const delta = e.changedTouches[0].clientX - inicioToque.current;
        if (Math.abs(delta) > 40) ir(ativo + (delta < 0 ? 1 : -1));
        inicioToque.current = null;
      }}
    >
      {/* Todos os slides ocupam a mesma célula da grade: a altura do banner
          é a do slide mais alto e a troca é só de opacidade. */}
      <div className="grid">
        {banners.map((b, i) => {
          const eAtivo = i === ativo;
          const externo = hrefs[i].startsWith("http");
          return (
            <div
              key={b.titulo}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${total}`}
              aria-hidden={!eAtivo}
              inert={!eAtivo}
              className={`textura-cruz grid transition-opacity duration-[600ms] ease-out [grid-area:1/1] md:grid-cols-[1.15fr_.85fr] ${
                eAtivo ? "z-[1] opacity-100" : "opacity-0"
              }`}
            >
              {/* Foto: em cima no celular, à direita no computador */}
              <div className="relative aspect-[16/10] overflow-hidden md:order-2 md:aspect-auto md:min-h-[380px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(b.imagem.srcMenor ?? b.imagem.src)}
                  srcSet={
                    b.imagem.srcMenor
                      ? `${asset(b.imagem.srcMenor)} 720w, ${asset(b.imagem.src)} 1400w`
                      : undefined
                  }
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 45vw, 100vw"
                  alt={b.imagem.alt}
                  width={720}
                  height={900}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                  style={{ objectPosition: b.imagem.posicao ?? "50% 50%" }}
                  className={`absolute inset-0 h-full w-full object-cover ${eAtivo ? "animar-ken-burns" : ""}`}
                />
                {/* Funde a foto no azul do painel de texto */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-azul-logo/70 via-transparent to-transparent md:bg-gradient-to-r md:from-azul-logo md:via-azul-logo/10"
                />
              </div>

              <div className="relative flex flex-col justify-center px-5 pb-16 pt-5 sm:px-8 md:py-12 md:pl-10 md:pr-4 lg:pl-12">
                <p className="rotulo text-[13px] text-white/80">{b.rotulo}</p>
                {/* key muda a cada exibição: as palavras sobem de novo */}
                <h2
                  key={eAtivo ? `ativo-${ativo}` : "inativo"}
                  className="mt-2 text-[30px] font-bold leading-[1.05] sm:text-[40px] lg:text-[48px]"
                >
                  {b.titulo.split(" ").map((palavra, p) => (
                    <span
                      key={p}
                      className={eAtivo ? "animar-palavra" : "inline-block"}
                      style={eAtivo ? { animationDelay: `${120 + p * 60}ms` } : undefined}
                    >
                      {palavra}
                      {" "}
                    </span>
                  ))}
                </h2>
                <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/85 sm:text-[17px]">{b.texto}</p>
                <div className="mt-6">
                  <a
                    href={hrefs[i]}
                    target={externo ? "_blank" : undefined}
                    rel={externo ? "noopener noreferrer" : undefined}
                    className="btn btn-claro"
                  >
                    {b.botao}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controles */}
      <div className="absolute bottom-3 left-3 z-[2] flex items-center sm:left-6 md:bottom-4 md:left-8 lg:left-10">
        {banners.map((b, i) => (
          <button
            key={b.titulo}
            type="button"
            onClick={() => ir(i)}
            aria-label={`Ir para o destaque ${i + 1}: ${b.titulo}`}
            aria-current={i === ativo}
            className="flex h-11 w-8 items-center justify-center"
          >
            <span
              className={`block h-2 rounded-full bg-white transition-all duration-300 ease-curva ${
                i === ativo ? "w-6" : "w-2 opacity-50"
              }`}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPausadoUsuario((p) => !p)}
          aria-label={pausadoUsuario ? "Continuar a troca automática dos destaques" : "Pausar a troca automática dos destaques"}
          className="ml-1 flex h-11 w-11 items-center justify-center rounded-full text-white/85 transition hover:bg-white/10"
        >
          {pausadoUsuario ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>

      <div className="absolute bottom-4 right-4 z-[2] hidden gap-2 md:flex">
        {([-1, 1] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => ir(ativo + d)}
            aria-label={d === -1 ? "Destaque anterior" : "Próximo destaque"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-azul shadow-2 transition hover:-translate-y-px hover:bg-white active:scale-95"
          >
            {d === -1 ? <ChevronLeft className="h-5 w-5" aria-hidden="true" /> : <ChevronRight className="h-5 w-5" aria-hidden="true" />}
          </button>
        ))}
      </div>
    </section>
  );
}
