#!/bin/bash

function getCurlAwk {
	app=http://localhost:8001;
	path="$1";
	filter="$2";
	curl -si "$app$path"\
	|
	tr -d '\r'\
	|
	awk -e "$filter";
}

function testRedirectFailedAuthenticationToLoginPage {
	path="$1";
	getCurlAwk "$1" '/302 Found/ {a=1; next} a && /^Location: \/login-human$/ {b=1} END {exit !(a&&b)}';
}

function testRedirectSuccessfulAuthenticationToMainPage {
	path="$1";
	getCurlAwk "$1" '/200 OK/ {a=1; next} a && /ERP: DB CRUD/ {b=1} END {exit !(a&&b)}';
}

# credit boolean implementation in Bash for to https://blog.plover.com/prog/sh-flags.html and app=http://localhost:8001;
function loopCommandThroughArgs
{
	commandName="$1";
	shift;
	isOK=true;
	for path in "$@";
		do if $commandName "$path"; then echo -e "\t+ [$path]"; else echo -e "\t- [$path]"; isOK=false; fi;
	done;
	$isOK;
}



errors=0;
successes=0;

echo '1. Tesztcsoport (Autentikáció megtagadása): token hiányában a bejelentkezési oldalra való önműködő átirányítás';
if
		loopCommandThroughArgs testRedirectFailedAuthenticationToLoginPage '' '/' '/show-all';
	then
		echo '... siker.'
		((successes++));
	else
		echo '... kudarc';
		((errors++));
fi;
echo ;
echo '2. Tesztcsoport (Autentikáció hamisítása): token megléte de annak érvényességének hiánya esetében a főalkalmazási oldalra való önműködő átirányítás';
if
		loopCommandThroughArgs testRedirectSuccessfulAuthenticationToMainPage '/?token=100' '?token=100' '/show-all?token=100' '?token=105' '/?token=105' '/show-all?token=105';
	then
		echo '... siker.'
		((successes++));
	else
		echo '... kudarc';
		((errors++));
fi;
echo;

echo '3. Tesztcsoport (Autentikáció szabályos): érvényes token felmutatása';
echo -e '\tÉrvényes token megszerzése:';
echo -ne '\t* Cleanup any earlier tokens from DB session table... ';
# For selective suppressing of warning, credit to https://stackoverflow.com/a/34817954
mysql -u floor_plan_designer_user -pfloor_plan_designer_user_password floor_plan_designer -e 'DELETE FROM `session`;' 2>&1 | grep -v 'command line';
echo 'done.';
echo -ne '\t* Retrive login data of a (the first) user from DB user table... ';
logindata=$(mysql -u floor_plan_designer_user -pfloor_plan_designer_user_password floor_plan_designer -Ne 'SELECT * FROM `user` LIMIT 1;' 2>&1 | grep -v 'command line' | sed 's/^[0-9]\+\s\(\w\+\)\s\(\w\+\)$/export name=\1 password=\2/');
$logindata;
echo "name: $name, password: $password.";
echo -ne '\t* Send POST login form with these user data, and detect authentication token from response redirect... ';
token=$(curl -s -d name=admin -d password=admin0 http://localhost:8001/login-human --trace-ascii - | tr -d '\r' | grep 'Location:.*token' | sed 's/.*token=\([0-9]\+\)/\1/');
echo -e "token: $token.";
echo;
echo -e '\tTesztelés ezzel a tokennel:';
if
		loopCommandThroughArgs testRedirectSuccessfulAuthenticationToMainPage "?token=$token" "/?token=$token" "/show-all?token=$token";
	then
		echo '... siker.'
		((successes++));
	else
		echo '... kudarc';
		((errors++));
fi;
echo;

echo;

echo "Summary: Out of $((errors + successes)) cases, there are $((successes)) succeeded cases and $((errors)) errors";
