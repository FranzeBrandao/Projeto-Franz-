import { Facebook, Instagram } from "lucide-react";
import { empresa } from "@/content/empresa";
import { asset } from "@/lib/asset";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* Logo oficial, enviada pelo cliente — ver public/logo-oficial.webp.
              <img> em vez de next/image: o site é exportado como estático
              (images.unoptimized). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/logo-oficial.webp")} alt={empresa.nome} className="h-10 w-auto" />
          <p className="mt-4 font-heading text-sm font-semibold">{empresa.nome}</p>
          {/* Razão social, CNPJ e endereço completo ficam visíveis no rodapé:
              é o que a verificação de negócio da Meta procura no site. */}
          <p className="mt-1 text-xs text-ink-muted">
            {empresa.razaoSocial} — CNPJ {empresa.cnpj}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {empresa.endereco.completo}
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
            Contato
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li>
              Telefone:{" "}
              <a
                href={`tel:${empresa.telefone.e164}`}
                className="text-ink-foreground underline-offset-4 hover:underline"
              >
                {empresa.telefone.exibicao}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <span className="text-ink-foreground">{empresa.whatsapp.exibicao}</span>
            </li>
            {empresa.email && (
              <li>
                <a
                  href={`mailto:${empresa.email}`}
                  className="break-words text-ink-foreground underline-offset-4 hover:underline"
                >
                  {empresa.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
            Horário
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            {empresa.horarioFuncionamento.map((item) => (
              <li key={item.dias}>
                {item.dias}: <span className="text-ink-foreground">{item.horario}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
            Institucional
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li>
              <a href="/politica-privacidade" className="underline-offset-4 hover:text-ink-foreground hover:underline">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="/termos-de-uso" className="underline-offset-4 hover:text-ink-foreground hover:underline">
                Termos de Uso
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a
              href={empresa.redesSociais.instagram || "#contato"}
              aria-label="Instagram da Farmácia Bem Estar"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-ink-muted ring-1 ring-white/10 transition-colors hover:bg-white/15 hover:text-ink-foreground"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={empresa.redesSociais.facebook || "#contato"}
              aria-label="Facebook da Farmácia Bem Estar"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-ink-muted ring-1 ring-white/10 transition-colors hover:bg-white/15 hover:text-ink-foreground"
            >
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="container-page text-center text-xs leading-relaxed text-ink-muted">
          © {new Date().getFullYear()} {empresa.razaoSocial}. Todos os direitos
          reservados. CNPJ {empresa.cnpj}. Farmacêutica responsável:{" "}
          {empresa.farmaceuticaResponsavel.nome} ({empresa.farmaceuticaResponsavel.crf}).
        </p>
      </div>
    </footer>
  );
}
