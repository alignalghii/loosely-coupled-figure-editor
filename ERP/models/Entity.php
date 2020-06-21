<?php

namespace models;

use algebraicDataTypes\Maybe;

abstract class Entity
{
	/*public static function load(array $record): Entity
	{
		return static::maybeImport($record)->maybe_exec(
			function () {throw new Exception('Load error');},
			function ($entity) {return $entity;}
		);
	}

	public static function loadAll(array $records): array//Entity
	{
		return array_map(
			function ($record) {return static::load($record);},
			$records
		);
	}*/

	public abstract static function maybeImport(array $post): Maybe/*Entity*/;

	public static function maybePostback(array $post, $entityPredicate): Maybe//postback
	{
		return static::maybeImport($post)->maybe_val(
			Maybe::just($post), // Maybe::just(static::comb($post))
			function (Entity $entity) use ($entityPredicate, $post): Maybe/*postArr*/ {return $entityPredicate($entity) ? Maybe::nothing() : Maybe::just($post);} // Maybe::just(static::comb($post))
		);
	}
}
