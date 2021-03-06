<?php

namespace algebraicDataTypes;

class Maybe2
{
	private function __construct(array $_internalRepresentation) {$this->_internalRepresentation = $_internalRepresentation;}

	public static function just2($x, $y): self {return new self(['just2', $x, $y]);}
	public static function nothing2()   : self {return new self(['nothing2']     );}

	public function maybe2_val($constNothing2, object $funJust2)
	{
		switch ($this->_internalRepresentation[0]) {
			case 'nothing2': return $constNothing2;
			case 'just2'   : return $funJust2($this->_internalRepresentation[1], $this->_internalRepresentation[2]);
			default        : throw new Exception(self::class . " internal representation error");
		}
	}

	public function maybe2_exec(object $funNothing2, object $funJust2)
	{
		switch ($this->_internalRepresentation[0]) {
			case 'nothing2': return $funNothing2();
			case 'just2'   : return $funJust2($this->_internalRepresentation[1], $this->_internalRepresentation[2]);
			default        : throw new Exception(self::class . " internal representation error");
		}
	}

	public function map2(object $fun1, object $fun2): self // @TODO wrong name, this is NOT what Haskell calls `lift2`
	{
		return $this->maybe_val(
			self::nothing2(),
			function ($x, $y) use ($fun1, $fun2) {return self::just2($fun1($x), $fun2($y));}
		);
	}

	public function mapFst(object $fun): self {return $this->map2($fun, self::getId());}
	public function mapSnd(object $fun): self {return $this->map2(self::getId(), $fun);}


	public function toMaybePair(): Maybe/*Pair<a, b>*/
	{
		return $this->maybe2_val(
			Maybe::nothing(),
			function ($a, $b) {return Maybe::just([$a, $b]);}
		);
	}

	public function mapToMaybe(object $f): Maybe // @TODO: reconsider the function name
	{
		return $this->maybe2_val(
			Maybe::nothing(),
			function ($a, $b) use ($f): Maybe {return Maybe::just($f($a, $b));}
		);
	}

	public static function fromMaybePair(Maybe/*Pair<a, b>*/ $maybePair): Maybe2/*a, b*/
	{
		return $maybePair->maybe_val(
			Maybe2::nothing2(),
			function (Pair/*a, b*/ $pair): Maybe2/*a, b*/ {
				return $pair->uncurry(
					function ($a, $b): Maybe2/*a, b*/ {return Maybe2::just2($a, $b);}
				);
			}
		);
	}


	private static function getId(): object {return function ($a) {return $a;};}
}
