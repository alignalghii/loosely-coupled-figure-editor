<?php

namespace ADT;

class ArrayColoring
{
	public function __construct(array $array, Maybe2 $maybe2propertyAndGreenen, object $redden)
	{
		$this->array    = $array;
		$this->maybe2propertyAndGreenen = $maybe2propertyAndGreenen;
		$this->redden   = $redden;
	}

	public function map(): array
	{
		return ArrayX::indexedMap(
			function ($val, $key) {return $this->trans($val, $key);}, // [$this, 'trans'] causes `Uncaught Error: Call to private method ADT\ArrayColoring::trans() from context 'ADT\ArrayX']`
			$this->array
		);
	}

	private function trans($value, $key)
	{
		return $this->maybe2propertyAndGreenen->maybe2_val(
			($this->redden)($value),
			function (object $property, object $greenen) use ($value, $key) {return ($property($value, $key) ? $greenen : $this->redden)($value);}
		);
	}

	private static function getPropertyBySampleKey($sampleKey): object {return function ($value, $key) use ($sampleKey) {return $key == $sampleKey;};}

	public static function makeBySampleKey(array $array, string $sampleKey, object $greenen, object $redden): self
	{
		return new self(
			$array,
			Maybe2::just2(
				self::getPropertyBySampleKey($sampleKey),
				$greenen
			),
			$redden
		);
	}

	public static function makeAll(array $array, object $redden): self
	{
		return new self(
			$array,
			Maybe2::nothing2(),
			$redden
		);
	}
}
