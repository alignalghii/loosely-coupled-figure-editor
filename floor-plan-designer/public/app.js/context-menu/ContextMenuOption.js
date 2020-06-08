function ContextMenuOption(text, idTag, maybeTitle)
{
	this.text       = text;
	this.idTag      = idTag;
	this.maybeTitle = maybeTitle;
}

const CMO = (text, idTag, title) => new ContextMenuOption(text, idTag, Maybe.asTruey(title)); // syntactic sugar, intentionally global
