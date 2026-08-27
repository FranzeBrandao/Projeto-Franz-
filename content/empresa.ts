/**
 * Dados institucionais da Farmácia Bem Estar.
 *
 * Campos marcados com "[A CONFIRMAR]" são placeholders explícitos aguardando
 * confirmação do cliente — nunca inventar valor real para eles.
 */

interface Empresa {
  nome: string;
  razaoSocial: string;
  cnpj: string;
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

  // Número antigo — banido do WhatsApp. Continua em uso para ligações,
  // SMS e tokens, mas não deve ser usado em links/botões de WhatsApp.
  telefone: {
    exibicao: "(88) 99981-3133",
    e164: "+5588999813133",
  },

  // Número novo, cadastrado para a API do WhatsApp Business (Meta).
  whatsapp: {
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

  // E-mail de contato definido pelo cliente. Ele optou por manter o Gmail
  // em vez de criar um e-mail no domínio do site — a decisão é dele e está
  // registrada aqui de propósito. Vale lembrar que a verificação de negócio
  // da Meta (API do WhatsApp) costuma pedir um e-mail no mesmo domínio do
  // site; se isso for exigido lá na frente, basta criar a conta na
  // Hostinger (ex: contato@farmaciabemestarsobral.com), trocar esta linha
  // e gerar o build de novo.
  email: "farmaciabemestarsobral@gmail.com",

  convenios: ["Grendene", "Faculdade Uninta"],

  ifood: {
    disponivel: true,
    url: "https://www.ifood.com.br/delivery/link-cardapio/sitemercado/339ef7e7-a47b-4677-8585-afc0b2bd2b56",
  },
};
