import { empresa } from "@/content/empresa";
import { siteUrl } from "@/content/site";

/**
 * Dados estruturados (Schema.org) para a busca do Google entender que este
 * é o site de uma farmácia física em Sobral, com endereço, telefone e
 * horário. Tudo vem de `content/empresa.ts` — nada é escrito à mão aqui,
 * para não divergir do que a página mostra.
 */
export function DadosEstruturados() {
  const dados = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: empresa.nome,
    legalName: empresa.razaoSocial,
    taxID: empresa.cnpj,
    url: siteUrl,
    image: `${siteUrl}/og-image.jpg`,
    logo: `${siteUrl}/logo-oficial.webp`,
    telephone: empresa.telefone.e164,
    ...(empresa.email ? { email: empresa.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: empresa.endereco.linha,
      addressLocality: empresa.endereco.cidade,
      addressRegion: empresa.endereco.uf,
      postalCode: empresa.endereco.cep,
      addressCountry: "BR",
    },
    openingHoursSpecification: empresa.horarioFuncionamento.map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: item.diasSchema,
      opens: item.abre,
      closes: item.fecha,
    })),
    sameAs: [empresa.redesSociais.instagram, empresa.redesSociais.facebook].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      // Conteúdo próprio, montado a partir de content/empresa.ts.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}
