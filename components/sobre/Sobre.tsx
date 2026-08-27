import { HeartHandshake, ShieldCheck, Users } from "lucide-react";

const PILARES = [
  {
    icon: ShieldCheck,
    titulo: "Confiança",
    texto: "[ TEXTO A CONFIRMAR COM O CLIENTE ]",
  },
  {
    icon: HeartHandshake,
    titulo: "Cuidado",
    texto: "[ TEXTO A CONFIRMAR COM O CLIENTE ]",
  },
  {
    icon: Users,
    titulo: "Proximidade",
    texto: "[ TEXTO A CONFIRMAR COM O CLIENTE ]",
  },
];

export function Sobre() {
  return (
    <section id="sobre" className="border-b border-border py-16 md:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Quem somos</h2>
          <p className="mt-4 text-lg text-foreground/70">
            [ TEXTO INSTITUCIONAL A CONFIRMAR — quem somos, missão, visão e valores da
            Farmácia Bem Estar serão inseridos aqui a partir do material fornecido pelo
            cliente. ]
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PILARES.map(({ icon: Icon, titulo, texto }) => (
            <div key={titulo} className="rounded-xl border border-border bg-card p-6">
              <Icon className="h-8 w-8 text-secondary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">{titulo}</h3>
              <p className="mt-2 text-sm text-foreground/70">{texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
