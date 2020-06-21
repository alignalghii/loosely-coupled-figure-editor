<?php

use controllers\{LoginController, MachineController, HumanController};
use models\{FlatRelation, RoomPrototypeRelation, RoomShapeRelation, RoomRelation};

use ADT\Maybe;

class Router
{
	private $server, $get, $post, $rawPost; // basic
	private $request;                       // derived

	public function __construct(array $server, array $get, array $post, string $rawPost)
	{
		// Basic:
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
		$this->maybeToken()->maybe_exec(
			function (             ) use ($isLoginRequest) {$isLoginRequest ? $this->dispatch_login()   : $this->dispatch_denyService();},
			function (string $token) use ($isLoginRequest) {$isLoginRequest ? print 'Már be vagy lépve' : $this->dispatch_authenticated($token);}
		);
	}

	private function maybeToken(): Maybe /*int*/
	{
		$isAuthenticated = isset($this->get['token']) && preg_match('/\d+/', $this->get['token']) && $this->get['token'] > 100;
		return $isAuthenticated ? Maybe::just($this->get['token']) : Maybe::nothing();
	}

	private function dispatch_login(): void
	{
		switch (true) {
			// Microservice:
			case preg_match('!GET /login-machine!' , $this->request, $matches): $this->makeLoginController()->getMachine (); break;
			case preg_match('!POST /login-machine!', $this->request, $matches): $this->makeLoginController()->postMachine(Maybe::ifAny($this->post['password'])); break; // machine API must not assume preconditions

			// Human CRUD GUI:
			case preg_match('!GET /login-human!' , $this->request, $matches): $this->makeLoginController()->getHuman (); break;
			case preg_match('!POST /login-human!', $this->request, $matches): $this->makeLoginController()->postHuman($this->post['password']); break; // human API is justified to assume preconditions

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

	private function makeLoginController(): LoginController {return new LoginController();}

	private function makeHumanController(int $token): HumanController
	{
		$dbh = new PDO('mysql:host=localhost;dbname=floor_plan_designer', 'floor_plan_designer_user', 'floor_plan_designer_user_password', [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"]);
		$flatRelation          = new FlatRelation($dbh);
		$roomPrototypeRelation = new RoomPrototypeRelation($dbh);
		$roomShapeRelation     = new RoomShapeRelation($dbh);
		$roomRelation          = new RoomRelation($dbh);
		return new HumanController($flatRelation, $roomPrototypeRelation, $roomShapeRelation, $roomRelation, $token);
	}

	private function makeMachineController(int $token): MachineController {return new MachineController($token);}
}
