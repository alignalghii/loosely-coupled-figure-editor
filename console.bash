#!/bin/bash
case "$1" in
	global-network)
		if
				[[ `hostname` =~ curlgrep ]];
			then
				echo -n 'Deploying... ';
				sed -i 's!http://localhost\>!http://floor-plan-designer.curlgrep-phantom-funspec.hu!g' $(grep 'http://localhost\>' -lr . --exclude=console.bash --exclude-dir=.git);
				echo 'done!';
			else
				echo 'We are not on a public server';
				false;
		fi;;
	free-alternative)
		if
				pwd | grep -q 'free' && ! test -f free-alternative-process-started.status
			then
				touch free-alternative-process-started.status;
				# .gitignore
				sed -i 's!\<800\([0-9]\)-es\s\+port!801\1-es port!g;s!:800\([0-9]\)\>!:801\1!g' $(grep '\<800[0-9]-es\s\+port\|:800[0-9]\>' -lr .);
				(
					cd floor-plan-designer;
					sed -i 's/\<door-attached2\>/door-attached/g' $(grep door-attached2  -lr . --include='*.js' --exclude-dir=.git);
					(
						cd app.php;
						ln -s view.free.php view.php;
					);
					(
						cd public;
						sed -i 's!^\(\s*\)\([^/]*domHelper.*hide\)!\1// \2!' app.js/device-drivers/TabSelectorDriver.js;
						cp free-alternative-icons/*.png img-vendor/;
						cp free-alternative-icons/{logo--transparent--hack,info-icon-bulb-recut-recolor,battering-ram,brick,pickaxe,bucket,window-attached,window-detached,door-attached,door-detached}.png assets-proper/;
						cp free-alternative-icons/*.ogg assets-proper/;
						(
							cd assets-proper;
							ln -s holy-grail.free.css holy-grail.css;
						);
					);
				);
			else
				echo "Either it is not a folder named to be free (`pwd`), or the freeing process has been already done.";
				false;
		fi;;
	*)
		echo 'Usage: ./console.bash global-network|free-alternative';
		false;;
esac;
