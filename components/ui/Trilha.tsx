import { ChevronRight } from "lucide-react";
import { siteUrl } from "@/content/site";

/**
 * Trilha de navegação ("Início › Categoria › Produto"), com os dados
 * estruturados que o Google usa para mostrar o caminho no resultado.
 */
export function Trilha({ itens }: { itens: Array<{ nome: string; href?: string }> }) {
  const dados = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itens.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nome,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Você está em" className="pt-5">
      <ol className="flex flex-wrap items-center gap-1 text-[14px] text-texto-suave">
        {itens.map((item, i) => (
          <li key={item.nome} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-4 w-4 shrink-0 opacity-60" aria-hidden="true" />}
            {item.href ? (
              <a href={item.href} className="link-sublinhado hover:text-azul">
                {item.nome}
              </a>
            ) : (
              <span aria-current="page" className="line-clamp-1 text-texto">
                {item.nome}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />
    </nav>
  );
}
