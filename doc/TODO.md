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