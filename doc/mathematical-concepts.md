Élpár kovariáns vs kontravairáns szerkeszthetősége
==================================================

Def: Kovariáns szerkeszthető egy poligon <a, c> élpárja, ha

 - a ∥ c, vagyis a két él párhuzamos
 - létezik közös illeszkedő b él: ∃ c (c ~ a ∧ c ~ b)
 - az élpár minkét tagja a közös él ugyanazon oldalára esik.

Ha az utolsó feltételt az alábbira cseréljük:

 - az élpár mindkét tagja a közös él ellentet oldalára esik

akkor az élpár kontravariáns szerkeszthetőségéről beszélünk.

Def 2: Egy poligon addott e éle akkor szerkeszthető, ha van kovariáns szerkeszthető élpár, amelynek tagja.
Vitatható, hogy e definíció enyhíthető-e kontraviaráns élpár megengedésével, mindenesetre ilyen döntés esetén lehet beszélni ,,szépen'', ,,szűken'', és ,,valahogy'' szerkeszthető élről, rendre kovariáns, kontravariáns, vagy a kettő közül akármelyik feltételt értve a megkövetlet élpár-tagságra.

A konrét megvalósítndó alkalmazás gyakorlatában mindez azt jelenti, hogy az alakzattulajdonság-szerkesztő szöveges inputmezejei közül csak a szerkeszthető oldalakhoz tartozó mezők lesznek írhatóak, a többi csak readonly lesz, esetleg eleve nem is inputmezőben, hanem csak sima szövegként jelenik meg.

Nem-szerkeszthető oldalak szerkesztése egy másik művelettel értelmezhető: az adott oldalhoz tartozó két oldal ,,húzásával''. A húzás azt jelenti, hogy egy oldal egyenesét valamilyen irányban elmozgatjuk, és az új metszépontok pedig ,,adódnak'' az alapján, ahogy a csatlakozó oldalak egyeneseiből az új helyzetnek kegfelelően metsződnek.

Konfiguráció-opciók
===================

Területtartás, és abszolút-vs-relatív viszonyítás az, ami eddig komolyan szóbajött.
Lehetne ,,vízszintes vs függőleges'' nevű opció is, de azt intuitívabb inkább ,,beleolvasztani'' magukba az  egyes műveletekbe, megkettőzve az érintett műveletek neveit, pl. gyorsbillentyűnév vízszintes tükrözés E, függőleges tükrözés T, vízszintes nyújtás W, függőleges nyújtás S (zsugorítás esetn meg s és w, vagy akár fordítva a betűállással)

Opció 1: 🔘◯
Opció 2: ◯🔘
Opció 3: ◯🔘

Ha csak két opció van, akkor lehet mátrixnak tekinteni

Opc1 koordináta->
p ◯◯
c ◯◯
2 
|
V

Gyakorlati megvalósítás terén: a parancsoknak (scalex, scaley, flip) legyen egy absztrakt nevük. és legyen egy opció osztály, amelynek attribútumai maguk a lehetséges opciók. És legyen egy parancsnévkonrretizáló függvény: abasztraktparancsnév -> aktuálconfig -> konkrétparancsnév.
