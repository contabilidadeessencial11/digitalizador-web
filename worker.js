// Digitalizador (versão web) — processamento das fotografias num Worker, para o ecrã não bloquear.
// O motor de correção (motor.js) é o mesmo da aplicação Android, compilado para JavaScript.
importScripts('jpeg-decoder.js', 'motor.js');

const api = self.motor.pt.decisaoessencial.digitalizador;
const LADO_GRANDE = 3000;      // limite de memória do Safari no iPhone: as fotografias são reduzidas a 3000 píxeis
const LADO_PEQUENO = 1600;     // análise rápida (orientação, lombada, tamanho da folha)

let fotos = [];                // [{ grande: Uint8Array (JPEG), pequena: Uint8Array (JPEG) }]

function avisar(dados) { self.postMessage(dados); }

/** Lê uma fotografia (já com a orientação da câmara aplicada) e guarda-a em JPEG em dois tamanhos. */
async function preparar(blob) {
  const bmp = await createImageBitmap(blob, { imageOrientation: 'from-image' });
  async function jpeg(lado) {
    const s = Math.min(1, lado / Math.max(bmp.width, bmp.height));
    const w = Math.max(1, Math.round(bmp.width * s)), h = Math.max(1, Math.round(bmp.height * s));
    const c = new OffscreenCanvas(w, h);
    const g = c.getContext('2d');
    g.imageSmoothingQuality = 'high';
    g.drawImage(bmp, 0, 0, w, h);
    const b = await c.convertToBlob({ type: 'image/jpeg', quality: 0.92 });
    return new Uint8Array(await b.arrayBuffer());
  }
  const grande = await jpeg(LADO_GRANDE);
  const pequena = await jpeg(LADO_PEQUENO);
  bmp.close();
  return { grande, pequena };
}

/** JPEG → imagem do motor (píxeis ARGB). Síncrono: o motor pede as fotografias durante o processamento. */
function carregar(i, lado) {
  const f = fotos[i];
  if (!f) return null;
  const bytes = lado <= LADO_PEQUENO ? f.pequena : f.grande;
  const d = self.decodificarJpeg(bytes, { useTArray: true, formatAsRGBA: true, maxMemoryUsageInMB: 1500 });
  const n = d.width * d.height, rgba = d.data, px = new Int32Array(n);
  for (let k = 0, j = 0; k < n; k++, j += 4) px[k] = (255 << 24) | (rgba[j] << 16) | (rgba[j + 1] << 8) | rgba[j + 2];
  return new api.ImagemJs(d.width, d.height, px);
}

/** Página do motor (ARGB) → JPEG. */
function paginaParaJpeg(p) {
  const w = p.w, h = p.h, px = p.px;
  const dados = new ImageData(w, h), d = dados.data;
  for (let k = 0, j = 0; k < px.length; k++, j += 4) {
    const v = px[k];
    d[j] = (v >> 16) & 255; d[j + 1] = (v >> 8) & 255; d[j + 2] = v & 255; d[j + 3] = 255;
  }
  const c = new OffscreenCanvas(w, h);
  c.getContext('2d').putImageData(dados, 0, 0);
  return c.convertToBlob({ type: 'image/jpeg', quality: 0.85 });
}

self.onmessage = async (ev) => {
  const m = ev.data;
  try {
    if (m.tipo === 'processar') {
      // 1) preparar as fotografias (rodar segundo a câmara, reduzir, guardar em JPEG)
      fotos = [];
      for (let i = 0; i < m.fotos.length; i++) {
        avisar({ tipo: 'progresso', fase: 'A preparar as fotografias', feito: i, total: m.fotos.length });
        fotos.push(await preparar(m.fotos[i]));
      }
      // 2) corrigir (motor da aplicação Android)
      const pendentes = [];
      api.processarDocumento(fotos.length,
        (i, lado) => carregar(i, lado),
        (p) => { pendentes.push(paginaParaJpeg(p)); },
        (feito, total) => avisar({ tipo: 'progresso', fase: 'A corrigir as páginas', feito, total }));
      avisar({ tipo: 'progresso', fase: 'A terminar', feito: 1, total: 1 });
      const paginas = await Promise.all(pendentes);
      avisar({ tipo: 'paginas', paginas });
    } else if (m.tipo === 'originais') {
      // fotografias originais (já endireitadas pela câmara), para o PDF das fotos originais
      avisar({ tipo: 'originais', jpegs: fotos.map(f => f.grande) });
    }
  } catch (e) {
    avisar({ tipo: 'erro', mensagem: (e && e.message) ? e.message : String(e) });
  }
};
