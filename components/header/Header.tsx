"use client";

import { useState } from "react";
import { Menu, X, Phone, Instagram, Facebook } from "lucide-react";
import { empresa } from "@/content/empresa";

const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre Nós" },
  { href: "#servicos", label: "Serviços" },
  { href: "#produtos", label: "Produtos" },
  { href: "#historia", label: "Nossa História" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-page flex h-18 items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center">
          {/* Reconstrução provisória da logo — ver public/logo.svg */}
          <img src="/logo.svg" alt={empresa.nome} className="h-11 w-auto" />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${empresa.telefone.e164}`}
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {empresa.telefone.exibicao}
          </a>
          <a
            href="#contato"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Falar no WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-foreground lg:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="menu-mobile"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="menu-mobile"
          aria-label="Navegação mobile"
          className="border-t border-border bg-background px-4 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-4 border-t border-border pt-4">
            <a
              href={empresa.redesSociais.instagram || "#contato"}
              aria-label="Instagram da Farmácia Bem Estar"
              className="text-foreground/70 hover:text-primary"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={empresa.redesSociais.facebook || "#contato"}
              aria-label="Facebook da Farmácia Bem Estar"
              className="text-foreground/70 hover:text-primary"
            >
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
