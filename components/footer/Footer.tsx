import { Facebook, Instagram } from "lucide-react";
import { empresa } from "@/content/empresa";
import { asset } from "@/lib/asset";
import { categorias } from "@/content/categorias";
import { linkPedidoGeral, WHATSAPP_PEDIDOS_EXIBICAO } from "@/content/pedidos";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-noite text-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          {/* Logo oficial, enviada pelo cliente — ver public/logo-oficial.webp.
              <img> em vez de next/image: o site é exportado como estático
              (images.unoptimized). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/logo-oficial.webp")} alt={empresa.nome} className="h-10 w-auto" />
          <p className="mt-4 font-display text-sm font-semibold">{empresa.nome}</p>
          {/* Razão social, CNPJ e endereço completo ficam visíveis no rodapé:
              é o que a verificação de negócio da Meta procura no site. */}
          <p className="mt-1 text-xs text-white/70">
            {empresa.razaoSocial} — CNPJ {empresa.cnpj}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {empresa.endereco.completo}
          </p>
        </div>

        <div>
          <h3 className="rotulo text-[13px] text-white/60">
            Contato
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              Telefone:{" "}
              <a
                href={`tel:${empresa.telefone.e164}`}
                className="text-white underline-offset-4 hover:underline"
              >
                {empresa.telefone.exibicao}
              </a>
            </li>
            <li>
              Pedidos:{" "}
              <a
                href={linkPedidoGeral()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline-offset-4 hover:underline"
              >
                {WHATSAPP_PEDIDOS_EXIBICAO}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <span className="text-white">{empresa.whatsapp.exibicao}</span>
            </li>
            {empresa.email && (
              <li>
                <a
                  href={`mailto:${empresa.email}`}
                  className="break-words text-white underline-offset-4 hover:underline"
                >
                  {empresa.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="rotulo text-[13px] text-white/60">
            Categorias
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {categorias.map((c) => (
              <li key={c.slug}>
                <a href={`/categoria/${c.slug}/`} className="underline-offset-4 hover:text-white hover:underline">
                  {c.nome}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="rotulo text-[13px] text-white/60">
            Horário
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {empresa.horarioFuncionamento.map((item) => (
              <li key={item.dias}>
                {item.dias}: <span className="text-white">{item.horario}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="rotulo text-[13px] text-white/60">
            Institucional
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <a href="/politica-privacidade" className="underline-offset-4 hover:text-white hover:underline">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="/termos-de-uso" className="underline-offset-4 hover:text-white hover:underline">
                Termos de Uso
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a
              href={empresa.redesSociais.instagram || "#contato"}
              aria-label="Instagram da Farmácia Bem Estar"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/15 hover:text-white"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={empresa.redesSociais.facebook || "#contato"}
              aria-label="Facebook da Farmácia Bem Estar"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/15 hover:text-white"
            >
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="container-page text-center text-xs leading-relaxed text-white/70">
          © {new Date().getFullYear()} {empresa.razaoSocial}. Todos os direitos
          reservados. CNPJ {empresa.cnpj}. Farmacêutica responsável:{" "}
          {empresa.farmaceuticaResponsavel.nome} ({empresa.farmaceuticaResponsavel.crf}).
        </p>
      </div>
    </footer>
  );
}
