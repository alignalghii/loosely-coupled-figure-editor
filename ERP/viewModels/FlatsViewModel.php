<?php

namespace viewModels;

use algebraicDataTypes\Either;

class FlatsViewModel extends ViewModel
{
	public function fields(): array {return ['id' => Either::right(\PDO::PARAM_INT), 'address' => Either::right(\PDO::PARAM_STR), 'rooms' => Either::right(\PDO::PARAM_INT)];}
}
