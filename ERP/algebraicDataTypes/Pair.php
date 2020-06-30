<?php

namespace algebraicDataTypes;

class Pair
{
	private $a, $b;

	public function __construct($a, $b)
	{
		$this->a = $a;
		$this->b = $b;
	}

	public static function mkPair($a, $b): Pair/*a, b*/ {return new self($a, $b);}
	public function uncurry($f) {return $f($this->a, $this->b);}
}
