import {
  Pill,
  Sparkles,
  Droplets,
  Leaf,
  Baby,
  HeartPulse,
  ShieldPlus,
  Flower2,
} from "lucide-react";
import { TituloSecao } from "@/components/ui/TituloSecao";

// Categorias definidas no briefing do cliente para a fase 1 (vitrine, sem catálogo/preços ainda).
const CATEGORIAS = [
  { icon: Pill, nome: "Medicamentos" },
  { icon: Droplets, nome: "Higiene pessoal" },
  { icon: Sparkles, nome: "Beleza" },
  { icon: Flower2, nome: "Dermocosméticos" },
  { icon: Leaf, nome: "Vitaminas" },
  { icon: ShieldPlus, nome: "Suplementos" },
  { icon: Baby, nome: "Produtos infantis" },
  { icon: HeartPulse, nome: "Saúde e bem-estar" },
];

export function ProdutosPreview() {
  return (
    <section id="produtos" className="border-y border-border bg-muted/50 py-16 md:py-24">
      <div className="container-page">
        <TituloSecao
          etiqueta="O que você encontra"
          titulo="Produtos"
          descricao="Uma prévia das categorias disponíveis na loja. O catálogo completo, com busca, preços e compra online, chega em breve."
        />

        {/* São nomes de categoria, não produtos com página própria: uma
            lista de etiquetas diz isso melhor do que oito cartões iguais. */}
        <ul className="mt-10 flex flex-wrap gap-3">
          {CATEGORIAS.map(({ icon: Icon, nome }) => (
            <li
              key={nome}
              className="inline-flex items-center gap-2.5 rounded-full bg-card py-3 pl-4 pr-5 shadow-sm ring-1 ring-border"
            >
              <Icon className="h-[18px] w-[18px] text-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-foreground">{nome}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
