<?php

namespace viewHelper;

function abbreviate(string $text, int $maxLength) {return strlen($text) <= $maxLength ? $text : mb_substr($text, 0, $maxLength, 'utf8') . '&hellip;';}
