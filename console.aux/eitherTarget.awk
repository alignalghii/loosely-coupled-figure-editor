#!/usr/bin/awk -f

/\<either\>\s*\(/ {state = 1;}

state {remember[++n] = NR " " $0;}
state && /=>/ {++lambda}

state && /\<eitherTarget\>/ {rememberFlag = 1;}

state && /(^|[^\(])\)\s*;/ && lambda >= 2 {
	if (rememberFlag) {
		for (i = 1; i <= n; ++i) print remember[i];
		state = 0;  delete remember; rememberFlag = 0; lambda = 0;
	}
}
