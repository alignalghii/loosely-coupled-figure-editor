<?php

namespace controllers;

use PDO;
use AlgebraicDataTypes\{Maybe, Either};
use viewModels\LoginForm;
use models\{LoginEntity, LoginEntityDenial, LoginRelation, SessionEntity, SessionRelation};

class LoginController
{
	private $dbh;

	public function __construct(PDO $dbh) {$this->dbh = $dbh;}


	public function getHuman(): void
	{
		$loginForm = LoginForm::empty();
		$this->render('login-view', $loginForm->showBackViewModel());
	}

	public function postHuman(array $post): void
	{
		// READ: list($loginFrm, $eitherLoginDenialOrEntity) = $this->read(post);
		$loginForm = LoginForm::fromPost($post);
		$eitherLoginDenialOrEntity = $loginForm->encodeFromUI(
			function ($name, $password) {return LoginEntity::decide($name, $password);},
			$post
		);
		// MODEL:
		$eitherFormChangeOrSessionEntity = $eitherLoginDenialOrEntity->either(
			function (LoginEntityDenial $loginEntityDenial): Either/*LoginForm->LoginForm, SessionEntity*/ {
				return Either::left(['addFieldLevelErrors', $loginEntityDenial]);
			},
			function (LoginEntity       $loginEntity      ): Either/*LoginForm->LoginForm, SessionEntity*/ {
				$loginRelation = new LoginRelation($this->dbh);
				return $loginRelation->searchExtensionally($loginEntity)->maybe_val( // SEARCH user
					Either::left(['addMatchError']),
					function (int $userId): Either/*LoginForm->LoginForm, SessionEntity*/ {
						$maybeSessionEntity = SessionRelation::maybeOpenNewSessionForUser($userId, $this->dbh); // INSERT NEW SESSION
						return $maybeSessionEntity->toEither(['addMultipleLoginError']);
					}
				);
			}
		);
		// EXEC: $this->exec($eitherFormChangeOrSessionEntity, $loginForm):
		$eitherFormChangeOrSessionEntity->either(
			function (array $changer) use ($loginForm): void {
				$this->render('login-view', $loginForm->apply($changer)->showBackViewModel());
			},
			function (SessionEntity $sessionEntity): void {
				header("Location: /?token={$sessionEntity->token}");
			}
		);
	}

	private function validate(array $post): Either/*LoginViewModel, SessionEntity*/
	{
		$loginViewModel = LoginViewModel::fromPost($post);
		$eitherLoginDenialOrEntity = LoginEntity::fromViewModel($loginViewModel);
		$eitherLoginDenialOrEntity->map(
			function (LoginEntity $loginEntity): void {
				$loginRelation = new LoginRelation($this->dbh);
				$loginEntity->searchedIn($loginRelation);
			}
		);
		$maybeSessionEntity = $maybeLoginEntity->bind(
			function (LoginEntity $loginEntity) use ($loginViewModel): Maybe/*SessionEntity*/ {
				$loginRelation = new LoginRelation($this->dbh);
				$loginEntity->idBy($loginRelation);
				$loginViewModel->expectId($loginEntity);
				return $this->loginToMaybeSessionEntity($loginEntity);
			}
		);
		return $maybeSessionEntity->maybe_exec(
			function () use ($loginViewModel)      : Either/*LoginViewModel, SessionEntity*/ {return Either::left($loginViewModel);},
			function (SessionEntity $sessionEntity): Either/*LoginViewModel, SessionEntity*/ {return Either::right($sessionEntity);}
		);
	}

	private function loginToMaybeSessionEntity(LoginEntity $loginEntity): Maybe/*SessionEntity*/
	{
		return $loginEntity->maybeId->map(
			function (int $userId): SessionEntity {return new SessionEntity(null, $userId, rand(10000000, 90000000));}
		);
	}

	public function read(array $fieldings, array &$error): bool {return true;}
	public function write(int $userId): int {return rand(10000000, 90000000);}

	public function getMachine(): void
	{
		echo \json_encode([
			'send' => 'POST /login-machine/:pwd',
			':pwd' => 'is your password',
			'validation' => '\w+',
			'response' => 'Your authentication token for a session'
		]);
	}

	public function postMachine(Maybe $maybePassword): void
	{}

	private function render(string $viewFileName, array $viewModel): void // @TODO reuse with the other `render` definition, e.g. make a superclass for controllers
	{
		\extract($viewModel);
		require "$viewFileName.php";
	}

	private function lengthBetween(int $lowLimit, int $highLimit, string $text): bool {return $this->between($lowLimit, $highLimit, \strlen($text));}
	private function between      (int $lowLimit, int $highLimit, int $n      ): bool {return $lowLimit <= $n && $n <= $highLimit;}
}
