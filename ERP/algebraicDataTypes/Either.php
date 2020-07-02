<?php

namespace algebraicDataTypes;

class Either
{
	protected $representation;

	private function __construct(array $representation) {$this->representation = $representation;}

	public static function left($a) : Either {return new Either(['left' , $a]);}
	public static function right($b): Either {return new Either(['right', $b]);}

	public function either($leftProcessor, $rightProcessor)
	{
		list($label, $arg) = $this->representation;
		switch ($label) {
			case 'left' : return $leftProcessor ($arg);
			case 'right': return $rightProcessor($arg);
			default     : throw new Exception('`Either` internal label bug');
		}
	}

	public function map($rightProcessor): Either/*a, b*/
	{
		return $this->either(
			[self::class, 'fail'],
			function ($rightContent) {return self::ret($rightProcessor($rightContent));}
		);
	}

	public function leftMap(object $leftProcessor): Either/*a, b*/
	{
		return $this->either(
			function ($a) use ($leftProcessor): Either/*a, b*/ {return self::left ($leftProcessor($a));},
			function ($b)                     : Either/*a, b*/ {return self::right(               $b );}
		);
	}


	public function bind($inject): Either/*$a, $b*/
	{
		return $this->either(
			[self::class, 'fail'],
			$inject
		);
	}

	public function ret($rightContent): Either {return self::right($rightContent);}
	public function fail($leftContent): Either {return self::left ($leftContent );}

	public function andPredicate($predicate, $leftContent): Either
	{
		return $this->bind(
			function ($rightContent) use ($predicate, $leftContent) {
				return $predicate($rightContent)
					? self::ret ($rightContent)
					: self::fail($leftContent );
			}
		);
	}

	public static function yesVal(bool $flag, $a): Either/*a, a*/ {return $flag ? self::right($a) : self::left($a);}


	//public function andMaybe(Maybe $leftContent)
	//{
	//	return $leftContent->maybe...
	//}
}
