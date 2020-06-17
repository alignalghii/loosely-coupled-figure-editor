<?php

class Router
{
	function __construct(FileController $fileController, array $server, array $get, array $post, string $rawPost)
	{
		$this->fileController = $fileController;

		$this->server  = $server;
		$this->get     = $get;
		$this->post    = $post;
		$this->rawPost = $rawPost;
	}

	function run(): void
	{
		$request = "{$this->server['REQUEST_METHOD']} {$this->server['REQUEST_URI']}";
		$request = preg_replace('!/.*\.php!', '', $request);
		switch (true) {
			case preg_match('!GET /!            ', $request, $matches): $this->fileController->show($this->maybeToken()); break;
			case preg_match('!POST /update-jpeg!', $request, $matches): $this->fileController->updateJPEG($this->rawPost); break;
			default                                                   : echo "Router error [$request]"; break; // @TODO: `throw 'Router error'`?
		}
	}

	private function maybeToken() {return Maybe::ifAny($this->get['token']);}
}
