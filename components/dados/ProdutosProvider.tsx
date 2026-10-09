"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { adaptarProduto, visiveis, type Produto, type ProdutoCatalogo } from "@/lib/produtos";

/**
 * Endereço do arquivo de produtos. O catálogo publica em /catalogo/produtos.json
 * (mesmo domínio, então não há problema de CORS). Só muda na prévia/testes,
 * pela variável NEXT_PUBLIC_PRODUTOS_URL.
 */
const URL_PRODUTOS = process.env.NEXT_PUBLIC_PRODUTOS_URL ?? "/catalogo/produtos.json";

/** O arquivo muda a cada atualização e tem cache de 5 minutos: o "?v=" muda junto. */
const JANELA_CACHE_MS = 5 * 60 * 1000;

type Estado =
  | { status: "carregando" }
  | { status: "erro" }
  | { status: "ok"; todos: Produto[]; atualizadoEm: string };

const Contexto = createContext<Estado>({ status: "carregando" });

export function ProdutosProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<Estado>({ status: "carregando" });

  useEffect(() => {
    let cancelado = false;
    const versao = Math.floor(Date.now() / JANELA_CACHE_MS);
    fetch(`${URL_PRODUTOS}?v=${versao}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((dados: { produtos?: Partial<ProdutoCatalogo>[]; atualizado_em?: string }) => {
        if (!Array.isArray(dados.produtos)) throw new Error("formato inesperado");
        const todos = dados.produtos.map(adaptarProduto).filter((p): p is Produto => p !== null);
        if (!cancelado) setEstado({ status: "ok", todos, atualizadoEm: dados.atualizado_em ?? "" });
      })
      .catch(() => {
        if (!cancelado) setEstado({ status: "erro" });
      });
    return () => {
      cancelado = true;
    };
  }, []);

  return <Contexto.Provider value={estado}>{children}</Contexto.Provider>;
}

/** Estado da carga + as duas listas: `todos` (inclui sem estoque) e `visiveis`. */
export function useProdutos() {
  const estado = useContext(Contexto);
  return useMemo(
    () => ({
      status: estado.status,
      todos: estado.status === "ok" ? estado.todos : [],
      visiveis: estado.status === "ok" ? visiveis(estado.todos) : [],
    }),
    [estado],
  );
}
