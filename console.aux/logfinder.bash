#!/bin/bash

awk -f console.aux/logfinder.awk `find . -name '*.js'`;
