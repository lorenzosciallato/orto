/* Quando seminare — condizioni di cielo e di terreno per ogni scheda, tarate su Pievebovigliana (440 m):
   ultime gelate fino a fine aprile/inizio maggio, prime gelate a fine ottobre.
   SEMI: cosa cercare per comprare (q = parole da cercare, bio = si trova anche da Arcoiris, nota = avvertenza) */

const SEMINA = {
pomodoro:`<p><b>Periodo</b>: semenzaio al caldo tra febbraio e metà marzo; trapianto fuori da metà maggio, quando le gelate qui sono davvero finite.</p>
<p><b>Cielo e temperatura</b>: il seme germina a 22–26 °C (serve un posto caldo in casa); la piantina fuori vuole notti stabilmente sopra i 10 °C. Una notte sotto zero la uccide, una settimana fredda la blocca per un mese: meglio trapiantare una settimana dopo che una prima.</p>
<p><b>Terreno</b>: profondo, ben lavorato, ricco di compost maturo, senza ristagni d'acqua. Interra il fusto fino alle prime foglie: fa radici anche dal gambo e la pianta parte più forte.</p>`,

patata:`<p><b>Periodo</b>: si piantano i tuberi da fine marzo a tutto aprile, quando la terra a 10 cm di profondità è sui 8–10 °C (non fredda al tatto). Farli pregermogliare in cassetta alla luce per 3–4 settimane fa guadagnare due settimane di raccolto.</p>
<p><b>Cielo e temperatura</b>: il tubero sotto terra sopporta, ma la vegetazione fuori viene bruciata dalle gelate tardive: se ad aprile è annunciata una gelata, rincalza la terra sopra i germogli e li salvi.</p>
<p><b>Terreno</b>: sciolto e profondo; nei terreni pesanti e sempre bagnati i tuberi marciscono, quindi niente conche, meglio porche leggermente rialzate. Mai letame fresco a contatto.</p>`,

peperone:`<p><b>Periodo</b>: semenzaio a febbraio, prima del pomodoro, perché è lento; trapianto da fine maggio.</p>
<p><b>Cielo e temperatura</b>: per germinare vuole 25–28 °C costanti (senza un posto molto caldo il seme sta fermo settimane). Fuori vuole notti sopra i 12–13 °C: sotto, smette di crescere e ingiallisce. È la pianta più freddolosa dell'orto insieme alla melanzana: dagli il posto più caldo e riparato.</p>
<p><b>Terreno</b>: fertile, ben drenato, che si scaldi presto; acqua regolare ma poca per volta.</p>`,

melanzana:`<p><b>Periodo</b>: semenzaio tra febbraio e i primi di marzo; trapianto da fine maggio ai primi di giugno.</p>
<p><b>Cielo e temperatura</b>: germina a 24–26 °C e fuori pretende caldo vero: sotto i 15 °C si ferma, i fiori cascano senza allegare. A 440 m dalle un muro esposto a sud o la pacciamatura scura che scalda la terra.</p>
<p><b>Terreno</b>: il più ricco che hai, profondo e fresco; è una mangiona e beve tanto, ma sempre senza ristagni.</p>`,

zucchina:`<p><b>Periodo</b>: semina diretta da metà maggio, quando la terra è sui 15 °C; oppure in vasetto al coperto a metà aprile per trapiantare a maggio.</p>
<p><b>Cielo e temperatura</b>: il seme in terra fredda e bagnata marcisce in pochi giorni, non ha fretta che ripaghi. Germina in 5–7 giorni a 20–25 °C. Una brinata azzera la pianta.</p>
<p><b>Terreno</b>: buca generosa riempita di compost o letame maturo: la zucchina cresce quanto trova da mangiare. Postarelle a un metro l'una dall'altra, 2–3 semi per buca e poi lasci la piantina migliore.</p>`,

zucca:`<p><b>Periodo</b>: semina diretta a maggio, in vasetto ad aprile al coperto.</p>
<p><b>Cielo e temperatura</b>: come la zucchina, terra ad almeno 15 °C e nessun rischio di brina. Le serve poi un'estate lunga: le varietà da inverno seminate tardi arrivano piccole.</p>
<p><b>Terreno</b>: è la pianta perfetta per il posto più grasso dell'orto — sopra o accanto alla vecchia compostiera è casa sua. Tanto spazio: una pianta occupa 2–4 metri, mettila dove può correre senza soffocare il resto.</p>`,

cetriolo:`<p><b>Periodo</b>: semina diretta a maggio; se vuoi anticipare, vasetti di torba ad aprile da interrare interi.</p>
<p><b>Cielo e temperatura</b>: terra ad almeno 15 °C e aria mite; odia due cose, il freddo e il trapianto a radice nuda (le radici sono delicatissime, per questo i vasetti che si piantano interi).</p>
<p><b>Terreno</b>: fresco, ricco, con acqua costante: sete e sbalzi rendono i frutti amari. Una rete su cui arrampicarsi tiene i frutti dritti e puliti.</p>`,

melone:`<p><b>Periodo</b>: vasetto al caldo ad aprile, trapianto da fine maggio; semina diretta solo a maggio inoltrato.</p>
<p><b>Cielo e temperatura</b>: è il più esigente dei cucurbitacei: germina a 24–28 °C e fuori vuole notti sopra i 15 °C. A 440 m riesce, ma scegli varietà precoci e dagli il posto più assolato, con pacciamatura scura o un telo che scaldi la terra.</p>
<p><b>Terreno</b>: leggero, che si scalda in fretta, concimato bene; poca acqua in maturazione, sennò i frutti restano sciapi.</p>`,

fagiolo:`<p><b>Periodo</b>: semina diretta da maggio a metà luglio, a scalare per averne sempre.</p>
<p><b>Cielo e temperatura</b>: la terra deve essere ad almeno 13–14 °C: in terra fredda il seme marcisce e basta. Il detto vecchio funziona ancora: si semina quando puoi camminare scalzo sulla terra senza patire.</p>
<p><b>Terreno</b>: quasi qualunque, purché non ristagni; si fabbrica l'azoto da solo, quindi niente concimi azotati (faresti solo foglie). Semi a 3 cm, non di più, e non annaffiare finché non è nato.</p>`,

fava:`<p><b>Periodo</b>: due finestre: ottobre–novembre (la migliore qui: sverna e a primavera è già avanti) oppure febbraio–marzo appena la terra si lavora.</p>
<p><b>Cielo e temperatura</b>: germina già a 5 °C e la piantina regge gelate fino a −5/−6 °C: il freddo non è un problema, il caldo sì — seminata tardi incontra gli afidi neri e il secco.</p>
<p><b>Terreno</b>: una delle poche che tollera bene anche i terreni pesanti e argillosi. Niente azoto: se lo fa da sola, e anzi lo lascia in regalo alla coltura dopo.</p>`,

pisello:`<p><b>Periodo</b>: febbraio–marzo, tra i primissimi dell'anno; a ottobre le varietà da svernamento.</p>
<p><b>Cielo e temperatura</b>: germina a 4–5 °C, la piantina regge la brina. Il vero nemico è il caldo: sopra i 25 °C in fioritura smette di produrre, quindi qui conviene seminare presto e raccogliere entro giugno.</p>
<p><b>Terreno</b>: drenato e senza croste; niente azoto, come per fave e fagioli. Una rete bassa pronta da subito: i viticci cercano appiglio dai primi giorni.</p>`,

cece:`<p><b>Periodo</b>: da metà marzo a tutto aprile.</p>
<p><b>Cielo e temperatura</b>: germina già a 10 °C e da grande vuole caldo e asciutto: è la pianta della siccità, in un'estate secca è l'unica che ringrazia.</p>
<p><b>Terreno</b>: povero, calcareo, sassoso, perfino: dove il resto stenta, il cece sta bene. Il suo nemico è l'acqua: in terreni umidi o con troppe piogge ammuffisce. Non annaffiare quasi mai.</p>`,

cavoli:`<p><b>Periodo</b>: il grosso si semina in semenzaio tra maggio e giugno per trapiantare a luglio–agosto e raccogliere da ottobre in poi; le varietà primaverili-estive si seminano a febbraio–marzo al coperto.</p>
<p><b>Cielo e temperatura</b>: il seme germina facile a 18–20 °C; è il trapianto estivo il momento delicato — falla di sera, con acqua abbondante, e ombreggia i primi giorni. Il freddo poi non li spaventa: verza e cavolo nero migliorano proprio con le gelate.</p>
<p><b>Terreno</b>: sodo, ricco, concimato in anticipo; i cavoli amano la terra compatta e anche l'argilla ben nutrita. Non rimetterli mai dove c'erano cavoli l'anno prima.</p>`,

cime:`<p><b>Periodo</b>: semina diretta da metà agosto a fine settembre.</p>
<p><b>Cielo e temperatura</b>: col terreno ancora caldo nasce in 3–4 giorni, poi cresce con le piogge e il fresco d'autunno, che è il suo clima ideale. Le varietà si chiamano a giorni (40, 60, 90, 120): dicono quanto ci mettono, e scalandole mangi cime fino all'inverno.</p>
<p><b>Terreno</b>: normale, senza troppe pretese e senza concimature fresche; l'importante è tenere umido il letto di semina finché non è nata.</p>`,

rapa:`<p><b>Periodo</b>: agosto–settembre per l'autunno (la semina migliore), oppure marzo per una raccolta veloce di primavera.</p>
<p><b>Cielo e temperatura</b>: germina in pochi giorni; il fresco la fa dolce e tenera, il caldo e la sete la fanno piccante, legnosa e la mandano subito in fiore.</p>
<p><b>Terreno</b>: fresco e sciolto, mai asciutto a lungo: la rapa è fatta d'acqua e si vede. Sfoltisci presto le piantine, sennò restano tutte piccole.</p>`,

ravanello:`<p><b>Periodo</b>: da marzo a settembre, una fila ogni due settimane: in 25–30 giorni è pronto.</p>
<p><b>Cielo e temperatura</b>: germina già a 8–10 °C in 3–4 giorni. In piena estate mettilo a mezz'ombra: col caldo secco diventa piccantissimo, cavo dentro, e l'altica gli crivella le foglie.</p>
<p><b>Terreno</b>: terra fine e sempre leggermente umida — il ravanello buono cresce veloce e senza mai patire la sete; ogni stop lo rende legnoso.</p>`,

lattuga:`<p><b>Periodo</b>: quasi tutto l'anno: da marzo a settembre a scalare, più le semine protette di fine inverno.</p>
<p><b>Cielo e temperatura</b>: attenzione a una cosa che pochi sanno: sopra i 25 °C il seme di lattuga si addormenta e non germina. D'estate semina di sera, in un angolo fresco, e tieni il letto umido; oppure fai le piantine in casa al fresco.</p>
<p><b>Terreno</b>: fine in superficie, ricco il giusto, umido costante; il seme va appena coperto, mezzo centimetro, perché per nascere vuole sentire la luce.</p>`,

radicchio:`<p><b>Periodo</b>: giugno–luglio per i radicchi da autunno e inverno, che sono i migliori.</p>
<p><b>Cielo e temperatura</b>: seminato troppo presto in primavera va in fiore invece di fare cespo: la sua stagione vera comincia quando le giornate si accorciano, e il freddo di ottobre–novembre gli dà colore e gli toglie l'amaro.</p>
<p><b>Terreno</b>: medio, non troppo concimato (troppo azoto = cespi molli che marciscono); umido alla semina, che a luglio non è scontato: annaffia il solco prima di seminare.</p>`,

spinacio:`<p><b>Periodo</b>: due finestre: febbraio–aprile e, meglio ancora, da metà agosto a ottobre per mangiarlo in autunno e a fine inverno.</p>
<p><b>Cielo e temperatura</b>: germina già a 6–8 °C e regge il gelo sotto un telo; col caldo e le giornate lunghe invece monta subito a seme — per questo la semina estiva non funziona.</p>
<p><b>Terreno</b>: ricco di azoto, fresco, non acido: è una delle verdure più affamate dell'orto. Acqua regolare, foglie grandi.</p>`,

valerianella:`<p><b>Periodo</b>: da metà agosto a ottobre; nasce, sverna e si taglia per tutto il freddo.</p>
<p><b>Cielo e temperatura</b>: col terreno troppo caldo germina male e lentamente: aspetta dopo ferragosto, o semina in un angolo ombreggiato e tieni bagnato. Il gelo poi non la tocca: sotto un telo si raccoglie anche a gennaio.</p>
<p><b>Terreno</b>: curiosità utile: ama la terra assestata, non quella appena zappata soffice. Semina, copri appena e compatta bene con una tavola: attecchisce meglio.</p>`,

rucola:`<p><b>Periodo</b>: da marzo a settembre, una striscia ogni 2–3 settimane.</p>
<p><b>Cielo e temperatura</b>: nasce in 3 giorni con qualunque tempo decente. D'estate a pieno sole e con sete diventa un fuoco e monta a seme in due settimane: mezz'ombra e acqua la tengono dolce.</p>
<p><b>Terreno</b>: qualunque. È probabilmente la semina più facile dell'orto: fila superficiale, acqua, fatto. La selvatica è più rustica e piccante, la coltivata più tenera.</p>`,

bietola:`<p><b>Periodo</b>: da aprile ad agosto; quella d'agosto dà foglie per l'autunno e riparte in primavera.</p>
<p><b>Cielo e temperatura</b>: germina dai 10–12 °C in su e poi sopporta quasi tutto, caldo e prime gelate: è tra le più generose e resistenti.</p>
<p><b>Terreno</b>: profondo e fresco. Ogni "seme" è in realtà un glomerulo con dentro 3–4 semi veri: nasceranno ciuffetti, e va sfoltito senza pietà lasciando una pianta ogni 25–30 cm.</p>`,

carota:`<p><b>Periodo</b>: da marzo a metà luglio; le semine di giugno–luglio danno le carote da conservare per l'inverno.</p>
<p><b>Cielo e temperatura</b>: la nascita è il punto critico: ci mette 2–3 settimane e in quel tempo il letto di semina non deve MAI asciugarsi — una tavola o un telo sopra il solco fino alla nascita fa miracoli.</p>
<p><b>Terreno</b>: sciolto, sabbioso, profondo, senza sassi; e mai letame fresco, che fa radici biforcute e pelose. In terra pesante e argillosa scegli varietà mezze-lunghe o tonde: verranno comunque, le lunghe no.</p>`,

pastinaca:`<p><b>Periodo</b>: da fine febbraio a maggio: ha un ciclo lungo e va seminata presto.</p>
<p><b>Cielo e temperatura</b>: germina al fresco ma con calma esasperante, 3–4 settimane. Regola d'oro: seme dell'anno, sempre — il seme di pastinaca dopo un anno è quasi tutto morto, ed è il motivo per cui a tanti "non nasce".</p>
<p><b>Terreno</b>: profondo e sciolto come per la carota, niente letame fresco. Lasciala in terra dopo i primi geli: il freddo trasforma l'amido in zucchero ed è lì che diventa buona davvero.</p>`,

barbabietola:`<p><b>Periodo</b>: da aprile a luglio a scalare.</p>
<p><b>Cielo e temperatura</b>: germina dai 10 °C; seminata troppo presto col freddo può montare a seme invece di fare la radice tonda.</p>
<p><b>Terreno</b>: sciolto, senza sassi, non concimato di fresco. Anche qui i "semi" sono glomeruli multipli: dirada presto a una pianta ogni 10 cm. Acqua regolare: gli sbalzi la fanno legnosa e cerchiata di bianco.</p>`,

scorzonera:`<p><b>Periodo</b>: da marzo a maggio; si raccoglie da ottobre a tutto l'inverno.</p>
<p><b>Cielo e temperatura</b>: nasce al fresco senza problemi ma lentamente; usa seme dell'anno, come la pastinaca perde in fretta la germinabilità.</p>
<p><b>Terreno</b>: qui si gioca tutto: la radice scende dritta 30–40 cm, quindi la terra va lavorata profonda e resa sciolta, altrimenti si biforca e si spezza alla raccolta. In argilla conviene una porca alta e sabbiosa fatta apposta.</p>`,

sedano:`<p><b>Periodo</b>: semenzaio a febbraio–marzo, trapianto a maggio.</p>
<p><b>Cielo e temperatura</b>: il seme è minuscolo e per germinare vuole luce: si appoggia sulla terra e non si copre, tenendo umido con lo spruzzino, e ci mette 2–3 settimane. Attenzione al trapianto precoce: se la piantina giovane prende una settimana sotto i 10 °C, per ripicca andrà in fiore d'estate.</p>
<p><b>Terreno</b>: il più ricco e il più bagnato dell'orto: il sedano in natura è pianta di fosso, senz'acqua costante fa coste vuote e fibrose.</p>`,

finocchio:`<p><b>Periodo</b>: semina diretta da metà giugno a fine luglio, per raccogliere in autunno.</p>
<p><b>Cielo e temperatura</b>: seminato in primavera, con le giornate che si allungano, monta a seme senza fare il grumolo: è l'errore classico. La sua stagione è il declino dell'estate: nasce col caldo e ingrossa col fresco.</p>
<p><b>Terreno</b>: sciolto, fresco, con acqua regolare fino alla fine: il grumolo croccante è fatto d'acqua. Un rincalzo a metà crescita lo fa bianco e tenero.</p>`,

aglio:`<p><b>Periodo</b>: ottobre–novembre, oppure gennaio–febbraio. Quello d'autunno viene più grosso.</p>
<p><b>Cielo e temperatura</b>: il freddo non è un nemico, è un ingrediente: senza 1–2 mesi sotto i 10 °C la testa non si divide in spicchi. A 440 m l'inverno fa il lavoro da solo.</p>
<p><b>Terreno</b>: il suo unico vero nemico è l'acqua ferma d'inverno: terreno drenatissimo, in argilla una porca rialzata di 15 cm. Spicchi con la punta in su, 3–5 cm sotto, niente letame fresco, e da lì non si annaffia praticamente mai.</p>`,

cipolla:`<p><b>Periodo</b>: tre strade: da seme in semenzaio a febbraio–marzo; da bulbillo a marzo–aprile (la via facile); e ad agosto–settembre da seme, o ottobre–novembre da bulbillo, per le cipolle che svernano.</p>
<p><b>Cielo e temperatura</b>: rustica, la brina non la spaventa; è il fotoperiodo a comandare: la cipolla ingrossa quando le giornate si allungano, per questo le semine tardive di primavera danno bulbi piccoli.</p>
<p><b>Terreno</b>: fine, drenato, senza letame fresco (bulbi che marciscono in conserva). Il bulbillo si pianta a fior di terra, con la punta che quasi si vede.</p>`,

porro:`<p><b>Periodo</b>: semenzaio da febbraio ad aprile; trapianto a giugno–luglio quando le piantine sono grosse come una matita.</p>
<p><b>Cielo e temperatura</b>: paziente e freddoloso al contrario: cresce piano tutta l'estate e dà il meglio con le gelate, restando in terra fino a febbraio.</p>
<p><b>Terreno</b>: il trucco è tutto nel trapianto: buchi profondi 15 cm fatti col piolo, una piantina per buco, e NON si richiude — si annaffia e basta, la terra scivola da sola. È così che viene il fusto bianco lungo. Terreno ricco e fresco.</p>`,

mais:`<p><b>Periodo</b>: semina diretta da fine aprile a inizio giugno.</p>
<p><b>Cielo e temperatura</b>: terra ad almeno 12–14 °C: in terra fredda il seme marcisce o nasce a macchia di leopardo.</p>
<p><b>Terreno</b>: fertile e con acqua garantita in fioritura, quando si gioca tutto. E la regola che cambia il raccolto: semina a blocco quadrato (almeno 4×4 file), mai a fila singola — l'impollinazione è a vento, e la fila singola dà pannocchie mezze vuote.</p>`,

girasole:`<p><b>Periodo</b>: semina diretta da metà aprile a giugno.</p>
<p><b>Cielo e temperatura</b>: germina dai 10–12 °C, la piantina tollera una leggera brina. Pieno sole, ovviamente: al buio si affloscia.</p>
<p><b>Terreno</b>: profondo, perché la radice scende tanto (ed è per questo che regge il secco); non troppo grasso. Semi a 2–3 cm. Il vero nemico sono uccelli e topi che scavano i semi appena messi: una rete o delle bottiglie tagliate sopra le postarelle finché non è nato.</p>`,

basilico:`<p><b>Periodo</b>: in vasetto al caldo da fine marzo; fuori solo da metà maggio. Una seconda semina a giugno–luglio dà foglie fresche fino all'autunno.</p>
<p><b>Cielo e temperatura</b>: germina a 20–25 °C; sotto i 10 °C soffre e annerisce, e la minima brina lo azzera. È un termometro vivente: quando il basilico sta bene fuori, tutto l'orto estivo può uscire.</p>
<p><b>Terreno</b>: ricco, drenato, al sole; acqua alla base e non sulle foglie. Cimalo appena fa i fiori, o smette di fare foglie buone.</p>`,

prezzemolo:`<p><b>Periodo</b>: da marzo ad agosto; la semina di fine estate dà prezzemolo per tutto l'autunno e riparte in primavera.</p>
<p><b>Cielo e temperatura</b>: è famoso per la nascita biblica: 2–4 settimane, tanto che il detto vuole che "vada sette volte dal diavolo" prima di nascere. Un ammollo del seme di 24 ore in acqua tiepida accorcia l'attesa. Il letto va tenuto umido tutto il tempo.</p>
<p><b>Terreno</b>: fresco, profondo, a mezz'ombra d'estate. Una volta partito è instancabile per due anni.</p>`,

topinambur:`<p><b>Periodo</b>: si piantano i tuberi da febbraio ad aprile (o in autunno), 10 cm sotto terra.</p>
<p><b>Cielo e temperatura</b>: gli va bene tutto: gelo, siccità, trascuratezza totale. È probabilmente la coltura più indistruttibile che esista.</p>
<p><b>Terreno</b>: qualunque, anche il peggiore. L'unica decisione importante è DOVE: qualsiasi pezzettino di tubero rimasto in terra ricaccia, per sempre. Dagli un angolo suo, delimitato, e consideralo un matrimonio: da lì non se ne andrà più.</p>`,

asparago:`<p><b>Periodo</b>: le zampe si mettono a dimora a febbraio–marzo, a riposo ma con la terra lavorabile.</p>
<p><b>Cielo e temperatura</b>: il freddo invernale non è un problema, la pianta è di ferro. Il punto è un altro: un'asparagiaia dura 15–20 anni, quindi si pianta una volta e bene.</p>
<p><b>Terreno</b>: fossi profondi 25–30 cm con letame maturo sul fondo coperto da un dito di terra, zampe adagiate a ragno a 40 cm l'una dall'altra, e si ricopre man mano che crescono. Drenaggio perfetto: in argilla aggiungi sabbia nel fosso. Primo raccolto vero al terzo anno — la pazienza è nell'appezzamento giusto.</p>`,

rabarbaro:`<p><b>Periodo</b>: si piantano le corone (o si dividono i cespi vecchi) a marzo o a ottobre.</p>
<p><b>Cielo e temperatura</b>: notizia buona per Pievebovigliana: il rabarbaro VUOLE l'inverno freddo, senza gelo vero non riparte bene — a 440 m è nel suo clima ideale. D'estate gradisce mezz'ombra e non patire sete.</p>
<p><b>Terreno</b>: profondo, ricco, fresco: prepara la buca con abbondante compost. Il primo anno non si raccoglie niente, dal secondo si tirano (non si tagliano) le coste esterne. Le foglie non si mangiano mai.</p>`,

cardo:`<p><b>Periodo</b>: semina diretta ad aprile–maggio, a postarelle.</p>
<p><b>Cielo e temperatura</b>: germina dai 12 °C; il ciclo è lungo, tutta l'estate a crescere per arrivare pronto in autunno, e le prime brine leggere lo fanno più tenero.</p>
<p><b>Terreno</b>: profondo e ricco, con spazio vero: una pianta fa un metro. A settembre si legano le foglie e si avvolgono (cartone, tessuto scuro) per 3–4 settimane: è l'imbianchimento che lo fa dolce, senza è amaro e basta.</p>`,

zafferano:`<p><b>Periodo</b>: i bulbi si piantano ad agosto–inizio settembre, e fioriscono già a ottobre–novembre.</p>
<p><b>Cielo e temperatura</b>: strano ma vero, è un ciclo alla rovescia: vegeta in autunno-inverno, regge il gelo sotto terra, e d'estate dorme e vuole restare all'asciutto — niente acqua ai bulbi in estate, mai.</p>
<p><b>Terreno</b>: drenatissimo, il ristagno è l'unica cosa che lo uccide: in terra argillosa fai un'aiuola rialzata 15–20 cm con sabbia. Bulbi a 10–15 cm di profondità, pieno sole. Ogni 3–4 anni si cavano e si dividono, perché figliano.</p>`,

agretti:`<p><b>Periodo</b>: da febbraio ad aprile, presto: amano il fresco.</p>
<p><b>Cielo e temperatura</b>: germinano al fresco, ma il vero segreto è un altro: il seme di agretti muore in pochi mesi. Compra seme dell'anno in corso, ogni anno, e semina fitto mettendo in conto che nasca il 30–50%: non sei tu, è la pianta.</p>
<p><b>Terreno</b>: curiosità: è una pianta mezza marina (cresceva nelle saline), quindi tollera terreni calcarei e perfino un po' salmastri. Terra fresca, tagli ripetuti prima che indurisca.</p>`,

fragola:`<p><b>Periodo</b>: la finestra migliore è agosto–settembre, con piantine o stoloni: attecchiscono col fresco e la primavera dopo danno già il raccolto pieno. In alternativa marzo–aprile, ma il primo anno produce poco.</p>
<p><b>Cielo e temperatura</b>: rustica, il gelo invernale non la tocca; sono le gelate tardive sui fiori d'aprile il rischio vero — un telo di tessuto-non-tessuto pronto per le notti serene fa la differenza.</p>
<p><b>Terreno</b>: ricco di humus, tendente all'acido, pacciamato (paglia: tiene i frutti puliti e la terra fresca). Regola d'oro al trapianto: il colletto esattamente a livello terra — interrato marcisce, alto secca.</p>`,

piccolifrutti:`<p><b>Periodo</b>: a radice nuda da novembre a marzo, fuori dai giorni di gelo forte; in vaso quasi tutto l'anno, evitando luglio–agosto.</p>
<p><b>Cielo e temperatura</b>: lamponi, ribes e uva spina sono piante di montagna: il freddo di Pievebovigliana gli piace, e anzi gradiscono mezz'ombra nelle ore roventi.</p>
<p><b>Terreno</b>: fresco e ricco per tutti, con un'eccezione grossa: il mirtillo vuole SOLO terra acida (pH 4,5–5,5), che qui non c'è — si coltiva in vaso o fossa foderata con terriccio per acidofile, annaffiato con acqua piovana. Piantarlo in terra normale è il modo classico di vederlo morire lentamente.</p>`,

frutta:`<p><b>Periodo</b>: gli alberi a radice nuda si piantano da novembre a marzo, durante il riposo, evitando i giorni di terra gelata o fradicia. Quelli in vaso quasi tutto l'anno.</p>
<p><b>Cielo e temperatura</b>: il detto dei vivaisti è "buca pronta un mese prima": scavata larga e lasciata ad arieggiare. Piantato in autunno, l'albero fa radici tutto l'inverno e parte avvantaggiato.</p>
<p><b>Terreno</b>: buca larga il doppio delle radici, letame maturo sul fondo MAI a contatto con le radici, e la regola che decide tutto: il punto d'innesto (il nodo gonfio alla base) resta 5–10 cm FUORI dalla terra. Interrato, la pianta si ammala o l'innesto viene scavalcato. Tutore subito, annaffiatura abbondante anche se piove.</p>`,

physalis:`<p><b>Periodo</b>: si tratta come un pomodoro: semenzaio al caldo a febbraio–marzo, trapianto da metà maggio.</p>
<p><b>Cielo e temperatura</b>: germina a 22–25 °C; il ciclo è lungo e i frutti maturano da fine agosto in poi, quindi a 440 m dagli il posto più caldo e parti presto col semenzaio. Il gelo lo azzera.</p>
<p><b>Terreno</b>: sorpresa: rende meglio in terra normale o perfino povera — in terra grassa fa una giungla di foglie e pochi frutti. Drenaggio buono, poca acqua, e ricordati che ricade: un sostegno o mezzo metro di spazio attorno.</p>`,

okra:`<p><b>Periodo</b>: semenzaio molto al caldo ad aprile, trapianto a giugno; semina diretta solo a giugno.</p>
<p><b>Cielo e temperatura</b>: è una pianta tropicale sul serio: germina a 25–30 °C (ammollo del seme 24 ore, aiuta molto) e sotto i 15 °C sta semplicemente ferma. A 440 m riesce solo nell'angolo più rovente dell'orto, contro un muro a sud, o in serra; nelle estati fresche non aspettarti miracoli.</p>
<p><b>Terreno</b>: drenato e ben esposto; raccogli i baccelli a 5–8 cm, ogni due giorni: crescono a vista d'occhio e diventano legnosi in nulla.</p>`,

quinoa:`<p><b>Periodo</b>: da fine marzo ad aprile.</p>
<p><b>Cielo e temperatura</b>: germina veloce già a 8–10 °C e da pianta andina il clima collinare le va benissimo; teme piuttosto il caldo torrido in fioritura e l'umidità sulla spiga matura.</p>
<p><b>Terreno</b>: drenato, non troppo ricco. L'avvertenza che salva il raccolto: da piccola è IDENTICA al farinello, l'erbaccia sua cugina che hai già nell'orto. Semina in file dritte e ben segnate, o al diserbo strapperai la quinoa e coccolerai l'erbaccia.</p>`,

fiori:`<p><b>Periodo</b>: calendula e fiordaliso già a marzo–aprile (la calendula anche a settembre, sverna); tagete, nasturzio, cosmos e zinnia dopo metà aprile–maggio, a gelate finite.</p>
<p><b>Cielo e temperatura</b>: i primi due nascono col fresco; gli altri sono piante da caldo e in terra fredda marciscono o stentano.</p>
<p><b>Terreno</b>: normale, non concimato: quasi tutti i fiori da orto in terra grassa fanno foglie e niente fiori — il nasturzio è il caso da manuale. Il tagete tra i pomodori e le carote non è decorazione: le radici puliscono il terreno dai nematodi.</p>`,

funghi:`<p><b>Periodo</b>: i tronchi si inoculano tra febbraio e aprile, usando legno tagliato da poche settimane (quercia, faggio, pioppo), mai legno vecchio o secco.</p>
<p><b>Cielo e temperatura</b>: qui non si semina nel terreno: si piantano tasselli di micelio nei fori del tronco, si sigilla con cera, e il tronco va in un angolo OMBROSO e umido, mai al sole. L'incubazione dura 6–12 mesi: i funghi arrivano dall'autunno successivo, spesso dopo le prime piogge fredde.</p>
<p><b>Terreno</b>: nessuno — solo il tronco, appoggiato sollevato da terra, da bagnare nei periodi secchi. La pazienza è l'ingrediente principale: un tronco buono poi produce per 3–5 anni.</p>`,

luppolo:`<p><b>Periodo</b>: i rizomi si piantano da febbraio ad aprile, 10 cm sotto terra.</p>
<p><b>Cielo e temperatura</b>: pianta rustica che regge il gelo senza problemi; vuole sole pieno e, soprattutto, ALTEZZA: in stagione cresce anche 10 cm al giorno e pretende un sostegno verticale di 4–6 metri (filo, palo, parete).</p>
<p><b>Terreno</b>: profondo, ricco, drenato. Il primo anno sopra terra fa poco e sembra un fallimento: sta lavorando sotto. Dal secondo anno esplode, e da lì i getti in eccesso si tagliano — anche lui tende a colonizzare.</p>`,

liquirizia:`<p><b>Periodo</b>: piantine o porzioni di radice ad aprile–maggio.</p>
<p><b>Cielo e temperatura</b>: pianta mediterranea che vuole estati lunghe e calde; a 440 m va nel posto più caldo e riparato, e sverna senza problemi una volta adulta.</p>
<p><b>Terreno</b>: la radice — che è quello che si raccoglie — scende oltre il metro: serve terra profonda, sciolta, anche calcarea, lavorata a fondo. In terra compatta la radice resta corta e amara. Raccolta dal terzo–quarto anno, e attenzione: anche lei, dove si trova bene, si allarga e non se ne va più.</p>`,

germogli:`<p><b>Periodo</b>: tutto l'anno, in casa: è l'unica "semina" che a gennaio funziona come a luglio.</p>
<p><b>Cielo e temperatura</b>: 18–22 °C di cucina bastano. Niente terra: barattolo con garza o germogliatore, semi in ammollo una notte, poi due sciacqui al giorno, mattina e sera, senza mai lasciarli a mollo (muffa). Pronti in 4–7 giorni; un giorno di luce indiretta alla fine li fa verdi e saporiti.</p>
<p><b>Terreno</b>: nessuno, ma una regola ferrea sul seme: solo semi venduti PER germogli (bio, non trattati). I semi da semina normali possono essere conciati con prodotti che non devi mangiare.</p>`,

forzature:`<p><b>Periodo</b>: le radici di cicoria witloof (cresciute nell'orto da una semina di maggio–giugno) si cavano a ottobre–novembre, e da lì si forzano in cantina a turni per tutto l'inverno.</p>
<p><b>Cielo e temperatura</b>: la "semina" qui è al contrario: le radici, spuntate delle foglie, si mettono in piedi in un secchio con sabbia umida, a 12–16 °C e al BUIO TOTALE — anche poca luce fa i cespi verdi e amari. In 3–4 settimane spuntano i cespi bianchi e dolci.</p>
<p><b>Terreno</b>: sabbia o terra leggera appena umida, una cantina fresca, e un secchio nero o un telo sopra. È l'orto di gennaio: fuori gela, e tu raccogli insalata in cantina.</p>`
};

/* Cosa cercare per comprare, scheda per scheda.
   q = parole esatte da cercare; bio = si trova anche da Arcoiris (sementi biologiche); nota = avvertenza utile */
const SEMI = {
pomodoro:{q:"semi di pomodoro",bio:true},
patata:{q:"patate da semina",bio:false,nota:"Cerca 'patate da semina certificate': quelle del supermercato sono trattate perché NON germoglino."},
peperone:{q:"semi di peperone",bio:true},
melanzana:{q:"semi di melanzana",bio:true},
zucchina:{q:"semi di zucchina",bio:true},
zucca:{q:"semi di zucca",bio:true},
cetriolo:{q:"semi di cetriolo",bio:true},
melone:{q:"semi di melone",bio:true,nota:"A 440 m scegli una varietà segnata come precoce."},
fagiolo:{q:"semi di fagiolo",bio:true},
fava:{q:"semi di fava",bio:true},
pisello:{q:"semi di pisello",bio:true},
cece:{q:"semi di cece",bio:true},
cavoli:{q:"semi di cavolo",bio:true},
cime:{q:"semi di cime di rapa",bio:true},
rapa:{q:"semi di rapa",bio:true},
ravanello:{q:"semi di ravanello",bio:true},
lattuga:{q:"semi di lattuga",bio:true},
radicchio:{q:"semi di radicchio",bio:true},
spinacio:{q:"semi di spinacio",bio:true},
valerianella:{q:"semi di valerianella",bio:true},
rucola:{q:"semi di rucola",bio:true},
bietola:{q:"semi di bietola",bio:true},
carota:{q:"semi di carota",bio:true},
pastinaca:{q:"semi di pastinaca",bio:true,nota:"Controlla l'anno sulla bustina: il seme di pastinaca vale solo per la stagione in corso."},
barbabietola:{q:"semi di barbabietola da orto",bio:true},
scorzonera:{q:"semi di scorzonera",bio:true},
sedano:{q:"semi di sedano",bio:true},
finocchio:{q:"semi di finocchio",bio:true},
aglio:{q:"aglio da semina",bio:false,nota:"Meglio l'aglio da semina certificato che gli spicchi del supermercato: è esente da malattie e di varietà adatta."},
cipolla:{q:"semi di cipolla",bio:true,nota:"Se vuoi la via facile, cerca invece 'bulbilli di cipolla': si piantano e basta."},
porro:{q:"semi di porro",bio:true},
mais:{q:"semi di mais dolce",bio:true},
girasole:{q:"semi di girasole da coltivare",bio:true,cat:"api"},
basilico:{q:"semi di basilico",bio:true,cat:"fiori"},
prezzemolo:{q:"semi di prezzemolo",bio:true,cat:"fiori"},
topinambur:{q:"tuberi di topinambur",bio:false,nota:"Bastano pochi tuberi: si moltiplica da solo, per sempre."},
asparago:{q:"zampe di asparago",bio:false,nota:"Si comprano le 'zampe' (radici di 1–2 anni), non i semi: risparmi due anni di attesa."},
rabarbaro:{q:"pianta di rabarbaro",bio:false,nota:"Meglio una corona o pianta in vaso che il seme: parte un anno avanti."},
cardo:{q:"semi di cardo gobbo",bio:true},
zafferano:{q:"bulbi di zafferano crocus sativus",bio:false,nota:"Si vendono in estate: ordina tra luglio e agosto, a settembre spesso sono finiti. Calibro 10+ per fiorire il primo anno."},
agretti:{q:"semi di agretti barba di frate",bio:true,nota:"Compra solo seme dell'anno in corso e non tenerne per l'anno dopo: muore."},
fragola:{q:"piantine di fragola",bio:false,nota:"Si comprano piantine, non semi. Le rifiorenti danno frutti da giugno ai geli."},
piccolifrutti:{q:"piante di lampone ribes uva spina",bio:false,nota:"Per il mirtillo serve anche terriccio per acidofile: senza, non vive."},
frutta:{q:"alberi da frutto a radice nuda",bio:false,nota:"Se puoi, un vivaio di zona batte la spedizione: le piante viaggiano male e le varietà sono già adatte al clima."},
physalis:{q:"semi di physalis alchechengi peruviano",bio:true},
okra:{q:"semi di okra gombo",bio:true},
quinoa:{q:"semi di quinoa da coltivare",bio:true,cat:"cereali"},
fiori:{q:"semi di fiori per orto calendula tagete nasturzio",bio:true,cat:"fiori"},
funghi:{q:"kit funghi su tronco tasselli micelio",bio:false,nota:"Cerca 'tasselli di micelio' (shiitake o pleurotus) se hai il tronco, o un kit già pronto se non ce l'hai."},
luppolo:{q:"rizomi di luppolo",bio:false,nota:"Si vendono a fine inverno: ordina tra gennaio e marzo."},
liquirizia:{q:"pianta di liquirizia glycyrrhiza glabra",bio:false},
germogli:{q:"semi da germoglio bio",bio:false,nota:"Solo semi venduti apposta per germogli: quelli da semina possono essere trattati."},
forzature:{q:"semi di cicoria witloof di Bruxelles",bio:true,nota:"Si semina in orto a maggio–giugno: le radici da forzare in cantina te le fai da solo in autunno."}
};
