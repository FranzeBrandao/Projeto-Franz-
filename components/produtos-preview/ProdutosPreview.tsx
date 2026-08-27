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
    <section id="produtos" className="border-b border-border bg-muted/40 py-16 md:py-24">
      <div className="container-page">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Produtos</h2>
        <p className="mt-4 max-w-2xl text-lg text-foreground/70">
          Uma prévia das categorias que você encontra na Farmácia Bem Estar. O catálogo
          completo, com busca, preços e compra online, chega em breve.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIAS.map(({ icon: Icon, nome }) => (
            <div
              key={nome}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary"
            >
              <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-foreground">{nome}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
