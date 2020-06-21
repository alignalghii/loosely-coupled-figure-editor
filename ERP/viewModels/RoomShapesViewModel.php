<?php

namespace viewModels;

use algebraicDataTypes\Either;

class RoomShapesViewModel extends ViewModel
{
	public function fields(): array {return ['id' => Either::right(\PDO::PARAM_INT), 'symbol' => Either::right(\PDO::PARAM_STR), 'name' => Either::right(\PDO::PARAM_STR), 'arity' => Either::right(\PDO::PARAM_INT), 'interpret_argument_1' => Either::right(\PDO::PARAM_STR), 'interpret_argument_2' => Either::right(\PDO::PARAM_STR), 'interpret_argument_3' => Either::right(\PDO::PARAM_STR), 'interpret_argument_4' => Either::right(\PDO::PARAM_STR)];}
}
