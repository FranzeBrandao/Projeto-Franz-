/**
 * Dados institucionais da Farmácia Bem Estar.
 *
 * Campos marcados com "[A CONFIRMAR]" são placeholders explícitos aguardando
 * confirmação do cliente — nunca inventar valor real para eles.
 */

interface Empresa {
  nome: string;
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

  // [A CONFIRMAR] — só temos o status pontual do Google ("Abre às 07:00"),
  // falta a grade completa (segunda a sexta, sábado, domingo).
  horarioFuncionamento: [
    { dias: "Segunda a Sexta", horario: "[A CONFIRMAR]" },
    { dias: "Sábado", horario: "[A CONFIRMAR]" },
    { dias: "Domingo", horario: "[A CONFIRMAR]" },
  ],

  // [A CONFIRMAR] — nenhuma URL de rede social foi fornecida ainda.
  redesSociais: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },

  email: "", // [A CONFIRMAR]
};
