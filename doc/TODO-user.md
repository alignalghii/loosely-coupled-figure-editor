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
