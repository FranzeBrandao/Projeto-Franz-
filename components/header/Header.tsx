import { categorias } from "@/content/categorias";
import { produtosDaCategoria, disponivel, slugProduto, precoFinal, emReais } from "@/lib/produtos";
import { HeaderCliente, type CategoriaMenu } from "./HeaderCliente";

/**
 * Monta, no servidor, os dados do menu (categorias, subcategorias e dois
 * produtos em destaque por categoria) e entrega para a parte interativa.
 * Assim o arquivo de produtos inteiro não vai para o navegador.
 */
export function Header() {
  const menu: CategoriaMenu[] = categorias.map((c) => {
    const lista = produtosDaCategoria(c.slug);
    const subcategorias = Array.from(new Set(lista.map((p) => p.subcategoria)));
    const destaques = lista
      .filter(disponivel)
      .sort((a, b) => Number(b.destaque) - Number(a.destaque))
      .slice(0, 2)
      .map((p) => ({
        nome: p.nome,
        apresentacao: p.apresentacao,
        preco: emReais(precoFinal(p)),
        href: `/produto/${slugProduto(p)}/`,
      }));
    return { slug: c.slug, nome: c.nome, subcategorias, destaques };
  });

  return <HeaderCliente menu={menu} />;
}
