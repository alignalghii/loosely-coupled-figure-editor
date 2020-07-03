<?php

namespace controllers;

use PDO;
use models\SessionRelation;

class LogoutController
{
	public function __construct(PDO $dbh, int $token)
	{
		$this->dbh   = $dbh;
		$this->token = $token;
	}

	public function logout()
	{
		$sessionRelation = new SessionRelation($this->dbh);
		$flag = $sessionRelation->deleteByToken($this->token); // @TODO handle possible error by flag
		if ($flag) {
			header("Location: /login");
		} else {
			echo "The interceptor accepted the token as valid, but its deletion failed. Try to investigate the causes Yourself on the <a href=\"/?token=$token\">admin page</a>, e.g. delete Your token manually";
		}
	}
}
