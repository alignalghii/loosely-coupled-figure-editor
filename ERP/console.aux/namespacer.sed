#!/bin/sed -f

/namespace/ {
	a
	a use ADT\\Maybe;
}
