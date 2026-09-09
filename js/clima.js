/* Clima per comune — ogni comune è la propria base: fascia, gelate e testi del mese
   calcolati dai gradi giorno ufficiali (DPR 412) del comune scelto dall'utente. */

function comuneSalvato(){
  try{ return JSON.parse(localStorage.getItem("orto-comune")||"null"); }catch(e){ return null; }
}

/* fascia climatica dai gradi giorno */
function fasciaClima(gg){
  if(gg<900)  return {id:"caldissima", nome:"clima mediterraneo caldo", ultima:"quasi mai", prima:"quasi mai"};
  if(gg<1400) return {id:"calda", nome:"clima mediterraneo", ultima:"metà marzo", prima:"inizio dicembre"};
  if(gg<2100) return {id:"mite", nome:"clima mite di pianura e prima collina", ultima:"inizio aprile", prima:"metà novembre"};
  if(gg<3000) return {id:"continentale", nome:"clima continentale, di collina e pianura fredda", ultima:"fine aprile", prima:"fine ottobre"};
  return {id:"montagna", nome:"clima di montagna", ultima:"metà–fine maggio", prima:"inizio ottobre"};
}

/* frase sul clima del comune: assoluta, parla solo del posto dell'utente */
function fraseClima(c){
  const f=fasciaClima(c.gg);
  const frasi={
    caldissima:`gelate rare o assenti: l'orto non si ferma mai davvero. I trapianti estivi partono già da metà marzo e l'orto invernale vive all'aperto.`,
    calda:`ultime gelate verso ${f.ultima}, prime verso ${f.prima}. Trapianti estivi da inizio aprile e un autunno lungo che ripaga le semine tardive.`,
    mite:`ultime gelate verso ${f.ultima}, prime verso ${f.prima}. Trapianti estivi da fine aprile; quasi nove mesi di orto pieno.`,
    continentale:`ultime gelate fino a ${f.ultima}, prime già a ${f.prima}. Trapianti estivi da metà maggio; l'inverno si lavora in semenzaio e sotto protezione.`,
    montagna:`gelate possibili fino a ${f.ultima} e di nuovo da ${f.prima}: stagione corta e intensa. Trapianti da fine maggio–giugno e varietà precoci.`
  };
  return `${f.nome[0].toUpperCase()+f.nome.slice(1)} (${c.alt} m, zona ${c.z}): ${frasi[f.id]}`;
}

/* il mese visto dal clima dell'utente: una riga per ognuna delle 5 fasce × 12 mesi */
const MESE_CLIMA = {
caldissima:{
gennaio:"Da te gennaio è un mese d'orto vero: si raccolgono le insalate, si seminano fave e piselli, e le gelate sono un'eccezione da cui guardarsi, non la regola.",
febbraio:"Febbraio da te è già primavera tecnica: partono le patate precoci e i semenzai corrono; occhio solo alle rare notti serene più fredde.",
marzo:"Marzo è il tuo maggio: gelate praticamente finite, i primi trapianti estivi possono uscire nelle posizioni buone.",
aprile:"Aprile pieno: tutto l'orto estivo va a dimora, e chi ha seminato presto comincia a raccogliere.",
maggio:"Maggio da te scalda già sul serio: completa i trapianti presto e pensa fin d'ora a ombra e acqua per le insalate.",
giugno:"Giugno caldo e secco: pacciamatura e irrigazione regolare valgono più di qualsiasi concime.",
luglio:"Luglio è il mese da attraversare: si raccoglie all'alba, si annaffia col buio, e le semine nuove aspettano o vanno a mezz'ombra.",
agosto:"Ancora piena estate, ma è il momento di seminare l'orto d'autunno-inverno, che da te è la stagione più generosa.",
settembre:"Settembre riapre i giochi: cavoli, finocchi e insalate a tutto campo, e si piantano i carciofi.",
ottobre:"Ottobre da te è una seconda primavera: si semina, si trapianta e si raccoglie insieme, con la terra ancora calda.",
novembre:"Novembre mite: fave, piselli, aglio e cipolle vanno a dimora con calma, e l'orto invernale cresce all'aperto.",
dicembre:"Dicembre lavora piano ma lavora: raccolte continue e ultime semine protette solo per scrupolo."},
calda:{
gennaio:"Gennaio da te è freddo ma raramente cattivo: si raccoglie l'orto invernale e in casa partono i primi semenzai.",
febbraio:"Le gelate si contano sulle dita: fave e piselli in campo, semenzai estivi al caldo, patate precoci in vista.",
marzo:"Verso metà mese le gelate da te di solito finiscono: patate in campo e primi trapianti arditi nelle posizioni riparate.",
aprile:"Mese pieno: da inizio–metà aprile l'orto estivo va a dimora, con un telo pronto per scrupolo le prime settimane.",
maggio:"Tutto fuori e tutto in crescita: da te maggio è già un mese caldo, con le prime raccolte estive in fondo.",
giugno:"Estate fatta: acqua regolare, pacciamatura, e raccolte che partono sul serio.",
luglio:"Caldo pieno: raccogli spesso, annaffia la sera, e sposta a mezz'ombra le semine di insalate.",
agosto:"Nel pieno del caldo si prepara l'autunno: semine di cavoli, finocchi e cime di rapa a fine mese, con acqua garantita.",
settembre:"La terra è ancora calda e le piogge tornano: il mese d'oro per l'orto autunnale e per le fragole nuove.",
ottobre:"Ottobre generoso: trapianti d'autunno, aglio e cipolle a fine mese, e le prime gelate sono ancora lontane.",
novembre:"Autunno lungo: si semina ancora fava e pisello, e l'orto invernale cresce all'aperto quasi senza protezioni.",
dicembre:"Con le prime gelate a inizio mese l'orto rallenta ma non si ferma: raccolte invernali e progetti per l'anno nuovo."},
mite:{
gennaio:"Gennaio freddo il giusto: fuori si raccoglie e si pota, dentro partono i semenzai di peperoni e melanzane.",
febbraio:"Ultime settimane d'inverno vero: fave e piselli in campo nelle giornate buone, semenzai estivi a pieno ritmo.",
marzo:"Il mese della svolta: la terra si lavora, le semine rustiche partono, ma per le piante tenere le gelate non sono ancora finite.",
aprile:"Le ultime gelate di solito se ne vanno a inizio mese: da metà–fine aprile i trapianti estivi possono cominciare, con un telo a portata di mano.",
maggio:"Via libera totale: tutto l'orto estivo a dimora, e le semine dirette di fagioli, zucchine e mais nella terra ormai tiepida.",
giugno:"Crescita piena: tutori, acqua regolare e le prime zucchine che non aspettano nessuno.",
luglio:"Caldo vero anche da te: raccolte quotidiane, irrigazione seria, e a fine mese le prime semine per l'autunno.",
agosto:"Il mese doppio: si raccoglie l'estate e si semina l'autunno — cavoli, finocchi, cime di rapa vogliono partire adesso.",
settembre:"L'aria si addolcisce: trapianti autunnali, spinaci e valerianella, e le ultime raccolte estive.",
ottobre:"Mese di raccolta grande: zucche, radici e cavoli; aglio e cipolle a dimora prima che la terra si raffreddi.",
novembre:"Verso metà mese arrivano le prime gelate: si copre chi resta fuori e si pianta la frutta a radice nuda.",
dicembre:"L'orto riposa quasi del tutto: raccolte invernali sotto telo, potature e la mappa dell'anno nuovo."},
continentale:{
gennaio:"Gennaio rigido: terra gelata o fradicia che non si tocca. Fuori si raccoglie il poco e si pota; dentro casa parte già l'estate, coi primi semenzai.",
febbraio:"L'inverno ancora comanda, ma nelle giornate buone partono fave, piselli e le prime protezioni; i semenzai al caldo corrono.",
marzo:"La terra si sveglia: semine rustiche all'aperto, patate a fine mese se non è fradicio, e il gelo che ancora torna di notte.",
aprile:"Mese traditore: giornate dolci e gelate notturne fino a fine mese, nei fondovalle anche ai primi di maggio. Le piante tenere aspettano, il resto parte.",
maggio:"Da metà mese, a gelate finite, esce tutto: pomodori, zucchine, basilico e fagioli nella terra finalmente tiepida.",
giugno:"Il mese della crescita: tutori, sfoltimenti, acqua regolare e le prime raccolte vere.",
luglio:"Il mese più caldo, con le giornate buone per raccogliere all'alba; a fine mese partono le semine per l'autunno.",
agosto:"Si raccoglie a pieno ritmo e insieme si semina l'orto d'autunno: cime di rapa, spinaci e valerianella nella terra ancora calda.",
settembre:"L'estate sfuma in fretta: ultime raccolte tenere, trapianti autunnali e il TNT che torna a portata di mano.",
ottobre:"Raccolta grande e primi geli in fondo al mese: zucche in cantina, aglio a dimora, teli pronti.",
novembre:"L'inverno bussa: si copre, si pacciama, si piantano gli alberi a radice nuda nei giorni senza gelo.",
dicembre:"Terra a riposo: raccolte invernali sotto protezione, potature, semi da ordinare e il quaderno da aggiornare."},
montagna:{
gennaio:"Inverno pieno, spesso neve: l'orto dorme e va lasciato dormire. In casa si fanno i piani e partono i primissimi semenzai.",
febbraio:"Ancora inverno vero: semenzai al caldo per le piante lente, attrezzi in ordine, e pazienza — la tua stagione è corta ma arriva.",
marzo:"Il disgelo comincia: dove la terra si libera partono spinaci e fave, ma il grosso aspetta; semenzai a pieno ritmo.",
aprile:"La primavera sale piano: semine rustiche sotto TNT e tunnel, mentre le gelate notturne restano di casa.",
maggio:"Il gelo può tornare fino a fine mese: le rustiche fuori, le tenere pronte in vaso ad aspettare il via.",
giugno:"Il tuo grande mese di semina e trapianto: esce tutto insieme, e ciò che matura in 60–90 giorni è la scelta più sicura.",
luglio:"L'estate breve dà il massimo: crescita veloce, acqua regolare e notti fresche che fanno buone insalate e radici.",
agosto:"Piena raccolta, ma l'autunno è dietro l'angolo: ultime semine veloci a inizio mese, e a fine agosto la segale.",
settembre:"Le prime brinate possono arrivare presto: si raccoglie con ritmo e si copre ciò che deve finire di maturare.",
ottobre:"Il gelo torna padrone: si svuota l'orto, si insila e si conserva, e la terra si copre di letame e foglie.",
novembre:"Terra ferma: si chiude, si pacciama a fondo e si controlla la legna del semenzaio riscaldato.",
dicembre:"L'orto riposa sotto il freddo (spesso sotto la neve): cataloghi di semi, progetti e il quaderno dell'anno."}
};

function meseClima(c, meseId){
  const f=fasciaClima(c.gg);
  return (MESE_CLIMA[f.id]&&MESE_CLIMA[f.id][meseId]) || "";
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
  caldissima:{
    gennaio:[["Fava e pisello (semina invernale)","semina","da te si seminano anche ora: l'inverno è la tua primavera",0],["Patata precoce","impianto","al Sud si pianta già da gennaio per raccogliere a maggio",0]],
    febbraio:[["Carciofo (risveglio carducci)","impianto","dividi i polloni dalle piante madri",1]],
    marzo:[["Pomodoro (trapianto precoce)","trapianto","da te le gelate sono finite: fuori un mese e mezzo prima",0]],
    aprile:[["Cappero","impianto","talee o piantine nei muretti a secco e nelle spaccature assolate",1],["Fico d'India","impianto","si pianta una pala interrata a metà: attecchisce da sola",1]],
    maggio:[["Arachide","semina","vuole 4 mesi caldi: da te ci stanno tutti",1],["Sesamo","semina","clima da sesamo vero: raccolta a settembre",1]],
    settembre:[["Carciofo (impianto nuovo)","impianto","ovoli o carducci: produce già in primavera",1]],
    ottobre:[["Agrumi in vaso o in piena terra","impianto","da te anche in piena terra, nel posto riparato",1],["Insalate invernali all'aperto","semina","lattughe e cicorie senza protezioni: il tuo lusso invernale",0]],
    novembre:[["Fava lunga di stagione","semina","semina comoda fino a dicembre",0]]
  },
  calda:{
    febbraio:[["Carciofo (risveglio carducci)","impianto","dividi i polloni dalle piante madri",1]],
    marzo:[["Patata precoce","impianto","con l'ultima gelata a metà marzo puoi partire presto",0]],
    aprile:[["Cappero","impianto","nei muri a secco e negli angoli aridi e assolati",1]],
    ottobre:[["Carciofo (impianto)","impianto","ovoli o carducci in buche ricche di letame maturo",1],["Agrumi in vaso","impianto","in vaso grande, da riparare solo nelle notti peggiori",1]]
  },
  montagna:{
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
