import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import { AtalhosCategorias } from "@/components/home/AtalhosCategorias";
import { Vitrine } from "@/components/home/Vitrine";
import { FaixaConfianca } from "@/components/home/FaixaConfianca";
import { Sobre } from "@/components/sobre/Sobre";
import { Servicos } from "@/components/servicos/Servicos";
import { Historia } from "@/components/historia/Historia";
import { Galeria } from "@/components/galeria/Galeria";
import { Localizacao } from "@/components/localizacao/Localizacao";
import { Contato } from "@/components/contato/Contato";
import { Footer } from "@/components/footer/Footer";

/**
 * Página inicial: primeiro a loja (banner, categorias, vitrine), depois a
 * farmácia (quem somos, serviços, fotos, localização e contato).
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AtalhosCategorias />
        <Vitrine />
        <FaixaConfianca />
        <Sobre />
        <Servicos />
        <Historia />
        <Galeria />
        <Localizacao />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
