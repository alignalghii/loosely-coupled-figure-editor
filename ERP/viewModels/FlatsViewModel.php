<?php

namespace viewModels;

use ADT\Either;

class FlatsViewModel extends ViewModel
{
	public function fields(): array {return ['id' => Either::right(\PDO::PARAM_INT), 'address' => Either::right(\PDO::PARAM_STR)];}
}
