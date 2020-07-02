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

	public static function fromDBRecord(array $record): self {return new self($record['id'], $record['user_id'], $record['token']);}

	public static function maybeImport(array $post): Maybe/*SessionEntity*/
	{
		$id     = isset($post['id']) ? intval($post['id']) : null;
		$userId = (int)$post['user_id'];
		$token  = (int) $post['token'];
		return Maybe::just(new self($id, $userId, $token));
	}

	public static function fromUserId(int $userId): self
	{
		$token = rand(10000000, 90000000);
		return new self(null, $userId, $token);
	}
}
