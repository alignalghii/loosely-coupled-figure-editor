#!/bin/bash

sed -e "/namespace/ {
a
a use $1\\\\$2;
}" $(grep -L "use\s\+\(\w\+\\\)*$2" $(grep -l "[^\\a-zA-Z0-9_]$2\>" -nr . --include='*.php' --exclude-dir="$1") );
