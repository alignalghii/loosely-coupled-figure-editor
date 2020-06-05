<?php

namespace viewModels;

use ADT\Either;

class RoomsViewModel extends ViewModel
{
	public function fields(): array {return ['id' => Either::right(\PDO::PARAM_INT), 'flat_id' => Either::right(\PDO::PARAM_INT), 'prototype_id' => Either::right(\PDO::PARAM_INT), 'area' => Either::left(self::PARAM_FLOAT), 'autocorr_dir_fwd' => Either::right(\PDO::PARAM_BOOL), 'shape_id' => Either::right(\PDO::PARAM_INT), 'shape_argument_1' => Either::left(self::PARAM_FLOAT), 'shape_argument_2' => Either::left(self::PARAM_FLOAT), 'shape_argument_3' => Either::left(self::PARAM_FLOAT), 'shape_argument_4' => Either::left(self::PARAM_FLOAT)];}
}
