<?php

namespace models;

use algebraicDataTypes\{Maybe, Either};

// record-level validation


class LoginEntity
{
	public $name, $password;

	private function __construct(string $name, string $password)
	{
		$this->name     = $name;
		$this->password = $password;
	}

	public static function decide(string $name, string $password): Either/*self, LoginEntityDenial*/
	{
		$nameBills     = self::bill($name);
		$passwordBills = self::bill($password);
		if (!$nameBills && !$passwordBills) return Either::right(new self             ( $name    ,  $password    ));
		else                                return Either::left (new LoginEntityDenial($nameBills, $passwordBills));
	}

	private static function bill(string $a): array/*string*/
	{
		$bills = [];
		if ( self::empty($a)                    ) $bills[] = 'empty';
		if (!self::empty($a) && self::nonVar($a)) $bills[] = 'non-var';
		if ( self::tooLong($a)                  ) $bills[] = 'too-long';
		return $bills;
	}
	private static function empty (string $a)  : bool {return strlen($a) == 0;}
	private static function nonVar(string $a)  : bool {return !preg_match('/^[a-zA-Z][a-zA-Z0-9]*$/', $a);}
	private static function tooLong(string $a) : bool {return strlen($a) > 20;}

	//private function lengthBetween(int $lowLimit, int $highLimit, string $text): bool {return $this->between($lowLimit, $highLimit, \strlen($text));}
	//private function between      (int $lowLimit, int $highLimit, int $n      ): bool {return $lowLimit <= $n && $n <= $highLimit;}
}
