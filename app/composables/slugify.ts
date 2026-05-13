export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')                     // separa le lettere dagli accenti
    .replace(/[\u0300-\u036f]/g, '')      // rimuove gli accenti
    .replace(/[^a-z0-9\s-]/g, '')         // rimuove caratteri speciali
    .replace(/\s+/g, '-')                 // spazi → trattini
    .replace(/-+/g, '-');                 // trattini multipli → uno solo
}