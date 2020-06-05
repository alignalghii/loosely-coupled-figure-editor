<?php

namespace viewModels;

use ADT\Either;

class RoomPrototypesViewModel extends ViewModel
{
	public function fields(): array {return ['id' => Either::right(\PDO::PARAM_INT), 'name' => Either::right(\PDO::PARAM_STR)];}
}
