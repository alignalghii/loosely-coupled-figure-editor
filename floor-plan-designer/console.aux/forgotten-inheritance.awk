/function \w+Controller/ {
	match($2, /(\w*).*/, matches);
	contollerName = matches[1];
}

/Object\.create/ {
	inheritance = 1;
}

END {
	if (contollerName && !inheritance)
		print contollerName;
}
