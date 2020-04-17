function ContextMenuOption(text, maybeTitle)
{
	this.text = text;
	this.maybeTitle = maybeTitle;
}

const CMO = (text, title) => new ContextMenuOption(text, Maybe.asTruey(title)); // syntactic sugar, intentionally global
