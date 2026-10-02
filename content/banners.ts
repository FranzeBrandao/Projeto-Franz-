import { ENTREGA_GRATIS } from "./loja";

/**
 * Slides do banner principal (carrossel da página inicial).
 *
 * `imagem` aponta para public/images/. Para trocar um banner, troque a foto
 * e os textos aqui. `link` pode ser uma âncora da página (#ofertas), uma
 * página do site ou o WhatsApp ("whatsapp-pedidos" / "whatsapp-contato").
 */
export interface Banner {
  rotulo: string;
  titulo: string;
  texto: string;
  botao: string;
  link: string;
  /** largura: largura real (px) da foto grande, para o navegador escolher o tamanho certo. */
  imagem: { src: string; srcMenor?: string; largura?: number; alt: string; posicao?: string };
}

export const banners: Banner[] = [
  {
    rotulo: "Farmácia Bem Estar · Sobral",
    titulo: "Sua farmácia de bairro, agora também no celular",
    texto: "Escolha os produtos aqui no site e finalize o pedido pelo WhatsApp, sem cadastro.",
    botao: "Ver ofertas",
    link: "#ofertas",
    imagem: {
      src: "/images/fachada-frente.webp",
      srcMenor: "/images/fachada-frente-720.webp",
      largura: 1200,
      alt: "Fachada da Farmácia Bem Estar, na Av. Sen. Fernandes Távora, em Sobral",
      posicao: "50% 40%",
    },
  },
  {
    rotulo: "Peça sem sair de casa",
    titulo: ENTREGA_GRATIS.longo,
    texto: "Mande seu pedido pelo WhatsApp e a gente leva até você.",
    botao: "Fazer pedido",
    link: "whatsapp-pedidos",
    imagem: {
      src: "/images/entrega-balcao.webp",
      alt: "Atendente da Farmácia Bem Estar entregando um pedido no balcão",
      posicao: "50% 60%",
    },
  },
  {
    rotulo: "Orientação de verdade",
    titulo: "Dúvida sobre um remédio? Fale com a nossa farmacêutica",
    texto: "A farmacêutica Kamila Balreira e a equipe orientam você no balcão e no WhatsApp.",
    botao: "Falar no WhatsApp",
    link: "whatsapp-contato",
    imagem: {
      src: "/images/kamila-proprietaria.webp",
      srcMenor: "/images/kamila-proprietaria-720.webp",
      largura: 900,
      alt: "Kamila Soares Balreira, farmacêutica responsável da Farmácia Bem Estar",
      posicao: "50% 25%",
    },
  },
  {
    rotulo: "Serviços na loja",
    titulo: "Perfuração de orelha, aferição de pressão e injetáveis",
    texto: "Atendimento com cuidado e segurança, sem precisar ir longe.",
    botao: "Ver serviços",
    link: "#servicos",
    imagem: {
      src: "/images/perfuracao-orelha.webp",
      srcMenor: "/images/perfuracao-orelha-720.webp",
      alt: "Perfuração de orelha sendo feita na Farmácia Bem Estar",
      posicao: "50% 30%",
    },
  },
];
