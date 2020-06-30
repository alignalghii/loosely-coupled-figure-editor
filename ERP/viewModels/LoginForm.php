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
		$dictionary = [
			'empty'    => 'A %s nem lehet üres.',
			'non-var'  => 'A %s csak név típusú jelekből állhat (angol ABC-vel keződik, és szintén ABC- vagy számjegyek)',
			'too-long' => 'A % túl hosszú'
		];
		$form = $this->copy();
		$form->nameError     = self::translate($loginEntityDenial->name    , $dictionary, 'név'   );
		$form->passwordError = self::translate($loginEntityDenial->password, $dictionary, 'jelszó');
		return $form;
	}

	private static function translate(array $errorNames, array $dictionary, string $label): string
	{
		foreach ($errorNames as $errorName) {
			if (array_key_exists($errorName, $dictionary)) {
				return sprintf($dictionary[$errorName], $label);
			} else {
				trigger_error("Unknown validation error symbol [$errorName]", E_USER_WARNING);
			}
		}
		return '';
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
