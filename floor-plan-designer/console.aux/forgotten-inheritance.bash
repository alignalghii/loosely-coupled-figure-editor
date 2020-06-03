#!/bin/bash

ls public/app/controllers/*Controller.js\
|
while read controllerModule;
	do awk -f console.aux/forgotten-inheritance.awk $controllerModule;
done;
