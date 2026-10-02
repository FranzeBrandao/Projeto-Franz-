import Link from "next/link";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { categorias } from "@/content/categorias";

/** Página 404 (vira out/404.html, usada pelo .htaccess da Hostinger). */
export default function NaoEncontrada() {
  return (
    <>
      <Header />
      <main className="container-page py-16 text-center sm:py-24">
        <p className="rotulo text-[14px] text-vermelho">Erro 404</p>
        <h1 className="mt-2 text-[32px] font-bold sm:text-[44px]">Esta página saiu da prateleira</h1>
        <p className="mx-auto mt-3 max-w-md text-[17px] text-texto-suave">
          O endereço pode ter mudado ou o produto não está mais no site. Volte para o início ou escolha uma categoria.
        </p>
        <Link href="/" className="btn btn-primario mt-7">Ir para o início</Link>
        <ul className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2">
          {categorias.map((c) => (
            <li key={c.slug}>
              <a
                href={`/categoria/${c.slug}/`}
                className="inline-flex min-h-11 items-center rounded-full bg-gelo px-4 text-[15px] transition hover:bg-azul hover:text-white"
              >
                {c.nome}
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
