<?php

namespace models;

use algebraicDataTypes\Maybe;

class FlatEntity extends Entity
{
	public $id, $address;

	public function __construct(?int $id, string $address)
	{
		$this->id      = $id;
		$this->address = $address;
	}

	public static function maybeImport(array $post): Maybe/*FlatEntity*/
	{
		$id      = $post['id'] ?? null;
		$address = trim($post['address']);
		return Maybe::just(new FlatEntity($id, $address));
	}
}
