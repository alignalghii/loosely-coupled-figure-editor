#!/bin/bash

while read name; do grep $name <(git ls-files); done < floor-patterns.dat;
