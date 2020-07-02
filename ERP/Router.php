<?php

use controllers\{LoginController, MachineController, HumanController};
use models\{UserRelation, SessionRelation, FlatRelation, RoomPrototypeRelation, RoomShapeRelation, RoomRelation};

use algebraicDataTypes\Maybe;

class Router
{
	private $server, $get, $post, $rawPost; // basic
	private $request;                       // derived

	public function __construct(PDO $dbh, array $server, array $get, array $post, string $rawPost)
	{
		// Basic:
		$this->dbh     = $dbh;
		$this->server  = $server;
		$this->get     = $get;
		$this->post    = $post;
		$this->rawPost = $rawPost;

		// Derived:
		$request_notRewritten = "{$this->server['REQUEST_METHOD']} {$this->server['REQUEST_URI']}"; // @TODO make into a setter method
		$this->request = preg_replace('!/.*\.php!', '', $request_notRewritten);                     // ...
	}


	public function run(): void
	{
		// Authentication interceptor.
		// Note: elfogad akármilyen request URI-t, mégha nem is szerepel a router route-jai között. Mert: illetéktelennek nem adunk ki infót még a route-ok puszta meglétéről sem!
		$isLoginRequest  = preg_match('!(GET|POST) /login-(human|machine)!', $this->request);
		$this->maybeValidToken()->maybe_exec(
			function (          ) use ($isLoginRequest) {$isLoginRequest ? $this->dispatch_login   (      ) : $this->dispatch_denyService();},
			function (int $token) use ($isLoginRequest) {$isLoginRequest ? $this->fixInconsistency1($token) : $this->dispatch_authenticated($token);}
		);
	}

	private function fixInconsistency1(int $token) {printf('Az URL-edben szereplő token érvényes, nincs szükség bejelentkezésre. <a href="/?token=%d">Javító link</a>', $token);}

	private function maybeToken(): Maybe/*int*/
	{
		return Maybe::at($this->get, 'token')->havingProperty(
			function ($n) {return preg_match('/^\d+$/', $n);}
		)->map(
			function ($n) {return (int) $n;}
		);
	}

	private function maybeValidToken(): Maybe/*int*/
	{
		return $this->maybeToken()->havingProperty(
			function (int $token): bool {return $this->isValidToken($token);}
		);
	}

	private function isValidToken(int $token): bool
	{
		$sessionRelation = new SessionRelation($this->dbh);
		return $sessionRelation->maybeFindByToken($token)->isJust();
	}

	// @TODO remove superfluous token, if any
	private function dispatch_login(): void
	{
		switch (true) {
			// Microservice:
			case preg_match('!GET /login-machine!' , $this->request, $matches): $this->makeLoginController()->getMachine (); break;
			case preg_match('!POST /login-machine!', $this->request, $matches): $this->makeLoginController()->postMachine(Maybe::ifAny($this->post['password'])); break; // machine API must not assume preconditions

			// Human CRUD GUI:
			case preg_match('!GET /login-human!' , $this->request, $matches): $this->makeLoginController()->getHuman (); break;
			case preg_match('!POST /login-human!', $this->request, $matches): $this->makeLoginController()->postHuman($this->post); break; // human API is justified to assume preconditions

			default: $this->routerError();
		}
	}

	private function dispatch_authenticated(int $token): void
	{
		$request = $this->request;
		switch (true) {

			// Microservice:

			case preg_match('!GET /nontrivial-flat-ids!'    , $request, $matches): $this->makeMachineController($token)->getNontrivialFlatIds(); break;
			case preg_match('!GET /flat-record-on-id/([\+\-]?\d+)!', $request, $matches): $this->makeMachineController($token)->getFlatRecordOnId((int)$matches[0]); break;

			// Human CRUD GUI:

			case preg_match('!GET /($|\?)!'  , $this->request, $matches):
			case preg_match('!GET /show-all!', $this->request, $matches): $this->makeHumanController($token)->showAll(); break;

			case preg_match('!POST /user/add!', $request, $matches): $this->makeHumanController($token)->addUser($this->post); break;
			case preg_match('!POST /user/update/(\d+)!', $request, $matches): $this->makeHumanController($token)->updateUser($matches[1], $this->post); break;
			case preg_match('!POST /user/del/(\d+)!', $request, $matches): $this->makeHumanController($token)->deleteUser($matches[1]); break;

			case preg_match('!POST /session/add!', $request, $matches): $this->makeHumanController($token)->addSession($this->post); break;
			case preg_match('!POST /session/update/(\d+)!', $request, $matches): $this->makeHumanController($token)->updateSession($matches[1], $this->post); break;
			case preg_match('!POST /session/del/(\d+)!', $request, $matches): $this->makeHumanController($token)->deleteSession($matches[1]); break;

			case preg_match('!POST /flat/add!', $request, $matches): $this->makeHumanController($token)->addFlat($this->post); break;
			case preg_match('!POST /flat/update/(\d+)!', $request, $matches): $this->makeHumanController($token)->updateFlat($matches[1], $this->post); break;
			case preg_match('!POST /flat/del/(\d+)!', $request, $matches): $this->makeHumanController($token)->deleteFlat($matches[1]); break;

			// @TODO use entity instead of arguments listing or record data array
			case preg_match('!POST /room-prototype/add!', $request, $matches): $this->makeHumanController($token)->addRoomPrototype($this->post); break;
			case preg_match('!POST /room-prototype/update/(\d+)!', $request, $matches): $this->makeHumanController($token)->updateRoomPrototype($matches[1], $this->post); break;
			case preg_match('!POST /room-prototype/del/(\d+)!', $request, $matches): $this->makeHumanController($token)->deleteRoomPrototype($matches[1]); break;

			case preg_match('!POST /room-shape/add!', $request, $matches): $this->makeHumanController($token)->addRoomShape($this->post); break;
			case preg_match('!POST /room-shape/update/(\d+)!', $request, $matches): $this->makeHumanController($token)->updateRoomShape($matches[1], $this->post); break;
			case preg_match('!POST /room-shape/del/(\d+)!', $request, $matches): $this->makeHumanController($token)->deleteRoomShape($matches[1]); break;

			case preg_match('!POST /room/add!', $request, $matches): $this->makeHumanController($token)->addRoom($this->post); break;
			case preg_match('!POST /room/update/(\d+)!', $request, $matches): $this->makeHumanController($token)->updateRoom($matches[1], $this->post); break;
			case preg_match('!POST /room/del/(\d+)!', $request, $matches): $this->makeHumanController($token)->deleteRoom($matches[1]); break;


			default: $this->routerError();
		}
	}

	private function routerError(): void {echo "Router error [$this->request]";} // @TODO: `throw 'Router error'`?

	private function dispatch_denyService(): void
	{
		$isMachine = preg_match('!GET /nontrivial-flat-ids!', $this->request) || preg_match('!GET /flat-record-on-id/(\d+)!', $this->request) || preg_match('!GET /login-machine!', $this->request) || preg_match('!POST /login-machine/(\d+)!', $this->request);
		if ($isMachine) {
			header('Access-Control-Allow-Origin: *');
			echo json_encode(['status' => false, 'error' => 'GET /login-machine']);
		} else {
			header('Location: /login-human');
		}
	}

	private function makeLoginController(): LoginController {return new LoginController($this->dbh);}

	private function makeHumanController(int $token): HumanController
	{
		$userRelation          = new UserRelation($this->dbh);
		$sessionRelation       = new SessionRelation($this->dbh);
		$flatRelation          = new FlatRelation($this->dbh);
		$roomPrototypeRelation = new RoomPrototypeRelation($this->dbh);
		$roomShapeRelation     = new RoomShapeRelation($this->dbh);
		$roomRelation          = new RoomRelation($this->dbh);
		return new HumanController($userRelation, $sessionRelation, $flatRelation, $roomPrototypeRelation, $roomShapeRelation, $roomRelation, $token);
	}

	private function makeMachineController(int $token): MachineController {return new MachineController($token);}
}
