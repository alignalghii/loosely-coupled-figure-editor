<?php

namespace viewModels;

use algebraicDataTypes\Either;

class SessionsViewModel extends ViewModel
{
	public function fields(): array {return ['id' => Either::right(\PDO::PARAM_INT), 'user_id' => Either::right(\PDO::PARAM_INT), 'token' => Either::right(\PDO::PARAM_INT)];}
}
