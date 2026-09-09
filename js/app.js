/* ===== Orto — app.js ===== */
const NOMI_MESI = MESI.map(m=>m.id);
RICETTE.sort((a,b)=>NOMI_MESI.indexOf(a.mese)-NOMI_MESI.indexOf(b.mese));
const $ = s=>document.querySelector(s);
const esc = s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
const tipoLabel = {semina:"semina diretta",semenzaio:"semenzaio",trapianto:"trapianto",impianto:"impianto",tunnel:"sotto tunnel"};
const oggi=new Date();
const meseCorrente=MESI[oggi.getMonth()];
const COMUNE = (typeof comuneSalvato==="function") ? comuneSalvato() : null;
const LAT = COMUNE ? COMUNE.lat : null, LON = COMUNE ? COMUNE.lon : null;
const NOME_LUOGO = COMUNE ? COMUNE.n : "il tuo orto";
const GIORNI=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"];
const norm = s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const slug = s=>norm(s).replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,60);
/* foto: piante in img/piante/<chiave>.webp, ricette in img/ricette/<nome-in-minuscolo>.webp; se manca, il tag si nasconde da solo */
const fotoPianta = k=>`img/piante/${k}.webp`;
const fotoRicetta = r=>`img/ricette/${slug(r.nome)}.webp`;
const imgTag = (src,alt,cls)=>`<img class="${cls}" src="${src}" alt="${esc(alt)}" loading="lazy" onerror="this.classList.add('manca');this.style.visibility='hidden'">`;

/* le piante che l'utente dice di coltivare (chiavi delle schede) */
let MIE = new Set();
try{ MIE = new Set(JSON.parse(localStorage.getItem("orto-mie")||"[]")); }catch(e){}
function salvaMie(){ try{ localStorage.setItem("orto-mie",JSON.stringify([...MIE])); }catch(e){} }
function chiaveMia(nome){ return chiaviPer(nome)[0] || ("n:"+nome); }
function eMia(nome){ return MIE.has(chiaveMia(nome)); }
function toggleMia(nome){ const k=chiaveMia(nome); if(MIE.has(k)) MIE.delete(k); else MIE.add(k); salvaMie(); aggiornaMieOvunque(); }
function aggiornaMieOvunque(){
  document.querySelectorAll("[data-pianta]").forEach(li=>{ const m=eMia(li.dataset.pianta); li.dataset.mia=m?1:0; const st=li.querySelector(".stella"); if(st) st.setAttribute("aria-pressed",m?"true":"false"); });
  const p=$("#p-piante"); if(p){ const attivo=p.classList.contains("attivo"); p.outerHTML=pannelloPiante(); if(attivo) $("#p-piante").classList.add("attivo"); }
  if(typeof aggiornaMia==="function") aggiornaMia();
  if(typeof mostraSettimana==="function") mostraSettimana();
}
let stato = {};
try{ stato = JSON.parse(localStorage.getItem("orto-pb-anno")||"{}"); }catch(e){ stato={}; }
function salva(){ try{ localStorage.setItem("orto-pb-anno",JSON.stringify(stato)); }catch(e){} }

/* ---- schede piante: quali chiavi corrispondono a una voce ---- */
function chiaviPer(nome){
  const n=norm(nome); const out=[];
  for(const k in SCHEDE){ if(SCHEDE[k].match.some(w=>new RegExp("(^|[^a-z])"+norm(w).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).test(n))) out.push(k); }
  return out;
}
function ricettePer(k){
  const parole=SCHEDE[k].ricette.map(norm);
  return RICETTE.map((r,i)=>({r,i})).filter(x=>{const t=norm(x.r.nome+" "+x.r.ing.join(" ")); return parole.some(p=>t.includes(p));});
}
function gzLink(nome){ return "https://www.giallozafferano.it/ricerca-ricette/"+encodeURIComponent(nome.replace(/[()]/g,"").trim().replace(/\s+/g,"+"))+"/"; }

/* ---- pannelli ---- */
const tabs = [{id:"oggi",label:"Oggi",nav:"oggi"},...MESI.map(m=>({id:m.id,label:m.nome,nav:"mesi",mese:true})),{id:"piante",label:"Il mio orto",nav:"piante"},{id:"ricette",label:"Cucina",nav:"ricette"},{id:"guide",label:"Guide",nav:"guide"},{id:"costruire",label:"Costruire",nav:"guide"},{id:"coltivare",label:"Coltivare",nav:"guide"},{id:"allevare",label:"Allevare",nav:"guide"},{id:"consigli",label:"Consigli",nav:"guide"}];
const ORDINE_TIPO = {trapianto:0,semina:1,semenzaio:2,impianto:3,tunnel:4};

function pannelloMese(m){
  const rs = RICETTE.filter(r=>r.mese===m.id);
  /* nelle fasce calde e in montagna il contenuto arriva dal mese del calendario base che corrisponde alla stagione reale del posto */
  const src = COMUNE ? (MESI.find(x=>x.id===meseBasePer(COMUNE,m.id))||m) : m;
  const extra = (COMUNE && m.extra) ? m.extra : [];
  const amb = COMUNE && COMUNE.amb;
  const piante = [...src.piante, ...extra.filter(p=>!src.piante.some(x=>x[0]===p[0]))]
    .filter(p=>adattaAmbiente(p[0], amb))
    .sort((a,b)=>(ORDINE_TIPO[a[1]]??9)-(ORDINE_TIPO[b[1]]??9));
  const ambTesto = COMUNE ? fraseAmbiente(COMUNE) : "";
  const nIns = piante.filter(p=>p[3]).length;
  const testo = COMUNE ? meseClima(COMUNE,m.id) : esc(m.sotto);
  const ad = t => COMUNE ? addolcisci(COMUNE,t) : t;
  return `<section class="pannello" id="p-${m.id}" role="tabpanel" aria-labelledby="t-${m.id}">
  <div class="mese-testa"><div class="mese-nome">${m.nome}</div><div><p class="mese-sotto">${testo}</p>${ambTesto?`<p class="clima clima-utente">${ambTesto}</p>`:""}</div></div>
  <div class="due">
    <div><h2>Cosa piantare <span>${piante.length} colture · tocca il nome per la scheda, la stella per metterla nel tuo orto</span></h2>
      <div class="legenda"><span><i class="tag semenzaio"></i>in semenzaio: si semina in vasetto, al coperto</span><span><i class="tag semina"></i>semina diretta: il seme va in terra nell'orto</span><span><i class="tag trapianto"></i>trapianto: la piantina passa dal vasetto all'orto</span><span><i class="tag impianto"></i>impianto: si mettono a dimora bulbi, tuberi, radici o piante</span><span><i class="tag tunnel"></i>sotto tunnel: coltura protetta da telo o serra fredda</span></div>
      <div class="filtri"><button class="filtro" data-f="tutte" aria-pressed="true">Tutte</button><button class="filtro" data-f="insolite" aria-pressed="false">Solo insolite</button><button class="filtro" data-f="campo" aria-pressed="false">Solo in campo aperto</button><button class="filtro filtro-mie" data-f="mie" aria-pressed="false">Le mie</button></div>
      <ul class="piante">${piante.map(p=>`<li data-ins="${p[3]}" data-tag="${p[1]}" data-mia="${eMia(p[0])?1:0}" data-pianta="${esc(p[0])}">${(k=>k?imgTag(fotoPianta(k),p[0],"mini"):'<span class="mini manca"></span>')(chiaviPer(p[0])[0])}<b>${esc(p[0])}${p[3]?'<span class="ins">insolita</span>':''}</b><button class="stella" data-stella="${esc(p[0])}" aria-pressed="${eMia(p[0])?"true":"false"}" aria-label="Metti ${esc(p[0])} nel mio orto"><svg viewBox="0 0 24 24"><path d="M12 2.8l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.7l-5.9 3.1 1.2-6.5L2.5 9.7l6.6-.9z"/></svg></button><span class="tag ${p[1]}">${tipoLabel[p[1]]}</span><span class="come">${ad(esc(p[2]))}</span></li>`).join("")}</ul>
    </div>
    <div>
      <div class="raccolta"><b>Cosa si raccoglie</b>${ad(esc(src.raccolta))}</div>
      <h2>Lavori del mese <span>spunta quello che hai fatto</span></h2>
      <ul class="lavori">${src.lavori.map((l,i)=>{const k=m.id+"-"+i;return `<li><input type="checkbox" id="${k}" data-k="${k}" ${stato[k]?"checked":""}><label for="${k}">${ad(esc(l))}</label></li>`;}).join("")}</ul>
      <button class="azzera" data-mese="${m.id}">Azzera le spunte di ${m.nome.toLowerCase()}</button>
      <div class="rdm"><small style="color:var(--muto)">In cucina questo mese · ${rs.length} ricette</small>
        <ul>${rs.slice(0,5).map(r=>`<li>${esc(r.nome)}</li>`).join("")}<li>… e altre ${rs.length-5}</li></ul>
        <button data-ricette-mese="${m.id}">Apri le ricette di ${m.nome.toLowerCase()}</button></div>
    </div>
  </div>
  <nav class="mese-nav" aria-label="Altri mesi">${(i=>`${i>0?`<button data-vai="${MESI[i-1].id}"><small>Mese prima</small>${MESI[i-1].nome}</button>`:"<span></span>"}${i<11?`<button class="avanti" data-vai="${MESI[i+1].id}"><small>Mese dopo</small>${MESI[i+1].nome}</button>`:"<span></span>"}`)(MESI.findIndex(x=>x.id===m.id))}</nav></section>`;
}

function pannelloPiante(){
  const chiavi=Object.keys(SCHEDE).sort((a,b)=>SCHEDE[a].nome.localeCompare(SCHEDE[b].nome,"it"));
  const card=k=>`<button class="pianta-card" data-apri-chiave="${k}">${imgTag(fotoPianta(k),SCHEDE[k].nome,"pc-foto")}<span class="pc-nome">${esc(SCHEDE[k].nome)}</span>${MIE.has(k)?'<span class="pc-mia">nel tuo orto</span>':''}</button>`;
  const mieChiavi=chiavi.filter(k=>MIE.has(k));
  const mieNomi=[...MIE].filter(k=>k.startsWith("n:")).map(k=>k.slice(2));
  const vuoto=!mieChiavi.length && !mieNomi.length;
  const mId=meseCorrente.id;
  const src = COMUNE ? (MESI.find(x=>x.id===meseBasePer(COMUNE,mId))||meseCorrente) : meseCorrente;
  const daFare=[...src.piante,...((COMUNE&&meseCorrente.extra)||[])].filter(p=>eMia(p[0]));
  return `<section class="pannello" id="p-piante" role="tabpanel" aria-labelledby="t-piante">
  <div class="mese-testa"><div class="mese-nome">Il mio orto</div><p class="mese-sotto">${vuoto?"Le piante che coltivi, in un posto solo: cosa fare per ciascuna questo mese, la scheda a un tocco, la tua settimana in Oggi.":`${(n=>n===1?"Una pianta":n+" piante")(mieChiavi.length+mieNomi.length)}. Questo mese ${daFare.length?`ce ne sono ${daFare.length} da mettere a dimora o curare`:"per le tue piante è tempo di raccolta e di cura"}.`}</p></div>
  ${vuoto?`<div class="tutorial">
    <p><b>Come si riempie</b></p>
    <div class="tutorial-riga"><span class="mini manca"></span><b>Pomodori</b><span class="tag trapianto">trapianto</span><span class="stella demo" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2.8l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.7l-5.9 3.1 1.2-6.5L2.5 9.7l6.6-.9z"/></svg></span></div>
    <p>Nei <b>Mesi</b>, accanto a ogni ortaggio c'è una stella: toccala e la pianta arriva qui. Da quel momento i mesi te la evidenziano, in Oggi la settimana la mette per prima, e qui trovi cosa farle. Puoi partire anche dall'elenco qui sotto: apri una scheda e tocca "La coltivi? Segnala".</p>
    <button class="primario" data-vai="${mId}">Vai a ${meseCorrente.nome.toLowerCase()}</button>
  </div>`:`
  ${daFare.length?`<h2>Da fare a ${meseCorrente.nome.toLowerCase()} <span>per le tue piante</span></h2><ul class="piante">${daFare.map(p=>`<li data-ins="${p[3]}" data-tag="${p[1]}" data-mia="1" data-pianta="${esc(p[0])}">${(k=>k?imgTag(fotoPianta(k),p[0],"mini"):'<span class="mini manca"></span>')(chiaviPer(p[0])[0])}<b>${esc(p[0])}</b><span class="tag ${p[1]}">${tipoLabel[p[1]]}</span><span class="come">${esc(p[2])}</span></li>`).join("")}</ul>`:""}
  <h2>Le tue piante <span>tocca per la scheda</span></h2>
  <div class="griglia-piante">${mieChiavi.map(card).join("")}${mieNomi.map(n=>`<button class="pianta-card" data-pianta="${esc(n)}"><span class="pc-foto manca"></span><span class="pc-nome">${esc(n)}</span><span class="pc-mia">nel tuo orto</span></button>`).join("")}</div>`}
  <h2>Tutte le piante <span>${chiavi.length} schede, dalla A alla Z</span></h2>
  <div class="griglia-piante">${chiavi.map(card).join("")}</div></section>`;
}
function pannelloGuide(){
  const g=[
    ["costruire","Costruire","Irrigazione a goccia, tunnel e serre fredde, semenzaio, falegnameria per l'orto.","img/guide/serra.webp"],
    ["coltivare","Coltivare in altri modi","Vasi e balcone, aiuole rialzate, idroponica, acquaponica: come si comincia e dove studiare.","img/guide/idroponica.webp"],
    ["allevare","Allevare","Chiocciole, api e grilli accanto all'orto: come funzionano, costi, legge, link.","img/guide/api.webp"],
    ["consigli","Consigli","Le cose che contano davvero, dalla terra alle lune.","img/guide/aiuole.webp"]
  ];
  return `<section class="pannello" id="p-guide" role="tabpanel" aria-labelledby="t-guide">
  <div class="mese-testa"><div class="mese-nome">Guide</div><p class="mese-sotto">Quattro sezioni da leggere con calma, per costruire, coltivare in altri modi, allevare e capire.</p></div>
  <div class="griglia-guide">${g.map(([id,t,d,img])=>`<button class="guida-card" data-vai="${id}"><img src="${img}" alt="" loading="lazy"><span><b>${t}</b><small>${d}</small></span></button>`).join("")}</div></section>`;
}

function cardRicetta(r,i){
  return `<details class="ricetta" data-mese="${r.mese}" id="r-${i}"><summary>${imgTag(fotoRicetta(r),r.nome,"foto-ric")}<h3>${esc(r.nome)}</h3><span class="stag">${MESI.find(m=>m.id===r.mese).nome}</span><span class="tempo">${esc(r.tempo)}</span></summary>
    <div class="corpo"><h4>Ingredienti</h4><ul>${r.ing.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
    <h4>Preparazione</h4><ol>${r.passi.map(p=>`<li>${esc(p)}</li>`).join("")}</ol>
    ${r.nota?`<p class="nota">${esc(r.nota)}</p>`:""}
    <a class="gz" href="${gzLink(r.nome)}" target="_blank" rel="noopener">Vedi su Giallo Zafferano</a></div></details>`;
}
function pannelloRicette(){
  return `<section class="pannello" id="p-ricette" role="tabpanel" aria-labelledby="t-ricette">
  <div class="mese-testa"><div class="mese-nome">Ricette</div><p>${RICETTE.length} piatti, ${Math.round(RICETTE.length/12)} per ogni mese, con quello che esce dall'orto in quel momento. Ogni ricetta ha il collegamento alla versione di Giallo Zafferano.</p></div>
  <div class="mesi-chip" id="chip-ricette"><button class="filtro" data-rm="tutti" aria-pressed="true">Tutti i mesi</button>${MESI.map(m=>`<button class="filtro" data-rm="${m.id}" aria-pressed="false">${m.nome}</button>`).join("")}</div>
  <div class="ricette">${RICETTE.map(cardRicetta).join("")}</div></section>`;
}
function pannelloConsigli(){
  return `<section class="pannello" id="p-consigli" role="tabpanel" aria-labelledby="t-consigli">
  <div class="mese-testa"><div class="mese-nome">Consigli</div><p>Quello che conta davvero per il tuo orto, qualunque terra e qualunque quota.</p></div>
  <div class="consigli">${CONSIGLI.map(c=>`<div class="consiglio"><h3>${esc(c[0])}</h3><p>${esc(c[1])}</p></div>`).join("")}</div></section>`;
}
function pannelloOggi(){
  const tot = MESI.reduce((a,m)=>a+m.piante.length,0);
  return `<section class="pannello" id="p-oggi" role="tabpanel" aria-labelledby="t-oggi">
  <div class="mese-testa"><div class="mese-nome" id="oggi-data"></div><div><p id="oggi-frase"></p><div class="clima">${COMUNE?`${esc(COMUNE.n)} (${esc(COMUNE.pr)}), ${COMUNE.alt} m · `:""}${tot} colture, ${RICETTE.length} ricette, 12 mesi.</div>${COMUNE?`<div class="clima clima-utente">${fraseClima(COMUNE)}</div>`:""}</div></div>
  <div class="oggi">
    <div>
      <div class="meteo" id="meteo">${COMUNE?`<div class="shimmer-box" aria-label="Carico il meteo"><span class="sh l"></span><span class="sh m"></span><span class="sh s"></span><span class="sh m"></span></div>`:`<div class="stato">Scegli il tuo comune per vedere il meteo del tuo orto.</div>`}</div>
      ${COMUNE?`<div class="mappa" id="mappa" aria-label="Il tuo comune sulla mappa d'Italia"></div>`:""}
      <div class="settimana"><h2>Questa settimana <span id="settimana-sotto"></span></h2><ul id="settimana" class="piante compatta"></ul></div>
      <div class="consigli-oggi"><h2>Cosa fare oggi <span>tre spunti, diversi ogni giorno</span></h2><div id="consigli-oggi"></div></div>
    </div>
    <div>
      <div class="cal" id="cal"></div>
      <div class="cal-lavori" id="cal-lavori"></div>
    </div>
  </div>
  <div class="intro" style="padding-top:2rem">
    <div class="legenda"><span class="tag semina">semina diretta</span><span class="tag semenzaio">semenzaio</span><span class="tag trapianto">trapianto</span><span class="tag impianto">impianto</span><span class="tag tunnel">sotto tunnel o tessuto non tessuto</span><span class="ins" style="font-size:.78rem;color:var(--viola);border:1px solid var(--viola);border-radius:4px;padding:.15rem .4rem">insolita</span></div>
    <div class="calendario">${MESI.map(m=>`<button data-vai="${m.id}"><b>${m.nome}</b><small>${m.piante.length} colture · ${m.lavori.length} lavori · ${RICETTE.filter(r=>r.mese===m.id).length} ricette</small></button>`).join("")}</div>
  </div></section>`;
}

$("#tablist").innerHTML = tabs.map(t=>`<button class="scheda ${t.cls||""}" role="tab" id="t-${t.id}" data-tab="${t.id}" aria-selected="false" aria-controls="p-${t.id}">${t.label}</button>`).join("");
if(COMUNE){
  const ex=(typeof pianteExtraPer==="function")?pianteExtraPer(COMUNE):null;
  if(ex) MESI.forEach(m=>{ m.extra = ex[m.id]||[]; });
  const tl=$("#testata-luogo"); if(tl) tl.textContent = `${COMUNE.n} (${COMUNE.pr}) · ${COMUNE.alt} m · zona ${COMUNE.z}`;
}
$("#finestra").innerHTML = pannelloOggi() + MESI.map(pannelloMese).join("") + pannelloPiante() + pannelloRicette() + pannelloGuide();
$("#finestra").appendChild($("#tpl-costruire").content.cloneNode(true));
$("#finestra").insertAdjacentHTML("beforeend", pannelloColtivare());
$("#finestra").insertAdjacentHTML("beforeend", pannelloAllevare());
$("#finestra").insertAdjacentHTML("beforeend", pannelloConsigli());
/* la barra dei mesi mostra solo i mesi; le altre sezioni si raggiungono dalla barra in basso */
$("#tablist").innerHTML = tabs.filter(t=>t.mese).map(t=>`<button class="scheda" role="tab" id="t-${t.id}" data-tab="${t.id}" aria-selected="false" aria-controls="p-${t.id}">${t.label}</button>`).join("");

/* ---- navigazione ---- */
let corrente = 0;
function vai(i, dir){
  i = Math.max(0, Math.min(tabs.length-1, i));
  dir = dir ?? (i>corrente?1:-1);
  corrente = i;
  document.querySelectorAll(".pannello").forEach(p=>p.classList.remove("attivo"));
  document.querySelectorAll(".scheda").forEach(s=>s.setAttribute("aria-selected","false"));
  const p = $("#p-"+tabs[i].id); p.style.setProperty("--dir",(dir>0?14:-14)+"px"); p.classList.add("attivo");
  const t = $("#t-"+tabs[i].id); if(t){ t.setAttribute("aria-selected","true"); try{t.scrollIntoView({block:"nearest",inline:"center",behavior:"smooth"});}catch(e){} }
  const eMese=!!tabs[i].mese;
  document.body.dataset.nav = tabs[i].nav;
  document.body.classList.toggle("in-mese", eMese);
  document.querySelectorAll("#barra-bassa [data-nav]").forEach(b=>b.setAttribute("aria-current", b.dataset.nav===tabs[i].nav ? "page" : "false"));
  const im = eMese ? MESI.findIndex(m=>m.id===tabs[i].id) : -1;
  if($("#pos")) $("#pos").textContent = eMese ? tabs[i].label : "";
  try{ history.replaceState(null,"","#"+tabs[i].id); }catch(e){}
  try{ window.scrollTo({top:0,behavior:"smooth"}); }catch(e){}
}

$("#barra-bassa").addEventListener("click",e=>{
  const b=e.target.closest("[data-nav]"); if(!b) return;
  const n=b.dataset.nav;
  if(n==="mesi"){ const id=(tabs[corrente].mese)?tabs[corrente].id:meseCorrente.id; vai(tabs.findIndex(t=>t.id===id)); return; }
  vai(tabs.findIndex(t=>t.id===n));
});
$("#tablist").addEventListener("click",e=>{const b=e.target.closest("[data-tab]"); if(b) vai(tabs.findIndex(t=>t.id===b.dataset.tab));});
document.addEventListener("keydown",e=>{
  if(e.target.matches("input,textarea")) return;
  if(!$("#modale-comune").hidden){ if(e.key==="Escape" && !$("#comune-chiudi").hidden){ $("#modale-comune").hidden=true; document.body.style.overflow=""; } return; }
  if(!$("#modale-pianta").hidden){ if(e.key==="Escape") chiudiPianta(); return; }
  if(e.key==="ArrowRight") vai(corrente+1,1);
  if(e.key==="ArrowLeft") vai(corrente-1,-1);
});
/* niente swipe tra i mesi: scorrere col dito serve a leggere, il mese si sceglie toccandolo nella barra */

function filtraRicette(mese){
  document.querySelectorAll("#chip-ricette .filtro").forEach(b=>b.setAttribute("aria-pressed", b.dataset.rm===mese?"true":"false"));
  document.querySelectorAll(".ricetta").forEach(r=>r.classList.toggle("nascosta", mese!=="tutti" && r.dataset.mese!==mese));
}

$("#finestra").addEventListener("click",e=>{
  const v=e.target.closest("[data-vai]"); if(v){ vai(tabs.findIndex(t=>t.id===v.dataset.vai)); return; }
  const rm=e.target.closest("[data-ricette-mese]"); if(rm){ vai(tabs.findIndex(t=>t.id==="ricette"),1); filtraRicette(rm.dataset.ricetteMese); return; }
  const chip=e.target.closest("[data-rm]"); if(chip){ filtraRicette(chip.dataset.rm); return; }
  const st=e.target.closest("[data-stella]"); if(st){ e.stopPropagation(); toggleMia(st.dataset.stella); return; }
  const pc=e.target.closest("[data-apri-chiave]"); if(pc){ apriPianta(SCHEDE[pc.dataset.apriChiave].nome); return; }
  const f=e.target.closest("[data-f]"); if(f){
    const sez=f.closest(".pannello");
    sez.querySelectorAll("[data-f]").forEach(b=>b.setAttribute("aria-pressed", b===f?"true":"false"));
    sez.querySelectorAll(".piante li").forEach(li=>{
      let vis = true;
      if(f.dataset.f==="insolite") vis = li.dataset.ins==="1";
      if(f.dataset.f==="mie") vis = li.dataset.mia==="1";
      if(f.dataset.f==="campo") vis = ["semina","trapianto","impianto"].includes(li.dataset.tag);
      li.classList.toggle("nascosta", !vis);
    });
    return;
  }
  const an=e.target.closest("[data-anchor]"); if(an){ e.preventDefault(); const el=document.getElementById(an.dataset.anchor); if(el) el.scrollIntoView({behavior:"smooth",block:"start"}); return; }
  const pl=e.target.closest("li[data-pianta]"); if(pl){ apriPianta(pl.dataset.pianta); return; }
  const a=e.target.closest("[data-mese]"); if(a){
    Object.keys(stato).forEach(k=>{ if(k.startsWith(a.dataset.mese+"-")) delete stato[k]; }); salva();
    document.querySelectorAll(`input[data-k^="${a.dataset.mese}-"]`).forEach(c=>c.checked=false);
  }
});
$("#finestra").addEventListener("change",e=>{
  if(e.target.matches("input[data-k]")){ stato[e.target.dataset.k]=e.target.checked; if(!e.target.checked) delete stato[e.target.dataset.k]; salva(); }
});

/* ---- modale pianta ---- */
let mpChiavi=[], mpChiave=null, mpSez=null, mpNome="";
function apriPianta(nome){
  mpNome=nome; mpChiavi=chiaviPer(nome);
  const mod=$("#modale-pianta");
  $("#mp-titolo").textContent=nome;
  const fk=mpChiavi[0]; $("#mp-foto").innerHTML = fk ? imgTag(fotoPianta(fk),nome,"foto-pianta") : "";
  const sub=$("#mp-sub");
  if(mpChiavi.length>1){ sub.hidden=false; sub.innerHTML=mpChiavi.map((k,i)=>`<button data-chiave="${k}" aria-pressed="${i===0}">${esc(SCHEDE[k].nome.split(" (")[0])}</button>`).join(""); }
  else { sub.hidden=true; sub.innerHTML=""; }
  mpChiave=mpChiavi[0]||null; mpSez=null;
  aggiornaMia();
  document.querySelectorAll("#mp-bottoni button").forEach(b=>b.setAttribute("aria-pressed","false"));
  $("#mp-corpo").innerHTML = mpChiave ? `<p class="muto" style="color:var(--muto)">Scegli cosa vuoi sapere.</p>` : `<div class="in-scrittura">Scheda in preparazione per questa voce.</div>`;
  mod.hidden=false; document.body.style.overflow="hidden";
}
function aggiornaMia(){
  const b=$("#mp-mia"); if(!b) return;
  if(!mpChiave){ b.hidden=true; return; }
  b.hidden=false; const on=MIE.has(mpChiave);
  b.setAttribute("aria-pressed", on?"true":"false"); b.textContent = on ? "La coltivo" : "La coltivi? Segnala";
}
$("#mp-mia").addEventListener("click",()=>{
  if(!mpChiave) return;
  if(MIE.has(mpChiave)) MIE.delete(mpChiave); else MIE.add(mpChiave);
  salvaMie(); aggiornaMieOvunque();
});
function chiudiPianta(){ $("#modale-pianta").hidden=true; document.body.style.overflow=""; }
$("#mp-chiudi").onclick=chiudiPianta;
$("#modale-pianta").addEventListener("click",e=>{ if(e.target===$("#modale-pianta")) chiudiPianta(); });
$("#mp-sub").addEventListener("click",e=>{ const b=e.target.closest("[data-chiave]"); if(!b) return; mpChiave=b.dataset.chiave; aggiornaFoto(); document.querySelectorAll("#mp-sub button").forEach(x=>x.setAttribute("aria-pressed",x===b)); if(mpSez) mostraSez(mpSez); });
$("#mp-bottoni").addEventListener("click",e=>{ const b=e.target.closest("[data-sez]"); if(!b) return; mostraSez(b.dataset.sez); });
function aggiornaFoto(){ if(mpChiave) $("#mp-foto").innerHTML=imgTag(fotoPianta(mpChiave),mpNome,"foto-pianta"); }
function mostraSez(s){
  mpSez=s;
  document.querySelectorAll("#mp-bottoni button").forEach(b=>b.setAttribute("aria-pressed", b.dataset.sez===s));
  const c=$("#mp-corpo"); if(!mpChiave){ c.innerHTML=`<div class="in-scrittura">Scheda in preparazione.</div>`; return; }
  const S=SCHEDE[mpChiave];
  if(s==="cons"){
    const blocco=(col,tit,arr)=> arr.length?`<h3><span class="luce ${col}"></span>${tit}</h3><ul class="semaforo">${arr.map(x=>`<li><span class="luce ${col}"></span><div><b>${esc(x[0])}</b><br><span>${esc(x[1])}</span></div></li>`).join("")}</ul>`:"";
    c.innerHTML = blocco("verde","Ottimi vicini",S.cons.verde)+blocco("giallo","Neutri, con attenzione",S.cons.giallo)+blocco("rosso","Da tenere lontani",S.cons.rosso) || `<div class="in-scrittura">Nessuna consociazione particolare.</div>`;
  } else if(s==="conserva"){ c.innerHTML=S.conserva||`<div class="in-scrittura">In scrittura.</div>`; }
  else if(s==="ricette"){
    const rs=ricettePer(mpChiave);
    c.innerHTML = (rs.length ? rs.map(({r,i})=>`<a class="ric-link" href="#" data-apri-ricetta="${i}"><b>${esc(r.nome)}</b><small>${MESI.find(m=>m.id===r.mese).nome} · ${esc(r.tempo)}</small></a>`).join("") : `<div class="in-scrittura">Nessuna ricetta nell'app usa ancora questa pianta.</div>`) + `<a class="ric-link" href="${gzLink(mpNome.split(",")[0])}" target="_blank" rel="noopener"><b>Altre ricette su Giallo Zafferano</b><small>si apre nel browser</small></a>`;
  } else if(s==="storia"){ c.innerHTML = S.storia && S.storia.trim() ? S.storia : `<div class="in-scrittura">La storia di questa pianta è in scrittura: sarà nel prossimo aggiornamento, con ricerca fatta apposta.</div>`; }
  else if(s==="semina"){
    const base=(typeof SEMINA!=="undefined" && SEMINA[mpChiave]) ? SEMINA[mpChiave] : `<div class="in-scrittura">In scrittura.</div>`;
    let extra="";
    if(COMUNE){
      extra=`<div class="clima clima-utente">${fraseClima(COMUNE)}</div>`;
      if(COMUNE.esp && typeof ESPOSIZIONI!=="undefined" && ESPOSIZIONI[COMUNE.esp] && COMUNE.esp!=="pianura") extra+=`<p class="nota-semi"><b>Il tuo orto è ${ESPOSIZIONI[COMUNE.esp].nome}</b>: ${ESPOSIZIONI[COMUNE.esp].tip}</p>`;
      if(COMUNE.amb==="vasi") extra+=`<p class="nota-semi"><b>In vaso</b>: ${adattaAmbiente(mpNome,"vasi")?"si può fare. Contenitore grande il giusto, terriccio nuovo ogni anno, acqua più spesso e meno per volta, e un concime liquido ogni due settimane in stagione.":"è una coltura da spazio, in vaso rende poco o niente: meglio puntare su altro."}</p>`;
      if(COMUNE.amb==="idroponica") extra+=`<p class="nota-semi"><b>In idroponica</b>: ${adattaAmbiente(mpNome,"idroponica")?"rende bene. Le date qui sotto valgono per chi coltiva fuori; indoor conta la luce (14–16 ore) e l'acqua tra 18 e 24 °C. Trovi sistemi, pH ed EC in Guide → Coltivare.":"non è una coltura da idroponica: radici troppo grandi o ciclo troppo lungo per rendere senza terra."}</p>`;
      if(COMUNE.terra && COMUNE.amb!=="idroponica" && typeof TERRE!=="undefined" && TERRE[COMUNE.terra]) extra+=`<p class="nota-semi"><b>La tua terra, ${TERRE[COMUNE.terra].nome}</b>: ${TERRE[COMUNE.terra].tip}</p>`;
    }
    c.innerHTML = extra + base;
  }
  else if(s==="semi"){
    const info=(typeof SEMI!=="undefined")?SEMI[mpChiave]:null;
    const q=info?info.q:("semi di "+mpNome.split(",")[0].split("(")[0].trim().toLowerCase());
    const enc=encodeURIComponent(q);
    c.innerHTML = `<p>Cosa cercare: <b>${esc(q)}</b>.</p>`
      +(info&&info.bio?`<a class="compra" href="https://arcoiris.it/it/prodotti/${info.cat==="fiori"?"aromatiche-officinali-e-fiori-seme-biologico":info.cat==="cereali"?"cereali-e-grani-antichi-seme-biologico":info.cat==="api"?"piante-per-api-seme-biologico":"ortaggi-seme-biologico"}" target="_blank" rel="noopener"><b>Arcoiris</b><small>sementi biologiche italiane, varietà antiche — apri il catalogo e cerca la pianta</small></a>`:"")
      +`<a class="compra" href="https://www.amazon.it/s?k=${enc}" target="_blank" rel="noopener"><b>Amazon</b><small>arriva a casa in pochi giorni</small></a>`
      +(info&&info.nota?`<p class="nota-semi">${esc(info.nota)}</p>`:"");
  }
  c.scrollIntoView && c.scrollIntoView({behavior:"smooth",block:"start"});
}
$("#mp-corpo").addEventListener("click",e=>{ const a=e.target.closest("[data-apri-ricetta]"); if(!a) return; e.preventDefault(); chiudiPianta(); vai(tabs.findIndex(t=>t.id==="ricette"),1); filtraRicette("tutti"); const d=$("#r-"+a.dataset.apriRicetta); if(d){ d.open=true; setTimeout(()=>d.scrollIntoView({behavior:"smooth",block:"start"}),320); } });

/* ---- installazione ---- */
(function(){
  const modale=$("#modale");
  $("#btn-installa").onclick=()=>{modale.hidden=false;};
  $("#btn-chiudi").onclick=()=>{modale.hidden=true;};
  modale.addEventListener("click",e=>{ if(e.target===modale) modale.hidden=true; });
  let promptInstall=null;
  window.addEventListener("beforeinstallprompt",e=>{ e.preventDefault(); promptInstall=e; $("#btn-pwa").hidden=false; });
  $("#btn-pwa").onclick=async()=>{ if(!promptInstall) return; promptInstall.prompt(); await promptInstall.userChoice; promptInstall=null; $("#btn-pwa").hidden=true; };
})();

/* ---- OGGI: data, calendario, meteo, consigli ---- */
$("#oggi-data").innerHTML = `${oggi.getDate()}<br><span style="font-size:.5em;font-weight:600">${meseCorrente.nome}</span>`;
$("#oggi-frase").textContent = COMUNE ? meseClima(COMUNE, meseCorrente.id) : meseCorrente.sotto;

function seme(d){ // numero pseudo-casuale stabile per il giorno
  let x = d.getFullYear()*372 + d.getMonth()*31 + d.getDate();
  return function(){ x = (x*1103515245 + 12345) & 0x7fffffff; return x/0x7fffffff; };
}
function scegli(arr,n,rnd){ const c=arr.slice(); const out=[]; while(c.length && out.length<n){ out.push(c.splice(Math.floor(rnd()*c.length),1)[0]); } return out; }

const SPUNTI=[ // consigli d'ispirazione generali, ruotano ogni giorno
"Fai un giro dell'orto senza attrezzi: guarda solo. Le cose che noti oggi sono i lavori della settimana prossima.",
"Scegli una pianta insolita che non hai mai coltivato e leggine la scheda: tocca il nome nella lista del mese.",
"Scrivi tre righe sul quaderno dell'orto: data, tempo, una cosa che hai visto. Tra un anno varranno oro.",
"Controlla il compost: se è secco bagna, se puzza aggiungi foglie o cartone e gira.",
"Guarda sotto le foglie, non sopra: afidi, uova e bruchi stanno sempre sotto.",
"Prendi una foto dell'orto dallo stesso punto di sempre. La serie diventa il tuo calendario vero.",
"Assaggia una foglia cruda di qualcosa che di solito cuoci: cavolo nero giovane, bietola, cima di rapa.",
"Regala una pianta o un sacchetto di semi a qualcuno: le varietà sopravvivono passando di mano in mano.",
"Affila un attrezzo. Una zappa affilata dimezza la fatica e nessuno lo fa mai.",
"Metti una ciotola d'acqua bassa in un angolo per ricci, uccelli e api. Cambiala ogni due giorni.",
"Lascia fiorire una pianta di ogni tipo: prezzemolo, carota, cipolla, cavolo. I fiori chiamano gli insetti buoni e ti danno i semi.",
"Guarda dove ristagna l'acqua e dove il terreno si crepa: sono i due posti dove l'anno prossimo cambia qualcosa.",
"Dedica dieci minuti a togliere le erbacce da una sola aiuola, fino in fondo. Una aiuola finita vale più di tre iniziate.",
"Apri la scheda Costruire e scegli un progetto per il prossimo fine settimana di pioggia.",
"Conta le api su una pianta fiorita per un minuto. Meno di tre: servono più fiori nell'orto.",
"Pacciama qualcosa che non hai ancora pacciamato. Foglie, erba secca, cartone: qualunque cosa.",
"Guarda le previsioni a sette giorni qui sopra e decidi ora quale semina o trapianto anticipare o rimandare.",
"Cerca le lumache sotto una tavola o un vaso rovesciato: la mattina sono lì.",
"Prova una ricetta del mese con qualcosa che hai raccolto oggi. Tocca il mese e poi 'Apri le ricette'.",
"Metti un'etichetta a una pianta che non ha nome: tra tre mesi non ti ricorderai cosa hai seminato.",
"Rileggi i lavori del mese e spunta quello che hai già fatto senza accorgertene.",
"Semina qualcosa, anche una riga sola. C'è quasi sempre una cosa da seminare, qualunque mese sia.",
"Controlla i legacci dei pomodori, dei fagioli, degli alberi giovani: quelli stretti strozzano, quelli larghi non tengono.",
"Raccogli un seme da conservare: da un fiore secco, da un baccello, da un frutto troppo maturo.",
"Osserva un insetto che non conosci per un minuto invece di schiacciarlo. Nove su dieci sono alleati.",
"Pulisci e riponi un attrezzo che hai lasciato fuori. La ruggine lavora anche quando tu non ci sei.",
"Guarda l'orto al tramonto: dove arriva l'ombra per prima è il posto per le insalate d'estate.",
"Chiedi a qualcuno più vecchio di te del paese cosa seminava in questo mese. Scrivilo nel quaderno.",
"Bagna il semenzaio o le piantine con lo spruzzino, non con il getto: le piantine si abbattono.",
"Togli le foglie gialle e secche in basso: aria alle piante, meno funghi, e si vede meglio chi sta male."
];

function consigliMeteo(w){ // consigli che dipendono dal meteo di oggi e dei prossimi giorni
  const out=[]; if(!w) return out;
  const d=w.daily, c=w.current;
  const minOggi=d.temperature_2m_min[0], minDomani=d.temperature_2m_min[1], minTre=Math.min(...d.temperature_2m_min.slice(0,3));
  const maxOggi=d.temperature_2m_max[0], piog=d.precipitation_sum[0], probPiog=d.precipitation_probability_max[0];
  const piogPross=d.precipitation_sum.slice(1,4).reduce((a,b)=>a+b,0), vento=d.wind_speed_10m_max[0], um=c.relative_humidity_2m;
  const suolo = w.hourly && w.hourly.soil_temperature_0cm ? w.hourly.soil_temperature_0cm.slice(0,24).reduce((a,b)=>a+b,0)/24 : null;
  const m=oggi.getMonth();
  if(minTre<=1) out.push(["Gelata in arrivo",`Minima prevista ${minTre.toFixed(0)} °C nei prossimi tre giorni: stasera copri con il tessuto non tessuto insalate, spinaci, radicchi e tutto ciò che è tenero. Zucche, yacon e batate in casa se sono ancora fuori.`]);
  else if(minOggi<=3 && m>=2 && m<=4) out.push(["Notte fredda",`Minima a ${minOggi.toFixed(0)} °C: i trapianti delicati (pomodori, zucchine, basilico) aspettano. Tieni il tessuto non tessuto sulle piantine appena messe.`]);
  if(piog>=8) out.push(["Pioggia forte oggi",`Previsti ${piog.toFixed(0)} mm: non toccare l'argilla, non vangare, non trapiantare. Giornata da semenzaio in casa, falegnameria, ordine dei semi o pulizia attrezzi. Guarda dove ristagna l'acqua e segnalo.`]);
  else if(piog>=2 || probPiog>=60) out.push(["Pioggia probabile",`${probPiog}% di pioggia: semina o trapianta prima che arrivi e lascia che sia lei a innaffiare. Niente trattamenti (li lava via).`]);
  if(piog<1 && piogPross<2 && maxOggi>=26) out.push(["Caldo e secco",`Massima ${maxOggi.toFixed(0)} °C e niente pioggia in vista: irriga all'alba, alla base, a lungo e non tutti i giorni. Ombreggia le insalate tra le 11 e le 17. Raccogli zucchine e fagiolini oggi.`]);
  if(vento>=40) out.push(["Vento forte",`Raffiche fino a ${vento.toFixed(0)} km/h: controlla che tunnel, tessuto non tessuto e reti siano ancorati, lega i pomodori alti e non irrigare a pioggia (si perde tutto).`]);
  if(um>=85 && maxOggi>=15 && piog<8) out.push(["Aria umida",`Umidità ${um}%: giornata da funghi. Non bagnare le foglie, togli le foglie basse ai pomodori, scopri il tunnel per far uscire l'umidità. Con il sole, un trattamento con bicarbonato o zolfo contro l'oidio.`]);
  if(suolo!==null){
    if(m>=1 && m<=4 && suolo>=10 && suolo<14) out.push(["Terreno che si scalda",`Terreno a ${suolo.toFixed(0)} °C: nascono piselli, fave, spinaci, ravanelli, lattughe, carote. Per fagioli e mais servono almeno 14 °C: aspetta.`]);
    if(m>=3 && m<=6 && suolo>=15) out.push(["Terreno caldo",`Terreno a ${suolo.toFixed(0)} °C: via libera alla semina diretta di fagioli, zucchine, cetrioli e mais.`]);
    if(m>=7 && m<=9 && suolo>=22) out.push(["Terreno troppo caldo per lo spinacio",`Terreno a ${suolo.toFixed(0)} °C: lo spinacio non germina sopra i 20. Semina la sera, copri con tessuto non tessuto bagnato o cartone, oppure aspetta una settimana fresca.`]);
  }
  if(minOggi>=5 && maxOggi>=12 && piog<2 && (m===2||m===3||m===9||m===10)) out.push(["Giornata da lavoro in campo",`Asciutto e mite: è il giorno giusto per i trapianti e le semine del mese. Guarda la lista qui accanto e portane a casa due.`]);
  return out;
}

/* la lista della settimana: colture del mese (già adattate a fascia e ambiente), scelte per metà mese e per le tue piante */
let METEO_ULTIMO=null;
function mostraSettimana(){
  const ul=$("#settimana"); if(!ul) return;
  const mId=meseCorrente.id;
  const src = COMUNE ? (MESI.find(x=>x.id===meseBasePer(COMUNE,mId))||meseCorrente) : meseCorrente;
  const extra=(COMUNE && meseCorrente.extra)?meseCorrente.extra:[];
  const amb=COMUNE&&COMUNE.amb;
  const g=oggi.getDate(), seconda=g>15;
  let tutte=[...src.piante,...extra].filter(p=>adattaAmbiente(p[0],amb));
  const meta=p=>{ const c=p[2].toLowerCase(); if(/fine mese|seconda met|a fine|ultimi giorni/.test(c)) return seconda; if(/inizio mese|prima met|primi giorni|a inizio|subito/.test(c)) return !seconda; return true; };
  let scelte=tutte.filter(meta);
  scelte.sort((a,b)=>(eMia(b[0])-eMia(a[0])) || ((ORDINE_TIPO[a[1]]??9)-(ORDINE_TIPO[b[1]]??9)));
  const mie=scelte.filter(p=>eMia(p[0]));
  const lista=(mie.length?[...mie,...scelte.filter(p=>!eMia(p[0]))]:scelte).slice(0,6);
  $("#settimana-sotto").textContent = mie.length ? `prima le tue piante, poi il resto del mese` : `le colture del momento · segna le tue in Piante e diventa personale`;
  const ad=t=>COMUNE?addolcisci(COMUNE,t):t;
  ul.innerHTML = lista.length ? lista.map(p=>`<li data-pianta="${esc(p[0])}" data-mia="${eMia(p[0])?1:0}"><b>${esc(p[0])}${eMia(p[0])?'<span class="ins mia">tua</span>':''}</b><span class="tag ${p[1]}">${tipoLabel[p[1]]}</span><span class="come">${ad(esc(p[2]))}</span></li>`).join("") : `<li><span class="come">Questo mese, con le tue scelte, non c'è nulla da mettere a dimora: è tempo di raccolta e di cura.</span></li>`;
}
function mostraAllarme(w){
  const box=$("#allarme"); if(!box) return;
  if(!w||!w.daily){ box.hidden=true; return; }
  const mins=w.daily.temperature_2m_min.slice(0,4), minTre=Math.min(...mins), gg=mins.indexOf(minTre);
  const quando=["stanotte","domani notte","dopodomani","tra tre notti"][gg]||"nei prossimi giorni";
  const maxs=w.daily.temperature_2m_max.slice(0,3), maxTre=Math.max(...maxs);
  if(minTre<=1){ box.className="allarme gelo"; box.innerHTML=`<b>Gelo ${quando}: ${minTre.toFixed(0)} °C.</b> Copri stasera quello che è tenero: insalate, piantine appena messe, basilico. Zucche e batate in casa se sono ancora fuori.`; box.hidden=false; return; }
  if(minTre<=3 && oggi.getMonth()>=2 && oggi.getMonth()<=4){ box.className="allarme fresco"; box.innerHTML=`<b>Minima a ${minTre.toFixed(0)} °C ${quando}.</b> Per i trapianti delicati aspetta: pomodori, zucchine e basilico vogliono notti sopra i 10 °C.`; box.hidden=false; return; }
  if(maxTre>=34){ box.className="allarme caldo"; box.innerHTML=`<b>Caldo forte: ${maxTre.toFixed(0)} °C nei prossimi giorni.</b> Acqua all'alba e alla base, ombra sulle insalate dalle 11 alle 17, raccogli presto la mattina.`; box.hidden=false; return; }
  box.hidden=true;
}
function mostraConsigli(w){
  const rnd=seme(oggi);
  const dip=consigliMeteo(w);
  const lavori=meseCorrente.lavori.map(l=>["Lavoro del mese",l]);
  let scelti=[];
  if(dip.length) scelti.push({t:dip[0][0],x:dip[0][1],m:true});
  if(dip.length>1 && rnd()<0.6) scelti.push({t:dip[1][0],x:dip[1][1],m:true});
  const restanti=3-scelti.length;
  const pool=[...scegli(lavori,2,rnd).map(l=>({t:l[0],x:l[1]})),...scegli(SPUNTI,2,rnd).map(s=>({t:"Spunto",x:s}))];
  scelti=scelti.concat(scegli(pool,restanti,rnd));
  $("#consigli-oggi").innerHTML=scelti.map(c=>`<div class="consiglio-oggi ${c.m?"meteo-dip":""}"><small>${esc(c.t)}</small>${esc(c.x)}</div>`).join("");
}

const WMO={0:"Sereno",1:"Quasi sereno",2:"Parzialmente nuvoloso",3:"Coperto",45:"Nebbia",48:"Nebbia con brina",51:"Pioviggine leggera",53:"Pioviggine",55:"Pioviggine fitta",56:"Pioviggine gelata",57:"Pioviggine gelata",61:"Pioggia leggera",63:"Pioggia",65:"Pioggia forte",66:"Pioggia gelata",67:"Pioggia gelata forte",71:"Neve leggera",73:"Neve",75:"Neve forte",77:"Nevischio",80:"Rovesci leggeri",81:"Rovesci",82:"Rovesci violenti",85:"Rovesci di neve",86:"Rovesci di neve forti",95:"Temporale",96:"Temporale con grandine",99:"Temporale con grandine forte"};
const dirVento=g=>["N","NE","E","SE","S","SO","O","NO"][Math.round(g/45)%8];

function mostraMeteo(w){
  const c=w.current, d=w.daily;
  const nomeG=i=>{ const dt=new Date(d.time[i]+"T12:00:00"); return i===0?"Oggi":GIORNI[dt.getDay()]; };
  const et0 = d.et0_fao_evapotranspiration ? d.et0_fao_evapotranspiration[0] : null;
  const suoloOra = w.hourly && w.hourly.soil_temperature_0cm ? w.hourly.soil_temperature_0cm[new Date().getHours()] : null;
  const umSuolo = w.hourly && w.hourly.soil_moisture_0_to_1cm ? w.hourly.soil_moisture_0_to_1cm[new Date().getHours()] : null;
  const alba = d.sunrise[0].slice(11,16), tram=d.sunset[0].slice(11,16);
  const allarmi=[];
  const minTre=Math.min(...d.temperature_2m_min.slice(0,3));
  if(minTre<=1) allarmi.push(`<div class="allarme gelo">Rischio gelata: minima ${minTre.toFixed(0)} °C entro tre giorni. Tessuto non tessuto pronto.</div>`);
  if(d.precipitation_sum[0]>=8) allarmi.push(`<div class="allarme">Pioggia abbondante oggi (${d.precipitation_sum[0].toFixed(0)} mm): terreno da non lavorare.</div>`);
  if(d.wind_speed_10m_max[0]>=40) allarmi.push(`<div class="allarme">Vento forte (raffiche ${d.wind_gusts_10m_max?d.wind_gusts_10m_max[0].toFixed(0):d.wind_speed_10m_max[0].toFixed(0)} km/h): controlla tunnel e tutori.</div>`);
  if(d.uv_index_max && d.uv_index_max[0]>=7) allarmi.push(`<div class="allarme">UV alto (${d.uv_index_max[0].toFixed(0)}): lavora nell'orto la mattina presto o dopo le 17.</div>`);
  $("#meteo").innerHTML=`
    <div class="ora"><div class="temp">${Math.round(c.temperature_2m)}°</div><div><div class="desc">${WMO[c.weather_code]||"—"}</div><div style="color:var(--muto);font-size:.88rem">percepita ${Math.round(c.apparent_temperature)}° · min ${Math.round(d.temperature_2m_min[0])}° / max ${Math.round(d.temperature_2m_max[0])}°</div></div></div>
    <div class="dett">
      <div><span>Umidità</span>${c.relative_humidity_2m}%</div>
      <div><span>Vento</span>${Math.round(c.wind_speed_10m)} km/h ${dirVento(c.wind_direction_10m)}${c.wind_gusts_10m?` · raffiche ${Math.round(c.wind_gusts_10m)}`:""}</div>
      <div><span>Pioggia oggi</span>${d.precipitation_sum[0].toFixed(1)} mm · prob. ${d.precipitation_probability_max[0]}%</div>
      ${suoloOra!==null?`<div><span>Temperatura terreno</span>${Math.round(suoloOra)} °C in superficie</div>`:""}
      ${umSuolo!==null?`<div><span>Umidità terreno</span>${umSuolo<0.15?"secco":umSuolo<0.3?"buono":"bagnato"} (${umSuolo.toFixed(2)} m³/m³)</div>`:""}
      ${et0!==null?`<div><span>Acqua che evapora oggi</span>${et0.toFixed(1)} mm (l/m²)</div>`:""}
      <div><span>Sole</span>${alba} – ${tram}</div>
      ${d.uv_index_max?`<div><span>UV max</span>${d.uv_index_max[0].toFixed(0)}</div>`:""}
    </div>
    <div class="allarmi">${allarmi.join("")}</div>
    <div class="sette">${d.time.map((t,i)=>`<div class="${d.temperature_2m_min[i]<=1?"gelo":""}"><small>${nomeG(i)}</small><b>${Math.round(d.temperature_2m_max[i])}°</b><small>${Math.round(d.temperature_2m_min[i])}°</small><small>${d.precipitation_sum[i]>=1?d.precipitation_sum[i].toFixed(0)+" mm":"—"}</small></div>`).join("")}</div>
    <div class="stato">Open-Meteo · ${NOME_LUOGO} · aggiornato alle ${c.time.slice(11,16)}</div>`;
}

/* fase lunare: 0 = nuova, 0.5 = piena; riferimento luna nuova 6 gennaio 2000, 18:14 UTC */
function faseLuna(d){ const s=29.530588853; const t=(d.getTime()-Date.UTC(2000,0,6,18,14))/86400000; return ((t/s)%1+1)%1; }
function lunaInfo(d){
  const f=faseLuna(d), prossimo=faseLuna(new Date(d.getTime()+86400000));
  const passa=(a,b,x)=> (a<=x && b>x) || (a>b && (x>=a || x<b)); /* attraversa x tra oggi e domani */
  if(passa(f,prossimo,0)) return {ev:"nuova",icona:"🌑",txt:"luna nuova"};
  if(passa(f,prossimo,0.25)) return {ev:"primo",icona:"🌓",txt:"primo quarto"};
  if(passa(f,prossimo,0.5)) return {ev:"piena",icona:"🌕",txt:"luna piena"};
  if(passa(f,prossimo,0.75)) return {ev:"ultimo",icona:"🌗",txt:"ultimo quarto"};
  return {ev:null, crescente:f<0.5, txt:f<0.5?"luna crescente":"luna calante"};
}
function mostraCalendario(w){
  const y=oggi.getFullYear(), m=oggi.getMonth();
  const primo=new Date(y,m,1), nGiorni=new Date(y,m+1,0).getDate();
  let inizio=(primo.getDay()+6)%7; // lunedì=0
  const prev={}; if(w){ w.daily.time.forEach((t,i)=>{ prev[t]={gelo:w.daily.temperature_2m_min[i]<=1,pioggia:w.daily.precipitation_sum[i]>=2,max:w.daily.temperature_2m_max[i]}; }); }
  let celle=""; for(let i=0;i<inizio;i++) celle+=`<div class="cal-giorno vuoto"></div>`;
  for(let g=1;g<=nGiorni;g++){
    const iso=`${y}-${String(m+1).padStart(2,"0")}-${String(g).padStart(2,"0")}`;
    const p=prev[iso]; const L=lunaInfo(new Date(y,m,g,12));
    const cls=["cal-giorno", g===oggi.getDate()?"oggi":"", p&&p.gelo?"gelo":"", p&&p.pioggia?"pioggia":"", L.ev?"luna":""].join(" ");
    celle+=`<div class="${cls}" title="${L.txt}"><span class="n">${g}</span>${L.ev?`<span class="lu" aria-label="${L.txt}">${L.icona}</span>`:""}${p?`<small>${Math.round(p.max)}°</small>`:""}</div>`;
  }
  const Lo=lunaInfo(oggi);
  $("#cal").innerHTML=`<div class="cal-testa"><div><h2 style="margin:0">${meseCorrente.nome} ${y}</h2><small>${Lo.ev?Lo.txt:Lo.txt}, ${nGiorni-oggi.getDate()} giorni alla fine del mese</small></div><span class="cal-luna-oggi" aria-hidden="true">${Lo.ev?Lo.icona:(Lo.crescente?"🌒":"🌘")}</span></div>
    <div class="cal-griglia">${["L","M","M","G","V","S","D"].map(x=>`<div class="gn">${x}</div>`).join("")}${celle}</div>
    <div class="cal-legenda"><span><i class="pt gelo"></i>rischio gelata</span><span><i class="pt pioggia"></i>pioggia</span><span>🌑🌓🌕🌗 fasi della luna</span><span>il numero piccolo è la massima prevista</span></div>`;
  const fatti=meseCorrente.lavori.filter((l,i)=>stato[meseCorrente.id+"-"+i]).length;
  const daFare=meseCorrente.lavori.filter((l,i)=>!stato[meseCorrente.id+"-"+i]);
  $("#cal-lavori").innerHTML=`<b>Lavori di ${meseCorrente.nome.toLowerCase()}: ${fatti} fatti, ${daFare.length} da fare</b><ul>${daFare.slice(0,5).map(l=>`<li>${esc(l)}</li>`).join("")}${daFare.length>5?`<li>… e altri ${daFare.length-5}</li>`:""}</ul><button class="azzera" data-vai="${meseCorrente.id}" style="margin-top:.6rem">Apri ${meseCorrente.nome.toLowerCase()}</button>`;
}

async function caricaMeteo(){
  const url=`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&timezone=Europe%2FRome&forecast_days=7`+
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m`+
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,sunrise,sunset,uv_index_max,wind_speed_10m_max,wind_gusts_10m_max,et0_fao_evapotranspiration`+
    `&hourly=soil_temperature_0cm,soil_moisture_0_to_1cm`;
  try{
    const r=await fetch(url); if(!r.ok) throw new Error(r.status);
    const w=await r.json();
    try{ localStorage.setItem("orto-meteo",JSON.stringify({t:Date.now(),w})); }catch(e){}
    METEO_ULTIMO=w; mostraMeteo(w); mostraCalendario(w); mostraConsigli(w); mostraAllarme(w);
  }catch(err){
    let cache=null; try{ cache=JSON.parse(localStorage.getItem("orto-meteo")||"null"); }catch(e){}
    if(cache && Date.now()-cache.t<12*3600*1000){ mostraMeteo(cache.w); $("#meteo").insertAdjacentHTML("beforeend",`<div class="stato">Senza connessione: dati di qualche ora fa.</div>`); mostraCalendario(cache.w); mostraConsigli(cache.w); }
    else { $("#meteo").innerHTML=`<div class="stato">Meteo non disponibile in questo momento (serve la connessione). Il resto funziona lo stesso.</div>`; mostraCalendario(null); mostraConsigli(null); }
  }
}
mostraCalendario(null); mostraConsigli(null);
mostraSettimana();
if(COMUNE) caricaMeteo();

/* ---- avvio ---- */
const hash = location.hash.replace("#","");
let iniziale = tabs.findIndex(t=>t.id===hash);
vai(iniziale>=0?iniziale:0, 1);

/* ---- ricerca ortaggi (barra in alto) ---- */
(function(){
  const inp=$("#cerca-input"), box=$("#cerca-risultati"); if(!inp||!box) return;
  /* indice: ogni voce del calendario, una sola volta, con i mesi in cui compare */
  const mappa=new Map();
  MESI.forEach(me=>me.piante.forEach(p=>{
    const nome=p[0];
    if(!mappa.has(nome)) mappa.set(nome,{nome, mesi:[], chiave:chiaviPer(nome)[0]||null});
    const e=mappa.get(nome); if(!e.mesi.includes(me.nome)) e.mesi.push(me.nome);
  }));
  const indice=[...mappa.values()].map(e=>({...e, testo:norm(e.nome+" "+e.mesi.join(" ")+" "+(e.chiave?SCHEDE[e.chiave].nome+" "+SCHEDE[e.chiave].match.join(" "):""))}));
  function chiudi(){ box.hidden=true; box.innerHTML=""; }
  function cerca(){
    const q=norm(inp.value.trim());
    if(q.length<2){ chiudi(); return; }
    const peso=e=>{ const n=norm(e.nome); return n.startsWith(q)?0 : n.includes(q)?1 : 2; };
    const trovati=indice.filter(e=>e.testo.includes(q)).sort((a,b)=>peso(a)-peso(b)||a.nome.length-b.nome.length).slice(0,12);
    if(!trovati.length){ box.innerHTML=`<div class="cerca-vuoto">Niente con questo nome. Prova con meno lettere.</div>`; box.hidden=false; return; }
    box.innerHTML=trovati.map(e=>`<button class="cerca-riga" data-cerca-pianta="${esc(e.nome)}">${e.chiave?imgTag(fotoPianta(e.chiave),e.nome,"mini"):'<span class="mini manca"></span>'}<span><b>${esc(e.nome)}</b><small>${e.mesi.join(", ")}</small></span></button>`).join("");
    box.hidden=false;
  }
  inp.addEventListener("input",cerca);
  inp.addEventListener("keydown",e=>{
    if(e.key==="Enter"){ const b=box.querySelector("[data-cerca-pianta]"); if(b){ apriPianta(b.dataset.cercaPianta); chiudi(); inp.blur(); } }
    if(e.key==="Escape"){ chiudi(); inp.blur(); }
  });
  box.addEventListener("click",e=>{ const b=e.target.closest("[data-cerca-pianta]"); if(!b) return; apriPianta(b.dataset.cercaPianta); chiudi(); inp.blur(); });
  document.addEventListener("click",e=>{ if(!e.target.closest(".cerca")) chiudi(); });
})();

/* ---- scelta del comune ---- */
(function(){
  const mod=$("#modale-comune"), inp=$("#comune-input"), box=$("#comune-risultati"); if(!mod||!inp) return;
  let LISTA=null, scelto=null, terra=(COMUNE&&COMUNE.terra)||null, esp=(COMUNE&&COMUNE.esp)||null, amb=(COMUNE&&COMUNE.amb)||null;
  function segna(gruppo, attr, val){ document.querySelectorAll(`#${gruppo} button`).forEach(x=>x.setAttribute("aria-pressed", x.dataset[attr]===val?"true":"false")); }
  segna("terra-bottoni","terra",terra); segna("esp-bottoni","esp",esp); segna("amb-bottoni","amb",amb);
  async function caricaLista(){
    if(LISTA) return true;
    box.hidden=false; box.innerHTML=`<div class="shimmer-box" aria-label="Carico i comuni"><span class="sh m"></span><span class="sh l"></span><span class="sh m"></span></div>`;
    try{ LISTA=await (await fetch("dati/comuni.json")).json(); box.hidden=true; box.innerHTML=""; return true; }
    catch(e){ box.innerHTML=`<div class="cerca-vuoto">Non riesco a scaricare l'elenco: controlla la connessione, chiudi e riprova.</div>`; return false; }
  }
  $("#btn-comune").onclick=()=>{ mod.hidden=false; document.body.style.overflow="hidden";
    if(COMUNE){ inp.value=COMUNE.n; scelto={...COMUNE}; $("#comune-riep").innerHTML=`<b>${esc(COMUNE.n)} (${esc(COMUNE.pr)})</b> — ${fraseClima(COMUNE)}`; $("#comune-scelto").hidden=false; }
    caricaLista(); };
  const obbligo=!COMUNE;
  if(obbligo){ $("#comune-chiudi").hidden=true; mod.hidden=false; document.body.style.overflow="hidden"; caricaLista(); }
  function chiudi(){ mod.hidden=true; document.body.style.overflow=""; }
  $("#comune-chiudi").onclick=chiudi;
  mod.addEventListener("click",e=>{ if(e.target===mod && !obbligo) chiudi(); });
  inp.addEventListener("input",()=>{
    $("#comune-scelto").hidden=true; scelto=null;
    if(!LISTA) return;
    const q=norm(inp.value.trim());
    if(q.length<1){ box.hidden=true; box.innerHTML=""; return; }
    const tr=LISTA.map((r,i)=>({r,i,n:norm(r[0])})).filter(x=>x.n.includes(q))
      .sort((a,b)=>((a.n.startsWith(q)?0:1)-(b.n.startsWith(q)?0:1)) || ((b.r[8]||0)-(a.r[8]||0)) || a.n.length-b.n.length).slice(0,4);
    box.innerHTML = tr.length ? tr.map(x=>`<button class="cerca-riga" data-i="${x.i}"><span><b>${esc(x.r[0])}</b><small>${esc(x.r[2])} (${esc(x.r[1])}), ${x.r[5]} m</small></span></button>`).join("") : `<div class="cerca-vuoto">Nessun comune con questo nome. Controlla come si scrive.</div>`;
    box.hidden=false;
  });
  box.addEventListener("click",e=>{
    const b=e.target.closest("[data-i]"); if(!b) return;
    const r=LISTA[+b.dataset.i];
    scelto={n:r[0],pr:r[1],reg:r[2],lat:r[3],lon:r[4],alt:r[5],gg:r[6],z:r[7]};
    box.hidden=true; inp.value=r[0];
    $("#comune-riep").innerHTML=`<b>${esc(r[0])} (${esc(r[1])})</b> — ${fraseClima(scelto)}`;
    $("#comune-scelto").hidden=false;
  });
  $("#terra-bottoni").addEventListener("click",e=>{ const b=e.target.closest("[data-terra]"); if(!b) return; terra=b.dataset.terra; segna("terra-bottoni","terra",terra); });
  $("#esp-bottoni").addEventListener("click",e=>{ const b=e.target.closest("[data-esp]"); if(!b) return; esp=b.dataset.esp; segna("esp-bottoni","esp",esp);
    if(scelto){ scelto.esp=esp; $("#comune-riep").innerHTML=`<b>${esc(scelto.n)} (${esc(scelto.pr)})</b> — ${fraseClima(scelto)}`; } });
  $("#amb-bottoni").addEventListener("click",e=>{ const b=e.target.closest("[data-amb]"); if(!b) return; amb=b.dataset.amb; segna("amb-bottoni","amb",amb); });
  $("#comune-salva").onclick=()=>{
    if(!scelto){ chiudi(); return; }
    scelto.terra=terra; scelto.esp=esp||"pianura"; scelto.amb=amb||"campo";
    try{ localStorage.setItem("orto-comune",JSON.stringify(scelto)); }catch(e){}
    location.reload();
  };
})();

/* ---- funziona anche senza campo ---- */
if("serviceWorker" in navigator){ window.addEventListener("load",()=>{ navigator.serviceWorker.register("sw.js").catch(()=>{}); }); }

/* ---- la mappa: Italia in linea sottile, e il punto dove sei ---- */
async function mostraMappa(){
  const box=$("#mappa"); if(!box||!COMUNE) return;
  try{
    const j=await (await fetch("dati/italia.json")).json();
    const x=(COMUNE.lon-j.LON0)/(j.LON1-j.LON0)*j.W, y=(j.LAT1-COMUNE.lat)/(j.LAT1-j.LAT0)*j.H;
    const labelX = x>j.W*0.6 ? x-14 : x+14, anchor = x>j.W*0.6 ? "end" : "start";
    box.innerHTML=`<svg viewBox="0 0 ${j.W} ${j.H}" role="img" aria-label="${esc(COMUNE.n)} sulla mappa d'Italia">
      <defs><pattern id="griglia" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".6" class="gr"/></pattern></defs>
      <rect width="${j.W}" height="${j.H}" fill="url(#griglia)"/>
      <path d="${j.d}" class="italia"/>
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="14" class="alone"/>
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" class="punto"/>
      <text x="${labelX.toFixed(1)}" y="${(y+4).toFixed(1)}" text-anchor="${anchor}" class="etichetta">${esc(COMUNE.n)}</text>
    </svg>`;
  }catch(e){ box.hidden=true; }
}
mostraMappa();
