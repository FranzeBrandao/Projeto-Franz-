import { asset } from "@/lib/asset";
import type { Produto } from "@/lib/produtos";
import { IconeCategoria } from "./IconeCategoria";

/**
 * Foto do produto. Sem foto cadastrada (campo "imagem" vazio no JSON),
 * mostra a imagem provisória: a cruz da logo ao fundo e o ícone da
 * categoria — nunca imagem quebrada nem foto de banco fingindo ser o produto.
 */
export function ImagemProduto({
  produto,
  className = "",
  prioridade = false,
}: {
  produto: Produto;
  className?: string;
  prioridade?: boolean;
}) {
  if (produto.imagem) {
    return (
      // <img> comum: o site é exportado como estático (images.unoptimized).
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={asset(produto.imagem)}
        alt={`${produto.nome} - ${produto.apresentacao}`}
        width={400}
        height={400}
        loading={prioridade ? "eager" : "lazy"}
        decoding="async"
        className={`h-full w-full object-contain ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${produto.nome} - foto em breve`}
      className={`relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-gelo ${className}`}
    >
      {/* Cruz da logo, grande e bem clara, ao fundo */}
      <svg
        viewBox="0 0 56 56"
        aria-hidden="true"
        className="absolute -right-[12%] -top-[12%] h-[70%] w-[70%] text-azul-logo/[0.07]"
      >
        <path d="M21 4h14v17h17v14H35v17H21V35H4V21h17z" fill="currentColor" />
      </svg>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-azul shadow-1">
        <IconeCategoria slug={produto.categoria} className="h-7 w-7" />
      </span>
      <span className="rotulo relative text-[11px] text-texto-suave">Foto em breve</span>
    </div>
  );
}
