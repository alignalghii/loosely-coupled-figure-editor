<?php

use controllers\MachineController;
use controllers\HumanController;

class Router
{
	function __construct(MachineController $machineController, HumanController $humanController, array $server, array $post, string $rawPost)
	{
		$this->machineController = $machineController;
		$this->humanController   = $humanController;

		$this->server  = $server;
		$this->post    = $post;
		$this->rawPost = $rawPost;
	}

	function run(): void
	{
		$request = "{$this->server['REQUEST_METHOD']} {$this->server['REQUEST_URI']}";
		$request = preg_replace('!/.*\.php!', '', $request);
		switch (true) {

			// Microservice:

			case preg_match('!GET /nontrivial-flat-ids!'    , $request, $matches): $this->machineController->getNontrivialFlatIds(); break;
			case preg_match('!GET /flat-record-on-id/(\d+)!', $request, $matches): $this->machineController->getFlatRecordOnId((int)$matches[0]); break;

			// Human CRUD GUI:

			case preg_match('!GET /!', $request, $matches):
			case preg_match('!GET /show-all!', $request, $matches): $this->humanController->showAll(); break;

			case preg_match('!POST /flat/add!', $request, $matches): $this->humanController->addFlat($this->post); break;
			case preg_match('!POST /flat/update/(\d+)!', $request, $matches): $this->humanController->updateFlat($matches[1], $this->post); break;
			case preg_match('!POST /flat/del/(\d+)!', $request, $matches): $this->humanController->deleteFlat($matches[1]); break;

			// @TODO use entity instead of arguments listing or record data array
			case preg_match('!POST /room-prototype/add!', $request, $matches): $this->humanController->addRoomPrototype($this->post); break;
			case preg_match('!POST /room-prototype/update/(\d+)!', $request, $matches): $this->humanController->updateRoomPrototype($matches[1], $this->post); break;
			case preg_match('!POST /room-prototype/del/(\d+)!', $request, $matches): $this->humanController->deleteRoomPrototype($matches[1]); break;

			case preg_match('!POST /room-shape/add!', $request, $matches): $this->humanController->addRoomShape($this->post); break;
			case preg_match('!POST /room-shape/update/(\d+)!', $request, $matches): $this->humanController->updateRoomShape($matches[1], $this->post); break;
			case preg_match('!POST /room-shape/del/(\d+)!', $request, $matches): $this->humanController->deleteRoomShape($matches[1]); break;

			case preg_match('!POST /room/add!', $request, $matches): $this->humanController->addRoom($this->post); break;
			case preg_match('!POST /room/update/(\d+)!', $request, $matches): $this->humanController->updateRoom($matches[1], $this->post); break;
			case preg_match('!POST /room/del/(\d+)!', $request, $matches): $this->humanController->deleteRoom($matches[1]); break;


			default: echo "Router error [$request]"; break; // @TODO: `throw 'Router error'`?
		}
	}
}
