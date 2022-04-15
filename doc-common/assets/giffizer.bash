#!/bin/bash

# Convert mp4 to GIF
# Credit to https://askubuntu.com/questions/648603/how-to-create-an-animated-gif-from-mp4-video-via-command-line/837574#837574

size=500;

ffmpeg -i collision-detection.mp4 -r 15 -vf scale=$size:-1 -ss 00:00:01 -to 00:00:08 collision-detection-$size.gif
