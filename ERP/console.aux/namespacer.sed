#!/bin/sed -f

/namespace/ {
	a
	a use algebraicDataTypes\\Maybe;
}
