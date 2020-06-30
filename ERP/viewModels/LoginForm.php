<?php

// Only trimming and number representation
namespace viewModels;

use models\{LoginEntity, LoginEntityDenial};
use algebraicDataTypes\ArrayWithListAlgebra;

class LoginForm
{
	public $name     , $password     ;
	public $nameError, $passwordError, $globalError;

	public function __construct(string $name = '', string $password = '', string $nameError = '', string $passwordError = '', string $globalError = '')
	{
		$this->setAll($name, $password, $nameError, $passwordError, $globalError);
	}

	private function setAll(string $name, string $password, string $nameError, string $passwordError, string $globalError): void
	{
		$this->name          = $name;
		$this->password      = $password;
		$this->nameError     = $nameError;
		$this->passwordError = $passwordError;
		$this->globalError       = $globalError;
	}

	public function copy(): self
	{
		return new self($this->name, $this->password, $this->nameError, $this->passwordError, $this->globalError);
	}

	public static function empty(): self {return new self;}
	public static function fromPost(array $post): self
	{
		$self = new self;
		$self->setFields($post);
		return $self;
	}

	public function expectId(LoginEntity $entity): void
	{
		$this->setRelationLevelError(
			$entity->maybeId->isJust()
		);
	}

	public function setFields(array $post): void
	{
		$this->name     = trim($post['name']);
		$this->password = trim($post['password']);
	}

	public function addFieldLevelErrors(LoginEntityDenial $loginEntityDenial): self
	{
		$form = $this->copy();
		foreach ($loginEntityDenial->name[1] as $errorName) {
			switch ($errorName) { // @TODO use assoc array and map functor instead of switch
				case 'regexp': $form->nameError     = 'A név szintaktikailag nem megfelelő'; break;
				default      : die('Unknown validation error symbol');
			}
		}
		foreach ($loginEntityDenial->password[1] as $errorName) {
			switch ($errorName) { // @TODO use assoc array and map functor instead of switch
				case 'regexp': $form->passwordError = 'A név szintaktikailag nem megfelelő'; break;
				default      : die('Unknown validation error symbol');
			}
		}
		return $form;
	}

	public function addMatchError(): self
	{
		$form = $this->copy();
		$form->globalError = 'Nincs ilyen név-jelszó párosítás';
		return $form;
	}

	public function addMultipleLoginError(): self
	{
		$form = $this->copy();
		$form->globalError = 'Többszörösen vagy bejelenetkezve?';
		return $form;
	}



	public function addRelationLevelError(bool $dbFlag): void
	{
		if (!$dbFlag) $this->globalError = 'Nincs ilyen név-jelszó párosítás';
	}

	public function showBackViewModel(): array
	{
		$name     = $this->name;
		$password = $this->password;
		$error = [
			'name'     => $this->nameError,
			'password' => $this->passwordError,
			'global'   => $this->globalError
		];
		return compact('name', 'password', 'error');
	}

	public function apply(array/*string, OPTIONAL: LoginEntityDenial*/ $changer): self
	{
		return ArrayWithListAlgebra::uncons($changer)->mapToMaybe(
			function (string $methodName, array $args): self {return call_user_func_array([$this, $methodName], $args);}
		)->fromJustWithError('Wrong form error labeling code');
	}

	public function encodeFromUI(object $f, array $post) {return $f($post['name'], $post['password']);}
}
