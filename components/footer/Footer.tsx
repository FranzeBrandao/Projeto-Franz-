import { Facebook, Instagram } from "lucide-react";
import { empresa } from "@/content/empresa";

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-heading text-lg font-semibold">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-secondary-foreground"
            >
              FB
            </span>
            {empresa.nome}
          </div>
          <p className="mt-3 text-sm text-background/70">{empresa.endereco.completo}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-background/60">
            Contato
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-background/80">
            <li>{empresa.telefone.exibicao}</li>
            <li>{empresa.whatsapp.exibicao}</li>
            <li>{empresa.email || "[ E-MAIL A CONFIRMAR ]"}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-background/60">
            Horário
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-background/80">
            {empresa.horarioFuncionamento.map((item) => (
              <li key={item.dias}>
                {item.dias}: {item.horario}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-background/60">
            Institucional
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-background/80">
            <li>
              <a href="/politica-privacidade" className="hover:text-primary">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="/termos-de-uso" className="hover:text-primary">
                Termos de Uso
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a
              href={empresa.redesSociais.instagram || "#contato"}
              aria-label="Instagram da Farmácia Bem Estar"
              className="text-background/70 hover:text-primary"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={empresa.redesSociais.facebook || "#contato"}
              aria-label="Facebook da Farmácia Bem Estar"
              className="text-background/70 hover:text-primary"
            >
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 py-5">
        <p className="container-page text-center text-xs text-background/60">
          © {new Date().getFullYear()} {empresa.nome}. Todos os direitos reservados.
          CNPJ [A CONFIRMAR].
        </p>
      </div>
    </footer>
  );
}
