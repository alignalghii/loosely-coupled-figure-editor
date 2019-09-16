#!/bin/bash

case "$1" in
	free)
		cp public/index.tpl.html public/index.html;
		cp public/assets-proper/holy-grail.tpl.css public/assets-proper/holy-grail.css;;
	sell)
		cp vendor/sell/index.html public/index.html;
		cp vendor/sell/holy-grail.css public/assets-proper/holy-grail.css;;
	buy)
		cp vendor/buy/logo.jpeg public/assets-proper/logo.jpeg;
		cp vendor/buy/sonar.ogg public/assets-proper/sonar.ogg;;
	unsell)
		cp public/index.html vendor/sell/index.html;
		cp public/assets-proper/holy-grail.css vendor/sell/holy-grail.css;;
	unbuy)
		cp public/assets-proper/logo.jpeg vendor/buy/logo.jpeg;
		cp public/assets-proper/sonar.ogg vendor/buy/sonar.ogg;;
	clean-sell)
		rm public/index.html;
		rm public/assets-proper/holy-grail.css;;
	clean-buy)
		rm public/assets-proper/logo.jpeg;
		rm public/assets-proper/sonar.ogg;;
	clean-all)
		./console.bash unsell; # call user-defined bash-function instead
		./console.bash unbuy;; # call user-defined bash-function instead
	diff-in)
		echo '+-------------+';
		echo '| index.html: |';
		echo '+-------------+';
		echo;
		diff public/index.tpl.html vendor/sell/index.html;
		echo;
		echo '+-----------------+';
		echo '| holy-grail.css: |';
		echo '+-----------------+';
		echo;
		diff public/assets-proper/holy-grail.tpl.css vendor/sell/holy-grail.css;;
	diff-out)
		echo '+-------------+';
		echo '| index.html: |';
		echo '+-------------+';
		echo;
		diff ../loosely-coupled-figure-editor--vendor/vendor/sell/index.html public/index.html;
		echo;
		echo '+-----------------+';
		echo '| holy-grail.css: |';
		echo '+-----------------+';
		echo;
		diff ../loosely-coupled-figure-editor--vendor/vendor/sell/holy-grail.css public/assets-proper/holy-grail.css;;
	push)
		cp public/index.html ../loosely-coupled-figure-editor--vendor/vendor/sell/index.html;
		cp public/assets-proper/holy-grail.css ../loosely-coupled-figure-editor--vendor/vendor/sell/holy-grail.css;;
	help)
		echo 'Take special care of these vendor-like files:';
		echo '============================================='
		echo;
		echo 'Customer-specific files (e.g. skins) You will sell, meant to become private, not open-source:';
		echo;
		echo ' - index.html';
		echo ' - holy-grail.css';
		echo;
		echo 'Third-party files You use:';
		echo;
		echo ' - logo.jpeg';
		echo '     - maybe in future also favicon.ico?';
		echo ' - sonar.ogg';
		echo;
		echo 'Commands:';
		echo '=========';
		echo;
		echo './console.bash';
		echo -e "\tfree\n\tsell       | buy\n\tunsell     | unbuy\n\tclean-sell | clean-buy | clean-all\n\tdiff-in    | diff-out\n\tpush\n\thelp";;
	*)
		echo "Invalid console command [$1], type [./console.bash help] for details.";;
esac;
