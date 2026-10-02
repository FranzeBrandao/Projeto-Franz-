import { Baby, Droplets, Flower2, Leaf, Pill, Smile, Sparkles, SprayCan, type LucideIcon } from "lucide-react";

/** Ícone de cada categoria — usado nos atalhos, no menu e na imagem provisória. */
const ICONES: Record<string, LucideIcon> = {
  medicamentos: Pill,
  perfumaria: SprayCan,
  fraldas: Baby,
  absorventes: Flower2,
  "higiene-pessoal": Droplets,
  dermocosmeticos: Sparkles,
  infantil: Smile,
  "vitaminas-e-suplementos": Leaf,
};

export function IconeCategoria({ slug, className }: { slug: string; className?: string }) {
  const Icone = ICONES[slug] ?? Pill;
  return <Icone className={className} aria-hidden="true" />;
}
