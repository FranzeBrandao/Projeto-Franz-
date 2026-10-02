import { Info } from "lucide-react";
import { AVISO_MEDICAMENTOS } from "@/content/categorias";

/** Aviso obrigatório em toda tela que mostra medicamento (DESIGN.md §4.8). */
export function AvisoMedicamentos({ className = "" }: { className?: string }) {
  return (
    <p
      className={`rotulo flex items-start gap-2.5 rounded-xl border border-aviso-borda bg-aviso px-4 py-3 text-[14px] leading-snug text-texto ${className}`}
    >
      <Info className="mt-px h-[18px] w-[18px] shrink-0 text-texto" aria-hidden="true" />
      {AVISO_MEDICAMENTOS}
    </p>
  );
}
