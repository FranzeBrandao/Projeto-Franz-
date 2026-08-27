import { Clock, MapPin, Phone } from "lucide-react";
import { empresa } from "@/content/empresa";

/**
 * Faixa escura logo abaixo do topo, com o que mais se pergunta a uma
 * farmácia de bairro: se está aberta, onde fica e para qual número ligar.
 * O azul vem do painel da fachada.
 */
export function FaixaInfo() {
  return (
    <section
      aria-label="Horário, endereço e telefone"
      className="textura-cruz border-y border-ink-line bg-ink text-ink-foreground"
    >
      <div className="container-page grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="flex items-start gap-3 py-6 sm:pr-8">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-white/50" aria-hidden="true" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Aberto
            </p>
            <ul className="mt-1.5 space-y-0.5 text-sm">
              {empresa.horarioFuncionamento.map((item) => (
                <li key={item.dias}>
                  <span className="text-ink-muted">{item.dias}</span>{" "}
                  <span className="font-semibold">{item.horario}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-3 py-6 sm:px-8">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-white/50" aria-hidden="true" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Onde estamos
            </p>
            <p className="mt-1.5 text-sm font-semibold">{empresa.endereco.linha}</p>
            <p className="text-sm text-ink-muted">
              {empresa.endereco.cidade} - {empresa.endereco.uf}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 py-6 sm:pl-8">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-white/50" aria-hidden="true" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Telefone
            </p>
            <a
              href={`tel:${empresa.telefone.e164}`}
              className="mt-1.5 block text-sm font-semibold underline-offset-4 hover:underline"
            >
              {empresa.telefone.exibicao}
            </a>
            <p className="text-sm text-ink-muted">Ligações e mensagens</p>
          </div>
        </div>
      </div>
    </section>
  );
}
