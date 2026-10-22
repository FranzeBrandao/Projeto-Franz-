/**
 * Dados institucionais da Farmácia Bem Estar.
 *
 * Campos marcados com "[A CONFIRMAR]" são placeholders explícitos aguardando
 * confirmação do cliente — nunca inventar valor real para eles.
 */

import { WHATSAPP_PEDIDOS, WHATSAPP_PEDIDOS_EXIBICAO } from "./pedidos";

interface Empresa {
  nome: string;
  razaoSocial: string;
  cnpj: string;
  /** Número da licença sanitária (alvará). "[CONFIRMAR]" até o cliente informar. */
  licencaSanitaria: string;
  /** Inscrição da farmácia (estabelecimento) no Conselho Regional de Farmácia. */
  inscricaoCrf: string;
  farmaceuticaResponsavel: {
    nome: string;
    crf: string;
  };
  endereco: {
    linha: string;
    cidade: string;
    uf: string;
    cep: string;
    completo: string;
  };
  telefone: {
    exibicao: string;
    e164: string;
  };
  whatsapp: {
    exibicao: string;
    e164: string;
  };
  whatsappApi: {
    exibicao: string;
    e164: string;
  };
  /**
   * `dias`/`horario` são o texto exibido no site. `diasSchema`, `abre` e
   * `fecha` alimentam os dados estruturados (Schema.org) que o Google lê —
   * ficam aqui para nunca divergirem do que a página mostra.
   */
  horarioFuncionamento: Array<{
    dias: string;
    horario: string;
    diasSchema: string[];
    abre: string;
    fecha: string;
  }>;
  redesSociais: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  email: string;
  convenios: string[];
  ifood: {
    disponivel: boolean;
    url: string;
  };
}

export const empresa: Empresa = {
  nome: "Farmácia Bem Estar",
  razaoSocial: "Farmácia Bem Estar LTDA",
  cnpj: "30.080.921/0001-72",
  // Licença sanitária regular, informada pelo cliente.
  licencaSanitaria: "LR0004/2026",
  // Inscrição da farmácia no CRF-CE, informada pelo cliente. Não confundir
  // com o CRF da farmacêutica responsável, logo abaixo.
  inscricaoCrf: "CRF-CE 12599",

  farmaceuticaResponsavel: {
    nome: "Kamila Soares Balreira",
    crf: "CRF 3105",
  },

  endereco: {
    linha: "Av. Sen. Fernandes Távora, 1359 - Gerardo Cristino",
    cidade: "Sobral",
    uf: "CE",
    cep: "62050-382",
    completo:
      "Av. Sen. Fernandes Távora, 1359 - Gerardo Cristino, Sobral - CE, 62050-382",
  },

  // Número principal: ligações, SMS e tokens. Não está mais banido do
  // WhatsApp e é o primeiro botão do link da bio (/compreaqui/).
  telefone: {
    exibicao: "(88) 99981-3133",
    e164: "+5588999813133",
  },

  // WhatsApp da farmácia: é o mesmo número dos pedidos (WhatsApp Business,
  // sem custo por mensagem), definido em `content/pedidos.ts` →
  // WHATSAPP_PEDIDOS. Trocando lá, muda no site inteiro.
  whatsapp: {
    exibicao: WHATSAPP_PEDIDOS_EXIBICAO,
    e164: `+${WHATSAPP_PEDIDOS}`,
  },

  // Número da API do WhatsApp Business (Meta). A verificação da Meta exige
  // que ele apareça no site, então fica no rodapé só como texto — sem link,
  // porque cada conversa iniciada nele é cobrada.
  whatsappApi: {
    exibicao: "(88) 99730-6141",
    e164: "+5588997306141",
  },

  horarioFuncionamento: [
    {
      dias: "Segunda a Sábado",
      horario: "07h às 22h",
      diasSchema: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      abre: "07:00",
      fecha: "22:00",
    },
    {
      dias: "Domingo e feriado",
      horario: "08h às 22h",
      diasSchema: ["Sunday", "PublicHolidays"],
      abre: "08:00",
      fecha: "22:00",
    },
  ],

  redesSociais: {
    instagram: "https://www.instagram.com/farmaciabemestar_sobral/",
    facebook: "https://www.facebook.com/farmaciabemestarsobral",
    tiktok: "",
  },

  // E-mail de contato no domínio do site, confirmado pelo cliente
  // (substitui o Gmail usado antes). A caixa precisa existir na Hostinger
  // (hPanel → E-mails) para receber mensagens.
  email: "contato@farmaciabemestarsobral.com",

  convenios: ["Grendene", "Faculdade Uninta"],

  ifood: {
    disponivel: true,
    url: "https://www.ifood.com.br/delivery/link-cardapio/sitemercado/339ef7e7-a47b-4677-8585-afc0b2bd2b56",
  },
};
