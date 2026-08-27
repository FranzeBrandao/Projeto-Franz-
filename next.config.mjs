/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Gera um site 100% estático em `out/`, para subir na hospedagem
  // compartilhada da Hostinger (public_html) sem precisar de Node.js.
  output: "export",

  // A otimização de imagem do Next.js exige um servidor Node; num export
  // estático as imagens são servidas como estão.
  images: {
    unoptimized: true,
  },

  // Gera /pagina/index.html em vez de /pagina.html, que é o formato que o
  // servidor da Hostinger (LiteSpeed/Apache) resolve corretamente.
  trailingSlash: true,
};

export default nextConfig;
