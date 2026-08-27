/**
 * Prefixo dos arquivos de `public/`.
 *
 * Na hospedagem definitiva o site fica na raiz do domínio e o prefixo é
 * vazio — os caminhos ficam como estão ("/images/foto.webp").
 *
 * No link de prévia (GitHub Pages) o site fica numa subpasta. O `basePath`
 * do Next.js só reescreve `next/image` e `<Link>`; um `<img src="/...">`
 * comum continua apontando para a raiz do domínio e a imagem quebra. Por
 * isso o prefixo vem de `NEXT_PUBLIC_BASE_PATH`, definido só no build da
 * prévia.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(caminho: string): string {
  return `${basePath}${caminho}`;
}
