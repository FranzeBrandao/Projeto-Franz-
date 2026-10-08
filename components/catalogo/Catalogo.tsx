"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import {
  disponivel,
  percentualDesconto,
  precoFinal,
  temPromocao,
  type Produto,
} from "@/lib/produtos";
import { GradeProdutos } from "./GradeProdutos";

type Ordem = "relevancia" | "menor-preco" | "maior-preco" | "maior-desconto" | "a-z";

const ORDENS: Array<{ valor: Ordem; texto: string }> = [
  { valor: "relevancia", texto: "Mais relevantes" },
  { valor: "menor-preco", texto: "Menor preço" },
  { valor: "maior-preco", texto: "Maior preço" },
  { valor: "maior-desconto", texto: "Maior desconto" },
  { valor: "a-z", texto: "Nome (A–Z)" },
];

/**
 * Listagem da categoria com filtro simples (DESIGN.md §5):
 * subcategoria, marca, faixa de preço, só promoções e ordenação.
 * No celular os filtros abrem numa gaveta que sobe de baixo.
 */
export function Catalogo({ produtos, subInicial = "" }: { produtos: Produto[]; subInicial?: string }) {
  const subcategorias = useMemo(() => Array.from(new Set(produtos.map((p) => p.subcategoria))), [produtos]);
  const marcas = useMemo(() => Array.from(new Set(produtos.map((p) => p.marca))).sort(), [produtos]);

  const [sub, setSub] = useState(subcategorias.includes(subInicial) ? subInicial : "");
  const [marcasEscolhidas, setMarcasEscolhidas] = useState<string[]>([]);
  const [soPromocao, setSoPromocao] = useState(false);
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [ordem, setOrdem] = useState<Ordem>("relevancia");
  const [gavetaAberta, setGavetaAberta] = useState(false);

  // Mantém a subcategoria escolhida no endereço (dá para compartilhar o link)
  useEffect(() => {
    const url = new URL(window.location.href);
    if (sub) url.searchParams.set("sub", sub);
    else url.searchParams.delete("sub");
    window.history.replaceState(null, "", url);
  }, [sub]);

  // Gaveta de filtros do celular: trava a rolagem e fecha com Esc
  useEffect(() => {
    if (!gavetaAberta) return;
    document.body.style.overflow = "hidden";
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setGavetaAberta(false);
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [gavetaAberta]);

  const lista = useMemo(() => {
    const minimo = parseFloat(precoMin.replace(",", "."));
    const maximo = parseFloat(precoMax.replace(",", "."));
    const filtrados = produtos.filter(
      (p) =>
        (!sub || p.subcategoria === sub) &&
        (marcasEscolhidas.length === 0 || marcasEscolhidas.includes(p.marca)) &&
        (!soPromocao || temPromocao(p)) &&
        (Number.isNaN(minimo) || precoFinal(p) >= minimo) &&
        (Number.isNaN(maximo) || precoFinal(p) <= maximo),
    );
    const porOrdem: Record<Ordem, (a: Produto, b: Produto) => number> = {
      // Relevância: disponíveis primeiro, depois destaques
      relevancia: (a, b) =>
        Number(disponivel(b)) - Number(disponivel(a)) || Number(b.destaque) - Number(a.destaque),
      "menor-preco": (a, b) => precoFinal(a) - precoFinal(b),
      "maior-preco": (a, b) => precoFinal(b) - precoFinal(a),
      "maior-desconto": (a, b) => percentualDesconto(b) - percentualDesconto(a),
      "a-z": (a, b) => a.nome.localeCompare(b.nome, "pt-BR"),
    };
    return [...filtrados].sort(porOrdem[ordem]);
  }, [produtos, sub, marcasEscolhidas, soPromocao, precoMin, precoMax, ordem]);

  const filtrosAtivos = marcasEscolhidas.length + Number(soPromocao) + Number(precoMin !== "") + Number(precoMax !== "");

  function limpar() {
    setSub("");
    setMarcasEscolhidas([]);
    setSoPromocao(false);
    setPrecoMin("");
    setPrecoMax("");
  }

  const painelFiltros = (
    <div className="space-y-6">
      <fieldset>
        <legend className="rotulo text-[13px] text-texto-suave">Marca</legend>
        <div className="mt-2 max-h-64 space-y-1 overflow-y-auto pr-1">
          {marcas.map((m) => (
            <Caixa
              key={m}
              rotulo={m}
              marcado={marcasEscolhidas.includes(m)}
              aoMudar={(v) =>
                setMarcasEscolhidas((atual) => (v ? [...atual, m] : atual.filter((x) => x !== m)))
              }
            />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="rotulo text-[13px] text-texto-suave">Faixa de preço</legend>
        <div className="mt-2 flex items-center gap-2">
          <CampoPreco rotulo="Preço mínimo (R$)" placeholder="De" valor={precoMin} aoMudar={setPrecoMin} />
          <span aria-hidden="true" className="text-texto-suave">–</span>
          <CampoPreco rotulo="Preço máximo (R$)" placeholder="Até" valor={precoMax} aoMudar={setPrecoMax} />
        </div>
      </fieldset>
      <fieldset>
        <legend className="rotulo text-[13px] text-texto-suave">Mostrar</legend>
        <div className="mt-2 space-y-1">
          <Caixa rotulo="Só promoções" marcado={soPromocao} aoMudar={setSoPromocao} />
        </div>
      </fieldset>
    </div>
  );

  return (
    <div>
      {/* Subcategorias em pílulas */}
      {subcategorias.length > 1 && (
        <div className="sem-barra -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Subcategorias">
          {["", ...subcategorias].map((s) => {
            const ativo = sub === s;
            return (
              <button
                key={s || "todas"}
                type="button"
                onClick={() => setSub(s)}
                aria-pressed={ativo}
                className={`min-h-11 shrink-0 rounded-full px-4 text-[15px] font-medium transition duration-200 active:scale-95 ${
                  ativo ? "bg-azul text-white shadow-2" : "bg-cartao text-texto ring-1 ring-linha hover:bg-gelo hover:ring-azul/30"
                }`}
              >
                {s || "Todas"}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Filtros fixos na lateral (computador) */}
        <aside className="hidden lg:block" aria-label="Filtros">
          <div className="sticky top-40 rounded-2xl border border-linha bg-cartao p-5">
            {painelFiltros}
            {filtrosAtivos > 0 && (
              <button type="button" onClick={limpar} className="rotulo mt-6 text-[13px] text-azul hover:underline">
                Limpar filtros
              </button>
            )}
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[15px] text-texto-suave" aria-live="polite">
              <strong className="font-semibold text-texto">{lista.length}</strong>{" "}
              {lista.length === 1 ? "produto" : "produtos"}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGavetaAberta(true)}
                className="btn btn-contorno min-h-11 px-4 text-[14px] lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Filtros{filtrosAtivos > 0 ? ` (${filtrosAtivos})` : ""}
              </button>
              <label className="flex items-center gap-2">
                <span className="sr-only sm:not-sr-only sm:text-[14px] sm:text-texto-suave">Ordenar por</span>
                <select
                  value={ordem}
                  onChange={(e) => setOrdem(e.target.value as Ordem)}
                  className="min-h-11 rounded-xl border border-linha bg-cartao px-3 text-[15px] text-texto transition hover:border-azul/40 focus:border-azul"
                >
                  {ORDENS.map((o) => (
                    <option key={o.valor} value={o.valor}>
                      {o.texto}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {lista.length > 0 ? (
            <GradeProdutos produtos={lista} />
          ) : (
            <div className="rounded-2xl border border-dashed border-linha bg-cartao px-6 py-14 text-center">
              <p className="font-display text-xl font-bold text-texto">Nenhum produto com esses filtros</p>
              <p className="mt-2 text-texto-suave">Tire algum filtro ou veja todos os produtos da categoria.</p>
              <button type="button" onClick={limpar} className="btn btn-primario mt-5">
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Gaveta de filtros (celular) */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${gavetaAberta ? "" : "pointer-events-none"}`} aria-hidden={!gavetaAberta}>
        <div
          onClick={() => setGavetaAberta(false)}
          className={`absolute inset-0 bg-noite/50 transition-opacity duration-300 ${gavetaAberta ? "opacity-100" : "opacity-0"}`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filtros"
          inert={!gavetaAberta}
          className={`absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-cartao p-5 pb-8 shadow-4 transition-transform duration-300 ease-curva ${
            gavetaAberta ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mb-5 flex items-center justify-between">
            <p className="font-display text-xl font-bold">Filtros</p>
            <button
              type="button"
              onClick={() => setGavetaAberta(false)}
              aria-label="Fechar filtros"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-texto hover:bg-gelo"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {painelFiltros}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <button type="button" onClick={limpar} className="btn btn-contorno">
              Limpar
            </button>
            <button type="button" onClick={() => setGavetaAberta(false)} className="btn btn-primario">
              Ver {lista.length} {lista.length === 1 ? "produto" : "produtos"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Versão que lê a subcategoria do endereço (?sub=…). Fica dentro de <Suspense>. */
export function CatalogoComUrl({ produtos }: { produtos: Produto[] }) {
  const params = useSearchParams();
  const sub = params.get("sub") ?? "";
  return <Catalogo key={sub} produtos={produtos} subInicial={sub} />;
}

function CampoPreco({
  rotulo,
  placeholder,
  valor,
  aoMudar,
}: {
  rotulo: string;
  placeholder: string;
  valor: string;
  aoMudar: (v: string) => void;
}) {
  return (
    <label className="min-w-0 flex-1">
      <span className="sr-only">{rotulo}</span>
      <input
        type="text"
        inputMode="decimal"
        value={valor}
        placeholder={placeholder}
        onChange={(e) => aoMudar(e.target.value.replace(/[^\d.,]/g, ""))}
        className="min-h-11 w-full rounded-xl border border-linha bg-cartao px-3 text-[15px] text-texto placeholder:text-texto-suave hover:border-azul/40 focus:border-azul"
      />
    </label>
  );
}

function Caixa({ rotulo, marcado, aoMudar }: { rotulo: string; marcado: boolean; aoMudar: (v: boolean) => void }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-1 text-[15px] text-texto hover:bg-gelo/60">
      <input
        type="checkbox"
        checked={marcado}
        onChange={(e) => aoMudar(e.target.checked)}
        className="h-5 w-5 rounded accent-[rgb(var(--azul-rgb))]"
      />
      {rotulo}
    </label>
  );
}
