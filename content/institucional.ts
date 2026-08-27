/**
 * Conteúdo institucional editorial (textos e marcos históricos).
 *
 * As seções da Home que dependem deste arquivo só aparecem no site quando
 * houver conteúdo real aqui. Enquanto estiver vazio, a seção é omitida —
 * assim o site publicado nunca exibe texto de rascunho para o visitante.
 *
 * Para publicar uma seção, basta preencher os campos abaixo.
 */

/** Texto de apresentação da empresa (seção "Quem somos"), enviado pelo cliente. */
export const sobre: {
  texto: string;
  pilares: Array<{ titulo: string; texto: string }>;
} = {
  texto: `A Farmácia Bem Estar é uma farmácia particular, de bairro, criada para cuidar de pessoas e estar presente no dia a dia da nossa comunidade.

Atendemos clientes de todas as classes e valorizamos, acima de tudo, o bom atendimento, o respeito e a atenção com cada pessoa que entra em nossa farmácia. Para nós, cada cliente é único e merece ser ouvido e tratado com carinho.

Mais do que vender medicamentos e produtos, buscamos entender a necessidade de cada cliente e ajudar a encontrar a melhor solução para o seu problema, sempre com responsabilidade e dedicação.

Nosso compromisso é oferecer um atendimento próximo, humano e de confiança, construindo relacionamentos duradouros com nossos clientes.

Farmácia Bem Estar — cuidando de você, da sua família e da nossa comunidade.`,
  pilares: [
    {
      titulo: "Cuidado",
      texto:
        "Bom atendimento, respeito e atenção com cada pessoa que entra em nossa farmácia — cada cliente é único e merece ser ouvido e tratado com carinho.",
    },
    {
      titulo: "Responsabilidade",
      texto:
        "Buscamos entender a necessidade de cada cliente e ajudar a encontrar a melhor solução para o seu problema, com responsabilidade e dedicação.",
    },
    {
      titulo: "Proximidade",
      texto:
        "Atendimento próximo, humano e de confiança, construindo relacionamentos duradouros com nossos clientes.",
    },
  ],
};

/** Marcos da linha do tempo (seção "Nossa história"). */
export const historia: {
  texto: string;
  marcos: Array<{ ano: string; texto: string }>;
} = {
  texto: "",
  marcos: [{ ano: "2019", texto: "Inauguração da Farmácia Bem Estar, em 11 de fevereiro." }],
};

/**
 * Fotos reais da farmácia (seção "Nossa farmácia em fotos").
 * `src` deve apontar para um arquivo dentro de `public/images/`.
 */
export const galeria: Array<{ src: string; alt: string }> = [];

/**
 * Foto de destaque do topo da página (fachada da loja, por exemplo).
 * Enquanto for `null`, o topo mostra um cartão com horário e endereço
 * no lugar — nunca uma imagem genérica fingindo ser a loja.
 */
export const heroImagem: { src: string; alt: string } | null = null;
