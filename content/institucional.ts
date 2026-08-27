/**
 * Conteúdo institucional editorial (textos e marcos históricos).
 *
 * As seções da Home que dependem deste arquivo só aparecem no site quando
 * houver conteúdo real aqui. Enquanto estiver vazio, a seção é omitida —
 * assim o site publicado nunca exibe texto de rascunho para o visitante.
 *
 * Para publicar uma seção, basta preencher os campos abaixo.
 */

/** Texto de apresentação da empresa (seção "Quem somos"). */
export const sobre: {
  texto: string;
  pilares: Array<{ titulo: string; texto: string }>;
} = {
  // Ex.: "A Farmácia Bem Estar nasceu em Sobral com o propósito de..."
  texto: "",
  // Ex.: [{ titulo: "Confiança", texto: "..." }]
  pilares: [],
};

/** Marcos da linha do tempo (seção "Nossa história"). */
export const historia: {
  texto: string;
  marcos: Array<{ ano: string; texto: string }>;
} = {
  texto: "",
  // Ex.: [{ ano: "2019", texto: "Inauguração da primeira loja" }]
  marcos: [],
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
