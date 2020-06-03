#!/bin/sed -nf

/\<CMO\>\s*(/ {
	s/CMO('[^']*', \('[^']*'\)[^)]*)/\1/g;
	s/\]//g;
	s/\[//g;
	s/.*ContextMenu\s*(\(.*\)).*/\1/;
	s/'Szoba'\s*,\s*//gp;
}
