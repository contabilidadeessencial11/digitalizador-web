// Digitalizador (versão web) — ecrãs, câmara, importação, processamento, PDF e partilha.
'use strict';

const $ = id => document.getElementById(id);
const fotos = [];            // Blobs das fotografias, pela ordem em que foram tiradas ou importadas
let paginas = [];            // Blobs JPEG das páginas corrigidas
let pdfFinal = null;         // { blob, nome }
let pdfOriginais = null;
let fluxo = null;            // fluxo da câmara
let worker = null;
let nomeAtual = '';

// ---------- ecrãs ----------
function mostrar(id) {
  document.querySelectorAll('.ecra').forEach(e => e.classList.toggle('ativo', e.id === id));
  window.scrollTo(0, 0);
}
function erro(texto) { const e = $('erro'); e.textContent = texto || ''; e.hidden = !texto; }

function atualizarFotos() {
  const n = fotos.length;
  $('contador').textContent = n === 0 ? '' : (n === 1 ? '1 fotografia' : `${n} fotografias`);
  $('btCriar').disabled = n === 0;
  $('btLimpar').hidden = n === 0;
  const grelha = $('miniaturas');
  grelha.querySelectorAll('img').forEach(i => URL.revokeObjectURL(i.src));
  grelha.innerHTML = '';
  fotos.forEach((f, k) => {
    const fig = document.createElement('figure');
    const img = document.createElement('img'); img.src = URL.createObjectURL(f); img.alt = `Fotografia ${k + 1}`;
    const cap = document.createElement('figcaption'); cap.textContent = k + 1;
    const x = document.createElement('button'); x.className = 'tirar'; x.textContent = '×'; x.setAttribute('aria-label', 'Retirar');
    x.onclick = () => { fotos.splice(k, 1); atualizarFotos(); };
    fig.append(img, cap, x); grelha.append(fig);
  });
}

// ---------- câmara ----------
async function abrirCamara() {
  erro('');
  try {
    fluxo = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 4096 }, height: { ideal: 3072 } }
    });
  } catch (e) {
    erro('Não foi possível abrir a câmara. Confirme que deu autorização ao navegador para usar a câmara ' +
         '(ou use «Importar fotografias», tirando as fotografias com a aplicação Câmara).');
    return;
  }
  $('video').srcObject = fluxo;
  $('camara').classList.add('ativo');
  atualizarBotaoConcluir();
}
function fecharCamara() {
  if (fluxo) fluxo.getTracks().forEach(t => t.stop());
  fluxo = null;
  $('camara').classList.remove('ativo');
  atualizarFotos();
}
function atualizarBotaoConcluir() {
  $('btConcluirCamara').textContent = fotos.length ? `Concluir (${fotos.length})` : 'Concluir';
}
function fotografar() {
  const v = $('video');
  if (!v.videoWidth) return;
  const c = document.createElement('canvas');
  c.width = v.videoWidth; c.height = v.videoHeight;
  c.getContext('2d').drawImage(v, 0, 0);
  c.toBlob(b => { if (b) { fotos.push(b); atualizarBotaoConcluir(); } }, 'image/jpeg', 0.92);
  const cl = $('clarao'); cl.style.opacity = '0.8'; setTimeout(() => cl.style.opacity = '0', 120);
  if (navigator.vibrate) navigator.vibrate(30);
}

// ---------- processamento ----------
function criarWorker() {
  if (worker) worker.terminate();
  worker = new Worker('worker.js');
  return worker;
}

function processar() {
  erro('');
  if (!fotos.length) return;
  mostrar('ecraProcessar');
  $('fase').textContent = 'A preparar as fotografias…'; $('barra').style.width = '0%'; $('percentagem').textContent = '';
  const w = criarWorker();
  w.onmessage = ev => {
    const m = ev.data;
    if (m.tipo === 'progresso') {
      // a preparação vale 15% e a correção 85% da barra
      const fr = m.total ? m.feito / m.total : 0;
      const pct = m.fase.startsWith('A preparar') ? 15 * fr : m.fase.startsWith('A corrigir') ? 15 + 85 * fr : 100;
      $('fase').textContent = m.fase + '…';
      $('barra').style.width = pct.toFixed(0) + '%';
      $('percentagem').textContent = pct.toFixed(0) + '%';
    } else if (m.tipo === 'paginas') {
      terminar(m.paginas);
    } else if (m.tipo === 'originais') {
      // preparado logo a seguir às páginas: o botão partilha de imediato (o iPhone só deixa partilhar
      // em resposta direta a um toque)
      pdfOriginais = { blob: criarPdf(m.jpegs), nome: nomeAtual + ' - fotos originais.pdf' };
      $('btOriginais').disabled = false; $('btOriginais').textContent = 'PDF das fotos originais';
    } else if (m.tipo === 'erro') {
      mostrar('ecraFotos');
      erro('Ocorreu um erro ao corrigir as páginas: ' + m.mensagem +
           '. Se forem muitas fotografias, experimente dividir o documento em partes mais pequenas.');
    }
  };
  w.onerror = e => {
    mostrar('ecraFotos');
    erro('Ocorreu um erro ao corrigir as páginas (' + (e.message || 'erro desconhecido') + '). ' +
         'É possível que o telemóvel tenha ficado sem memória: experimente com menos fotografias de cada vez.');
  };
  w.postMessage({ tipo: 'processar', fotos: fotos.slice() });
}

function nomeDocumento() {
  const d = new Date(), p = n => String(n).padStart(2, '0');
  return `Documento ${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())} ${p(d.getHours())}${p(d.getMinutes())}`;
}

async function terminar(blobs) {
  paginas = blobs;
  const jpegs = await Promise.all(blobs.map(async b => new Uint8Array(await b.arrayBuffer())));
  nomeAtual = nomeDocumento();
  pdfFinal = { blob: criarPdf(jpegs), nome: nomeAtual + '.pdf' };
  pdfOriginais = null;
  $('btOriginais').disabled = true; $('btOriginais').textContent = 'A preparar o PDF das fotos originais…';
  worker.postMessage({ tipo: 'originais' });
  $('tituloResultado').textContent = blobs.length === 1 ? 'Documento pronto: 1 página' : `Documento pronto: ${blobs.length} páginas`;
  const grelha = $('paginas');
  grelha.querySelectorAll('img').forEach(i => URL.revokeObjectURL(i.src));
  grelha.innerHTML = '';
  blobs.forEach((b, k) => {
    const fig = document.createElement('figure');
    const img = document.createElement('img'); img.src = URL.createObjectURL(b); img.alt = `Página ${k + 1}`;
    const cap = document.createElement('figcaption'); cap.textContent = k + 1;
    fig.append(img, cap); grelha.append(fig);
  });
  mostrar('ecraResultado');
}

// ---------- partilhar / guardar ----------
async function partilharOuGuardar(doc, soGuardar) {
  const ficheiro = new File([doc.blob], doc.nome, { type: 'application/pdf' });
  if (!soGuardar && navigator.canShare && navigator.canShare({ files: [ficheiro] })) {
    try { await navigator.share({ files: [ficheiro], title: doc.nome }); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }      // o utilizador fechou a folha de partilha
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(doc.blob); a.download = doc.nome;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 60000);
}

// ---------- ligações ----------
$('btFotografar').onclick = abrirCamara;
$('btImportar').onclick = () => $('ficheiros').click();
$('ficheiros').onchange = ev => {
  // ordenadas pelo nome (as fotografias da câmara têm nomes sequenciais)
  const novos = Array.from(ev.target.files).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  fotos.push(...novos); ev.target.value = ''; atualizarFotos();
};
$('disparar').onclick = fotografar;
$('btConcluirCamara').onclick = fecharCamara;
$('btSairCamara').onclick = fecharCamara;
$('btCriar').onclick = processar;
$('btLimpar').onclick = () => { if (confirm('Apagar todas as fotografias?')) { fotos.length = 0; atualizarFotos(); } };
$('btPartilhar').onclick = () => pdfFinal && partilharOuGuardar(pdfFinal);
$('btDescarregar').onclick = () => pdfFinal && partilharOuGuardar(pdfFinal, true);
$('btOriginais').onclick = () => pdfOriginais && partilharOuGuardar(pdfOriginais);
$('btNovo').onclick = () => {
  if (!confirm('Começar um documento novo? As fotografias e o PDF atuais deixam de estar disponíveis.')) return;
  fotos.length = 0; paginas = []; pdfFinal = null; pdfOriginais = null;
  if (worker) { worker.terminate(); worker = null; }
  atualizarFotos(); mostrar('ecraFotos');
};
window.addEventListener('beforeunload', e => { if (fotos.length) { e.preventDefault(); e.returnValue = ''; } });

// funciona sem rede depois da primeira visita (e permite «Adicionar ao ecrã principal»)
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
atualizarFotos();
