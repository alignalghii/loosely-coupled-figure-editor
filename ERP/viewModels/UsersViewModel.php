<?php

namespace viewModels;

use algebraicDataTypes\Either;

class UsersViewModel extends ViewModel
{
	public function fields(): array {return ['id' => Either::right(\PDO::PARAM_INT), 'name' => Either::right(\PDO::PARAM_STR), 'password' => Either::right(\PDO::PARAM_STR)];}
}
