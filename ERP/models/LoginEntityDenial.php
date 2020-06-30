<?php

namespace models;

class LoginEntityDenial
{
	public $name, $password;

	public function __construct(array $name, array $password)
	{
		$this->name = $name;
		$this->password = $password;
	}
}
