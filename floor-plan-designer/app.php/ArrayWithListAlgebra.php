<?php

class ArrayWithListAlgebra
{
	/** `array_map($f, $a, array_keys($a))` does not preserve string keys, forces then to numeric */
	function indexedMap(object $f2, array $arr): array
	{
		$results = [];
		foreach ($arr as $key => $val) {
			$results[$key] = $f2($val, $key); // argument order according to JavaScript's `Array.prototype.map`
		}
		return $results;
	}

	function indexedMapMaybe(object $f2, array $arr) // see Haskell's `Data.Maybe.mapMaybe :: [a -> Maybe b] -> [a] -> [b]`
	{
		$results = [];
		foreach ($arr as $key => $maybeValue) {
			$maybeValue->map(
				function ($value) use (&$results, $f2, $key): void {$results[$key] = $f2($value, $key);} // argument order according to JavaScript's `Array.prototype.map`
			);
		}
		return $results;
	}
}
