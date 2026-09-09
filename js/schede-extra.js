/* Schede aggiunte — si innestano su SCHEDE, SEMINA, SEMI e MESI già caricati. */

/* le aromatiche non passano più dalla scheda del basilico */
SCHEDE.basilico.match = SCHEDE.basilico.match.filter(m=>!["salvia","rosmarin","timo","origan","menta"].includes(m));

Object.assign(SCHEDE, {
carciofo:{ nome:"Carciofo", match:["carciof","carduccio","carducci"], ricette:[],
 cons:{verde:[["Fava e pisello","gli lasciano azoto tra le file"],["Lattuga","sfrutta lo spazio il primo anno"]],giallo:[["Cavoli","affamati come lui: distanza"]],rosso:[["Altri carciofi troppo vicini","vuole un metro per pianta"]]},
 conserva:`<p>Fresco, con il gambo in acqua come un fiore, 4–5 giorni. Cuori sott'olio dopo scottatura in acqua e aceto; congelati dopo scottatura, puliti e acidulati con limone.</p>`,
 storia:`<p>Il carciofo è un cardo addomesticato dagli arabi nella Sicilia e nell'Andalusia medievali: il nome viene dall'arabo <i>al-kharshuf</i>. Caterina de' Medici lo portò a Parigi e ne era ghiotta al punto da scandalizzare la corte. È perenne: una carciofaia dura 4–5 anni e si rinnova dai carducci, i polloni alla base, che si staccano e si ripiantano.</p>` },
peperoncino:{ nome:"Peperoncino", match:["peperoncin","habanero","jalape","piccant"], ricette:[],
 cons:{verde:[["Basilico","stessa acqua, stesso sole"],["Cipolla e aglio","tengono lontani gli afidi"]],giallo:[["Pomodoro","stesse malattie: distanza"]],rosso:[["Fagiolo rampicante","gli fa ombra"]]},
 conserva:`<p>Essiccato intero appeso a collane in luogo arieggiato, o in forno a 50 °C; in polvere in barattolo. Sott'olio dopo scottatura in aceto. Congelato intero, senza altro.</p>`,
 storia:`<p>Arriva dalle Americhe con Colombo, e in cento anni percorre il mondo via Portogallo fino all'India e alla Cina, dove oggi è più "tradizionale" che da noi. In Italia è la pianta della Calabria e del Sud; la piccantezza si misura in Scoville, dallo zero del peperone alle centinaia di migliaia dell'habanero.</p>` },
anguria:{ nome:"Anguria (cocomero)", match:["angur","cocomer"], ricette:[],
 cons:{verde:[["Mais","le fa ombra leggera e vento in meno"],["Fagiolo","azoto"]],giallo:[["Zucca","stesse malattie"]],rosso:[["Patata","peronospora in comune"]]},
 conserva:`<p>Intera in luogo fresco 2–3 settimane; tagliata in frigo 3–4 giorni coperta. La buccia bianca si fa sott'aceto o candita.</p>`,
 storia:`<p>Viene dall'Africa, dove la sua antenata selvatica cresceva nel Kalahari come riserva d'acqua; gli Egizi la dipingevano nelle tombe. Il nome "anguria" è del Nord, "cocomero" del Centro-Sud, "melone d'acqua" in tutto il mondo. Matura quando il viticcio vicino al picciolo secca e la macchia a terra vira dal bianco al giallo.</p>` },
cavolfiore:{ nome:"Cavolfiore e broccolo", match:["cavolfior","broccol","romanesco"], ricette:[],
 cons:{verde:[["Fagiolo e pisello","azoto"],["Sedano e cipolla","allontanano la cavolaia"]],giallo:[["Lattuga","ok tra le file finché i cavoli sono piccoli"]],rosso:[["Fragola","non si sopportano"],["Altri cavoli l'anno dopo","rotazione di 3 anni"]]},
 conserva:`<p>Cimette scottate 3 minuti e congelate. Sott'aceto (giardiniera). In frigo una settimana avvolto.</p>`,
 storia:`<p>Cavolfiore e broccolo sono la stessa specie del cavolo, selezionata per le infiorescenze: i romani mangiavano già broccoli, il cavolfiore arriva in Italia dal Mediterraneo orientale nel Cinquecento e il romanesco, con le sue spirali frattali, è nato nell'orto laziale.</p>` },
bruxelles:{ nome:"Cavolini di Bruxelles", match:["bruxelles","cavolin"], ricette:[],
 cons:{verde:[["Fagiolo","azoto"],["Aromatiche","allontanano la cavolaia"]],giallo:[["Cavoli","stesse malattie"]],rosso:[["Fragola","incompatibili"]]},
 conserva:`<p>Sulla pianta, in campo, fino a gennaio: il gelo li rende dolci. Raccolti, in frigo una settimana; scottati e congelati.</p>`,
 storia:`<p>Selezionati intorno a Bruxelles tra Duecento e Cinquecento, sono cavoli in miniatura che crescono a spirale lungo un fusto alto un metro. L'amaro che tanti odiano è stato quasi eliminato dalle varietà moderne, e la cottura breve fa il resto.</p>` },
sedanorapa:{ nome:"Sedano rapa", match:["sedano rapa","sedanorapa","sedano-rapa"], ricette:[],
 cons:{verde:[["Porro e cipolla","classica coppia"],["Fagiolo","azoto"]],giallo:[["Cavoli","concorrenza"]],rosso:[["Mais","ombra e acqua"]]},
 conserva:`<p>In sabbia in cantina tutto l'inverno, senza foglie. In frigo un mese. Cotto e frullato, congelato.</p>`,
 storia:`<p>È il sedano coltivato per la radice invece che per le coste: una selezione rinascimentale che ha fatto fortuna nel Nord Europa, dove è la base del remoulade francese e delle zuppe d'inverno tedesche. In Italia è rimasto una rarità di mercato, ma in orto è più facile del sedano da coste.</p>` },
indivia:{ nome:"Indivia riccia e scarola", match:["indivia","scarola","riccia"], ricette:[],
 cons:{verde:[["Cavoli","sfrutta lo spazio tra le file"],["Cipolla","allontana le lumache un po'"]],giallo:[["Radicchio","stessa famiglia"]],rosso:[]},
 conserva:`<p>In frigo 5–7 giorni. La scarola cotta (con olive e capperi, alla napoletana) si congela bene.</p>`,
 storia:`<p>Due forme della stessa cicoria (<i>Cichorium endivia</i>): la riccia a foglie frastagliate e la scarola a foglie larghe. Si imbianca legando il cespo o coprendolo due settimane prima della raccolta: il cuore diventa giallo e dolce. Verdura d'autunno e d'inverno del Mediterraneo da duemila anni.</p>` },
catalogna:{ nome:"Cicoria catalogna", match:["catalogna","puntarell"], ricette:[],
 cons:{verde:[["Pomodoro","ombra leggera d'estate"],["Cipolla","ok"]],giallo:[["Altre cicorie","rotazione"]],rosso:[]},
 conserva:`<p>In frigo una settimana. Le puntarelle, tagliate a striscioline e messe in acqua ghiacciata, si arricciano e si conservano un giorno.</p>`,
 storia:`<p>La cicoria a costa larga del Lazio e della Puglia: le sue infiorescenze giovani sono le <i>puntarelle</i> della cucina romana, con la salsa di acciughe e aglio. Rustica, resiste al gelo, si ricaccia dopo il taglio: una delle verdure più generose dell'orto invernale.</p>` },
batata:{ nome:"Batata (patata dolce)", match:["batat","patata dolce","ipomoea"], ricette:[],
 cons:{verde:[["Fagiolo","azoto"],["Aromatiche","ok ai bordi"]],giallo:[["Zucca","si contendono lo spazio"]],rosso:[["Patata","confusione di parassiti"]]},
 conserva:`<p>Dopo la raccolta una settimana al caldo (25–30 °C) per "curare" la buccia, poi in luogo fresco e asciutto, mai in frigo: durano fino a primavera.</p>`,
 storia:`<p>Non è parente della patata: è un convolvolo americano coltivato da migliaia di anni in Perù e Centroamerica, e arrivato in Polinesia prima di Colombo, uno dei misteri della storia delle piante. Vuole caldo e stagione lunga; in Italia riesce bene al Sud e nelle estati calde del Centro-Nord.</p>` },
rosmarino:{ nome:"Rosmarino", match:["rosmarin"], ricette:[],
 cons:{verde:[["Cavoli","allontana la cavolaia"],["Carota","confonde la mosca"],["Salvia","stessa terra, stesso sole"]],giallo:[["Basilico","acque diverse"]],rosso:[["Menta","invade"]]},
 conserva:`<p>Rametti essiccati all'ombra e sgranati in barattolo; in olio; congelati tritati in cubetti di ghiaccio.</p>`,
 storia:`<p>Il "ros marinus", la rugiada del mare: cresce sulle scogliere mediterranee e non chiede quasi nulla, se non sole e terra drenata. Perenne, in dieci anni diventa un cespuglio; teme solo il ristagno e i grandi geli.</p>` },
salvia:{ nome:"Salvia", match:["salvia"], ricette:[],
 cons:{verde:[["Cavoli","allontana la cavolaia"],["Carota","confonde la mosca"],["Rosmarino","stesse esigenze"]],giallo:[],rosso:[["Cetriolo","lo rallenta"],["Cipolla","incompatibili"]]},
 conserva:`<p>Foglie essiccate all'ombra; burro alla salvia congelato; in olio. Meglio fresca: la pianta dura anni.</p>`,
 storia:`<p><i>Salvia salvatrix</i>, la pianta che salva: nel Medioevo era il rimedio per tutto e la scuola di Salerno chiedeva "perché muore l'uomo, se la salvia cresce nell'orto?". Perenne, va potata a fine inverno per non diventare legnosa, e rinnovata da talea ogni 4–5 anni.</p>` },
timo:{ nome:"Timo e origano", match:["timo","origan","maggiorana","santoreggia"], ricette:[],
 cons:{verde:[["Cavoli","allontanano la cavolaia"],["Melanzana","ok"],["Rosmarino","stessa terra"]],giallo:[],rosso:[["Menta","invade"]]},
 conserva:`<p>Mazzetti essiccati a testa in giù all'ombra, poi sgranati: il timo e l'origano secchi profumano più dei freschi. In olio o sale aromatizzato.</p>`,
 storia:`<p>Due piante delle garighe mediterranee, che vogliono sassi, sole e sete: in terra grassa e bagnata perdono profumo e marciscono. Il timo era il coraggio dei soldati greci; l'origano, "ornamento delle montagne", è quello della pizza — ma quello vero, secco e sgranato, ha un altro sapore.</p>` },
menta:{ nome:"Menta", match:["menta"], ricette:[],
 cons:{verde:[["Cavoli","allontana la cavolaia"],["Pomodoro","in vaso accanto"]],giallo:[["Prezzemolo","ok"]],rosso:[["Tutto ciò che ha vicino in piena terra","le radici invadono"]]},
 conserva:`<p>Essiccata all'ombra per le tisane; congelata tritata in cubetti; sciroppo di menta.</p>`,
 storia:`<p>La ninfa Minte, trasformata in pianta da Persefone gelosa: da allora cresce dappertutto, e questo è il suo problema in orto. Si coltiva in vaso, o in piena terra dentro un secchio senza fondo interrato, altrimenti in due anni è ovunque. Vuole acqua e mezz'ombra.</p>` },
erbacipollina:{ nome:"Erba cipollina", match:["erba cipollina","cipollin"], ricette:[],
 cons:{verde:[["Carota","confonde la mosca"],["Pomodoro","tiene lontani gli afidi"],["Fragola","ok ai bordi"]],giallo:[],rosso:[["Fagiolo e pisello","come tutte le cipolle"]]},
 conserva:`<p>Fresca, tagliata con le forbici; congelata tritata; i fiori viola in aceto danno un aceto rosa.</p>`,
 storia:`<p>La più piccola delle cipolle, perenne, che si taglia dieci volte l'anno e ricaccia sempre; i fiori viola a maggio sono commestibili e amati dalle api. Si divide ogni tre anni e non se ne va più: un ciuffo in ogni orto e in ogni balcone.</p>` }
});

Object.assign(SEMINA, {
carciofo:`<p><b>Periodo</b>: carducci (i polloni con radici) a marzo–aprile o a settembre–ottobre; da seme in semenzaio a febbraio, ma il seme non dà piante uguali alla madre.</p><p><b>Cielo e temperatura</b>: nei climi miti è la pianta d'inverno per eccellenza e produce da autunno a primavera; dove l'inverno è vero produce in primavera-estate e va protetto sotto i −5 °C con paglia sul cespo.</p><p><b>Terreno</b>: profondo, ricco, drenato, un metro per pianta. Concimazione generosa in autunno: è un cardo che mangia.</p>`,
peperoncino:`<p><b>Periodo</b>: semenzaio al caldo a febbraio (i piccanti forti anche a gennaio), trapianto tre-quattro settimane dopo l'ultima gelata.</p><p><b>Cielo e temperatura</b>: germina a 25–30 °C con lentezza (2–4 settimane); fuori vuole notti sopra i 12 °C e tutto il sole che c'è. In vaso è perfetto e a fine stagione si può ritirare in casa.</p><p><b>Terreno</b>: drenato, non troppo ricco di azoto (farebbe foglie); poca acqua ma regolare, più sete più piccante.</p>`,
anguria:`<p><b>Periodo</b>: vasetto al caldo un mese e mezzo prima della fine delle gelate; trapianto quando le notti stanno sopra i 15 °C.</p><p><b>Cielo e temperatura</b>: germina a 25–28 °C; è la più esigente di caldo dopo il melone. Nei climi freschi solo varietà piccole e precoci e pacciamatura nera.</p><p><b>Terreno</b>: leggero, sabbioso, molto concimato; due metri quadri a pianta. Niente acqua nelle ultime due settimane di maturazione.</p>`,
cavolfiore:`<p><b>Periodo</b>: semenzaio a maggio–giugno per trapiantare a luglio e raccogliere in autunno-inverno; le varietà primaverili in semenzaio a gennaio–febbraio.</p><p><b>Cielo e temperatura</b>: germina facile a 18–22 °C; il trapianto estivo vuole sera e acqua. Il freddo non lo spaventa, ma la testa in formazione sotto i −3 °C si rovina: le varietà tardive resistono meglio.</p><p><b>Terreno</b>: ricco, sodo, con calcio; è la brassica più affamata e più assetata di tutte, senza acqua fa teste piccole e sfatte.</p>`,
bruxelles:`<p><b>Periodo</b>: semenzaio ad aprile–maggio, trapianto a giugno: ha il ciclo più lungo dei cavoli, sei mesi.</p><p><b>Cielo e temperatura</b>: cresce tutta l'estate senza fretta e dà il meglio con le gelate d'autunno, che gli tolgono l'amaro. Nei climi caldi soffre e non forma bene i cavolini.</p><p><b>Terreno</b>: sodo e compatto (calpesta la terra intorno al fusto), ricco; tutore perché il fusto alto un metro si sdraia. Togli le foglie basse man mano.</p>`,
sedanorapa:`<p><b>Periodo</b>: semenzaio a febbraio–marzo, trapianto a maggio a gelate finite.</p><p><b>Cielo e temperatura</b>: il seme vuole luce per germinare (non coprirlo) e 3 settimane di pazienza; la piantina teme il freddo prolungato sotto i 10 °C, che la manda a fiore.</p><p><b>Terreno</b>: ricchissimo e sempre umido, come il sedano. Trapianto con il colletto a fior di terra, e a fine estate si scalza la terra intorno alla radice perché ingrossi.</p>`,
indivia:`<p><b>Periodo</b>: semina da giugno a fine luglio per l'autunno; in primavera monta a seme.</p><p><b>Cielo e temperatura</b>: germina a 15–20 °C ma non sopra i 25: d'estate semina la sera e tieni umido. Resiste alle prime gelate, sotto un telo anche oltre.</p><p><b>Terreno</b>: fresco, medio, ben concimato. Due settimane prima di raccogliere, lega il cespo o coprilo: l'imbianchimento la fa dolce.</p>`,
catalogna:`<p><b>Periodo</b>: semina diretta da giugno a fine agosto.</p><p><b>Cielo e temperatura</b>: nasce col caldo e cresce col fresco; regge il gelo e si raccoglie tutto l'inverno nei climi miti, sotto telo altrove.</p><p><b>Terreno</b>: qualunque, purché fresco; dirada a 30 cm. Dopo il taglio ricaccia: un'aiuola dura da ottobre a marzo.</p>`,
batata:`<p><b>Periodo</b>: le talee (i germogli staccati da un tubero fatto radicare in acqua o sabbia da marzo) si piantano a fine maggio–giugno, con la terra ben calda.</p><p><b>Cielo e temperatura</b>: vuole 4–5 mesi caldi: sotto i 15 °C si ferma. Nei climi freschi su cumulo con pacciamatura nera e nelle estati calde; al Sud è una coltura sicura.</p><p><b>Terreno</b>: sciolto, sabbioso, non troppo ricco di azoto; ogni pianta corre per un metro. Raccolta prima del primo freddo, con delicatezza: si ammaccano.</p>`,
rosmarino:`<p><b>Periodo</b>: piantine o talee a primavera (aprile–maggio) o a settembre.</p><p><b>Cielo e temperatura</b>: sole pieno; rustico fino a −8/−10 °C se la terra è asciutta, muore invece con gelo e ristagno insieme. In montagna in vaso da ritirare.</p><p><b>Terreno</b>: povero, sassoso, drenato, anche calcareo; niente concime, poca acqua. Le talee: rametti di 10 cm senza le foglie basse, in sabbia e torba, all'ombra, radicano in un mese.</p>`,
salvia:`<p><b>Periodo</b>: piantine o talee ad aprile–maggio, divisione dei cespi vecchi a marzo.</p><p><b>Cielo e temperatura</b>: sole; regge il gelo se la terra è drenata. Potatura a fine inverno di un terzo, mai sul legno vecchio.</p><p><b>Terreno</b>: drenato, non grasso; in argilla su aiuola rialzata con sabbia. Acqua solo nei periodi secchi; in vaso da 20 litri sta benissimo.</p>`,
timo:`<p><b>Periodo</b>: piantine o divisione a primavera; da seme è lento e capriccioso.</p><p><b>Cielo e temperatura</b>: sole cocente e aria asciutta sono il loro clima; l'umidità stagnante li fa marcire. Il timo regge il gelo, l'origano pure se la terra non ristagna.</p><p><b>Terreno</b>: sassoso, calcareo, poverissimo: la garigua. Nel terreno grasso perdono profumo. Si raccolgono all'inizio della fioritura, quando gli oli sono al massimo.</p>`,
menta:`<p><b>Periodo</b>: stoloni o piantine da marzo a maggio, o a settembre.</p><p><b>Cielo e temperatura</b>: mezz'ombra e fresco, d'estate chiede acqua; sparisce d'inverno e riparte in primavera, resiste a qualsiasi gelo.</p><p><b>Terreno</b>: fresco e ricco, ma SOLO in vaso o in un contenitore interrato senza fondo: in piena terra libera in due anni ha colonizzato l'orto. Si rinnova dividendo il cespo ogni 2–3 anni.</p>`,
erbacipollina:`<p><b>Periodo</b>: semina a marzo–aprile o divisione dei ciuffi a marzo e a settembre.</p><p><b>Cielo e temperatura</b>: germina a 15–20 °C in due settimane; sole o mezz'ombra; sparisce d'inverno e ricaccia a febbraio. Regge qualsiasi gelo.</p><p><b>Terreno</b>: fresco, ricco, umido; in vaso da 5 litri va benissimo. Si taglia con le forbici a 3 cm da terra e ricresce; tagliata spesso resta tenera.</p>`
});

Object.assign(SEMI, {
carciofo:{q:"carducci di carciofo",bio:false,nota:"Meglio i carducci (polloni) di una varietà locale che i semi: producono già dal secondo anno e vengono uguali alla pianta madre."},
peperoncino:{q:"semi di peperoncino",bio:true},
anguria:{q:"semi di anguria",bio:true,nota:"Nei climi freschi scegli una varietà piccola e precoce (tipo sugar baby)."},
cavolfiore:{q:"semi di cavolfiore e broccolo",bio:true},
bruxelles:{q:"semi di cavolini di Bruxelles",bio:true},
sedanorapa:{q:"semi di sedano rapa",bio:true},
indivia:{q:"semi di indivia riccia e scarola",bio:true},
catalogna:{q:"semi di cicoria catalogna",bio:true},
batata:{q:"tuberi di batata patata dolce",bio:false,nota:"Da un tubero comprato al mercato (biologico, non trattato) si fanno in casa 10–15 talee da marzo."},
rosmarino:{q:"pianta di rosmarino",bio:false,nota:"Una piantina in vaso da 2–3 € è il modo giusto: il seme è lento e capriccioso."},
salvia:{q:"pianta di salvia officinale",bio:false},
timo:{q:"piante di timo e origano",bio:false,nota:"In vaso da vivaio; da seme si può, ma è lento."},
menta:{q:"pianta di menta",bio:false},
erbacipollina:{q:"semi di erba cipollina",bio:true}
});

/* voci nei mesi (calendario base, clima continentale): [nome, tipo, come, insolita] */
const NUOVE_VOCI = {
febbraio:[["Peperoncino","semenzaio","I piccanti forti (habanero, scotch bonnet) vogliono 3–4 settimane per nascere: partono ora, a 25–30 °C.",0],["Sedano rapa","semenzaio","Seme in superficie, non coperto: vuole luce. Lento, tienilo umido.",1]],
marzo:[["Carciofo (carducci)","impianto","Polloni con radici staccati dalle piante madri, un metro l'uno dall'altro in buche ricche.",1],["Erba cipollina","semina","In vaso o in un angolo: perenne, ricaccia per anni.",0],["Menta (stoloni)","impianto","Solo in vaso o in un secchio senza fondo interrato: in piena terra invade.",0]],
aprile:[["Anguria","semenzaio","Vasetti al caldo (25 °C), varietà piccole e precoci nei climi freschi.",0],["Rosmarino, salvia, timo, origano","impianto","Piantine da vivaio in terra povera e drenata, al sole: si piantano una volta e restano.",0]],
maggio:[["Peperoncino","trapianto","Con le notti sopra i 12 °C, nel posto più caldo; in vaso da 10–20 litri è perfetto.",0],["Cavolini di Bruxelles","semenzaio","Il ciclo più lungo dei cavoli: partono ora per raccogliere con le gelate.",1],["Sedano rapa","trapianto","Colletto a fior di terra, in terra ricca e sempre umida.",1],["Anguria","trapianto","A terra ben calda, con pacciamatura nera; due metri quadri a pianta.",0]],
giugno:[["Cavolfiore e broccolo","semenzaio","Per il trapianto di luglio e le teste di autunno-inverno.",0],["Cavolini di Bruxelles","trapianto","In terra sodissima, con tutore: il fusto arriva a un metro.",1],["Batata (talee)","impianto","Le talee radicate dal tubero, su cumulo, con la terra calda.",1],["Indivia e scarola","semina","Prima semina per l'autunno; d'estate semina la sera.",0]],
luglio:[["Cavolfiore e broccolo","trapianto","Di sera, con acqua abbondante, ombreggiando i primi giorni.",0],["Cicoria catalogna","semina","Nasce col caldo, cresce col fresco, si raccoglie tutto l'inverno.",0],["Indivia e scarola","semina","Ultima semina utile; imbianchimento due settimane prima di raccogliere.",0]],
agosto:[["Cicoria catalogna","semina","Ultima chiamata: dirada a 30 cm.",0]],
settembre:[["Carciofo (carducci)","impianto","Nei climi miti è l'impianto migliore: produce già in primavera.",1],["Rosmarino e salvia (talee)","impianto","Rametti di 10 cm in sabbia all'ombra: radicano in un mese.",0]]
};
MESI.forEach(m=>{ (NUOVE_VOCI[m.id]||[]).forEach(v=>{ if(!m.piante.some(p=>p[0]===v[0])) m.piante.push(v); }); });
