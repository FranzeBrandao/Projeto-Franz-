import { Ear, Gauge, Syringe, Truck } from "lucide-react";
import { empresa } from "@/content/empresa";

// Serviços confirmados pelo cliente — nunca listar algo não confirmado.
const SERVICOS = [
  { icon: Ear, nome: "Perfuração de orelha" },
  { icon: Gauge, nome: "Verificação de pressão" },
  { icon: Syringe, nome: "Aplicação de injetáveis" },
  { icon: Truck, nome: "Entrega a domicílio" },
];

export function Servicos() {
  return (
    <section id="servicos" className="border-b border-border py-16 md:py-24">
      <div className="container-page">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Serviços</h2>
        <p className="mt-4 max-w-2xl text-lg text-foreground/70">
          Cuidado completo, do atendimento farmacêutico à sua porta.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICOS.map(({ icon: Icon, nome }) => (
            <div
              key={nome}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary"
            >
              <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-foreground">{nome}</span>
            </div>
          ))}
        </div>

        {empresa.convenios.length > 0 && (
          <p className="mt-8 text-center text-sm text-foreground/60">
            Conveniado com{" "}
            <span className="font-semibold text-foreground/80">
              {empresa.convenios.join(" e ")}
            </span>
            .
          </p>
        )}
      </div>
    </section>
  );
}
