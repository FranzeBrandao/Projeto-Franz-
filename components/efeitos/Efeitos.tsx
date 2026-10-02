"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Efeitos globais leves, sem biblioteca:
 * 1. Scroll reveal — marca com "visivel" os elementos [data-revelar]
 *    quando entram na tela (e para de observar cada um depois disso).
 * 2. Confirmação no botão de compra — ao clicar em "Comprar pelo
 *    WhatsApp", o botão mostra "Abrindo WhatsApp…" por 2 segundos.
 */
export function Efeitos() {
  const caminho = usePathname();

  useEffect(() => {
    const elementos = document.querySelectorAll<HTMLElement>("[data-revelar]:not(.visivel)");
    if (!("IntersectionObserver" in window)) {
      elementos.forEach((el) => el.classList.add("visivel"));
      return;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [caminho]);

  useEffect(() => {
    function aoClicar(evento: MouseEvent) {
      const botao = (evento.target as HTMLElement).closest<HTMLElement>("[data-pedido]");
      if (!botao) return;
      botao.setAttribute("data-enviado", "");
      window.setTimeout(() => botao.removeAttribute("data-enviado"), 2000);
    }
    document.addEventListener("click", aoClicar);
    return () => document.removeEventListener("click", aoClicar);
  }, []);

  return null;
}
