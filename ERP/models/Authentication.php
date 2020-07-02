<?php

namespace models;

use algebraicDataTypes\{Pair, Either};

class Authentication
{
	private $loginRelation, $sessionRelation;

	public function __construct(LoginRelation $loginRelation, SessionRelation $sessionRelation)
	{
		$this->loginRelation   = $loginRelation;
		$this->sessionRelation = $sessionRelation;
	}

	public function authenticate(LoginEntity $loginEntity): Either/*FormChange, SessionEntity*/ // where FormChange = syntactically Pair<string, array>, but semantically LoginForm->LoginForm
	{
		return $this->loginRelation->searchExtensionally($loginEntity)->maybe_val( // SEARCH user
			Either::left(new Pair('addMatchError', [])),
			function (int $userId): Either/*LoginForm->LoginForm, SessionEntity*/ {return $this->bewareSessionObtainabilityInconsistencies($userId);}
		);
	}

	public function bewareSessionObtainabilityInconsistencies(int $userId): Either/*FormChange, SessionEntity*/
	{
		// INSERT NEW SESSION, or if already exists for user, find that:
		return $this->sessionRelation->openNewOrFindOldSessionForUserId($userId)->maybe2_exec(
			// Kudarceset - sem nem tudott új generált tokent bevinni, sem a userhez korábbi ilyet  találni, külső hiba vagy eszméletlen véletlen
			function (): Either/*FormChange, SessionEntity*/ {return Either::left(new Pair('addDoomsDayError', []));},
			// Sikereset:
			function (bool $freshness, SessionEntity $sessionEntity): Either/*FormChange, SessionEntity*/ {return $this->warnIfOldTagged($freshness, $sessionEntity);}
		);
	}

	public function warnIfOldTagged(bool $isFreshlyGenerated, SessionEntity $sessionEntity): Either/*FormChange, SessionEntity*/
	{
		return Either::yesVal($isFreshlyGenerated, $sessionEntity)->leftMap(
			function (SessionEntity $sessionEntity): Pair {return new Pair('addMultipleLoginError', [$sessionEntity->token]);}
		);
	}
}
