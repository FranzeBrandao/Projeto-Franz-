import type { Metadata } from "next";
import { PaginaTexto, Confirmar } from "@/components/ui/PaginaTexto";
import { empresa } from "@/content/empresa";
import { AVISO_ENTREGA, ENTREGA_GRATIS } from "@/content/loja";
import { linkPedidoGeral } from "@/content/pedidos";

export const metadata: Metadata = {
  title: "Como pedir e entregar",
  description: `Como fazer seu pedido pelo WhatsApp na ${empresa.nome} e como funciona a entrega em Sobral e região.`,
  alternates: { canonical: "/como-pedir-e-entregar/" },
};

export default function ComoPedirPage() {
  return (
    <PaginaTexto titulo="Como pedir e entregar">
      <p>
        No nosso site você escolhe os produtos e finaliza o pedido pelo WhatsApp, sem cadastro, sem carrinho e sem
        pagar nada pelo site.
      </p>

      <h2>Como pedir</h2>
      <ol className="space-y-2">
        <li>Navegue pelas categorias ou use a busca e encontre o produto.</li>
        <li>
          Clique em <strong>Pedir pelo WhatsApp</strong>. O WhatsApp abre com a mensagem pronta, com o nome do
          produto, o preço e o código.
        </li>
        <li>Envie a mensagem. Nossa equipe confirma a disponibilidade, o valor total e combina a entrega.</li>
        <li>Pague e receba. Você também pode retirar na loja.</li>
      </ol>
      <p>
        Para fazer um pedido com vários produtos, mande a lista pelo mesmo WhatsApp:{" "}
        <a href={linkPedidoGeral()} target="_blank" rel="noopener noreferrer">
          {empresa.whatsapp.exibicao}
        </a>
        .
      </p>

      <h2>Entrega</h2>
      <ul className="space-y-2">
        <li>{ENTREGA_GRATIS.longo}.</li>
        <li>{AVISO_ENTREGA.longo}</li>
        <li>
          Prazo de entrega: <Confirmar />
        </li>
        <li>
          Formas de pagamento na entrega: <Confirmar />
        </li>
      </ul>

      <h2>Horário de atendimento</h2>
      <ul className="space-y-1">
        {empresa.horarioFuncionamento.map((h) => (
          <li key={h.dias}>
            {h.dias}: {h.horario}
          </li>
        ))}
      </ul>

      <h2>Medicamentos</h2>
      <p>
        Medicamentos que exigem receita só são dispensados mediante apresentação da receita, e a farmacêutica
        responsável orienta cada pedido. Dúvidas sobre um remédio? Fale com a nossa farmacêutica pelo WhatsApp.
      </p>
    </PaginaTexto>
  );
}
