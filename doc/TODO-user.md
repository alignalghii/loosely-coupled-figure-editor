 - Legyenek egymással is jól kombinálható menü/gyorsbillentyű-opciók (területtartás, relatív/abszolút viszonyítás), így kevés opcióból/gyorsbillentyűből is sokféle opciót lehessen kikeverni.
 - A gyorsbillentyű-rendszer elkészítése (ez a leggyorsabb megoldás, ami kétely nélkül azonnal megvalósítható, mellette persze azért utánagondolni a többi lehetséges megoldásnak is: közeli ikonok, különleges pontok és szegélyek). Szükség esetén a szerkesztések során használt segédpontok megjelölése (pl. alakzat forgásának középpontja, referenciairánya).
 - A jobb oldali ,,mintavászon'' alakzatai legyenek valóban típus- és mintalakzatok: legyenek ikonjellegűbbek, legyen kisebb a léptékük, és képezzenek önmagukból automatikusan másolatot, amikor a bal oldali ,,munkavászonra'' húzzuk át őket.
 - A bútorok mozogjanak együtt a szobákkal akkor, amikor magát a szobát mozgatjuk,viszont minden egyes bútor mozoghasson önállóan, ha az egérrel kifejezetten őt magát fogjuk meg.
 - Legyen padlóháttér (mintázat), legyenek bekötve ebbe a kapott képminták.
 - Nyílászárók: ajtó, ablak, falrések
 - A gyakori alakzatok (L-alakú szoba) és a sarkalatos szögek (derékszög, 45°) szerkesztésének támogatása.
 - Az alakzattulajdonságok szöveges szerkesztőűrlapja legyen pontosan és intuitíven összekapcsolva az összes egyéb, egeres geometriai transzformációval (mozgatással fordgatással, átméretezéssel, tükrözéssel).
 - Az adatbázist szimulálja valami előkészített csonk, így lehessen tesztelni a mentés, beolvasás képességét legalább elvi szinten.


 - A zoom funkciót használva a nyílászárók elválnak a faltól és vagy a szobákon kívülre vagy a szobákon belülre kerülnek.
 - A falra tett ajtók nem illeszkednek pontosan a falakra
 - A nyílászárókra duplán kattintva a falakon megjelennek üres szakaszok (hina reprodukálása eddig még nem sikerült).
 - Ma 2020 feb 7-e van. Másfél hónap alatti még elfogadható lenne befejezni, de 1 hónap lenne igazán a jó.
 - Jövő hétre: dummy DB admin felület javítása. Éltolás.
 - Legvégén: keretszin keretvastagság, transzformációk yorsmenüje: ürlapba vagy jobbegérbe), esetleg gyorsbilentyűk. Szerethetőség

 -  az éltologatások során a falrések elheyezkedése  torzul (ezen komolyan el kell gondolkodni, reprezentációs probléma), sőt akár új falrések is nyílhatnak. Ez utóbbi hiba könnyen javíthtó, és már meg is lett oldva: a FigureWidget vásznak közti átugrása során arra kell figyelni, hogy az SVG-attributomok firssítésénél ha a szoba mint üzleti objektum nemrendelkezik slit-reprezentációval (vagyis az üres), akkor a stroke-dasharray attribútumot eleve ne is adjuk meg, ill. töröljük az alaocsonyszintű SVG DOM-objektumból!
   - Fontos, hogy ez a megoldás nem jó, vissza kell vonni, mással helyettesíteni, vagy ki kell egészíteni, mert miatta a szűz (explicit falrésezés nélküli) szobákra nem lehet nyílászárót felvinni.

 - A szobafal-szerkesztésnél a ↠, ↦ műveletpár teljesebb, a ha ↠, ↦, ≠ (&ne;) művelethármasra bővítjük. A ≠ művelet mozgatja a ,,köztes'' élt az általak összekötött párhuzamos élpár mint sínpár mentén. A ↦ viszont nem előfeltételez párhuzamos élpárt, minden élre működik. Az élt saját magára nézve merőlegesen mozdítja el. Jól használható pl. trapéz magasságának megemelésére vagy csökketésére. Fontos, hogy e művelet még akkor is különbözik a ≠-től, ha létezik ,,sínpár'': gondoljuk át pl trapéz ferde szára esetében.

 - A ↠, ↦, ≠ továbbővítendő egy párhuzamosságdetektáló-önjavító művelettel: a ≠ művelet nem működik, ha nincs párhuzamos ,,sínpár'', így pl. egy kissé elrontott párhuzamosságú trapéz szárai tologathatatlanná válnak. (A trapéz párhuzamsságát a csúszszerekesztő műveletek, és az észrkesztő műveletekből pedig  a ↦ képes elrontani, és szabad szemmel a dolog lényegében helyreállíthatatlan). A = művelet vagy detektálná a közel párhuzamos élpárokat, vagy pedig adott élhezmegkeresi a vele nem szomszédos (és nem egybeeső) élek közül a hozzá legkisebb hajlászögűt, és azt párhuzamossá forgatja (pl úgy, hogy midpontja körül forgatja, és a vele ragadott csúcspontok is eszerint fordulnak).

 - Visszavonási funkció (úgy tudom, hogy ez egy afféle ,,metafunkció'', a loggoláshoz hasonlóan). Vagyis azért ,,meta'', mert' nem lehet egyszererűen csak úgy egyetlen funkcióként hozzáadni, hanem bizonyos értelemben áthatja az összes többi funkciót, és fölöttük áll. Utána nézni, átgondolni, hozzá kell-e kötni minden funkcióhoz, meg egyáltalán milyen jellegzetes megközelítések vannak hozzá. ,,[Undo](https://en.wikipedia.org/wiki/Undo)'', ,,[Rückgängig-Machen](https://de.wikipedia.org/wiki/Undo)'').

 - Javítandó az a két programhiba, amely a második bemutatóvideón látszik (`atfogo-bemutato--valamivel-teljesebb.mp4`):
   - A relatív viszonyítás nem mindig működik tükrözésre, aránytorzító átskálázásra. A bemutató videón először jól működnek, aztán bemutatom az abszolút viszonyítást, aztán vsszakapcsolok relatív viszonyításba, és ott valamiért ekkor mr nem teljesen jók.
   - A nyílászárók, falrések fölrakása nem működik jól az adatbázisból betöltött szobák esetében (a -1, -2, -3 előrebeégetett szobák esetében viszont igen).

 - Bútorokra nincs definiálva több geom. transzformáció, hibát dob. Ez gondo okoz butorozott szoba transzformálásakor: ha véletlen bútorhoz túl közel kerül az egér, arra próbálja végrehajtani, akkor meg hibát dob.
 - Az L alakú szobára valamiért a tükrözés nem működik (a többi geom-tr igen). Ld: `bemutato-tukrozesi-hiba-L-alakra.mp4` videó.

 - Mentés, visszatöltés, JPG



 - Padló mintázata lecserélhető legyen. Például az űrlapon lehessen ilyen padlócsere.
 - Az űrlapnak nem kell bonyolultnak lennie. Méret, pozíció, egyszerű dolgok.
 - Ugyanakkor az űrlap (esetleg valami alternatív megoldás) venné át a baloldali menüoszlop szerepét, ugyanis ennek a mukavászon elől elfoglat helyigényét sokalljuk. A baloldali menüoszlop ,,elshiftelehető'', láthatása szabáyozható lenne (view).
 - jpg-export
 - Ha már olyan szinten van az alkalamazás fejlesztése, hogy tényleg alaprajzok készíthetőek, akkor minta-alaprajzokon teszünk próbát,
     - olyan is, amely a régi alaprajzszerkesztő programon készült,
     - olyan is, amelyeket tulajdonosoktól kaptunk.
   Ergonómiai kérdések, körülményesség vizsgálatára lesz ez jó, eleve akkor jönnek ki a fontos dolgok.
   Sok ilyen minta van, évek alatt összegyűjtögetve a kollégák több százas adatbázisba. De önnálóan is használhatóak e célra a Central Home-os honlap alaprajzai.

 - A csoportok (pontosabban a hosztobjektumok, vagyis pl egy szobához rendelt kamra) viszonylatát nem tudja a natív mentés/visszatöltés megőrizni.
 - Valószínűleg a fókusz metése megtévesztő lesz (piros kerettel menti, közben pedig nem is lesz visszatöltéskor fókuszban). A fókusz magaszntű mentése nincs megoldva.
 - Nem mentődik a z-mélység (fedési sorrend) sem

 - A kontextus / objektuműrlap: Ugye eddig atróól volt szó, hogy ennek kettős szerpe legyen:
   - Az, ami a régi Java-s programban: oldalhosszak szöveges módosítása ill, padlóminta lecserélése
   - Az amit jelenleg a baloldali menü lát el, amit vagy teljesen leváltana, vagy esetleg a baloldali menü opcionálisan elrejthető-előhívható
 Ezek után jogos a kérdés: e két egész különböző funkciókört nem lenne-e jobb két külön dologként megvalósítani?
 A válasz: ez rám van bizva, egy a léneg: kényelmesen elő lehessen hívni (pl jobklikk, vagy pl két balklikk)
 Szét lehet persze választani, a  ha az adott objektumra vonatkozó dolgok el lehetnek választva a globális dolgoktól. De akkor is a kénelmes kezelhetőség a lényeg
 Mindenesetre a kontext, adott objektumra vonatkozó űrlap működjék mndenfajta objektumra (persze a maga módján).

 - Szoba tükrözése: leglább mozgatásnál és tükrözésnél kövessék a butorok és nyilászárók a szobát! Ebből a mozgtás OK, de türközésnél is!
 - Ajtó csak a bal-főmenüből tükrözhető, a kontextusmenüből nem! Baj! [MEGOLDVA]
 - Ajtó tükrözhető balkezesjobbkzesen is, és kibemódon is, de aztán ha lerántom a falról, és átviszem másik falra, az előző falnál beállított tükrözéses tulajdonságai elvesznek.

 - Ikonok, képek: túl unicode-függő jelenleg, speckó fontok nélküli böngészőkben baj lehet.
