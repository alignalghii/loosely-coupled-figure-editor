<?php

class ViewHelper
{
	public static function maybeQuery(string $url, array/*string->Maybe<string>*/ $namedOptionalValues): string
	{
		$queryString = implode(
			'&',
			ArrayWithListAlgebra::indexedMapMaybe(
				function (string $value, string $name): string {return "$name=$value";},
				$namedOptionalValues
			)
		);
		return $queryString ? "$url?$queryString" : $url;
	}
}
