<?php

namespace models;

use ADT\Maybe;

class RoomPrototypeEntity extends Entity
{
	public $id, $name;

	public function __construct(?int $id, string $name)
	{
		$this->id   = $id;
		$this->name = $name;
	}

	public static function maybeImport(array $post): Maybe/*RoomPrototypeEntity*/
	{
		$id   = $post['id'] ?? null;
		$name = trim($post['name']);
		return Maybe::just(new RoomPrototypeEntity($id, $name));
	}
}
