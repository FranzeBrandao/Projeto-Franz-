import { galeria } from "@/content/institucional";

export function Galeria() {
  // Sem fotos reais da farmácia, a seção não é publicada — nunca exibimos
  // imagem de banco como se fosse da loja.
  if (galeria.length === 0) return null;

  return (
    <section id="galeria" className="border-b border-border py-16 md:py-24">
      <div className="container-page">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          Nossa farmácia em fotos
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {galeria.map((foto) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={foto.src}
              src={foto.src}
              alt={foto.alt}
              loading="lazy"
              className="aspect-square w-full rounded-xl border border-border object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
