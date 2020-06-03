## Architecture

A rétegzett architektúrában a ,,business'' réteg az, amely képviseli a ,,életvilágot'', tehát a feladat élőszóban megfogalmazható, felhasználó szemmel érthető fogalmait . Nem sok van megírva benne, de ez már maradéktalanul integrálva van az alkalmazás összes alacsonyabb rétegével, és az integráció automatikusan fennmarad (tehát nem kell külön kóddarabokkal újra és újra hozzákötni, ahogy bővül a business mappa).

Ide - tehát a business almappába - kerül minden, ami már nem geometria, hanem olyan, amit természetes nyelven mondunk el:
A lakás szobákból áll.
A szobáknak alakjuk van, emellett a szoba falánaksaját külön szerkezete van: nyílászárók vagy puszta falnyílások tagolják a falat.
A falnyílások tetszés szerint elmozgathatóak a falak mentén, törölhetőek, hozzáadhatóak (természetesen opcionális nyílásgátlókkal együtt).
A szobának bútorzata van. A bútorok is tárgyak, ütköznek egymással (mint ahogy a szobák is ütköznek egymással).
A bútorok szabadon elrendezhetőek a szobán belül, és a szoba ismeri őket: amikor magát a szobát mozgatjuk, az automatikusan viszi magával bútorait.
A tárgyak viselkedése kissé más-és-más (ütközés szempontjából), attól függően hogy milyen típusúak (szobák, nyílászárók/rések, bútorok): objektumtípusonként elkülöníthető ütközési szabálycsoportok vannak.
Ez készül épp most. Minden, ami ez alatt van (maguk az alakzatok, geometria, amelyek reagálni is tudnak egér- és egyéb eseményekre) az már megvan, és szervesen összekapcsolódik  a mindenkori felső réteggel (mégis úgy, hogy elkülönítve is fejleszthető).
