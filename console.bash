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
				pwd | grep -vq 'public\|free';
			then
				sed -i 's/\<door-attached2\>/door-attached/g' $(grep -l door-attached2 -nr --include='*.js' --exclude-dir=.git);
		-		{
					cd floor-plan-designer/public;
					cp free-alternative-icons/* img-vendor/;
					ln -s index.free.php  index.php;
					{
						cd assets-proper;
						ln -s holy-grail.free.css  holy-grail.css;
					}
					sed -i 's!^\(\s*\)\([^/]*domHelper.*hide\)!\1// \2!' app.js/device-drivers/TabSelectorDriver.js;
				}
				# .gitignore
				sed -i 's!\<800\([0-9]\)-es\s\+port!801\1-es port!g;s!:800\([0-9]\)\>!:801\1!g' $(grep '\<800[0-9]-es\s\+port\|:800[0-9]\>' -lr .);
				
			else
				echo "It seems to be an already freed folder, at least by its name `pdw`!";
				false;
		fi;
	*)
		echo 'Usage: ./console.bash global-network|free-alternative';
		false;;
esac;
