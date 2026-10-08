"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { categorias } from "@/content/categorias";
import { CarregandoProdutos, ErroProdutos } from "@/components/dados/EstadoProdutos";
import { useProdutos } from "@/components/dados/ProdutosProvider";
import { GradeProdutos } from "./GradeProdutos";

/** Remove acentos e deixa minúsculo: "Ômega" → "omega". */
const normalizar = (t: string) =>
  t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/**
 * Busca no navegador: procura o texto no nome, marca, subcategoria e
 * categoria. Cada palavra digitada precisa aparecer em algum desses campos.
 */
export function ResultadoBusca() {
  const termo = useSearchParams().get("q") ?? "";
  const { status, visiveis: produtos } = useProdutos();

  const lista = useMemo(() => {
    const palavras = normalizar(termo).split(/\s+/).filter(Boolean);
    if (palavras.length === 0) return [];
    return produtos.filter((p) => {
      const nomeCategoria = categorias.find((c) => c.slug === p.categoria)?.nome ?? "";
      const texto = normalizar(`${p.nome} ${p.marca} ${p.subcategoria} ${nomeCategoria} ${p.apresentacao} ${p.ean}`);
      return palavras.every((w) => texto.includes(w));
    });
  }, [produtos, termo]);

  return (
    <div>
      <h1 className="text-[28px] font-bold leading-tight sm:text-[36px]">
        {termo ? <>Resultados para “{termo}”</> : "Buscar produtos"}
      </h1>
      {termo && status === "ok" && (
        <p className="mt-1 text-[15px] text-texto-suave" aria-live="polite">
          {lista.length} {lista.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>
      )}

      <form action="/busca/" role="search" className="mt-5 max-w-xl">
        <label className="flex h-12 items-center gap-3 rounded-full bg-cartao px-4 ring-1 ring-linha transition focus-within:ring-2 focus-within:ring-azul/40">
          <Search className="h-5 w-5 text-azul" aria-hidden="true" />
          <span className="sr-only">Buscar produtos</span>
          <input
            key={termo}
            type="search"
            name="q"
            defaultValue={termo}
            placeholder="Nome, marca ou tipo de produto"
            className="h-full w-full bg-transparent text-[16px] placeholder:text-texto-suave focus:outline-none"
          />
        </label>
      </form>

      <div className="mt-8">
        {status === "carregando" ? (
          <CarregandoProdutos />
        ) : status === "erro" ? (
          <ErroProdutos />
        ) : lista.length > 0 ? (
          <GradeProdutos produtos={lista} colunasLargas />
        ) : (
          <div className="rounded-2xl border border-dashed border-linha bg-cartao px-6 py-12 text-center">
            <p className="font-display text-xl font-bold">
              {termo ? "Nenhum produto encontrado" : "Digite o que você procura"}
            </p>
            <p className="mx-auto mt-2 max-w-md text-texto-suave">
              {termo
                ? "Confira se o nome está certo ou navegue pelas categorias. Se não achar, chame a gente no WhatsApp que a gente procura para você."
                : "Ou escolha uma das categorias abaixo."}
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {categorias.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`/categoria/${c.slug}/`}
                    className="inline-flex min-h-11 items-center rounded-full bg-gelo px-4 text-[15px] text-texto transition hover:bg-azul hover:text-white"
                  >
                    {c.nome}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
