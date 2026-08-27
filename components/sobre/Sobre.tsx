import { sobre } from "@/content/institucional";

export function Sobre() {
  // Sem texto institucional confirmado, a seção não é publicada.
  if (!sobre.texto) return null;

  return (
    <section id="sobre" className="border-b border-border py-16 md:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Quem somos</h2>
          <p className="mt-4 whitespace-pre-line text-lg text-foreground/70">
            {sobre.texto}
          </p>
        </div>

        {sobre.pilares.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {sobre.pilares.map(({ titulo, texto }) => (
              <div key={titulo} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">{titulo}</h3>
                <p className="mt-2 text-sm text-foreground/70">{texto}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
