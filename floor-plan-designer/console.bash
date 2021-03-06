#!/bin/bash

case "$1" in
	checkout-free)
		cp app.php/view.tpl.php app.php/view.php;
		cp public/assets-proper/holy-grail.tpl.css public/assets-proper/holy-grail.css;;
	checkout-sell)
		cp vendor/sell/FPD-view.php app.php/view.php;
		cp vendor/sell/holy-grail.css public/assets-proper/holy-grail.css;;
	checkout-buy)
		cp vendor/buy/logo.jpeg public/assets-proper/logo.jpeg;
		cp vendor/buy/sonar.ogg public/assets-proper/sonar.ogg;;
	commit-sell)
		cp app.php/view.php vendor/sell/FPD-view.php;
		cp public/assets-proper/holy-grail.css vendor/sell/holy-grail.css;;
	commit-buy)
		cp public/assets-proper/logo.jpeg vendor/buy/logo.jpeg;
		cp public/assets-proper/sonar.ogg vendor/buy/sonar.ogg;;
	clean-sell)
		rm app.php/view.php;
		rm public/assets-proper/holy-grail.css;;
	clean-buy)
		rm public/assets-proper/logo.jpeg;
		rm public/assets-proper/sonar.ogg;;
	clean-all)
		./console.bash clean-sell; # call user-defined bash-function instead
		./console.bash clean-buy;; # call user-defined bash-function instead
	branches)
		echo '+-------------+';
		echo '| view.php: |';
		echo '+-------------+';
		echo;
		diff app.php/view.tpl.php vendor/sell/FPD-view.php;
		echo;
		echo '+-----------------+';
		echo '| holy-grail.css: |';
		echo '+-----------------+';
		echo;
		diff public/assets-proper/holy-grail.tpl.css vendor/sell/holy-grail.css;;
	diff)
		echo '+-------------+';
		echo '| view.php: |';
		echo '+-------------+';
		echo;
		diff vendor/sell/FPD-view.php app.php/view.php;
		echo;
		echo '+-----------------+';
		echo '| holy-grail.css: |';
		echo '+-----------------+';
		echo;
		diff vendor/sell/holy-grail.css public/assets-proper/holy-grail.css;;
	syncstatus)
		echo '+-------------+';
		echo '| view.php: |';
		echo '+-------------+';
		echo;
		diff ../../loosely-coupled-figure-editor--vendor/vendor/sell/FPD-view.php vendor/sell/FPD-view.php;
		echo;
		echo '+-----------------+';
		echo '| holy-grail.css: |';
		echo '+-----------------+';
		echo;
		diff ../../loosely-coupled-figure-editor--vendor/vendor/sell/holy-grail.css vendor/sell/holy-grail.css;;
	log)
		[ -f public/var/log.log ] && cat public/var/log.log;;
	clean-log)
		[ -f public/var/log.log ] && > public/var/log.log;;
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
		echo;
		echo ' ================================================';
		echo '||                     L O G                    ||';
		echo ' ================================================';
		echo;
		./console.bash log;
		echo;;
	push)
		cp app.php/view.php ../../loosely-coupled-figure-editor--vendor/vendor/sell/FPD-view.php;
		cp public/assets-proper/holy-grail.css ../../loosely-coupled-figure-editor--vendor/vendor/sell/holy-grail.css;;
	pull)
		echo 'Not implemented for security reasons. Do it manually.';;
	contextmenu-universe)
		sed -nf console.aux/CMO-constructoralias-2nd-arg.sed public/app.js/widget-pillar/FigureWidget.js;;
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
		echo ' - view.php';
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
