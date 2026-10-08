import type { ReactNode } from "react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Trilha } from "@/components/ui/Trilha";

/** Moldura das páginas de texto (política, como pedir, trocas): cabeçalho, título e rodapé. */
export function PaginaTexto({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="container-page pb-16">
        <Trilha itens={[{ nome: "Início", href: "/" }, { nome: titulo }]} />
        <h1 className="mt-5 text-[30px] font-bold leading-tight sm:text-[40px]">{titulo}</h1>
        <div className="mt-6 max-w-3xl space-y-4 text-[16px] leading-relaxed text-texto [&_a]:font-medium [&_a]:text-azul [&_a]:underline [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-[22px] [&_h2]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_ol>li]:list-decimal">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

/** Campo que o cliente ainda precisa confirmar: aparece destacado para não passar despercebido. */
export function Confirmar({ children = "[CONFIRMAR]" }: { children?: ReactNode }) {
  return <mark className="rounded bg-aviso px-1 text-texto">{children}</mark>;
}
