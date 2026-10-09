import type { Metadata } from "next";
import { PaginaTexto, Confirmar } from "@/components/ui/PaginaTexto";
import { empresa } from "@/content/empresa";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como a ${empresa.nome} trata os seus dados pessoais, conforme a Lei Geral de Proteção de Dados (LGPD).`,
  alternates: { canonical: "/politica-privacidade/" },
};

/*
 * Texto-base escrito a partir do que o site realmente faz (sem cadastro,
 * login, pagamento nem ferramentas de rastreamento). Revisar com
 * profissional jurídico antes de considerar definitivo, e atualizar se o
 * site passar a usar análise de acessos, widget de atendimento (Digisac) etc.
 */
export default function PoliticaPrivacidadePage() {
  return (
    <PaginaTexto titulo="Política de Privacidade">
      <p>
        Esta política explica como a {empresa.razaoSocial} (CNPJ {empresa.cnpj}), que usa o nome {empresa.nome}, trata
        dados pessoais neste site e no atendimento pelo WhatsApp, em respeito à Lei Geral de Proteção de Dados (Lei
        nº 13.709/2018, a LGPD). Última atualização: <Confirmar>[CONFIRMAR data]</Confirmar>.
      </p>

      <h2>Quem é o responsável pelos dados</h2>
      <p>
        {empresa.razaoSocial}, {empresa.endereco.completo}. Contato para assuntos de privacidade:{" "}
        <a href={`mailto:${empresa.email}`}>{empresa.email}</a>. Encarregado pelo tratamento de dados (DPO):{" "}
        <Confirmar />.
      </p>

      <h2>Quais dados tratamos</h2>
      <ul className="space-y-2">
        <li>
          <strong>Neste site:</strong> não há cadastro, login nem pagamento. Para o site funcionar e ser seguro, a
          hospedagem pode registrar dados técnicos de acesso, como endereço IP, tipo de navegador e páginas visitadas.
        </li>
        <li>
          <strong>No WhatsApp:</strong> quando você nos chama, recebemos seu número, o nome do seu perfil e o conteúdo
          da conversa (produtos, endereço de entrega, forma de pagamento e, se você enviar, receita médica).
        </li>
        <li>
          <strong>Dados de saúde:</strong> receitas e informações sobre medicamentos são dados sensíveis. Usamos
          somente para atender o seu pedido e cumprir as regras sanitárias.
        </li>
      </ul>

      <h2>Para que usamos</h2>
      <ul className="space-y-2">
        <li>Atender e entregar o seu pedido e tirar dúvidas.</li>
        <li>Cumprir obrigações legais e sanitárias da farmácia, como o registro de dispensação de medicamentos.</li>
        <li>Manter o site seguro e funcionando.</li>
      </ul>

      <h2>Com quem compartilhamos</h2>
      <p>
        Somente quando necessário: entregadores (nome, endereço e telefone, para a entrega), o WhatsApp/Meta (que
        opera a plataforma de conversa e tem política própria), a empresa de hospedagem do site e autoridades, quando
        a lei exigir. Não vendemos seus dados.
      </p>

      <h2>Cookies</h2>
      <p>
        Este site não usa cookies de publicidade nem de rastreamento próprios. Se isso mudar, atualizaremos esta
        política e avisaremos no site.
      </p>

      <h2>Por quanto tempo guardamos</h2>
      <p>
        Pelo tempo necessário para atender o pedido e para cumprir prazos legais e sanitários. Depois, apagamos ou
        anonimizamos. <Confirmar>[CONFIRMAR prazos de guarda]</Confirmar>
      </p>

      <h2>Seus direitos</h2>
      <p>
        Você pode pedir, a qualquer momento: confirmação de que tratamos seus dados, acesso, correção, anonimização
        ou eliminação, informação sobre com quem compartilhamos, portabilidade e a revogação de consentimento, nos
        termos do art. 18 da LGPD. Escreva para <a href={`mailto:${empresa.email}`}>{empresa.email}</a> ou chame no
        WhatsApp {empresa.whatsapp.exibicao}. Você também pode reclamar à Autoridade Nacional de Proteção de Dados
        (ANPD).
      </p>
    </PaginaTexto>
  );
}
