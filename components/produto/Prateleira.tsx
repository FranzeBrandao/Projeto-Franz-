"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * A prateleira — assinatura do site (DESIGN.md §1).
 *
 * Uma fileira de produtos que "pousa" numa régua vermelha, como a gôndola
 * da loja. No celular rola de lado com o dedo; no computador ganha setas.
 * Os cards chegam prontos do servidor (children); aqui só tem a rolagem.
 */
export function Prateleira({
  titulo,
  rotulo,
  verTodos,
  aviso,
  children,
  id,
}: {
  titulo: string;
  rotulo?: string;
  verTodos?: { href: string; texto: string };
  /** Conteúdo exibido entre o título e os produtos (ex.: aviso de medicamentos). */
  aviso?: ReactNode;
  children: ReactNode;
  id?: string;
}) {
  const trilho = useRef<HTMLUListElement>(null);
  // As setas só aparecem quando há mais produtos do que cabem na tela
  const [temMais, setTemMais] = useState(false);

  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    const medir = () => setTemMais(el.scrollWidth > el.clientWidth + 8);
    const observador = new ResizeObserver(medir);
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  function rolar(direcao: 1 | -1) {
    const el = trilho.current;
    if (!el) return;
    el.scrollBy({ left: direcao * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <section aria-labelledby={id ? `${id}-titulo` : undefined} id={id} className="py-8 md:py-10">
      <div className="container-page">
        <div className="flex items-end justify-between gap-4" data-revelar>
          <div>
            {rotulo && <p className="rotulo text-[13px] text-vermelho">{rotulo}</p>}
            <h2 id={id ? `${id}-titulo` : undefined} className="mt-0.5 text-[24px] font-bold leading-tight sm:text-[32px]">
              {titulo}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {verTodos && (
              <a href={verTodos.href} className="rotulo link-sublinhado py-2 text-[14px] text-azul">
                {verTodos.texto} →
              </a>
            )}
            <div className={temMais ? "hidden gap-2 lg:flex" : "hidden"}>
              {([-1, 1] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => rolar(d)}
                  aria-label={d === -1 ? `Produtos anteriores de ${titulo}` : `Mais produtos de ${titulo}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-linha bg-cartao text-azul transition hover:-translate-y-px hover:border-azul hover:shadow-2 active:scale-95"
                >
                  {d === -1 ? <ChevronLeft className="h-5 w-5" aria-hidden="true" /> : <ChevronRight className="h-5 w-5" aria-hidden="true" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {aviso && <div className="mt-4">{aviso}</div>}

        {/* Trilho: margem negativa + padding deixam a sombra dos cards respirar */}
        <ul
          ref={trilho}
          className="sem-barra -mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 pt-1 sm:-mx-6 sm:gap-5 sm:px-6 lg:-mx-2 lg:px-2"
        >
          {children}
        </ul>
        <div aria-hidden="true" className="regua-prateleira" />
      </div>
    </section>
  );
}

/** Item do trilho: largura do card por tamanho de tela. */
export function ItemPrateleira({ children, indice = 0 }: { children: ReactNode; indice?: number }) {
  return (
    <li
      data-revelar="pousar"
      style={{ ["--atraso" as string]: `${Math.min(indice, 7) * 50}ms` }}
      className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[calc(20%-16px)]"
    >
      {children}
    </li>
  );
}

/** Último item das prateleiras de categoria: atalho para a página completa. */
export function ItemVerTodos({ href, nome, icone }: { href: string; nome: string; icone: ReactNode }) {
  return (
    <li className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[calc(20%-16px)]">
      <a
        href={href}
        className="group textura-cruz flex h-full min-h-[280px] flex-col justify-between rounded-2xl bg-azul-logo p-5 text-white shadow-1 transition duration-300 ease-curva hover:-translate-y-1 hover:shadow-3 active:scale-[.98]"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
          {icone}
        </span>
        <span>
          <span className="block font-display text-[22px] font-bold leading-tight">Ver todos de {nome}</span>
          <span className="rotulo mt-2 inline-flex items-center gap-1 text-[13px] text-white/85">
            Abrir categoria
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </span>
      </a>
    </li>
  );
}
