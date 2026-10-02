import { categorias } from "@/content/categorias";
import { IconeCategoria } from "@/components/produto/IconeCategoria";

/**
 * Atalhos redondos para as 8 categorias (DESIGN.md §4.6).
 * No celular rolam de lado; no computador ficam numa linha só.
 */
export function AtalhosCategorias() {
  return (
    <nav aria-label="Atalhos de categorias" className="pt-7 md:pt-10">
      <ul className="container-page sem-barra flex gap-1 overflow-x-auto pb-1 lg:justify-between">
        {categorias.map((c, i) => (
          <li
            key={c.slug}
            data-revelar
            style={{ ["--atraso" as string]: `${i * 40}ms` }}
            className="shrink-0"
          >
            <a
              href={`/categoria/${c.slug}/`}
              className="group flex w-[84px] flex-col items-center gap-2 rounded-xl p-1 text-center sm:w-[104px]"
            >
              <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gelo text-azul transition duration-200 ease-curva group-hover:bg-azul-logo group-hover:text-white group-hover:shadow-3 group-active:scale-95 sm:h-[76px] sm:w-[76px]">
                <IconeCategoria
                  slug={c.slug}
                  className="h-7 w-7 transition-transform duration-200 ease-curva group-hover:-translate-y-[3px]"
                />
              </span>
              <span className="text-[13px] font-medium leading-tight text-texto group-hover:text-azul">{c.nome}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
