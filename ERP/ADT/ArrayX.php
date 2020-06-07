<?php

namespace ADT;

class ArrayX
{
	/** `array_map($f, $a, array_keys($a))` does not preserve string keys, forces then to numeric */
	function indexedMap(object $f2, array $arr): array
	{
		$res = [];
		foreach ($arr as $key => $val) {
			$res[$key] = $f2($val, $key);
		}
		return $res;
	}
}
