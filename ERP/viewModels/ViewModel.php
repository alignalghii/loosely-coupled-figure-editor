<?php

namespace viewModels;

use ADT\Maybe;

abstract class ViewModel
{
	const PARAM_FLOAT = 100;

	protected $records;

	public function __construct(array $records) {$this->records = $records;}

	abstract public function fields();

	public function showAll(): array
	{
		return [
			'records' => $this->packRecords(),
			'newRecord' => $this->blank()
		];
	}

	// Add:

	public function add(Maybe $maybeShowback): array
	{
		return [
			'records' => $this->packRecords(),
			'newRecord' => $maybeShowback->maybe(
				$this->blank(),
				[$this, 'showBack'] // @TODO: `showBack` must be public, because called in Maybe context
			)
		];
	}

	protected function blank(): array {return ['data' => $this->blankRecord(), 'error' => ''];}

	protected function blankRecord()
	{
		return array_map(
			function ($fieldType) {return '';},
			$this->fields()
		);
	}

	public function showBack(array $postedRecord): array // @TODO: must be public, because called in Maybe context
	{
		return [
			'data' => $postedRecord,
			'error' => 'Hiba (pl. üres mező, vagy ismétlődő egyedi adat)'
		];
	}

	protected function pack(array $record): array {return ['data' => $record, 'error' => ''];}
	protected function packRecords(): array {return array_map([$this, 'pack'], $this->records);}

	// Update:

	public function update(int $id, Maybe $maybeShowback): array
	{
		return [
			'records' => $this->allPackOrShowBackHere($id, $maybeShowback),
			'newRecord' => $this->blank()
		];
	}


	protected function allPackOrShowBackHere(int $id, Maybe $maybeShowback): array
	{
		return $maybeShowback->maybe(
			$this->packRecords(),
			function ($showback) use ($id) {
				return array_map(
					function (array $dbRecord) use ($id, $showback): array  {return $this->showBackHere($dbRecord, $id, $showback);},
					$this->records
				);
			}
		);
	}

	protected function showBackHere(array $dbRecord, int $id, array $showback) {return $dbRecord['id'] == $id ? $this->showBack(compact('id') + $showback) : $this->pack($dbRecord);}


	// Delete:

	public function delete(Maybe $maybeShowbackId): array
	{
		return [
			'records' => $maybeShowbackId->maybe(
				$this->packRecords(),
				function ($showbackId) {
					return array_map(
						function ($record) use ($showbackId) {
							return [
								'data' => $record,
								'error' => $record['id'] == $showbackId ? 'Függőségi hiba!' : ''
							];
						},
						$this->records
					);
				}
			),
			'newRecord' => $this->blank()
		];
	}
}
