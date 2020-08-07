<?php

class FileController
{
	public function showWithPrefilledFlatIdField(Maybe/*string*/ $maybeToken, string $prefilledFlatIdField = ''): void
	{
		$floorPatterns = $this->floorPatternsArray();
		$this->render('view.php', compact('prefilledFlatIdField', 'maybeToken', 'floorPatterns'));
	}

	public function updateJPEG(string $svgString): void
	{
		`find var -name 'work--*-*.*' -mmin +1 -delete`; // Deleting too old temporary files @TODO reconsider

		$stamp = time() . '-' . rand();
		$extlessPath = "var/work--$stamp";
		$svgFile = fopen("$extlessPath.svg", 'w');
			fwrite($svgFile, $svgString);
		fclose($svgFile);
		`sed -i 's!\<href="/!href="!g' $extlessPath.svg`;
		`inkscape -z -e $extlessPath.png -w 1175 -h 692 $extlessPath.svg`; // credit to https://www.systutorials.com/how-to-convert-svg-to-png-in-linux/
		`convert $extlessPath.png -background "rgb(255,255,255)" -flatten $extlessPath-bg.png`; // credit to https://stackoverflow.com/questions/25208116/imagemagick-how-to-change-transparent-background-to-a-color
		`convert $extlessPath-bg.png $extlessPath.jpeg`;
		header('Content-Type: text/plain');
		echo "$extlessPath.jpeg";
	}

	private function render(string $viewFileName, array $viewModel): void
	{
		extract($viewModel);
		require $viewFileName;
	}

	// @TODO should be token protected
	public function floorPatterns(): void {echo json_encode($this->floorPatternsArray());}

	private function floorPatternsArray(): array/*string*/
	{
		return array_values(
			array_filter(
				scandir('img-vendor/floor-patterns'),
				function (string $fileName): bool {return !preg_match('/^\./', $fileName);} // `.`, `..`, `.gitkeep` if any
			)
		);
	}

	public function log(): void
	{
		$txt1 = file_get_contents('php://input');
		$json = json_decode($txt1, true);
		$json['server-time'] = (array) new DateTime();
		$txt2 = json_encode($json);
		file_put_contents('var/log.log', "$txt2\n", FILE_APPEND);
		header('Content-Type: application/json');
		echo json_encode(['status' => true]);
	}
}
