<?php

use controllers\AppProperController;
use controllers\AllController;

class Router
{
	function __construct(AppProperController $appProperController, AllController $allController, array $server, array $post, string $rawPost)
	{
		$this->appProperController = $appProperController;
		$this->allController       = $allController;

		$this->server  = $server;
		$this->post    = $post;
		$this->rawPost = $rawPost;
	}

	function run(): void
	{
		$request = "{$this->server['REQUEST_METHOD']} {$this->server['REQUEST_URI']}";
		$request = preg_replace('!/.*\.php!', '', $request);
		switch (true) {
			/** Application proper: **/

			case preg_match('!POST /update-jpeg!', $request, $matches): $this->appProperController->updateJPEG($this->rawPost); break;

			/** DB-admin: **/

			case preg_match('!GET /!', $request, $matches):
			case preg_match('!GET /show-all!', $request, $matches): $this->allController->showAll(); break;

			case preg_match('!POST /flat/add!', $request, $matches): $this->allController->addFlat($this->post); break;
			case preg_match('!POST /flat/update/(\d+)!', $request, $matches): $this->allController->updateFlat($matches[1], $this->post); break;
			case preg_match('!POST /flat/del/(\d+)!', $request, $matches): $this->allController->deleteFlat($matches[1]); break;

			// @TODO use entity instead of arguments listing or record data array
			case preg_match('!POST /room-prototype/add!', $request, $matches): $this->allController->addRoomPrototype($this->post); break;
			case preg_match('!POST /room-prototype/update/(\d+)!', $request, $matches): $this->allController->updateRoomPrototype($matches[1], $this->post); break;
			case preg_match('!POST /room-prototype/del/(\d+)!', $request, $matches): $this->allController->deleteRoomPrototype($matches[1]); break;

			case preg_match('!POST /room-shape/add!', $request, $matches): $this->allController->addRoomShape($this->post); break;
			case preg_match('!POST /room-shape/update/(\d+)!', $request, $matches): $this->allController->updateRoomShape($matches[1], $this->post); break;
			case preg_match('!POST /room-shape/del/(\d+)!', $request, $matches): $this->allController->deleteRoomShape($matches[1]); break;

			case preg_match('!POST /room/add!', $request, $matches): $this->allController->addRoom($this->post); break;
			case preg_match('!POST /room/update/(\d+)!', $request, $matches): $this->allController->updateRoom($matches[1], $this->post); break;
			case preg_match('!POST /room/del/(\d+)!', $request, $matches): $this->allController->deleteRoom($matches[1]); break;


			default: echo "Router error [$request]"; break; // @TODO: `throw 'Router error'`?
		}
	}
}
