<?php

class FileController
{
	public function show() {$this->render('view.php');}

	public function updateJPEG(string $svgString)
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

	private function render($viewFileName) {require $viewFileName;}
}
