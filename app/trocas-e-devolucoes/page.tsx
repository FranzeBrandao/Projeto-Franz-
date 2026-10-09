import type { Metadata } from "next";
import { PaginaTexto, Confirmar } from "@/components/ui/PaginaTexto";
import { empresa } from "@/content/empresa";

export const metadata: Metadata = {
  title: "Trocas e devoluções",
  description: `Como funcionam as trocas e devoluções na ${empresa.nome}, em Sobral - CE.`,
  alternates: { canonical: "/trocas-e-devolucoes/" },
};

export default function TrocasPage() {
  return (
    <PaginaTexto titulo="Trocas e devoluções">
      <p>
        Queremos que você fique satisfeito com o que comprou. Se algo não saiu como esperado, fale com a gente pelo
        WhatsApp {empresa.whatsapp.exibicao} ou na loja.
      </p>

      <h2>Quando fazemos a troca</h2>
      <ul className="space-y-2">
        <li>Produto com defeito ou avariado.</li>
        <li>Produto diferente do que foi pedido (erro nosso).</li>
        <li>Produto com validade vencida ou muito próxima do vencimento na entrega.</li>
      </ul>

      <h2>O que precisamos</h2>
      <ul className="space-y-2">
        <li>O produto com a embalagem e o lacre originais, quando houver.</li>
        <li>A nota ou o comprovante do pedido.</li>
        <li>
          Aviso dentro do prazo de <Confirmar />.
        </li>
      </ul>

      <h2>Medicamentos e produtos de saúde</h2>
      <p>
        Por segurança sanitária, medicamentos e produtos de saúde só são trocados nos casos acima (defeito, erro
        nosso ou validade), com a embalagem íntegra. A farmacêutica responsável avalia cada caso. <Confirmar>
          [CONFIRMAR com a responsável técnica]
        </Confirmar>
      </p>

      <h2>Compras pelo WhatsApp e arrependimento</h2>
      <p>
        Nas compras feitas à distância, você pode desistir da compra nos prazos e condições do Código de Defesa do
        Consumidor, respeitadas as regras sanitárias que valem para cada tipo de produto. Fale com a gente para
        combinar a devolução ou o reembolso. <Confirmar>[CONFIRMAR forma de reembolso]</Confirmar>
      </p>
    </PaginaTexto>
  );
}
