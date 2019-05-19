// A widget is an architectually columnal, pillar-like thing holding a high-level (geometrical) and a low-level (SVG) part
// A widget is a cache of a record (assignment item/element, ordered pair) of a bijection, possibly a ternary or multiple-attribute bijection

// @TODO `WidgetEventPosition` is probably superfluous, could be substituted easily with another solution
// or
// @TODO common ancestor with `WigetInstance`. Note also the formal sameness of the constructors (only the typing differs)
function WidgetEventPosition(widgetFactory, high, low)
{
	this.widgetFactory = widgetFactory;

	this.high = high;
	this.low  = low;
}

WidgetEventPosition.prototype.create = function (domainStamp) {return this.widgetFactory.stampAt(domainStamp, this.high);};  // @TODO swap object receiver and argument around method
