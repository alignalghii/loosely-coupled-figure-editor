const anyFlagFalse = flags =>
{
	for (let name in flags)
		if (!flags[name])
			return true;
	return false;
};

const listFalseFlags = flags =>
{
		const errorNames = [];
		for (let name in flags)
			if (!flags[name])
				errorNames.push(name);
		return errorNames;
};

const messageFalseFlags = flags => listFalseFlags(flags).join(', ');
