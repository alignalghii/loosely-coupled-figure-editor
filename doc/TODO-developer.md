 - *Undo* functionality!
 - test `centroid` math vector function
 - test `Figure.prototype.centering()` method
 - last grasped figure should be made visibly distict (coloring blur?). Solution: `DOM-mainpulation.prototype.updateElementWithAttributes`. Problem: For focusing, a figure must be moved slightly, no way of intact focusing.
 - z-index: SVG-alakzatok fedési sorrendje
 - Mágneses ragadás
 - Ütközés szaggatottsága, ,,pattanás'' (távolságtartás gyors berántásnál)-hiba megoldása
 - A tervrajz mentése -- ha a javScript biztonság okokból nem enged fájlba menteni, akkor a mögöttes PHP-szerveren regisztrálható felhasználóprofil adatbézisába menthet. Ez a sok felhajtás a korai fejlesztési szakaszban kiváltható azzal, ha a ,,mentés'' egyszerűen a fő adatszerkezet JSON.stringify-formátumban kiíratható, onnan akkor a user egérrel lemásolhatja, és sajétkezűleg fájlba mentheti. Innen meg JSON.parse-szal bárikor visszaolvasható.
 - Hanghatás ütközésnél: a hangfájlot saját mikorofonfelvétellel is elkészíthatjük (pl taps, fémkanál leejtése), így nincs vendorporbléma (szerzőijog- vagy köszönet/hivatkozás).
 - A felhasználói felület parancsai (kiválasztható beszúrandó alakzattípus, regiszeterk, akuumulátorok bufferek, reakciók a helyzetnek és a bényomott parancsgomboknak függvényében) tulajdonképp nem más, mint állapotgép! Ez jó modularizálhatósáágra adlehetőséget. Szélsőségesen jó esetben akár saját domainspecifikus nyelv is tervezhető, és az állapotgép nyelvtana teljesen reifikálható.
 - felhasználói doksi, jó fejlesztői doksi, Utóbbi részeként tesztdoksi.
 - A két projekt (`llosely-coupled-figure-editor` és `floor-plan-designer`) a régi tudás minnél teljesebb haasznosítása, ne vesszék el a régi projektből semmi tudás. Különösen ügyelni a két `TODO` file összefésülésére, ne zavarjon meg, hogy e két külön tartalmú  file ugyanazon a néven létezik.
 - `WidgetVerticalPillar` osztály bevezetése nagyon érik már, akár ,,globális'' szingelton osztály lesz, akár alazatonként, azokhoz kötősve egyéni példányonkénti
 - Járjunk utána, milyen rokon JavaScript alkalmazások, könytárak léteznek alakzatszerkesztés, ütközésvizsgálat, widgetek terén
 - Jobb egérgomb kattintásának kihasználása nagyon modern, felhasználóbarát, gazdag, kifejező és tömör használati módot tenne lehetővé. Gondolom `preventDefault` kell hozzá. oncontenxtmenu: see [Is right click a JavaScript event?](https://stackoverflow.com/questions/2405771/is-right-click-a-javascript-event).
    - Egyébként a jobbegérrel addig is kell kezdeni valamit, amíg nem használjuk ki, mert megzavarja a kattintsok ,,állapotgépét''.
 - Az alakzatok ,,típusbabkjába'' a felhasználó is menthesse be az általa épp megszerkesztett, ezáltal újfajta alakzatokat.
 - Vezessünk be magasszintű eseményeket és eseménykezelést! A JavaScript natív eseménykezelése mintájára, de attól függetlenül! Amelyek pl. ütközés- és közelség-eseményeket vizsgálnak a geometriai figurákon, vagy esetleg még magasabb szinten is majd a lakáselemeken!
 - Ütközés esetén csak csússzék meg az egérkurzoron, de ne jöjjön le a vonszolásról! Nagyon zavaró, ráadásul a nem teljes ütközésellenőrzés miatt becsapható alakzatütközések is sokkal nehezebben kutathatók így.
 - Copyright for `sonar.ogg` alertsound, or produce own sound.
 - HypotheticlWorld, vagy FutureWold, vagy Collision nevű külön osztály az ütközéskereső interációra! Itt a hypotheticus alak olyan dolog, amit pont érdemes egy osztály instanciaváltozójaként számontartani.

 - Az OriginFigure-t nem kell a ma App modulnak nevezett modulbnan nyilvántartani, az inkábbkb. a StateMachine hatásköre. A Statemachine amúgy lehet, hogy valamikor átveszi a mai App helyét.
 - A mai WidgetFactory-ból az eseménykezelős rész nem oda való, kerüljön külön WidgetEventPillar modulba, ami tersészetesen szintén a widget-pillar könyvtárban lenne. A WidgetEventPillar-nak ne kelljen ismernie sem a ma App-nak nevezett modult, se a StateMachine-t: lazy coulpling. Majdhogynem azt mondanám, hogy egyszerűen return-öljön vissza tömb- vagy objektumcsomagokat, de pesze ez nem szó szerint értendő, mert egy ilyen eseményfeldolgozó mindenképp kontrollinformációt is tartalmaz (végső soron egérkattintások hívják meg), így természetesen callback-en keresztül révényesül. Ez a callback viszont legyen teljesen megötésmentes, ne kötődjék konrét modullmetódushoz, max esethleg interfészhez, vagy sima mezei callbackhez.
 - Bár a WidgetEventPillar nagymértékben irányítja az egész alkalmazás eseményciklusát, mégsem kell feltétlen a control könyvtárba áttenni. Ugyanis ő csak az SVG root-DOM-elemre rakott eseményeket figyeli.  Az alkalmazás végső eseményciklusának ő csak az egyik bekötöttje lesz, vele egyenrangúan lesz békötve a GUI egyég gomjainak, válastós listáinak figyelése is.
 - Valószinűleg lesz egy PhysicalEvent jellegű modul is -talán épp a physics mappában, ami az ütközésekből gáyrt valamiféle magasszintű, virtuális eseményt. A jelenlegi WidgetEventPillar-ban az ütközés keresése túl szorosan van hozzákötve. Az lenne a jó, ha a WidgeteventPillarnak nem mkéne ütközéekkel töröödnie, és bár az ütközésesemény ugyan valóban önálló nevű 'collision' esemény lenne a 'mousedown' és esgéyb események mellett vagy flett, de nem a WidgetEventPillar képezné, hanem  a CollisionEventDecoratort valamiféle dekorátorként vagy fasszádként lehetne hozzácsatlakoztatható a WidgentEventPillarhoz.
 - App should load in the initial sample figures (not the injectorMain should do that! Maybe the StateMachine should do that (in its init part) instead of App
 - The module now called as `App` should be renamed, no more being the top-level module (after injectorMain).
 - A lot of functions in the `injectorMain` should move to a new Module, being called App, the formar App module shoud be ranemed,

 - Gombkattitással és billentyűleütéssel egyaránt lehessen kezelni a kezelőfelületet, alakzatokat
 - legyen TAB gomb, ill a TAB-bilenyűleütés is arra a funkcióra, hogy a fókusz váltható legyen az összes alakzaton végig. Legyen persze alakzathozzáadó és törlő gomb ill billentyű is.
 - Legyen alakzatfókusz is és ürespozíciófókusz is. A kettő kizárja egymást: ha alakzatra kattintok, alakzatfókusz és az az alakzat fókuszba kerül. Ha üres helyre kattintok, a fókuszalakzat elveszti fókuszát, és üreshelypozíciófókusz képződik. Előbbi törlésre, utóbbi beszúrásra reagál. Az ürespozíció (WEPOs)-fókusz esetleg meg is jeleníthető (kis pötty, kis kereszt?) bár nem szükségszerű.
 - Az Insert és a Delete nem mód, hanem funkció. Két mód elég: a jelenelg Obsolete-nek nevezett Kompakt mód, és a Normál mód. A Normál mód legyen az alapértelmezés.
 - Kurzornyilakkal is lehessen mozgatni (tologatni) az alakzatokat. Alternatív megoldás: csúszkákkal. A csúszkák forgatáshoz, és tükrözéshez is használhatók
 - Az ürespozíció-fókusznak és az alakzatfókusznak nem kell felétlenül egymást kizáróank lennie. Lehet az is, hogy háromféle fókusz lehet a bufferben: alakzatfókusz, pozíciófókusz és orientációfókusz. Az alakzat- és a pozíciófókusz szerepe az lenne, ami eddig, plusz még a pozíciófókusz felhasználható lenne még forgatás középpontjának megadsára is. Az orientációfókusz meg tükrözés tengelyét adná meg (a pozíciófókusszal együtt)

 - Az alakzatoknak referenciapontjuk mellett referenciaszögök is legyen. Ez lehet automatikus: a konstruktor megadhat default 0 referenciaszöget. A lényeg, hogy a forgatás kövesse. Átgondolandó askálázások hatása, de szerintem nem hatnak rá. Épp fordítva: a scaleX és scaleY a referenciaszög szerint számít mostantól, nem az abszolút vízszintes szerint.
 - Legyenek buktatások: az alakzat legyen képes rábukni a taplpára, illetve a következő/előző oldalára vízszntesbe.

 - Az Állapotgépet lehetne több részre vágni. Egyelőre megtartanánk az egységes közös Állpotot (State). A State osztálynak sajt metódusai nem lennének (csak getterek és szetterek), vagy még azok sem, szóval csak példányváltozói lennének. A közöst State-t sok Machine használná(var machine1 = new Machine1(state). Több osztály is lenne a Machine-k között. Az  egyes Machine osztályok a bemeenet és a kimenet alapján különölnének el. Bemeneten értjük a transition függvény szignatúrájának a bemeneti dolgokra vonatkozó részét, kimeneten meg azt, hogy a Machine milyen akciókat, tevőleges dolgokat hajt végre (rajzolások pl.), vagyis hogy milyen modulokat kell importálnia, használnia, hogy feladatát végezhesse. A ,,közös'' State kiemelésével a Statemachine-ből, és a ,,megmaradt'' Statemachine szétvgágása külön StateMachine-kre: így a felhasználó felület még tisztábban elválik a matematikai motortól, így még könnyebb lesz tetszőlegesen testre szabni a kívánt felhasználóbarát kezelőfelületet. A mostani betűparancsok elvileg továbbélhetnek majd olyan formában, hogy egy felhasználó által programozható szöveges szkriptnyelv részeivé válhatnak. Persze ez a jelen feladat szempontjából nem fontos, ezt csak a TODO listába írom be.
 - Legyen belső API, esetleg majd REST API is. ,,API frst'' szemlélet?

 - Legyen magasz ,szintű, ütközés típusú eemény! Ahogy az seseményfeldobó programrész képes már geometriai (és nem SVG-koordinátás) szintű információkat feldobni, ugyanúgy legyen ezen a téren is egy kis fogalmi emelés: ne csak natív eseményeket dobjon fel! Az e event objektum helyett legyen valami Either Event MyHighlevelEvent! Ez még ne akarja az ütközést tényelges lekezelni, hanem infókat tartalmazzon, amit aztán bármilyen ütközésszabályzat szerint fel lehessen dolgozni. Amúgy ez a saját magaszintű ütközésesemény elvégezhet ütözésinterpolációs számításokat is, az nincs megtiltva, használhat és mozgathat virtuális próbafigurát. Az van csak megtiltva, hogy a tényleges figurán ö maga akciót hajtson végre, az eredeti figurát tevőleges visszarántsa valami kiszámolt pozícióba. Ezt ne tegye, csak infókat adjon!

 - Teszteleni normál módnál és kompakt módnál is: ha a `sampleBank` által beszúrt egyik alakzatot elcsavarom, aztán elkezdek stamp-elni úgy, hogy épp azt az alakzatot választom ki pecsétnek, akkor a torzított  pecsétet teszi ki, vagy az eredetit?
    - általában is ellenőrozni kell, hogy pecsételéskor, mág általánosabban létrehozáskor történik-e klónozás ott, ahol kell, és klónozásmentes-e ott, ahol fölösleges lenne klónozni.
 - Az ütközésnél a rugalmas fogómegcsúszás visszahajlása is, és az átbuktatás is végre rendben működik, de objktumot egy másik objektum éle mentén csusztatni, reszelni nem lehet. Ezt is valósítsuk meg!

 - A körüljárásdetektálási hiba javítása (amikor sem +360 fok sem -360 fok nem jön ki a külső szögek összegére - átnyúló konkáv szögeknél jelenik meg ilyesmi).

 - `flat` and `flatMap` are experimental, do not use them, define them expilcitly!
 - Define a  `mbMinBy2WayCmp` and `minsBy3WayCmp` function, and redefine `nearestFiguresHence` and `nearestVerticesHence` and `maybeNearestFigureHence` and `maybeNearestVerticeHence` (and possibly others as well) by them (lift out the common pattern).
 - put to a separate class? Figure is already a too large class. `addVertex`, `deleteVertex`, `moveVertex` by proximity heurietics should come directly into `Figure`, or should we use a spearate `FigureEditor` class?
 - Amikor az alakzatszerkesztővel nagyon hegyes, sziklaszerű kitüremkedésű alakzatot állítok elő, néha az ilyen sziklaszerű kitüremkedés áthatolható marad az ütközésérzékelés számára. Ez persze hiba. lehet, hogy a háttérben átmetsző vonalmetszésű, invalid poligon áll, amelyen ez nem látszik szemre.
 - `injectorMain`, `Router`, `FigureEditorController`, `GeomTransformationController`: dönteni kell abban, hogy e kontrollerek a `NormalModeController`-rel és a `CompactModeConroller`-rel közös nagy `State` állapotosztályt használják-e, vagy saját állapotterük legyen, akár úgy, hogy közvetlen az adott kontroller attributumaként, akár minden egyes kotrollerhez külön-külön egy-egy a kotrollerhez tartozó State* osztályként.
     - Valószínűleg inkább mégis érdemes megtartani a `NormalModeController`-rel és a `CompactModeConroller`-rel közös nagy `State` állapotosztályt a `FigureEditorController` és a `GeomTransformationController` számára is. Ugyanis egyáltalán nem biztos, hogy ezeknél továbbra is a ,,legközelebbi alakzat heurusztukéjéra'' fogunk támaszkodni. A legközelebbi pont és él (adott lakazaton belül) heurisztikája megmaradhat, de magát a szekesztendő vagy transzformálandó alakzatot a fókusz fogja megadni, nem közelségi heurisztika. Ebben tehát az a `FigureEditorController` és a `GeomTransformationController` használni fogja az alakzatfókuszt, sőt, lehet, hogy maguk e kontrollerek maguk is beleolvadnak a `NormalModeController`-be. Ennek fő oka, hogy előfordulhat, hogy oly alakzat csúcsát akarom elmozgatni, amely alakzat épp abban a csúcsban közös csúcsot alkot egy másik alakzat ccsúcsával. Ekkor a két csúcsa közelségi heurisztika számára megkülönböztethetetlen, de az alakzatfókusz tökéletes megoldást adna. Ezért a `FigureEditorController`-nak mindenképp át kéne venni a fókusz használatát. A `GeomTransformationController` esetleg használhatná a közleségi heurisztikát, de talán az is jobb ha fókuszalapú.
 - A közelségi heurisztika kérdéses, de elfogadható forgatásnál, esetleg skálázásnál (itt kimagyarázható feature lehet, hogy az alakzatot nemcsak belső pontjánál fogva ragadhatom meg), de tükrözésnél már inkább zavaró a közelségi heurisztika. Elég, ha a BELÉkattintás (currentWidget) vizsgálata lapján dolgozik.
 - Megcsináltam az egérrel való vonszolós, interaktív forgatást, és hamarosan kész lesz a többi transzformáció itisztán egeres-interaktív változata is. Egyylre még nem végez ütközésvizsgálatot, tehát egy alakzatot bele lehet forgatni egy másik alakzattal érvénytelen helyzetbe is. Ennek során kiderült, hogy a program ilyenkor hibaüzenett ad, tehát nem talál rá valamiféle erre előkészített kivételere. Bár nyilván hamar meg lesz írva a transzformációk ütközésvizsgálata, de a probléma túlmutat ezen. Alacsony szinten is legyen jól lekezelve az érvénytelen helyzet. A hibaüzenet:
        Uncaught TypeError: pMInf1 is not iterable
            at pMInfCompare (Infinity.js:64)
            at reducer (Infinity.js:164)
            at boardReduceColliding (Board.js:5)
            at boardMinSelectSet (Infinity.js:175)
            at fallFigureOnBoard_allMins (FiguresBoard.js:5)
            at mbVectorTransformer (collision-as-vector-transformation.js:5)
            at infinitezimalDisplacement (collision-as-vector-transformation.js:1)
            at NormalModeController.mouseMove (NormalModeController.js:33)
            at Router.dispatch (Router.js:28)
            at mergelessSubscribe (WidgetEventPillar.js:18)

 - Az ütközés invalidus helyzetei más érdekeségre is rávilágítanak. Van két nagyon pici négyzet, az egyik pont a nagyon konkávalakzatnál. Ez érzékeltlen az ütközésre beforgatáskor. Miért? Akr direkt volt így, akr nemszándékolt melékhatása valaminek, érdemes lenne utánanézni. Ez az átjárhatóság ugyanis pont jól jönne nyilászáróknál.
 - Az Alakzatszerkesztő (Figure Editor) rendelkezzék területtartási kapcsolóval, opcióval is!
 - Amikor az alaprajzot natív  formátumban mentjük, tervezzük meg ezt a natív formátumot minél nyitttabra! Lehessen az alkalmazás nélkül is, sima szövegszerkesztőben is alaprajzokat szerekszteni! Lehetőleg legyen olyan ebben a nyitottsgban, mint a LaTeX!
 - Ha már natív mentés: legyen Redo (az alakalmazásban), a metést pedig kísérje valamiféle saját verziókövetés!
 . az  `ird.currentWEPos` érzékelését törzítja, ha pl. egérvonszolás közben megváltozik az oldal layoutja (pl. mert a debuggoló konzolüzenet hol két sorba, hol egy sorba fér ki). Ez valószínűleg lacsonyszintű jelenség, és a `.svgPoint.matrixTransform(this.svgRootElement.getScreenCTM().inverse())` szintjéig nyúlik vissza.
 - Tudjuk, hogy már lehet egérrel pontot hozzáadni, törölni, vonszolni. Továbbá lehet egérrel alakzatot forgatni. Mindezt kényelmesen intuitívan, tehát vonszolással,
Az ütközésvizsgálat közben értelemszerűen működik (vagyis nem lehet alakzatot tilos helyzetbe beforgatni). Ugyanakkor, ez az ütközésvizsgálat az alakzatszerkesztés (csúcspontok hozzáadása, mozgatása) esetében nem működik! Pl. csúcsot mozgatva bele lehet trappolni egy másik alakzaba.
 - Ami még nembiztonságos ily szempontból, az a stamp (pecsételés): új alakzat beszúrása minta alapján előzetesen kijelölt spaceFocus-ba.
 - Az alakzatszerkesztőre visszatérve, ennek ütközásvizsgálati hiányosságától függetlenül is, a közelségi heurisztika kissé katasztrofális az alakzatszerkesztőben. Nem a csúcsok, élek közelségi megsejtésével van a baj, hanem a legközelebbi alakzat közelséi heurisztikájával. Nagyon csúnyá össze lehet kuszálni az  alakzatszekesztés vele (pl. egy mozgatott csúcs esetén, ha túl közel megyünk vele egy szomszéd alakzathoz, akkor a szekesztés váratlanul átugrik a szomszéd alakzatra).
 - És ettől is függetlenül, baj, hogy az alakzatszekesztő megengedni, hogy kereszteződő élű, kifordult alakzatok jöjjenek létre.
 - ,,Abszolút'' magyarítása: önmagábanálló?
 - Most, hogy több vászon van, és egymás közt át lehet húzogatni az alakzatokat, látszik, hogy valójában a vásznak még mindig közös board-on osztoznak, ezértpl. ha egy sűrűn benépesített vászonról egy üres vászonra húzok átt egyetlen alakzatot, az az alakzat az új vásznon belül furcsán, botladozva lesz csak mozgatható (szellemütközés), ugyanis pont úgy fog viselkedni, mintha ütköznék azokkal az alakzatokkal, amelyek a másik vásznon vannak, de ugyanazon a koordinátákon (ghost collisions).
 - make two audios. One for collision, another for jumping over to another canvas. Maybe a third one for teleporting over a figure or a group of figures.
 - Az alakzatszerkesztő ütközésvizsgálata mellett fontos még, hogy ne tudjon invalidus (pl áthurkoló) alakzato létrehozni. a poligonvalidusság szabályai:
    - a szakaszok nem metszhetik egymást
    - érintkezni csak kölcsönösen végpontjaikban érintkezhetnek
    - csúcsból csak két szakasz indulhat ki.
 - A protabilitást, hordozhatóságot mindenképp vizsgálni kell, legfontosabb a dokumentáltan is experimental vonások kiváltása. Két ilye nbiztos van: `Array::flatMap` és `DOM-Node::after`.
 - Ha az alakzattulajdonságok űrlapján területtartás kérek, és nagyon hosszúra nyújtatok egy téglalapot, akkor szélessége epszilon alá fog keskenyedni, ilyekor az ütközésérzékelő a holtjáték-ráhagyás miatt nem fogja érzékelni az ürközést! Lesz egy szomzédokba beledöfő hosszú vonal. Ezt vissza lehet zsugorítani, de csak nem-ütköző méretre. a 90000-es hosszúságot vissza lehet venni 80000-re (hisz az sem ütközik), 300-ra már nem lehet visszavenni (hisz az már nem megy epszilon alá, így már ütküzik). Kicsi, valóban nem ütköző értékre, pl. 2-re vissza lehet venni.
 - Eldönteni, hogy a jelenleg a `textual-widgets` mappában a ...`UI.js` fájlokat ne nevezzük át `widgets` mappára és ...`Widget.js` névre.
 - Status bar (Statusleiste): a jelenleg msgConsole nevű tájékokatató kis konzolüzenetes rész kerüljön legalul egy teljesszéles sorba!
 - Az `areaInvarianceRadio` constansnak (DOM-elem) nagyon rossz a neve. Valójában jelölőnégyzet, nem rádiógomb.
 - Az lenne a jó, hogy amikor a területtartást mint opciót bejelölöm, automatikusan hide-olásra, vagy méginkább, inaktiválásra kerülnének azok a gombok, úrlapelemek, linek, amelyekhez területmódosító műveletek tartoznak.
 - Az areanvariance nem az alakzattulajdonságok közé tartozik! Ne is az az UI (device) kezelje le! hanem inkább valamiféle ConfigUI! A terülelttartás ugyanis az alakalmazás teljes működését áthatja! Ezért valóban inkább valamiféle confignk számít. Hasonló még az epszilon, az is ide kerrülhetne! (jelenleg szerencsétlen módon az svgLowlevel vagy a widgetFactory része). Továbbá még talán az Attila által mutatott zoomolás stb. lehet még ilyen, vagyis egy config dologhoz tartozó dolog. Mindenképp a confighoz tartozik viszont a bennfoglalásos transzforációöröklődés flagkészlete (vagyis, hogy szoba mozgatásakor, forgatásakor, nagyításakor, tükrözésekor a bennelévő bútorok is mozogjanak, forduljanak, átméreteződjenek,tükröződjenek-e). Ezt minden egyes transzformációra külön lehetne szabályozni.
 - Miért tartunk fenn külön controller és külön UI (device) modulpárokat? Egy megoldás a jelenleg `ConfigDriver` fájlban látszik: a driver bemeneti és kimeneti alacsonszintű kommunkiációs egyaránt támogagat. Tehát checkbox fizikai becsekkolását ugyanúgy, mint a checkválástkor felszabaduló eseményre való rácsatlakoztathatóságot. A kimenő kommunikáció kicsit hasonlít az MVC view ill helper részére, de nem azonos azzal. A driver ugyanis inkább  tényleg csak maguknak az DOM-elemeknek a puszta elérhetőségét nyújtja, mint ahogy az eseményeket is csak beköti. Tehát alacsonyszintű, de kétirányú.
 - Device vs driver megkülönöböztetés: a korábban UI, most Device  néven nevezett modulok nevezéktana ezúttal Driver lesz. A hozzájuk tarotzó device ugyanis inkább maga az a DOM-csomópont, elem, eseményforrás, illetve vászon, amit ellát. Theát pl. lehet, hogy az SvgLowlevel neve device lesz, bár ez tallán inkább maga a vászon, illetve maguk az egyes <svg> DOM-elemek.
 -Drivernek tekinthető az `msgConsole` is, új neve `StatusBarDriver` lehetne, esetleg méginkább `StatusBarODriver`, mert ő csak output device driver, hiszen ő maga nem vált ki eseményeket (reagál ugyan eeményekre, de csak magas szintről, kontrollerek meghívásain keresztül). Akkor lenne `StatusBarIODriver`, ha pl. a statusbar kikapcsolaható lenne saját csekboxról stb., vagyis ha sajátjogon lennének eseményei. Mindenesetre épp ezért (könnyen válhat egy idriver vagy odriver iodriverré) ne az osztályok, csak a belőlük képzett objektumpéldányok változóneve mutassa, hogy I-, O- vagy IO-driverről van-e szó!
 - Amúgy az SvgLowLevel, vagy talán méginkább a WidgetEventPillar lehet hogy szintén driver. A `Controller.prototype.maybeJumpingWidget = function (targetCanvas)` metódusnak ha talán nem is az egésze, de a svg-pologonelemeket a szülő canvas elemmel való összetartozását vizsgáló összehasonlító részének szintén valamiféle svg, poligon vagy vászon jellegű driverhez kellene tartoznia. A `widgetFactories` tömb, amit rendre átadunk az egyes controllereknek, szintén lehet hogy szintén drivertermészetű.
 - A `FigurePropertyEditorController` metódusait érdemes nézegetni. A controller függ a documet-től, és hatalmas DOM-szerkesztések vannak benne közvetlenül. Mindkettő hiba: ezeket ki kell delegálni egy külön  erre létrehozott drivernek.
 - A FigurePropertyEditor mezőiben ahol számot kell beadni, validálni kellene számformátumra, mert ha érvénytelen adatot kap, akkor nagyon csúnyán eldurran, alacsonszintű NaN hibák, sőt az alakzat is eltűnik!
 - A rádiógombok, checkboxok csak akkor reagálnak, ha egyenesen beléjük kattintok, nem elég a hozzájuk tarotzó címkére kattintani. Használjuk ki a HTML <label for="..."> szolgáltatását!
 - A FigurePropertyEditor legyen kétirányú: vagyis amikor egy alakzaton az egérrel mértani transzformációkat végzünk, az értékeke folyamatos változása élőben kvethető legyen a FigurePropertyEditorban is!
 - A FigurePropertyEditor mutassa az alakzat aktuális referenciaszögét is!
 - A FigurePropertyEditor-ban lehessen a szoba nevét is átírni!
 - A FigurePropertyEditor jobb hiján felhasználható átmenetileg arra, hogy falréseket hozzunk létre: közvetlen szereszhetőv étehetjük benne az SVG elem stroke-dasharray attribútumát. Ez nagyon alacsonszintű, de azonnal bizton működő megoldás, a felhasználóbarátságot adandóó matematikai rutinok meg utólag is megírhatóak ,,föléje''.
 - A space fókusz (poziciófókusz),  ami kijelöli a következő beszúrható alakzat helyét: Attila kérése volt, hogy vizuálisan is látszódjék. Ez lehetséges lenne, ez e célt szolgáló alakzato nem teszzük be a board-ba, így könnyűvé válik elkülönítése a többi alakzattól. Esetleg bekerülhet a boardba, de külön business fajtája különíti el őt a többitől.
 - A jobb oldali vászon legyen gombnyomásra benépesíthatő. Hiszen ha onnan rakodok át alakokat a baloldali vászonra, akkor a jobboldalinak bármikor gombnyomásra megújíthatóan kell lennie (vagy pedig másolós vonszolás kell).

 - Expand/contract, illetve push/pull ikonként is meglegyen (élre, nem alakzatra, és tán nem is a geom transzformációk, hanem a csúcs add del move közé), tehát ne csak az alakzatttulajdonság-szerkesztő inputmezeiben való átirogatással lehessen pl. egy L-szoba vagy egy trapéz falait kényelmesen tologatni.
     - Tehát: van geom transz, van alakztatszerkesztő, amin belül van csúcsszerkesztő (add del mov) és élszerkesztő (expand/contract és push/pull).
     - tulajdonkéép az expandcontract versus pushpull oppozíció pontosan megfelel a vízszintes versus függőleges opciónak. De megegyeztük, hogy a vízszintes vs függőeges elletnétpárt opcióként nem veztjük be, hanem szétosztjuk a műveletek között. Persze ez mindig vitatható.
 - A businessObject nevének kiíratási szabálya: a (potenciálisan konkáv) poligon legnagyobb területű konvex részpoligonjának súlypontjához kerüljön a névfelirat közepe. Ez matematika. Egyébként  lgnagyobb terület nem jó (magas elvékonyodó is lehet). Legrosszabb  esetben kontruáláskor végiglépdelünk a poligon könyezetében, próbálgatva.)
 - Mixin vagy trait bevezetése az implementációban. Pl. a Figure is, aWidget is már túl sok felelősséget vállal, túl heterogén. Ahol immár azonnali döntésre is szükség van: a State osztály interpretációt vállaló része (State.prototype.interpret)
 - Ha egy alakzatot átugrasztok a másik vászonra (és vissza), az új (és az új-régi) vásznon automatikusan legfölsőnek (z-ccord) fog számítani. Ez igaz a címekre is!
 - Forgatáskor a forgó szoba felirata értelemszerűen igazodjék a szoba helyzetéhez (pl. L alakú szoba forgatásakor ugorjék át a megfelelő öbölbe). Ugyanez teljesüljön a többi transzformációra is, sőt az alakzat alakszerkesztésére is (élek feszítése-sűrítése, húzása-tolása, csúcspont hozzáadása, elvétele, mozgatása). Ebből a csúcsszerkesztésekhez való autoigazodás megvan,de az élszerkesztésekhez majd meg kell írni.
 - Él tolásakor előfordulhat, hogy a rövvidebbik élet rátolom a vele párhuzamos hosszabbik élre (vagy fordítva). Ilyenkor a közelségi heurisztika miatt valószínűleg nem lehet széstesdni őket, mert a közelségi heurisztika csak akkor képes megkülönböztetni őket, ha átállok a hosszabb él kikógó részére.  Ha a két él pont egyenlő nagyságú, akkor még ez a kiskapu sincs.
 - Az alakzattulajdonságszereksztőben lehessen a címet és a terüetet átírni! A cím átirása világos, a teület átírásánál meg az automatikus skálázás hasson!
 - Lehetőleg a címet lehessen közvetlenül is átgépelni, de ezt nem kell erőltetni.
 - A help-oldalak elhelyezése nem jó (csak file-protokollal működik a böngészőn, http-protokollal nem).
 - Ha egy alakzatot beletolok egy másik alakzatba, akkor a megfelelő business objektumok kerüljenek egymással tartalmazási viszonyba (szoba bútorai), és a konténer onnatól kezve automatikusan húzza magával a részeit (amelyek azonban maradjanak függetlenül is mozgathatóak). Hasonlóképp, ha kihúzok vlamit egy konténerből, akkor az alkalmazás érzékelje a logikai-tartalmazási viszny bontását, és a szülő magával húúza a gyerekeit féle kapcsolat törlését is.
 - Tagolt ütközésvizsgálat: sokkal optimalizáltabb is, és még logikailag sem csúnya:
    - szoba tárgyai csak teestvérbútoraikkal végezzenek ütközésvizsgálatot. Mással fölösleges (többi szoba, más szobák tárgyai, szabadon kószáló árva bútorok). Fölösleges még az is, hogy saját sak a bennfoglaló szobájukkal végezzenek ütözésvizsgálatot, hisz az úgyis vonszolja őket (ez azért nem egészen igaz: amkor én mozgatom a bútort, akkor fontos, hogy észlelje saját szobáját).
    - szoba csak a többi szobával végezzen ütközésvizsgálatot. Szabadon kószáló (árva) bútorral sem érdemes. Saját bútoraival sem, hisz azokat úgyis vonszolja (ez viszont már igaz: bútor nézze saját szobáját, de szoba nem kelle hogy nézze saját bútorait. S bútor ugyanis vonszolható a szobától önállóan, de a bútor nem vonszolható önállóan saját bútoraitól).
    - Az előző két pontot nagyjából egy szabály is összefoglalhatja, bár kissé durvábban: objektum csak testéreit és szülejét figyelje. Unokatestvéreket, idegeneket fölüsleges, sőt gyerekeit is (mert azok vonszolódnak vele).
 - Absztrakt események: ezeknek a gondolata aszthiszem már tavasszal fölmerült, akkoriban az ütközésvizgálat kapcsán: az ütközés triggereljen egy belső, tehát az alakalmazás logikájában megtevezet sajátos.  magas szintű eseméynyt, amely fölszál a routerben, minzt ahogy az igazi javasriptesemények. Ilyenek lehetnének még:
    - amikor aakzatot egyi kvászonról a másik vászonra átugrasztok (és esetleg léptéket is vált)
    -  amikor galériát, bútort beviszek szobába, és az  gyerekévé válik.
 - Explicit, reifikált (tömmben, objektumvan leírt) ütközési szabályok. Jelenleg az ütközési szabályok elosztva hardcosolva vannak a kódban, nem tárolja őket valami külön információs tömb vagy objektm, az egys objektumtipusokhoz hozzárendelhetően. Maguk az objektumtípusok is közvetlenül vannak kódolva osztályaikban, nem lehet pl. infotömmbe írni.
 - Igen, reifikált objektum- és szerepviszonlat is? (bútor, szoba)?.
 - Léptékváltás: a bútorokat még lehet, hog 1:1 méretarányban húzzuk át a jobb oldali forrásvászonról a bal oldali munkavászonra, de a szoba-típusalakzatmintákat szinte biztosan kicsinyített, esetleg akár sematizált formábol fgojuk áthúzni. Többféle megoldás van, a jelenleg kézbeeső egyik megoldás, ha a kát vászon eltérő léptékkel dolgozik.
 - Alakzatkicsurgás: a Widget.prototype.delete művelet csak az alacsonyszintű SVG-alelemet törli, de elflejeti törölni az alakazatot mint geometriai objektumot. ez felhasználói szemmel egyelőre még nem okozott látható zavart, de valoszínűleg valami leak-et jelent.
 - Az oldaltoláshoz és feszítéshez (élszerkesztő) tegyük ki az egyelőre nem működő ikonokat.
 - Az ablakra, ajóra több megoldás van. A legegszerűbb az talán, ha vonszolható alazatok, de gondot jeletn, hogy az ablak elvileg egy 0-vastagságú kétszög, így vonszolhatatlan (kisi az edsély hogy ráfog az egér). Több megoldás is van, az egyik, hogy az ablak path-vastagsága kisebb, mint a szobáké, így az ablak eg elnyújtott, valós pozitív vastagságú négyszög.
 - A `partialFunctionGeomToBusiness` jelenleg egy `Map`. Jobb lenne saját `PartialFunction` osztályt írni, három metódussal: `maybeGet`, `set` és `delete`. Ezek lényegében egy az egyben delegálnák feladatukat egy `Map`-nak, amelyet privát komponensként használnak. A plusz szolgáltatás a `maybeGet` maybe-csomagolása lenne, nem kéne a tpuselméleti szempontból nem szép null-ra alapozni.
 - Jelenleg a Widget propertyként coordSysTransformer-t tartalmazza, visznt widgetFactory-t nem. Jobb lenne, ha widgetFactory-t tartalmazza. ebből a coordSystransformert úgyis ki tudja nyerni, emellett a widgetFactory nagyon hasznosan jön a widget számára akkor, amikor pl. egy szoba a címét hozzáigazítja új helyzetéhez, vagy magával vonszolja (és ugyane miatt majd a bútorok miatt is jól fog jönni). Ami még fontos: a vásznak közti átugráskor a léptékváltást is könnyebb lesz kezelni így. (A bútoroknak és a nyílászáróknak nem kell léptket váltaniuk, de a szoba-típusalapalaksémáknak igen).
 - A léptékváltás (több coordSysTransformer-objektum) nem az egyetlen módja, megoldása annak a felhasználói igénynek, hogy a jobboldali vászonról (menüvászonról) a baloldali vászonra (munkavászonra) áthúzott szobatípus-mintaalak automatikusan megnőljön a vászonugráskor, és ezáltal lehessen a menüvásznon kicsinyített, sematizált formában tartani. Egy másik megoldás az, ha egyszerűen a vászonugráskor (amit nyilvánvalóan észlel, hiszen a statussorban is jelzi) automatikusan triggerelődjék pl. egy scale(2) az adott widgetre. Ez azért jó, mert
 - a scale az az adott lalkzat súlypontjához viszonyít, a coordsystransformeres rescale pedig az abszolút vászonhoz, így utóbbi megoldás kellemetlenül ,,megugrasztja'' az alakazot a rescale mellett.
 - amúgy is szükség van ilyen ,,meseményfigyelésre'', ugyanis a menüvásznat mindig újra kell népesíteni, frissiíteni alakzatátugráskor.
 - épp ezért, érdemes azt is átgondolni, hogy mégiscsak jó lenne applikáciszintű, saját eseménytíusokat bevezetni, amelyek tetszőleges kódhelyről triggerelhetők lennének és a routerből kiindulva emelkednének fel.
 - Ettől függetlenül, a több coordsystransformer tartása nem volt felesleges ötlet, mert a menüvászon alakja más lesz, mint a munkavászoné, arra meg jól jöhet.
 - Működik a léptékváltó urgás tisztán több coordsystransformer nyilvántartással is, egy gond van. Invalidus ütközépsprobléma lépzhet fel, ha az egyik vásznon a vászonszélről eleve kilógó alazatok vannak (láthatatlanul).

 - (nem túl fontos): A szoba címét legyen képes újra alapértelmezett helyzetbe visszaállítani (ha a felhasználó kéri)
 - Súlyos baj, hogy invalidus ütközés, ha bekövetkezés (léptékváló ugrásnál sincs ellene védelem még), akkor a felhasználó onnan már nem tud kiszabadulni, és az alkalmazás valójában JvaScript-hibábal áll le.
 - Sokszor merül fel a z-kkordináta (a ,,mélység'') kérdése. Erre véletlen mellékhatásként egész jó megoldás született: át kellhúzni az alakzatot a másik vászoonra, és visszahúzni. Ekkor automatikusan topre kerül. Ha egész berbútorzott szobát húzok át, akkor egyszerre az összes alakzat topra kerül. Ha a cím mélyebbben lenne, mint egy szoba, a cím önálló át és visszahúzásával a cím is topra kerül. A baj csak az, hogy ha a menüvászon automatikusan mindig újrafrissül, amikor onnan kihúzok valamit, akkor az ilyenfajta topraemelés már nem lesz szimmetrikus. Önmagában ez még nem akadly,a de akkor a szabálynak annak kell lennie: a menüvászonra való ráhúzás még nem resetteli a menüvsznat, csak az onnan való elhúzás. Fontos az is, hogy a munkavászonról való elhúzás ne resettelje a munkavásznat. Az áugrási resettelő szabály tehát aszimmetrikus, és kiemelt vásznakat ismer.
 - Ha a topraemelésre külön ikont, funkciót hozunk létre, akkor a vásznak átugrási resettelő szabálya szimmetrikusabb lehet!

 - Elromlott az alakzattulajdonság-szerkesztő:

        FigurePropertyEditorController.js:59 Uncaught TypeError: Cannot read property 'name' of undefined
            at FigurePropertyEditorController.open (FigurePropertyEditorController.js:59)
            at widget (FigurePropertyEditorController.js:48)
            at either (Either.js:5)
            at FigurePropertyEditorController.modeOn (FigurePropertyEditorController.js:46)
            at Router.dispatch (Router.js:195)
            at mergelessSubscribe (WidgetEventPillar.js:22)
            at svgPolygonCase (WidgetFactory.js:109)
            at SVGSVGElement.handler (SvgLowLevel.js:55)

  Fontos, hogy a hiba megjavítása után azt is nézzük meg pluszban, hogy az sem zavarja-e meg, ha egy szoba **címére** kattintok rá.

 - `../spec` alakú elérhetőségű modulokat ne töltsön be az `index.html`, mert a documentroorból úgysem láthat ki, és ez nagyon lelassítja a betöltést. Elvileg nem ördögtől való, ha az index rálát saját tesztjeire (bár érdemels lehet külön html-oldalra tenni), de ha mégis az indexre szeretnénk, akkor linkelődjenek elérhető helyről és módon. Felhasználói szempotból a (kijaított linkelésű) spec-ek betöltése csak időt vesz el, de egyelőre még bennhagyhatjuk (majd végső élesítéskor lehet gonsolkodni valamiféle optimalizációs célú kivevésen).
 - Nem jó, hogy néhány fájl elhelyezésében nincs emgállapodás (a css és a logó az index mellett is, meg az assets alkönyvtárban is van (az ingyenes vs a céges változat)

 - Az alakzatok pecsételős beszúrása (NormalModeController) sem végez ütközésviszgálatot!
 - Ha ,,galériát'' szobába húzok, akkor a két title nem legfelül lesz, hanem a szoba title-jét eltakarhatja a galéria alakzata, és ez zavaró. (Bár lehet, hogy pont így logikus, és az lenne végső soron zavaró, ha a szoba title-je is legfelső szinten lenne.)
 - Automatikusan frissüljön a szoba alakzattulajdonság-űrlapja (mármint persze ha amúgy megvan nyitva) akkor, amikor bútorokat adok a szobához vagy veszek el. Ugyanígy transzformáció és átszerkesztés esetén is!
 - Szoba mozgatásakor ugyan végre vele együttmozognak a bútorok (a ,,kíséret''), de 1) a bútorok címe ott marad 2) csak magára szobára végez ütközésviszgálatot, a kíséretre nem! A kíséret tagjai szelleméként belemásznak egyéb szobákba!
 - Explicit, ,,külső'', önálló fa adatstruktúrát használjunk a business objektumok tartalmazási hierarchiájának nyivántartására: `Tree<BusinessObject>`
 - A hibák úgy reprodukálhatóak a legegyszerűbb módon, hogy a menüvászonról a munkavásznr húzom egy alakzat címét (magát az alakzatot **nem**). Innentől kezve akár az alakzat megmozgatása hibát fog kiváltani. A cím mozgatása **nem** vált ki hibát. A cím visszamozgatása megszünteti a kényes, error-prone helyzetet.
 - Bár már jól átugrk a részalakzat, de a részalakzat nem ütközik
 - Vlaójában a részalakzat is ütközik, de a régi vaszon helyére visszaképzelve! (Szellemütközés.) Ez amúgy nem igaz, a szemmelüközések megjelenése egyelőre kaotikusnak tűnik, oka nem ismert, és valójában **nem** szellemütközésről van szó. Az egér valamiért megcsúszik olyan 1:3 arányban az objektumon, ,,lassan'' csúszik.
 - Bár a gerekobjektumok nem ürköznek, elvileg ettől még jól használható a program. Ugyanis az ütközésvizsgálat többnyire akkor érdekes, amikor egyedi tőrgyat mozgatunk bebútorzott szobában. Itt működik az ütközésvzisgálat.
 - Háromszoros tartalmazás esetén a (szoba-galria-galériabútor) a galériabútor viselkedése furcsa:
    - csak apjával mozog együtt, nagyapjával nem (apját követi, nagyapját nem)
    - a nagyapát (szoba) átugrasztva, az apa (galéria) vele ugrik, de a galériabútor eltűnik, viszont visszaugasztáskor újra megjelenik.

 - Ütközésvizsgálatot emeljük a business szintre, mert az isemri a legjobban a tartalmazási hierarchiát
 - A Figure, Title, szoval a MathlevelObject callback property-je  (this.mbVectorTransformation) nem szép, váltsuk ki valami mással ezt a megoldást
 - Widget class should have a WidgetFactory collaborator
 - A CompactModeConroller (vagyis a kompakt mód maga) elromlott (talán a címek bevezetésekor).
   - Vonszoláskor bug
   - Ha alakzatot törlök, létrehozok, az rendben működik. Ha viszont alakzat **címét** törlöm, akkor később az alakzatot nem tudom már törölni: valamiféle árvasági hiba jelenik meg
 - Szobához követőkíséretként hozzáadhatok olyan alszobákat/bútorokat is, amelyek még egy másik vásznon vannak! Vajon mi történik vonszoláskor?
 - A falrések kezelését jelenleg a dasharray-tulajdonságcsaláddal oldottam meg. A dasharray elromlik egyes transformációkra, és a vásznak közti átugrálásokra is. Bár ezen ,,felszorzással'' segíteni lehet, de a részaránytorzító transzformációkra, és a nagyon fontos éltolásos transfromációra is el fog romolni. Megoldás: alapvetően magaszinten (business level szinten) tároljuk és kezeljük a nyílászáróinformációkat, amelyek aztán innen update-lődnek le az alacsonyabb szintekre (egészen az SVG dasharray szintig), a megfelelő, külön e célra megírt matematikai függvények segítségével.
 - A mostan `Audio.js`-nek nevezett modul és osztály legyen `AudioDriver`, és kerüljön is az eszközmeghajtók közé! Ez amúgy output driver. Kétféée hangot tudjon:
    - amikor ütközik
    - amikor - ami amúgy egy bug - eleve invalidus helyzetben van valami. Elvileg erre kivételt kéne dobni, mert elivleg az alkalmazásnak ki kéne zárnia, hogy ilyes előfordulhasson, csak túl jellegzetes a hiba és túl nagy az esélye annak, hogy valahogy mégis előfordul, ezért inkább rendelünk hozzá viselkedést.
    - Jelenjék meg a statussorban is pirosbetűs, kiemelt szöveg!
 - A galériát tegyük be egyszrre két fülébe is a menüvászonnak: bútor és szoba!
    - Vagy külön fül neki, valami tartalmazott szoba. Ilyenek kerülhetnek még ide, a galléria mellett, mint gardrób, mosdóparaván. italbár... Amúgy a galéria valójában szoba, hiszen címe (kiírt neve) van.
 - Hangok hozzádása az `/usr/share/sounds/....*.ogg`-ból. Főleg az alkalmazás indítására, bezárására kéne (pl. `/usr/share/sounds/ubuntu/stereo/service-login.ogg` és `/usr/share/sounds/ubuntu/stereo/service-logout.ogg`), de a többit is érdemes nézegetni. A `bark.ogg` nagyon jó az invalidus helyzetbe kerülés (elivleg bug, de gyakorlatilag egyelőre még kivédhetetlen esemény) jelzésére
    - Amúgy lehet, hogya hangfileokat szét kéne osztani az egyes driverek közt, és nem egy közös audioDriverbe összeseregletni őket.
 - Változzék az egérmutató aszerint, ohog épp alakzat (cím , bútor) fölé emelem, és azerint is, hogy milyen módban (kontrollermódban) vagyunk!
 - Az image widget (pl bútor) fókusz-stylingja hogyan legyen? (Jelenleg opacity-vel oldottam meg, ami működik ugyan, de nem elég kifejező, és figyelmet igényel a GLITTERING-gel való összeakadás elkerülése is - sorrend!)
 - Az image widget (bútor) mozgatása, ütköztetése közben néha egyszer-egyszer felugat az invalidus helyzetet jelző kutya! Miért?
 - Dönteni abban, hogy az `ImageWidget` trtalmazzon-e business level összetevőt, vagy sem? Egyelőre úgy van megírva, hogy nem tartalmaz, de egyébként van egy `Furniture` nevű modul, ami épp az ImageWidget business level részel lehetne, de nincs bekötve, valósan kiaknázva.

 - A `Widget` ősosztálynak `maybeDomainObject` tuljdonsága legyen, hanem alapból ne legyen `domainObject` legyen ilyen tulajdonsága. Csak `high` és `low` tulajdonsága legyen. A Widgetnek meg van három gyereke, a Title, a Room és a Furniture (majd lesz nyilászáró is, de azt most hagyjuk). A Title-nek nem lesz domainObject-je (híjuk inkább BusinessObjecktnek), a roomnak és a Furniture-nek (és az Openingnak is) meg lesz. íEgszóval: a hight és a lowt öröklk, a businessObjekt doglában meg egyénileg rendelkeznek. Így el lehet kerülni a nehézkes

         maybe_exec(
                () => {throw ...}
                businessObject => ....
                room.maybeBusinessObject
        )

   és

         maybe_exec(
                () => {}
                businessObject => {throw}
                title.maybeBusinessObject
        )

   féle *futásidejű* típusozást (a kivételdobás a szegény ember típusozása).
 - Az ImageWidgetnek *legyen* business szintű összetevője (Furniture). (Amúgy nevezzük át a widget gyeerkosztályokat eetleg a business objektjeikről, bár a Title esetében ez elgondolkodtató, lehet hogy mégse). Mindenesetre a bútor valóban üzleti logikai szintű dolog (a bútort a kereskedő egveszi a tulajdonos szállítja, berendezi. A címet nem vesszük meg, az felhasználói szemszögből nem ,,dolog''.
 - Mivel a title-nek nincs business szintje, de gazdája van (sőt neki kötelezően is tartozna kell valakihez), de azt az ő esetében nem a business szint tartja nyilván, mint a többinél, ezért kell egy `maybeHost()` nevű absztrakt metódus. Tuljdonképp akár nem is kell absztraktnak lennie: `for (prop in this) if ('host' in this[prop]) return ['just', this[prop].host]; return ['nothing']`. Persze lehet mégis absztraktnak hagyni (vagyis Widget szintjén csak kivételdobó törzset definiálunk neki), a gyerekeknél meg egyénileg: `['just', this.high.host`] jó `Title` esetén, és `this.businessObject.maybeHost` pedig `Room` meg `Furniture` esetén.
 - Szobát úgy lehetne másolni, hogy visszatoljuk a menüvászonra, majd onnan visszatoljuk a munkavászonra. Utóbbi tolás esetén ugye másolás van.

 - A WidgetFactory-k, és maguk  Widgetek is, sok szempontból hasonlítanak a device driverekre (eseményekre iratkoznak, alacsonyszintű DOM-elérést indukálnak). Érdemes a widget-pillar mappa tartalmának egy részét, vagy akár az egész mappát berakni a device-drivers mappába. Valószínűleg nem ily egyszerű, némi kódközelítés, refactory is kellhet. Egyébként a jelenleg ancestor WidgetFactory-nak valóban van subsribe()-ja, pipelineToSM()-je viszont niincs. Érdemes lenne megnézni, mi tölti be a pipelineToSM() szerepét, és ennek alapján teljessé tenni az analógiát.
    - fenti pont vitatható: a widgetfogalom lényege a függőleges architektúraszervezés, a device driver lényege pedig az, hogy egy V (vagy U) alakú architektúrában a V betű alsó részén (de a csúcsa fülött egy kicsivel) helyzkedik el (a V balszára az input - eseményfigyelés, a V jobbszára az output - SVG-DOM maipuláció). A device driver lényege, hogy minkkét kiszelt rész alacsonyszintű (event subscribe és element setAttribute szintűek). A widgeteknek viszont függőleges srvhitektúraszervezésük miatt magasszintű viselkedésük is van, sőt, alapvetően az a szembetűnő. Épp ezért majd nem amaguk a widgetek lesznek device driver, és valószinűleg nem is a widgetfactory-k (amikben szintén inkább függőlegesség van). Valószínűbb, hogy az ancestor WidgetFactory subsribe metódusa ki lesz vágva, egyesítve lesz az SvgLowLevel tartalmának jelentős részével, és kap egy pipeToSM metódust is. Ebből az ilyeen módon felálló új modulból viszont már valóan egy új device driver lesz.
 - Aggályos, hogy az ancestor WidgetFactory, amely sok szempontból absztrakt osztályként viselkedik, egyúttal vagy konrét osztályként kell használni, vagy pedig az egy CanvasPseudoWidget-en belüli 3-fajta gyerek *WidgetFactory közül önkényesen kell kijelölni egyet ,,gyereksemleges'' műveletek meghívásakor. Több esetben is felmerült ez az önkényesség, de a legélesebb a subsribe meghívása. Melyik gyerek *WidgetFactory subsribe-jét hívja meg az App, illetve végső soron az injectorMain_ Vagy példányosítson külön e célból az elvileg absztraktnak is tekinthető ancestor WidgetFactory-t? Vagy - harmadik megoldás - a CanvasPseudoWidget ne csak a 3 gyereket tartalmazza, hanem önállóóan sajátjgon is tartalmazzon svgLowLevel, ccordSysTransformer, bjiection, partialFunction mezőt, és ő vegye át a subsribe metódust is?
    - Amúgy a CanvasPseudoWidget nevén érdemes elgondolkodni. Tényleg ,,függőleges'' jellegű, hogy nevét a widgetfogalommal hozzuk analógiába? A CanvasMultiplicityComponent nevén és helyén is érdemes elgonsolkodni, de az valószínűleg tényleg component (a CakePHP értelemben), és így tényleg a controllers mappába való.
 - A nagyrefactory után még mindig:
    - Láncolt tartalmazásnál az unokaelem nem követi a nagypapát (sőt asszem az apát sem)
    - Néha ,,akadozik'' a berendezett szobák vonszolása. **Nem** szellemütközés. Az akadás csak egyirányban van (vagy balra, vagy jobbra, mindenesetre ilyenkor a másik irány jó, sima). Az akadást a felhasználó is megjavíthatja: kicsit megmozgat egy bútort a szobában. **Lehet**, hogy az előző állítások tévedések. Van kétirányú akadás is, és kutyaugatás is a semmin. Javaslat: az App.js-ben kikommentezve ott áll egy kódrész, ami biztosan előhozza a hibát. Az alapján el lehet indulni.
       - Megvan a jelenség oka. Akkor jelentkezik, ha a szobához csatolt bútorok belül vannak és egyben nagyon közel vannak a falhoz. Az akadás pont az ezzel ellentétes irányba való vonszoláskor jelentkezik. Valószínűleg a bútorok ideiglenes lemaradozása, a kísérés nem megfeleő szinkronizálása okozza (hisz tudjuk, a folyamatos vonszolás valójában kicsi de nemnulla ugrásokból áll).
 - Jelenleg azért nem romlik el vászonugrás közben a nyílászárók lehelyezkedése, mert a jumpTo automatikusan konvertál. Ez nem jó megoldás, mert így egy megtervezett falnyilásozatú szoba gép kirakása nem vászonfüggetlen. Például a jelenlegi loader, amely a menüvászon egyes alakzatait teszi ki, láthatóan elcsúsznak a nyilászárók azokhoz képes. Kénytelen vagyok arra a vásznra kitenni, ahova tervezve van, és ha nem oda szeretném, akkor ráhívok egy jumpTo-t. Mindez azonban code smell. A nyilászárókaz magas szinten, business object szintjén kell modellezni.
 - xlink:href is dperecated: https://developer.mozilla.org/pt-BR/docs/Web/SVG/Attribute/xlink:href
 - mv public/app/domain public/app/business
 - A `this.state.focus` ne `Widget | null` típusú legyen legyen, hanem `Maybe<Widget>`.
 - A `public/app/widget-pillar/CanvasMultiverse.js` modul szerepének tisztázása. Jelenleg teljes üres osztály.
 - Legyen csengő hang ütközéskor! (pl. `glass.ogg`)
 - Vajon, amikor végigmegyünk az <svg> elem gyerekein, a <defs> miért nem számít annak? persze ez pont jól jön, mert kivételt dobna, ha `<image>`  `<polygon>` `<text>` -től különböző gyerekre futna rá (sőt tulajdonképp ezt szűrni is kellene!).
 - A loader ID-jét ne csak a pipa gombbal, hanem enter megynomsával is aktiválni lehessen
 - A nem létező rekor ID üzenetet ne a státussorba, hanem a validációs helyre írja.

 - Skálázásokra és tükrözésekre még nincsbekötve az inntelligens címelhelyezőkéje a szobáknak. Forgatásoknál nagyon okosan ugrál a cím oda, ahol épp a legjobban néz ki, de tükrözésénél, skálázásoknál nem.
 - A loader (az ID-re betöltő loader) nem törli ki az előző felállás összes bútorát. Otthagyja a napplai szobanövényét és a fürdőszaba kádját.
 - A `Widget.prototype.allowable` és a `MathematicalObject.prototype.isCollidable` újraátgondolása. Egy olyan általánosítás lenne jó, ahol az ütközési akciót lehetne OO módon modulrisan megadn:
    - címnél semmi akició
    - bútornál, szobánál ,,normál'' ütközés: megáll (feszül), csúszik vagy teleportál,
    - faltörőkos és téglafal esetében eltűnik (a vonszolható alakja), és hatását a fal folytonosságára kifejti
    - ajtó és ablak esetében is, de ott ajtót, ablakot illeszt be, a vonszolható alak itt is eltűnik.
    - Ha a munkavásznom van már odavoszolt szoba, akkor a faltörő kost a nyilászűáró menűvászonról nem tudom a nélkül átugrasztani a munkavszinra, hogy ne ugatna föl a kutya (hiába nincs ütközés). Ennek ellenére a dolognak mégis köze van elvi ütközéshez: az y koordinátának elvileg ütközöképes pozícióban kell lennie (és csak az x koordinátán múlhat, hogy ténylegesen nincs ütközés).

 - befelé nyíló ajtó esetén is úgy kell rákattintani az ajtóra, mintha az kifelé nyílnék
 - A másik vászontra átrántott szoba nem viszi magával nyílászáróit, azok ott maradnak, amúgy az együttmozgás akkor is működik, visszarátáskor tök korrektül újraegyütt vannak.

 - natív formátumba jól menti és visszatörli a nyílászárókat, de a visszatöltött nyílászáók ugyan majdnem egyenrangúak a felhasználó által kézileg felcsatoltakkal, de a kézileg felcsatoltak lecsatoláskor betömik maguk után a falréseket, a visszatltéses nyílászárók erre nem képesek. Megoldás: a natív töltéskor az openingeket attachToWall-lak kell felcsatolni.
 - A fókusz (és esetleg a helyfókusz is) legyen natív formátumba menthető és onnan visszatölthető.
 - Vajon akkor is jól nmentődnek-töltődnek vissza natívan a nyílászárók, ha két egymás melletti szoba közös falára húzzuk őket?
 - Nem menti a nyílászárók ún. pótlólagos transzformációit. Pl. az ajtó kissé elcsúszva töltődik vissza. Az ablak is csak függőleges fal esetében töltődik vissza jól, ferdve vgy vízszintes falnál is függőlegesen állva töltődik vissza.
 - Bár nyilászárót szabad falrésre is ráhúzni (nem dob "Invalid arrangement" hibát), de ezt elmentve, majd visszatöltve igenis "Invalid arrangement" hibát dob!
 - (FIXED JUST NOW): Az ajtót le lehet venni a falról úgy, hogy nem alakul vissza vonszolási alakjába, feltétel, hogy 1) ne legyen fókuszban, & 2) abba az irányba húzzuk, hogy már egy pixel is megszönteti az érintkezési viszonyt, vagy vonhatkuk rossz irányba is, de akkor erősen meg kell rántani. (Amúgy a sajér falrését ekkor is szépen betömi maga mögött). Ablaknál is előhozható, de ott mindenképp erősen el kell rántani.
 - A menüvászonról a munkavászonra áthúzott nyílászáró automatikusan (vagy az attacholódó nyílászáró) automatikus veszítse el szaggatott vonalas keretét.


# Fontend
 - Freeze lenne jó, mint ahogy az excelben táblasorokat lehet rögzíteni. itt persze a statussort lenne jó így. (Úgy tűnik, az overflow scroll erre elfogadható eszköz lesz)
 - Az Attila által mutatott balfölső ,,globális beállítások'' féle panelbe bekerülhetne az Attila által kért zoom, + - ikonnal (esetleg a böngészök mintájára 0 defaulthelyreállító ikonnal). Könnyű a működési tartalmat mögévarázsolni most immár: a munkavászon coordSysTransformer-ét állítaná.
 - Átgondolni az <a href target...>-et a helpnél és részeinél, és a Central Home logónál is. A linkek legyenek jók ,műkdjenek documentrootból. A CSS-nek is be kell töltődnie.

 - A ,,fúkusz'' fogalmat jelképezű circledot ikon nem jó, mert pont keveredik a rádiógombbal, amely mellette áll. Legyen inkább valami csillag, asterisk, * vagy ★(&#9733;),   ⭐(&#11088;, &#x2B50;).
 - Jó, hogy a doc nincs a documentrootban, hisz pl. a TODO-developer nem publikus, de a help igen, és a helphez tartozó CSS is. Azok kerüljenek át az assets-ba pl. egy help alkönyvtárba téve! A nempublikus doc-nak meg valami kifejezőbb nevet kéne adni (a TODO-developer pl jogosan nempublikus, és a developer manual statusa is kérdéses, de az user manualok sőt akár a TODO user szűk éértelemben is publikus. Amúgy minden publikus (nyíltkódú program lesz), kivéve a cégspecikfikusan testreszabott dolgokat.
 - A súgót és formázását tehát javítsuk meg. A súgó kerüljön fejlécsorba pl. ? ikonnnal. Zoom magnifier ikonnal, +, - és 0 felsőindexszel. Csúszka is kerülhetne a zoom magnifiere-i mellé, itt viszont fifyelni érdemes rá, hogy a +, -, 0 gomb automatikusan mozgassa magával a csúszkát is!
 - Az index.html-ek ne különbözzenek áttekinthetetlenül sok dologban (pl. lehetőleg ne legyen az, hogy mindenütt egy tabbal több van, mert másképp van behúzva).
 - ne legyen az, hogy a logó és a CSS két helyen is lehet, és a céges változat itt, a szabad pedig ott van.
 - app -> public, és azon belül index.html, app, spec, help/html, és assets-proper (a CSS és a logó épp ez utóbbiba kerül, app és spec pedig a javascripté).
 - a frre vs company szétválasztást úgy oldjuk meg, ahogy a jelszókonfigurációt és más érszékeny adatoknál szokás: tpl-fájlok, gitignore. Legyen egy kis konzolalkalmazás is.
 - Az alakzattulajdonsgszereksztő érzékeli már most is, ha szoba helyett annak a címére katintok (még ha a cím távolra is van húzva a szobától). Fel is hozza korrektül a hozzátartozó szobát. De a címet közvetlenül nem lehet szerkeszteni helyben, csak az alakzatszerkesztőben.
 - A  NormalModeController-hez kötődő beszúróka (helyfókusz, +-parancs vagy gomb, pecsétválasztás) nem kezeli szépen a szobacímeket: a címek a vászon közepére kerülnek, a pecsétalakzattól és a helyfókusztól függetlenül.
 - - A  NormalModeController-hez kötődő törlőke (alakzatfókusz, --parancs vagy gomb) nem kezeli szépen a szobacímeket: a címeket nem törli a szobákkal.
 - A ,,Ment'' gombra kattinva, nyisson új böngézőfület, és oda tegye ki az alaprajz magasszintű, de egyértelmű leírásának JSON-szövegét. A szöveget textarea elembe tegye ki, egyrészt azéért, hogy szépen tabulálva és sorbatördelve legyen, másrészt azért, mert ugyanez a textarea a visszatötésre (load) is alkalmas lehet. Tehát tulajdonképp ebben a munkaszakszban a Save és a Load gomb ugyanazt csinálja: tabot nyit, és abban felhoz egy textareát.
 - Az Info (help) ikon méretét kicsinyitsük le akkorára, ahogy a korábbi verzióban volt (van róla screenshot).
 - Maradhat a menüvásznak gördítősávos kialakítása, de akkor a `.scrollLeft` tulajdonság állításával kell a nyílászáró/bútor/típus választásnak megfelelő pozícióba göríttetni a kocsit.

 - Az alakzatszerkesztésnél az új csúcsok hozzáadása néha hibaüzementet ad. Eset: konkáv poligonok, pl. L-alakú szoba konkáv sarka közelébe kattintuk (kívülről). Nem mindig jön elsőre, ,,lövöldözni'' kell egy kicsit. a hibaüzenet: `Uncaught Invalid tour rotation value NaN for polygon vertices tour [[-6.799237430008577,-29.170137985134996],[10.241889293304059,-29.170137985134996],[10.241889293304059,-23.489762410697452],[1.2,-21.4],[-1.2,-22.4],[-1,-21.4],[-0.6,-20.2],[-1.8,-18.6],[-2.2,-20.6],[-2.4,-20.6],[-2.6,-20.4],[-3,-21],[-3,-21],[-2.6,-21.6],[-3,-21.6],[-3.959049642789804,-23.489762410697452],[-3.959049642789804,-14.969199049041134],[-6.799237430008577,-14.969199049041134]]`
