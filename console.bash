#!/bin/bash

case "$1" in
	checkout-free)
		cp public/index.tpl.php public/index.php;
		cp public/assets-proper/holy-grail.tpl.css public/assets-proper/holy-grail.css;;
	checkout-sell)
		cp vendor/sell/index.php public/index.php;
		cp vendor/sell/holy-grail.css public/assets-proper/holy-grail.css;;
	checkout-buy)
		cp vendor/buy/logo.jpeg public/assets-proper/logo.jpeg;
		cp vendor/buy/sonar.ogg public/assets-proper/sonar.ogg;;
	commit-sell)
		cp public/index.php vendor/sell/index.php;
		cp public/assets-proper/holy-grail.css vendor/sell/holy-grail.css;;
	commit-buy)
		cp public/assets-proper/logo.jpeg vendor/buy/logo.jpeg;
		cp public/assets-proper/sonar.ogg vendor/buy/sonar.ogg;;
	clean-sell)
		rm public/index.php;
		rm public/assets-proper/holy-grail.css;;
	clean-buy)
		rm public/assets-proper/logo.jpeg;
		rm public/assets-proper/sonar.ogg;;
	clean-all)
		./console.bash clean-sell; # call user-defined bash-function instead
		./console.bash clean-buy;; # call user-defined bash-function instead
	branches)
		echo '+-------------+';
		echo '| index.php: |';
		echo '+-------------+';
		echo;
		diff public/index.tpl.php vendor/sell/index.php;
		echo;
		echo '+-----------------+';
		echo '| holy-grail.css: |';
		echo '+-----------------+';
		echo;
		diff public/assets-proper/holy-grail.tpl.css vendor/sell/holy-grail.css;;
	diff)
		echo '+-------------+';
		echo '| index.php: |';
		echo '+-------------+';
		echo;
		diff vendor/sell/index.php public/index.php;
		echo;
		echo '+-----------------+';
		echo '| holy-grail.css: |';
		echo '+-----------------+';
		echo;
		diff vendor/sell/holy-grail.css public/assets-proper/holy-grail.css;;
	syncstatus)
		echo '+-------------+';
		echo '| index.php: |';
		echo '+-------------+';
		echo;
		diff ../loosely-coupled-figure-editor--vendor/vendor/sell/index.php vendor/sell/index.php;
		echo;
		echo '+-----------------+';
		echo '| holy-grail.css: |';
		echo '+-----------------+';
		echo;
		diff ../loosely-coupled-figure-editor--vendor/vendor/sell/holy-grail.css vendor/sell/holy-grail.css;;
	status)
		echo ' ================================================';
		echo '||                    D I F F                   ||';
		echo ' ================================================';
		echo;
		./console.bash diff;
		echo;
		echo ' ================================================';
		echo '||             S Y N C S T A T U S              ||';
		echo ' ================================================';
		echo;
		./console.bash syncstatus;
		echo;;
	push)
		cp public/index.php ../loosely-coupled-figure-editor--vendor/vendor/sell/index.php;
		cp public/assets-proper/holy-grail.css ../loosely-coupled-figure-editor--vendor/vendor/sell/holy-grail.css;;
	pull)
		echo 'Not implemented for security reasons. Do it manually.';;
	contextmenu-universe)
		sed -nf console.aux/CMO-constructoralias-2nd-arg.sed public/app/widget-pillar/FigureWidget.js;;
	logfinder)
		console.aux/logfinder.bash;;
	eitherTarget)
		console.aux/eitherTarget.bash;;
	help)
		echo 'Take special care of these vendor-like files:';
		echo '============================================='
		echo;
		echo 'Customer-specific files (e.g. skins) You will sell, meant to become private, not open-source:';
		echo;
		echo ' - index.php';
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
		echo -e "\thelp\n\tpull || checkout-sell  | checkout-buy | checkout-free\n\tpush || commit-sell    | commit-buy\n\t        clean-sell     | clean-buy    | clean-all\n\t        branches       | diff         | syncstatus    | status\n\tcontextmenu-universe   | logfinder    | eitherTarget";;
	*)
		echo "Invalid console command [$1], type [./console.bash help] for details.";;
esac;
