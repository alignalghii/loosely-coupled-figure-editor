#!/bin/bash

grep '\<eitherTarget\>' -rl public/app\
|
while read module;
	do
		echo;
		echo "================ $module =====================";
		awk -f console.aux/eitherTarget.awk "$module";
		echo;
	done;
