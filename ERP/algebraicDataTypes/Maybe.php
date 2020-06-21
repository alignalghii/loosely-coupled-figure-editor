<?php

namespace algebraicDataTypes;

class Maybe
{
	protected $representation;

	private function __construct(array $representation) {$this->representation = $representation;}

	public static function just($a) :self {return new Maybe(['just', $a]);}
	public static function nothing():self {return new Maybe(['nothing' ]);}

	function maybe_val($nothingCase, $justCase)
	{
		switch ($this->representation[0]) {
			case 'just'   : return $justCase($this->representation[1]);
			case 'nothing': return $nothingCase;
			default       : throw new Exception('`Maybe` internal label bug');
		}
	}

	function maybe_exec($nothingCase, $justCase)
	{
		switch ($this->representation[0]) {
			case 'just'   : return $justCase($this->representation[1]);
			case 'nothing': return $nothingCase();
			default       : throw new Exception('`Maybe` internal label bug');
		}
	}

	function map(object $f): self
	{
		return $this->maybe_val(
			self::nothing(),
			function ($value) use ($f) {return self::just($f($value));}
		);
	}

	public static function yes($predicate, $arg): self {return  $predicate($arg) ? self::just($arg) : self::nothing();}
	public static function no ($predicate, $arg): self {return !$predicate($arg) ? self::just($arg) : self::nothing();}
	public static function ifAny(&$arg): self {return isset($arg) ? self::just($arg) : self::nothing();} // @TODO note: `{return self::yes('isset', $arg);}` is wrong, `isset` is not lambdaized
}
