<?php

namespace models;

use ADT\Maybe;

class RoomEntity extends Entity
{
	public $id, $flat_id, $prototype_id, $area, $autocorr_dir_fwd, $shape_id, $shape_argument_1, $shape_argument_2, $shape_argument_3, $shape_argument_4;

	public function __construct(?int $id, int $flatId, int $roomPrototypeId, ?float $area, bool $autocorr_dir_fwd, int $shape_id, ?string $shape_argument_1, ?string $shape_argument_2, ?string $shape_argument_3, ?string $shape_argument_4)
	{
		$this->id               = $id;
		$this->flat_id          = $flatId;
		$this->prototype_id     = $roomPrototypeId;
		$this->area             = $area;
		$this->autocorr_dir_fwd = $autocorr_dir_fwd;
		$this->shape_id         = $shape_id;
		$this->shape_argument_1 = $shape_argument_1;
		$this->shape_argument_2 = $shape_argument_2;
		$this->shape_argument_3 = $shape_argument_3;
		$this->shape_argument_4 = $shape_argument_4;
	}

	public static function maybeImport(array $post): Maybe/*RoomEntity*/
	{
		$id                = $post['id'] ?? null;
		$flat_id           = $post['flat_id'];
		$prototype_id      = $post['prototype_id'];
		$area              = preg_replace('/\s+/', '', $post['area']);
		$area              = str_replace(',', '.', $area);
		if ($area === '') $area = null;
		$autocorr_dir_fwd  = $post['autocorr_dir_fwd'] ?? '';
		$shape_id          = $post['shape_id'];
		$shape_argument_1  = trim($post['shape_argument_1']) ?: null;
		$shape_argument_2  = trim($post['shape_argument_2']) ?: null;
		$shape_argument_3  = trim($post['shape_argument_3']) ?: null;
		$shape_argument_4  = trim($post['shape_argument_4']) ?: null;

		$flag = preg_match('/^\d+$/', $flat_id) && preg_match('/^\d+$/', $prototype_id) && ($area === null || preg_match('/^[+-]?\d+(\.\d+)?$/', $area)) && in_array($autocorr_dir_fwd, ['0', '1'], true) && preg_match('/^\d+$/', $shape_id);
		return $flag
			? Maybe::just(new RoomEntity($id, $flat_id, $prototype_id, $area, $autocorr_dir_fwd, $shape_id, $shape_argument_1, $shape_argument_2, $shape_argument_3, $shape_argument_4))
			: Maybe::nothing();
	}
}
