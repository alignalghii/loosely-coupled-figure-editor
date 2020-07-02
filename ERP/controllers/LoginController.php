<?php

namespace controllers;

use PDO;
use algebraicDataTypes\{Pair, Maybe, Either};
use viewModels\LoginForm;
use models\{LoginEntity, LoginEntityDenial, LoginRelation, SessionEntity, SessionRelation, Authentication};

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
		$this->readAndValidateLocally($post)->mapFirst(
			function (Either/*LoginEntityDenial,LoginEntity*/ $localValidation): Either/*FormChange, SessionEntity*/ {return $this->sessionizeAndValidateGlobally($localValidation);}
		)->uncurry(
			function (Either/*FormChange, SessionEntity*/ $globalValidation, LoginForm $form): void {$this->executeOn($globalValidation, $form);}
		);
	}

	private function readAndValidateLocally(array $post): Pair/*LoginForm, Either<LoginEntityDenial, LoginEntity>*/
	{
		$loginForm = LoginForm::fromPost($post);
		$eitherLoginDenialOrEntity = $loginForm->encodeFromUI(
			function ($name, $password) {return LoginEntity::decide($name, $password);},
			$post
		);
		return new Pair($eitherLoginDenialOrEntity, $loginForm);
	}

	private function sessionizeAndValidateGlobally(Either/*LoginEntityDenial, LoginEntity*/ $eitherLoginDenialOrEntity): Either/*FormChange, SessionEntity*/
	{
		return $eitherLoginDenialOrEntity->leftMap(
			function (LoginEntityDenial $loginEntityDenial): Pair/*semantically: LoginForm->LoginForm*/ {
				return new Pair('addFieldLevelErrors', [$loginEntityDenial]);
			}
		)->bind(
			function (LoginEntity       $loginEntity      ): Either/*LoginForm->LoginForm, SessionEntity*/ {
				$authentication = new Authentication(new LoginRelation($this->dbh), new SessionRelation($this->dbh));
				return $authentication->authenticate($loginEntity);
			}
		);
	}

	private function executeOn(Either/*LoginForm->LoginForm, SessionEntity*/ $eitherFormChangeOrSessionEntity, LoginForm $loginForm): void
	{
		$eitherFormChangeOrSessionEntity->either(
			function (Pair/*string, array*/ $changer) use ($loginForm): void {
				$this->render('login-view', $loginForm->apply($changer)->showBackViewModel());
			},
			function (SessionEntity $sessionEntity): void {
				header("Location: /?token={$sessionEntity->token}");
			}
		);
	}


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
}
