import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BellRing, Stethoscope, Truck } from "lucide-react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Trilha } from "@/components/ui/Trilha";
import { AvisoMedicamentos } from "@/components/produto/AvisoMedicamentos";
import { CardProduto } from "@/components/produto/CardProduto";
import { ImagemProduto } from "@/components/produto/ImagemProduto";
import { ItemPrateleira, Prateleira } from "@/components/produto/Prateleira";
import { Preco } from "@/components/produto/Preco";
import { SeletorCompra } from "@/components/produto/SeletorCompra";
import { buscarCategoria } from "@/content/categorias";
import { empresa } from "@/content/empresa";
import { ENTREGA_GRATIS } from "@/content/loja";
import { linkAviseMeWhatsapp } from "@/content/pedidos";
import { siteUrl } from "@/content/site";
import { asset } from "@/lib/asset";
import { whatsappHref } from "@/lib/contato";
import {
  disponivel,
  emReais,
  percentualDesconto,
  precoFinal,
  produtos,
  produtosDaCategoria,
  slugProduto,
} from "@/lib/produtos";

type Props = { params: Promise<{ slug: string }> };

// Uma página estática por produto do content/produtos.json
export function generateStaticParams() {
  return produtos.map((p) => ({ slug: slugProduto(p) }));
}
export const dynamicParams = false;

const buscar = (slug: string) => produtos.find((p) => slugProduto(p) === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = buscar(slug);
  if (!p) return {};
  return {
    title: `${p.nome} - ${p.apresentacao}`,
    description: `${p.nome} (${p.marca}), ${p.apresentacao}, por R$ ${emReais(precoFinal(p))} na ${empresa.nome}, em Sobral - CE. Peça pelo WhatsApp.`,
    alternates: { canonical: `/produto/${slug}/` },
  };
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  const p = buscar(slug);
  if (!p) notFound();

  const categoria = buscarCategoria(p.categoria);
  const temEstoque = disponivel(p);
  const desconto = percentualDesconto(p);
  const ehMedicamento = p.categoria === "medicamentos";
  const parecidos = produtosDaCategoria(p.categoria).filter((x) => x.ean !== p.ean);

  // Dados do produto para o Google (preço, disponibilidade, marca)
  const dados = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nome,
    description: `${p.nome} - ${p.apresentacao}`,
    brand: { "@type": "Brand", name: p.marca },
    // EAN como código interno: os EANs fictícios (prefixo 200) não são GTINs válidos
    sku: p.ean,
    category: categoria?.nome,
    ...(p.imagem ? { image: `${siteUrl}${asset(p.imagem)}` } : {}),
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: precoFinal(p).toFixed(2),
      availability: temEstoque ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${siteUrl}/produto/${slug}/`,
      seller: { "@type": "Pharmacy", name: empresa.nome },
    },
  };

  return (
    <>
      <Header />
      <main className="pb-10">
        <div className="container-page">
          <Trilha
            itens={[
              { nome: "Início", href: "/" },
              ...(categoria ? [{ nome: categoria.nome, href: `/categoria/${categoria.slug}/` }] : []),
              { nome: p.nome },
            ]}
          />

          <article className="mt-5 grid gap-8 lg:grid-cols-2 lg:gap-14">
            {/* Foto */}
            <div className="relative" data-revelar>
              <div className={`aspect-square overflow-hidden rounded-3xl border border-linha bg-cartao p-4 shadow-1 sm:p-8 ${temEstoque ? "" : "grayscale"}`}>
                <div className="h-full w-full overflow-hidden rounded-2xl">
                  <ImagemProduto produto={p} prioridade />
                </div>
              </div>
              {!temEstoque ? (
                <span className="rotulo absolute left-4 top-4 rounded-md bg-linha px-3 py-1.5 text-[13px] text-texto-suave">
                  Indisponível
                </span>
              ) : desconto > 0 ? (
                <span className="rotulo absolute left-4 top-4 rounded-md bg-vermelho px-3 py-1.5 text-[14px] font-bold text-white">
                  -{desconto}%
                </span>
              ) : null}
            </div>

            {/* Informações e compra */}
            <div data-revelar style={{ ["--atraso" as string]: "80ms" }}>
              <p className="rotulo text-[14px] text-texto-suave">{p.marca}</p>
              <h1 className="mt-1 text-[28px] font-bold leading-tight sm:text-[36px]">{p.nome}</h1>
              <p className="mt-2 text-[17px] text-texto-suave">{p.apresentacao}</p>
              <p className="mt-1 text-[13px] text-texto-suave">
                {p.subcategoria} · Cód. {p.ean}
              </p>

              <div className="mt-6">
                <Preco produto={p} grande />
              </div>

              <div className="mt-6 border-t border-linha pt-6">
                {temEstoque ? (
                  <SeletorCompra nome={p.nome} apresentacao={p.apresentacao} preco={precoFinal(p)} estoque={p.estoque} />
                ) : (
                  <div>
                    <p className="text-[16px] text-texto">
                      Este produto está <strong>indisponível</strong> no momento.
                    </p>
                    <a
                      href={linkAviseMeWhatsapp({ nome: p.nome, apresentacao: p.apresentacao })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-contorno mt-4 w-full min-h-14 text-[16px] sm:w-auto sm:px-8"
                    >
                      <BellRing className="h-5 w-5" aria-hidden="true" />
                      Avise-me pelo WhatsApp
                    </a>
                  </div>
                )}
              </div>

              {ehMedicamento && <AvisoMedicamentos className="mt-6" />}

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                <li className="flex items-start gap-3 rounded-2xl bg-gelo p-4">
                  <Truck className="mt-0.5 h-5 w-5 shrink-0 text-azul" aria-hidden="true" />
                  <span className="text-[14px] leading-snug text-texto">{ENTREGA_GRATIS.longo}</span>
                </li>
                <li>
                  <a
                    href={whatsappHref ?? "/#contato"}
                    target={whatsappHref ? "_blank" : undefined}
                    rel={whatsappHref ? "noopener noreferrer" : undefined}
                    className="flex h-full items-start gap-3 rounded-2xl bg-gelo p-4 transition hover:bg-gelo/60 hover:ring-1 hover:ring-azul/30"
                  >
                    <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-azul" aria-hidden="true" />
                    <span className="text-[14px] leading-snug text-texto">
                      Dúvida sobre este produto? <span className="font-semibold text-azul">Fale com a farmacêutica</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </article>
        </div>

        {parecidos.length > 0 && categoria && (
          <div className="mt-8">
            <Prateleira
              id="parecidos"
              rotulo={categoria.nome}
              titulo="Você também pode gostar"
              verTodos={{ href: `/categoria/${categoria.slug}/`, texto: "Ver todos" }}
            >
              {parecidos.map((x, i) => (
                <ItemPrateleira key={x.ean} indice={i}>
                  <CardProduto produto={x} />
                </ItemPrateleira>
              ))}
            </Prateleira>
          </div>
        )}

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />
      </main>
      <Footer />
    </>
  );
}
