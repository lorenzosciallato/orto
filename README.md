# Orto

L'orto di Pievebovigliana, tutto l'anno: calendario mese per mese, meteo in tempo reale, schede delle piante, ricette e guide di costruzione.

Sito: https://lorenzosciallato.github.io/orto/

## Struttura

- `index.html` — la pagina
- `manifest.json` — nome e icona per installarla sul telefono
- `css/stile.css` — lo stile
- `js/app.js` — navigazione, meteo (Open-Meteo), calendario, consigli del giorno, modale delle piante
- `js/mesi.js` — i 12 mesi: piante, lavori, raccolti
- `js/ricette.js` — le ricette
- `js/schede.js` — schede delle piante: consociazioni, conservazione, storia
- `js/consigli.js` — i consigli generali
- `img/` — icone; `img/piante/` e `img/ricette/` per le foto

## Come modificare

Per aggiungere una ricetta: apri `js/ricette.js` e aggiungi una riga come le altre (mese, nome, tempo, ingredienti, passi, nota).
Per aggiungere una pianta a un mese: `js/mesi.js`, dentro `piante:` del mese, una riga `["Nome","semina|semenzaio|trapianto|impianto|tunnel","spiegazione",0 o 1 se insolita]`.
