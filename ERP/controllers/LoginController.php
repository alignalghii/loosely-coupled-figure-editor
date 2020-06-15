<?php

namespace controllers;

use ADT\Maybe;

class LoginController
{
	public function getHuman(): void {$this->render('login-view', ['error' => '']);}
	public function postHuman(string $password): void
	{
		$isValid = \preg_match('/\w+/', $password) && $this->lengthBetween(1, 20, $password);
		if ($isValid) {
			header('Location: /?token=105');
		} else {
			$error = 'A jelszó csak szókarakterekből állhat 1-20 leütés hosszúságban';
			$this->render('login-view', compact('error'));
		}
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

	private function lengthBetween(int $lowLimit, int $highLimit, string $text): bool {return $this->between($lowLimit, $highLimit, \strlen($text));}
	private function between      (int $lowLimit, int $highLimit, int $n      ): bool {return $lowLimit <= $n && $n <= $highLimit;}
}
