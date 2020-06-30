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

	public static function yesVal(bool $flag, $arg): self {return  $flag ? self::just($arg) : self::nothing();}
	public static function noVal (bool $flag, $arg): self {return self::yesVal(!$flag, $arg);}

	public static function yesPred($predicate, $arg): self {return self::yesVal($predicate($arg), $arg);}
	public static function noPred ($predicate, $arg): self {return self::noVal ($predicate($arg), $arg);}

	public static function ifAny(&$arg): self {return self::yesVal(isset($arg), $arg);} // @TODO note: `{return self::yes('isset', $arg);}` is wrong, `isset` is not lambdaized


	public function fromJustWithError(string $msg)
	{
		return $this->maybe_exec(
			function () use ($msg) {die($msg);},
			function ($a) {return $a;}
		);
	}

	public function toEither($a): Either/*a, b*/
	{
		return $this->maybe_val(
			Either::left($a),
			function ($b) {return Either::right($b);}
		);
	}
}
