import { Ear, Gauge, ShoppingBag, Syringe, Truck } from "lucide-react";
import { empresa } from "@/content/empresa";
import { TituloSecao } from "@/components/ui/TituloSecao";

// Serviços confirmados pelo cliente — nunca listar nem descrever algo que
// ele não tenha confirmado (como se é feito, se exige receita, etc.).
const SERVICOS = [
  { icon: Ear, nome: "Perfuração de orelha" },
  { icon: Gauge, nome: "Verificação de pressão" },
  { icon: Syringe, nome: "Aplicação de injetáveis" },
  { icon: Truck, nome: "Entrega a domicílio" },
];

export function Servicos() {
  return (
    <section
      id="servicos"
      className="textura-cruz border-y border-ink-line bg-ink py-16 md:py-24"
    >
      <div className="container-page">
        <TituloSecao
          etiqueta="Na loja e na sua casa"
          titulo="Serviços"
          descricao="Cuidado completo, do atendimento farmacêutico à sua porta."
          escuro
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICOS.map(({ icon: Icon, nome }) => (
            <li
              key={nome}
              className="flex items-center gap-4 bg-ink px-6 py-7 lg:flex-col lg:items-start lg:gap-5 lg:px-6 lg:py-8"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary"
              >
                <Icon className="h-5 w-5 text-primary-foreground" />
              </span>
              <h3 className="font-heading text-base font-semibold leading-snug text-ink-foreground">
                {nome}
              </h3>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          {empresa.ifood.disponivel && empresa.ifood.url && (
            <a
              href={empresa.ifood.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-ink-foreground transition-colors hover:border-white/60 hover:bg-white/5"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Peça também pelo iFood
            </a>
          )}

          {empresa.convenios.length > 0 && (
            <p className="text-sm text-ink-muted">
              Conveniado com{" "}
              <span className="font-semibold text-ink-foreground">
                {empresa.convenios.join(" e ")}
              </span>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
