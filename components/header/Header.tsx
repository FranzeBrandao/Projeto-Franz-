import { categorias } from "@/content/categorias";
import { HeaderCliente, type CategoriaMenu } from "./HeaderCliente";

/**
 * Monta os dados do menu (as categorias). Os produtos em destaque do menu
 * são lidos do catálogo no navegador, dentro do HeaderCliente.
 */
export function Header() {
  const menu: CategoriaMenu[] = categorias.map((c) => ({ slug: c.slug, nome: c.nome }));
  return <HeaderCliente menu={menu} />;
}
