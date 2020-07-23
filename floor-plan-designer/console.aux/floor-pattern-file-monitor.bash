#!/bin/bash

ls floor-plan-designer/public/img-vendor | while read f; do if grep "${f%.png}" floor-patterns.dat; then echo "+ $f"; else echo "-$f"; fi; done;
