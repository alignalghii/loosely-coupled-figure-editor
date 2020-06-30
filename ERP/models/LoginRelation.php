<?php

namespace models;

use algebraicDataTypes\Maybe;

class LoginRelation
{
	public function __construct(\PDO $dbh) {$this->dbh = $dbh;}

	public function searchExtensionally(LoginEntity $entity): Maybe/*int*/ // @TODO consoder Maybe<LoginEntity_full>
	{
		$st = $this->dbh->prepare('SELECT `id` FROM `user` WHERE `name` = :name AND `password` = :password');
		$st->bindValue('name'    , $entity->name    , \PDO::PARAM_STR);
		$st->bindValue('password', $entity->password, \PDO::PARAM_STR);
		$dbFlag = $st->execute();
		if ($dbFlag) {
			$recordOrFalse = $st->fetch(\PDO::FETCH_ASSOC);
			return Maybe::yesVal((bool)$recordOrFalse, $recordOrFalse['id']); // @TODO consider an `extend` operation
		} else {
			return Maybe::nothing();
		}
	}
}
