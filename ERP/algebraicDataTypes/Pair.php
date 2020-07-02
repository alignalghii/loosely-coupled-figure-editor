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

	public function uncurry(object $f) {return $f($this->a, $this->b);}

	public function mapFirst(object $f): Pair/*a, b*/
	{
		return $this->uncurry(
			function ($a, $b) use ($f) {return new Pair($f($a), $b);}
		);
	}

	public function mapSecond(object $f): Pair/*a, b*/
	{
		return $this->uncurry(
			function ($a, $b) use ($f) {return new Pair($a, $f($b));}
		);
	}
}
