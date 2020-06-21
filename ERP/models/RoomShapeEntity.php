<?php

namespace models;

use algebraicDataTypes\Maybe;

class RoomShapeEntity extends Entity
{
	public $id, $symbol, $name, $arity, $interpret_argument_1, $interpret_argument_2, $interpret_argument_3, $interpret_argument_4;

	public function __construct(?int $id, string $symbol, string $name, int $arity, ?string $interpret_argument_1, ?string $interpret_argument_2, ?string $interpret_argument_3, ?string $interpret_argument_4)
	{
		$this->id                   = $id;
		$this->symbol               = $symbol;
		$this->name                 = $name;
		$this->arity                = $arity;
		$this->interpret_argument_1 = $interpret_argument_1;
		$this->interpret_argument_2 = $interpret_argument_2;
		$this->interpret_argument_3 = $interpret_argument_3;
		$this->interpret_argument_4 = $interpret_argument_4;
	}

	public static function maybeImport(array $post): Maybe/*RoomShapeEntity*/
	{
		$id                   = $post['id'] ?? null;
		$symbol               = trim($post['symbol']);
		$name                 = trim($post['name']);
		$arity                = preg_replace('/\s+/', '', $post['arity']);
		$interpret_argument_1 = $post['interpret_argument_1'] ?? null;
		$interpret_argument_2 = $post['interpret_argument_2'] ?? null;
		$interpret_argument_3 = $post['interpret_argument_3'] ?? null;
		$interpret_argument_4 = $post['interpret_argument_4'] ?? null;

		$flag = preg_match('/^\d+$/', $arity);
		return $flag
			? Maybe::just(new RoomShapeEntity($id, $symbol, $name, $arity, $interpret_argument_1, $interpret_argument_2, $interpret_argument_3, $interpret_argument_4))
			: Maybe::nothing();
	}
}
