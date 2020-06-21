<?php

namespace viewModels;

use algebraicDataTypes\{Maybe, ArrayColoring};
use controllers\HumanController;

class ViewModelMeta
{
	private $flatsViewModel, $roomPrototypesViewModel, $roomShapesViewModel, $roomsViewModel;

	public function __construct(HumanController $humanController)
	{
		$flatRecords          = $humanController->flatRelation->getAll();
		$roomPrototypeRecords = $humanController->roomPrototypeRelation->getAll();
		$roomShapeRecords     = $humanController->roomShapeRelation->getAll();
		$roomRecords          = $humanController->roomRelation->getAll();

		$this->assoc = [
			'flatsViewModel'          => new FlatsViewModel($flatRecords),
			'roomPrototypesViewModel' => new RoomPrototypesViewModel($roomPrototypeRecords),
			'roomShapesViewModel'     => new RoomShapesViewModel($roomShapeRecords),
			'roomsViewModel'          => new RoomsViewModel($roomRecords)
		];
	}

	public function showAll(                                                      ): array {return $this->reset      (                self::getShowAll(                     ));}
	public function add    (string $viewModelName         , Maybe $maybeShowback  ): array {return $this->reestablish($viewModelName, self::getAdd    (     $maybeShowback  ));}
	public function update (string $viewModelName, int $id, Maybe $maybeShowback  ): array {return $this->reestablish($viewModelName, self::getUpdate ($id, $maybeShowback  ));}
	public function delete (string $viewModelName,          Maybe $maybeShowbackId): array {return $this->reestablish($viewModelName, self::getDelete (     $maybeShowbackId));}

	private function reestablish(string $viewModelName, object $fun): array
	{
		$arrayColoring = ArrayColoring::makeBySampleKey($this->assoc, $viewModelName, $fun, self::getShowAll());
		return $arrayColoring->map();
	}

	private function reset(): array
	{
		$arrayColoring = ArrayColoring::makeAll($this->assoc, self::getShowAll());
		return $arrayColoring->map();
	}

	private static function getShowAll(                               ): object {return function ($viewModel)                             {return $viewModel->showAll(                     );};}
	private static function getAdd    (         Maybe $maybeShowback  ): object {return function ($viewModel) use (     $maybeShowback  ) {return $viewModel->add    (     $maybeShowback  );};}
	private static function getUpdate (int $id, Maybe $maybeShowback  ): object {return function ($viewModel) use ($id, $maybeShowback  ) {return $viewModel->update ($id, $maybeShowback  );};}
	private static function getDelete (         Maybe $maybeShowbackId): object {return function ($viewModel) use (     $maybeShowbackId) {return $viewModel->delete (     $maybeShowbackId);};}
}
