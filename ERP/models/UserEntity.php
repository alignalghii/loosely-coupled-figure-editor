<?php

namespace models;

use algebraicDataTypes\Maybe;

class UserEntity extends Entity
{
	public $id, $name, $password;

	public function __construct(?int $id, string $name, string $password)
	{
		$this->id       = $id;
		$this->name     = $name;
		$this->password = $password;
	}

	public static function maybeImport(array $post): Maybe/*FlatEntity*/
	{
		$id       = (int)$post['id'] ?? null;
		$name     = trim($post['name']);
		$password = trim($post['password']);
		return Maybe::just(new UserEntity($id, $name, $password));
	}
}
