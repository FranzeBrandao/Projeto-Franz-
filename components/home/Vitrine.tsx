import { categorias } from "@/content/categorias";
import { produtosDaCategoria, produtosEmOferta } from "@/lib/produtos";
import { CardProduto } from "@/components/produto/CardProduto";
import { ItemPrateleira, ItemVerTodos, Prateleira } from "@/components/produto/Prateleira";
import { AvisoMedicamentos } from "@/components/produto/AvisoMedicamentos";
import { IconeCategoria } from "@/components/produto/IconeCategoria";

/** Categorias que ganham prateleira própria na página inicial. */
const PRATELEIRAS_HOME = ["medicamentos", "fraldas", "dermocosmeticos", "vitaminas-e-suplementos"];

/**
 * Vitrine da página inicial: "Ofertas da semana" e uma prateleira por
 * categoria escolhida acima. Tudo vem de content/produtos.json.
 */
export function Vitrine() {
  const ofertas = produtosEmOferta();
  const temMedicamentoNasOfertas = ofertas.some((p) => p.categoria === "medicamentos");

  return (
    <div className="pt-4">
      {ofertas.length > 0 && (
        <Prateleira
          id="ofertas"
          rotulo="Preço de farmácia de bairro"
          titulo="Ofertas da semana"
          aviso={temMedicamentoNasOfertas ? <AvisoMedicamentos /> : undefined}
        >
          {ofertas.map((p, i) => (
            <ItemPrateleira key={p.ean} indice={i}>
              <CardProduto produto={p} prioridade={i < 2} />
            </ItemPrateleira>
          ))}
        </Prateleira>
      )}

      {PRATELEIRAS_HOME.map((slug) => {
        const categoria = categorias.find((c) => c.slug === slug);
        const lista = produtosDaCategoria(slug);
        if (!categoria || lista.length === 0) return null;
        return (
          <Prateleira
            key={slug}
            id={`prateleira-${slug}`}
            rotulo="Categoria"
            titulo={categoria.nome}
            verTodos={{ href: `/categoria/${slug}/`, texto: "Ver todos" }}
            aviso={slug === "medicamentos" ? <AvisoMedicamentos /> : undefined}
          >
            {lista.map((p, i) => (
              <ItemPrateleira key={p.ean} indice={i}>
                <CardProduto produto={p} />
              </ItemPrateleira>
            ))}
            <ItemVerTodos
              href={`/categoria/${slug}/`}
              nome={categoria.nome}
              icone={<IconeCategoria slug={slug} className="h-7 w-7" />}
            />
          </Prateleira>
        );
      })}
    </div>
  );
}
