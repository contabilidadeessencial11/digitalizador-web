// Digitalizador (versão web) — criação do PDF: cada página é uma imagem JPEG, incluída sem recompressão.

/** Largura e altura de um JPEG, lidas do cabeçalho (marcador SOF). */
function dimensoesJpeg(b) {
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xFF) { i++; continue; }
    const marcador = b[i + 1];
    const tamanho = (b[i + 2] << 8) | b[i + 3];
    if ((marcador >= 0xC0 && marcador <= 0xC3) || (marcador >= 0xC5 && marcador <= 0xC7) ||
        (marcador >= 0xC9 && marcador <= 0xCB) || (marcador >= 0xCD && marcador <= 0xCF)) {
      return { h: (b[i + 5] << 8) | b[i + 6], w: (b[i + 7] << 8) | b[i + 8], componentes: b[i + 9] };
    }
    i += 2 + tamanho;
  }
  throw new Error('JPEG inválido');
}

/**
 * Cria um PDF com uma página por JPEG. A página tem a largura de uma folha A4 (595 pt) e a altura
 * proporcional à imagem. jpegs: lista de Uint8Array. Devolve um Blob.
 */
function criarPdf(jpegs) {
  const partes = [];
  let posicao = 0;
  const offsets = [];
  const enc = new TextEncoder();
  function escrever(x) {
    const b = typeof x === 'string' ? enc.encode(x) : x;
    partes.push(b); posicao += b.length;
  }
  const n = jpegs.length;
  // objetos: 1 catálogo, 2 páginas; por página k: página, conteúdo, imagem
  const idPagina = k => 3 + 3 * k, idConteudo = k => 4 + 3 * k, idImagem = k => 5 + 3 * k;
  const total = 2 + 3 * n;
  function abrir(id) { offsets[id] = posicao; escrever(`${id} 0 obj\n`); }

  escrever('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  abrir(1); escrever('<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  abrir(2);
  escrever(`<< /Type /Pages /Count ${n} /Kids [${jpegs.map((_, k) => `${idPagina(k)} 0 R`).join(' ')}] >>\nendobj\n`);
  jpegs.forEach((j, k) => {
    const d = dimensoesJpeg(j);
    const larg = 595.28, alt = +(larg * d.h / d.w).toFixed(2);
    abrir(idPagina(k));
    escrever(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${larg} ${alt}] ` +
             `/Resources << /XObject << /Im${k} ${idImagem(k)} 0 R >> >> /Contents ${idConteudo(k)} 0 R >>\nendobj\n`);
    const conteudo = `q ${larg} 0 0 ${alt} 0 0 cm /Im${k} Do Q\n`;
    abrir(idConteudo(k));
    escrever(`<< /Length ${enc.encode(conteudo).length} >>\nstream\n${conteudo}endstream\nendobj\n`);
    abrir(idImagem(k));
    const cor = d.componentes === 1 ? '/DeviceGray' : '/DeviceRGB';
    escrever(`<< /Type /XObject /Subtype /Image /Width ${d.w} /Height ${d.h} /ColorSpace ${cor} ` +
             `/BitsPerComponent 8 /Filter /DCTDecode /Length ${j.length} >>\nstream\n`);
    escrever(j);
    escrever('\nendstream\nendobj\n');
  });
  const xref = posicao;
  let tabela = `xref\n0 ${total + 1}\n0000000000 65535 f \n`;
  for (let id = 1; id <= total; id++) tabela += String(offsets[id]).padStart(10, '0') + ' 00000 n \n';
  escrever(tabela);
  escrever(`trailer\n<< /Size ${total + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  return new Blob(partes, { type: 'application/pdf' });
}
