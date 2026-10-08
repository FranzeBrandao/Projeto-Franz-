import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Trilha } from "@/components/ui/Trilha";
import { AvisoMedicamentos } from "@/components/produto/AvisoMedicamentos";
import { IconeCategoria } from "@/components/produto/IconeCategoria";
import { ListaCategoria } from "@/components/catalogo/ListaCategoria";
import { buscarCategoria, categorias } from "@/content/categorias";
import { empresa } from "@/content/empresa";

type Props = { params: Promise<{ slug: string }> };

// Uma página estática por categoria (site exportado para a Hostinger)
export function generateStaticParams() {
  return categorias.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoria = buscarCategoria(slug);
  if (!categoria) return {};
  return {
    title: `${categoria.nome} em Sobral`,
    description: `${categoria.descricao} Peça pelo WhatsApp na ${empresa.nome}, em Sobral - CE.`,
    alternates: { canonical: `/categoria/${slug}/` },
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;
  const categoria = buscarCategoria(slug);
  if (!categoria) notFound();

  const ehMedicamento = slug === "medicamentos";

  return (
    <>
      <Header />
      <main className="container-page pb-16">
        <Trilha itens={[{ nome: "Início", href: "/" }, { nome: categoria.nome }]} />

        <header className="mt-5 flex items-center gap-4" data-revelar>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-azul-logo text-white shadow-2 sm:h-16 sm:w-16">
            <IconeCategoria slug={slug} className="h-7 w-7 sm:h-8 sm:w-8" />
          </span>
          <div>
            <h1 className="text-[30px] font-bold leading-tight sm:text-[40px]">{categoria.nome}</h1>
            <p className="mt-1 text-[16px] text-texto-suave">{categoria.descricao}</p>
          </div>
        </header>

        {ehMedicamento && <AvisoMedicamentos className="mt-6" />}

        <div className="mt-7">
          {/* Os produtos vêm de /catalogo/produtos.json, lido no navegador */}
          <ListaCategoria slug={slug} nome={categoria.nome} />
        </div>

        {ehMedicamento && <AvisoMedicamentos className="mt-12" />}
      </main>
      <Footer />
    </>
  );
}
