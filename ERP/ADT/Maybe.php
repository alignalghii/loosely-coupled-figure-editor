<?php

namespace ADT;

class Maybe
{
	protected $representation;

	private function __construct(array $representation) {$this->representation = $representation;}

	public static function just($a) :self {return new Maybe(['just', $a]);}
	public static function nothing():self {return new Maybe(['nothing' ]);}

	function maybe($nothingCase, $justCase)
	{
		switch ($this->representation[0]) {
			case 'just'   : return $justCase($this->representation[1]);
			case 'nothing': return $nothingCase;
			default       : throw new Exception('`Maybe` internal label bug');
		}
	}

	public static function yes($predicate, $arg): self {return  $predicate($arg) ? self::just($arg) : self::nothing();}
	public static function no ($predicate, $arg): self {return !$predicate($arg) ? self::just($arg) : self::nothing();}
	public static function ifAny(&$arg): self {return isset($arg) ? self::just($arg) : self::nothing();} // {return self::yes('isset', $arg);}

	/*function maybe_exec($nothingCase, $justCase)
	{
		list($label, $arg) = $this->representation;
		switch ($label) {
			case 'just'   : return $justCase($arg);
			case 'nothing': return $nothingCase();
			default       : throw new Exception('`Maybe` internal label bug');
		}
	}*/
}
