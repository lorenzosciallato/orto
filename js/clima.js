/* Clima per comune — il calendario base è scritto per Pievebovigliana (441 m, 2156 gradi giorno, zona E).
   Da qui si calcola quanto anticipare o posticipare per qualsiasi altro comune d'Italia. */

const CLIMA_BASE_GG = 2156; // Pievebovigliana

/* comune salvato dall'utente: {n, pr, reg, lat, lon, alt, gg, z, terra} */
function comuneSalvato(){
  try{ return JSON.parse(localStorage.getItem("orto-comune")||"null"); }catch(e){ return null; }
}

/* settimane di scarto rispetto al calendario base: negativo = anticipa, positivo = posticipa.
   Regola pratica: circa 250 gradi giorno = 2 settimane di stagione. */
function scartoSettimane(gg){
  const s=Math.round((gg-CLIMA_BASE_GG)/250)*1;
  return Math.max(-6, Math.min(5, s));
}

/* fascia climatica leggibile, con date tipiche delle gelate */
function fasciaClima(gg){
  if(gg<900)  return {id:"caldissima", nome:"clima mediterraneo caldo", gelate:"gelate rare o assenti: l'orto non si ferma mai davvero", ultima:"quasi mai", prima:"quasi mai"};
  if(gg<1400) return {id:"calda", nome:"clima mediterraneo", gelate:"gelate leggere e rare", ultima:"metà marzo", prima:"inizio dicembre"};
  if(gg<2100) return {id:"mite", nome:"clima di collina dolce e pianura tiepida", gelate:"gelate normali d'inverno", ultima:"inizio aprile", prima:"metà novembre"};
  if(gg<3000) return {id:"continentale", nome:"clima di collina interna e pianura fredda", gelate:"inverni freddi, gelate tardive possibili", ultima:"fine aprile", prima:"fine ottobre"};
  return {id:"montagna", nome:"clima di montagna", gelate:"stagione corta: il gelo può arrivare presto e andarsene tardi", ultima:"metà–fine maggio", prima:"inizio ottobre"};
}

/* frase pronta per i banner e per la scheda "Quando seminare?" */
function fraseClima(c){
  const s=scartoSettimane(c.gg), f=fasciaClima(c.gg);
  let regola;
  if(s<=-2) regola=`le date di questo calendario valgono per la collina marchigiana: da te <b>anticipa di circa ${-s} settimane</b> in primavera e allunga di altrettanto l'autunno`;
  else if(s===-1) regola=`da te puoi <b>anticipare di circa una settimana</b> le date di questo calendario`;
  else if(s===0) regola=`le date di questo calendario valgono così come sono`;
  else if(s===1) regola=`da te conviene <b>posticipare di circa una settimana</b> le date di questo calendario`;
  else regola=`da te la stagione è più corta: <b>posticipa di circa ${s} settimane</b> in primavera e gioca d'anticipo in autunno`;
  return `${f.nome[0].toUpperCase()+f.nome.slice(1)} (${c.alt} m, zona ${c.z}): ${regola}. Ultime gelate attese: ${f.ultima} · prime gelate: ${f.prima}.`;
}

/* consigli per il tipo di terra scelto dall'utente */
const TERRE = {
  argillosa:{nome:"argillosa (pesante)", tip:"La tua terra drena male ma trattiene bene acqua e nutrimento: non lavorarla mai bagnata (fa zolle di cemento), alleggeriscila ogni anno con compost e sabbia, e per aglio, carote e radici lunghe usa porche rialzate."},
  sabbiosa:{nome:"sabbiosa (sciolta)", tip:"La tua terra si scalda presto e non ristagna mai — puoi anticipare un po' le semine — ma beve e dimentica: compost abbondante ogni anno e annaffiature più frequenti e leggere."},
  media:{nome:"di medio impasto", tip:"Hai la terra che tutti vorrebbero: mantienila così con compost ogni anno e senza calpestarla quando è fradicia."},
  calcarea:{nome:"calcarea (bianca)", tip:"La tua terra piace a legumi, cavoli e aromatiche; mirtilli e acidofile invece solo in vaso. Se le foglie ingialliscono tra le nervature è fame di ferro: si risolve con i chelati."}
};

/* colture in più per certi climi, mese per mese: [nome, tipo, come, insolita] — per ora senza foto */
const PIANTE_EXTRA = {
  caldissima:{ /* gg<900 */
    gennaio:[["Fava e pisello (semina invernale)","semina","da te si seminano anche ora: l'inverno è la tua primavera",0],["Patata precoce","impianto","al Sud si pianta già da gennaio per raccogliere a maggio",0]],
    febbraio:[["Carciofo (risveglio carducci)","impianto","dividi i polloni dalle piante madri",1]],
    marzo:[["Pomodoro (trapianto precoce)","trapianto","da te le gelate sono finite: fuori un mese e mezzo prima",0]],
    aprile:[["Cappero","impianto","talee o piantine nei muretti a secco e nelle spaccature assolate",1],["Fico d'India","impianto","si pianta una pala interrata a metà: attecchisce da sola",1]],
    maggio:[["Arachide","semina","vuole 4 mesi caldi: da te ci stanno tutti",1],["Sesamo","semina","clima da sesamo vero: raccolta a settembre",1]],
    settembre:[["Carciofo (impianto nuovo)","impianto","ovoli o carducci: produce già in primavera",1]],
    ottobre:[["Agrumi in vaso o in piena terra","impianto","da te anche in piena terra, nel posto riparato",1],["Insalate invernali all'aperto","semina","lattughe e cicorie senza protezioni: il tuo lusso invernale",0]],
    novembre:[["Fava lunga di stagione","semina","semina comoda fino a dicembre",0]]
  },
  calda:{ /* 900–1400 */
    febbraio:[["Carciofo (risveglio carducci)","impianto","dividi i polloni dalle piante madri",1]],
    marzo:[["Patata precoce","impianto","con l'ultima gelata a metà marzo puoi partire presto",0]],
    aprile:[["Cappero","impianto","nei muri a secco e negli angoli aridi e assolati",1]],
    ottobre:[["Carciofo (impianto)","impianto","ovoli o carducci in buche ricche di letame maturo",1],["Agrumi in vaso","impianto","in vaso grande, da riparare solo nelle notti peggiori",1]]
  },
  montagna:{ /* gg>3000 */
    marzo:[["Rafano (barbaforte)","impianto","porzioni di radice: pianta di ferro che ama il freddo",1]],
    maggio:[["Segale (per pane o sovescio)","semina","il cereale di montagna per eccellenza",1],["Cavolo rapa estivo","semina","cresce in fretta: perfetto per stagioni corte",0]],
    giugno:[["Lattughe e radici a ciclo corto","semina","da te giugno è il cuore delle semine: tutto ciò che matura in 60–90 giorni",0]],
    agosto:[["Segale autunnale","semina","sverna sotto la neve e riparte a primavera",1]]
  }
};

function pianteExtraPer(c){
  const f=fasciaClima(c.gg).id;
  return PIANTE_EXTRA[f]||null;
}
