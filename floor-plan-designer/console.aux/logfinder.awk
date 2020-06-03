#!/usr/bin/awk -f

/function\s+[A-Z_]\w*/ {
	match($0, /[A-Z_]\w*/, matches);
	constructorName = matches[0];
	logIndex = 0;
}

/console.*log/ {
	if (!logIndex++) printf "\n<<<--- %s in %s --->>>\n", constructorName, FILENAME;
	sub(/^\s+/, "");
	printf "\t[%3d]:\t%s\n", FNR, $0;
}
