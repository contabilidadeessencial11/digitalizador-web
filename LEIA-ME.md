# Digitalizador — versão web (Decisão Essencial)

Aplicação web para digitalizar documentos e livros para PDF, no iPhone, no Android e no computador.
O motor de correção das páginas é o mesmo da aplicação Android (ficheiro `motor.js`, gerado a partir de
`CorrecaoPaginas.kt`). Não altere o `motor.js` à mão.

## Publicar (GitHub Pages)

1. Carregar todos os ficheiros desta pasta para a raiz do repositório `digitalizador-web`.
2. Settings → Pages → Source: **Deploy from a branch** → Branch: **main**, pasta **/ (root)** → Save.
3. Ao fim de 1 a 2 minutos, a aplicação fica em `https://<utilizador>.github.io/digitalizador-web/`.

## Instalar no telemóvel

- iPhone: abrir o endereço no Safari → Partilhar → «Adicionar ao ecrã principal».
- Android: abrir no Chrome → menu ⋮ → «Instalar aplicação».

## Atualizar

Carregar os ficheiros novos por cima dos antigos (Add file → Upload files → Commit changes).
O ficheiro `sw.js` tem uma linha `VERSAO`; cada versão nova traz um valor novo, para os telemóveis
descarregarem os ficheiros atualizados.

## Ficheiros

| Ficheiro | Função |
|---|---|
| index.html | ecrãs |
| app.js | câmara, importação, partilha |
| worker.js | processamento das fotografias (fora do ecrã) |
| motor.js | motor de correção (o mesmo da aplicação Android) |
| jpeg-decoder.js | leitura de JPEG (jpeg-js, licença BSD) |
| pdf.js | criação do PDF |
| sw.js, manifest.webmanifest, icones/ | instalação no ecrã principal e funcionamento sem rede |
