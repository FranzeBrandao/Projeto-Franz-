import { galeria } from "@/content/institucional";
import { asset } from "@/lib/asset";
import { TituloSecao } from "@/components/ui/TituloSecao";

export function Galeria() {
  // Sem fotos reais da farmácia, a seção não é publicada — nunca exibimos
  // imagem de banco como se fosse da loja.
  if (galeria.length === 0) return null;

  const [destaque, ...demais] = galeria;

  return (
    <section
      id="galeria"
      className="textura-cruz border-y border-ink-line bg-ink py-16 md:py-24"
    >
      <div className="container-page">
        <TituloSecao
          etiqueta="Da inauguração até hoje"
          titulo="Nossa farmácia em fotos"
          escuro
        />

        {/* A primeira foto ocupa dois módulos: quebra a grade de quadrados
            iguais e dá um ponto de entrada para o olho. */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(destaque.src)}
            alt={destaque.alt}
            loading="lazy"
            className="col-span-2 aspect-[4/3] w-full rounded-2xl object-cover ring-1 ring-white/10 sm:aspect-[3/2] lg:row-span-2 lg:aspect-auto lg:h-full"
          />
          {demais.map((foto) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={foto.src}
              src={asset(foto.src)}
              alt={foto.alt}
              loading="lazy"
              className="aspect-square w-full rounded-2xl object-cover ring-1 ring-white/10"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
