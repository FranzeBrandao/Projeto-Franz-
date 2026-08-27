import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import { FaixaInfo } from "@/components/faixa-info/FaixaInfo";
import { Sobre } from "@/components/sobre/Sobre";
import { Servicos } from "@/components/servicos/Servicos";
import { ProdutosPreview } from "@/components/produtos-preview/ProdutosPreview";
import { Historia } from "@/components/historia/Historia";
import { Galeria } from "@/components/galeria/Galeria";
import { Localizacao } from "@/components/localizacao/Localizacao";
import { Contato } from "@/components/contato/Contato";
import { Footer } from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FaixaInfo />
        <Sobre />
        <Servicos />
        <ProdutosPreview />
        <Historia />
        <Galeria />
        <Localizacao />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
