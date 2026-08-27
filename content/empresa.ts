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

  telefone: {
    exibicao: "(88) 99981-3133",
    e164: "+5588999813133",
  },

  // [A CONFIRMAR] — mesmo número do telefone acima ou um número diferente?
  whatsapp: {
    exibicao: "[WHATSAPP A CONFIRMAR]",
    e164: "",
  },

  horarioFuncionamento: [
    { dias: "Segunda a Sábado", horario: "07h às 22h" },
    { dias: "Domingo e feriado", horario: "08h às 22h" },
  ],

  // [A CONFIRMAR] — nenhuma URL de rede social foi fornecida ainda.
  redesSociais: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },

  email: "", // [A CONFIRMAR]
};
