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
  horarioFuncionamento: Array<{ dias: string; horario: string }>;
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
    { dias: "Segunda a Sábado", horario: "07h às 22h" },
    { dias: "Domingo e feriado", horario: "08h às 22h" },
  ],

  redesSociais: {
    instagram: "https://www.instagram.com/farmaciabemestar_sobral/",
    facebook: "https://www.facebook.com/farmaciabemestarsobral",
    tiktok: "",
  },

  email: "", // [A CONFIRMAR]

  convenios: ["Grendene", "Faculdade Uninta"],

  // [A CONFIRMAR] — cliente informou que também está no iFood, mas ainda
  // não enviou o link da loja. Sem URL, o site menciona o iFood sem
  // transformar em link clicável.
  ifood: {
    disponivel: true,
    url: "",
  },
};
