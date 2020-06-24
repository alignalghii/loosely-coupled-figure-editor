<?php

namespace models;

use algebraicDataTypes\Maybe;

class SessionEntity extends Entity
{
	public $id, $userId, $token;

	public function __construct(?int $id, int $userId, int $token)
	{
		$this->id     = $id;
		$this->userId = $userId;
		$this->token  = $token;
	}

	public static function maybeImport(array $post): Maybe/*SessionEntity*/
	{
		$id     = isset($post['id']) ? intval($post['id']) : null;
		$userId = (int)$post['user_id'];
		$token  = (int) $post['token'];
		return Maybe::just(new SessionEntity($id, $userId, $token));
	}
}
