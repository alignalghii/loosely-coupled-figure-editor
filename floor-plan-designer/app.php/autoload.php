<?php

spl_autoload_register('namespaceBasedAutoloader');

function namespaceBasedAutoloader(string $className): void {require str_replace('\\', '/', $className) . '.php';}
