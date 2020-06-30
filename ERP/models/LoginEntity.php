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

	public static function decide(string $name, string $password)
	{
		$nameFlag     = preg_match('/^[a-zA-Z0-9]{1,20}$/', $name);
		$passwordFlag = preg_match('/^[a-zA-Z0-9]{1,20}$/', $password);
		switch (true) {
			case  $nameFlag &&  $passwordFlag: return Either::right(new self             ( $name,               $password             ));
			case !$nameFlag &&  $passwordFlag: return Either::left (new LoginEntityDenial([$name, ['regexp']], [$password, []        ]));
			case  $nameFlag && !$passwordFlag: return Either::left (new LoginEntityDenial([$name, []        ], [$password, ['regexp']]));
			case !$nameFlag && !$passwordFlag: return Either::left (new LoginEntityDenial([$name, ['regexp']], [$password, ['regexp']]));
			default                          : die('Inpossible case');
		}
	}
}
