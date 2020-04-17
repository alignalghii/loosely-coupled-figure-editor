// @credit to https://dev.to/iamafro/how-to-create-a-custom-context-menu--5d7p for the underlying HTML menu and its CSS, and the main logic of the JavaScript

function ContextMenuDriver (aDocument)
{
	this.document = aDocument; // needed directly due to createElement

	this.contextMenu = aDocument.getElementById('sample-context-menu');
	this.contextMenuCaption = aDocument.getElementById('sample-context-menu-caption');
	this.contextMenuSections = aDocument.getElementById('sample-context-menu-options');

	this.contextMenu.addEventListener('contextmenu', event => event.preventDefault());
}

ContextMenuDriver.prototype.pipeToSM = function (dispatch)
{
	// @TODO consider: the `preventDefault` of the 'contextmenu' should be done normally exactly here, in `ContextMnuDriver` module, thus, a low-level code part. But we want to leave open the possibility to selectively allow the default contextmenu behavior for e.g.empty canvas rightclicks. Thus we raise this code part to the rather high level: we raise it to the level of the `Router`!


};


ContextMenuDriver.prototype.toggleMenu = function (command) {this.contextMenu.style.display = command == 'show' ? 'block' : 'none';};

ContextMenuDriver.prototype.setPosition = function ({left, top}) // @TODO use this concise JS construct everywhere where appropriate
{
	this.contextMenu.style.left = `${left}px`;
	this.contextMenu.style.top  = `${top}px`;
	this.toggleMenu('show');
};

ContextMenuDriver.prototype.adaptTo = function (event)
{
	const origin = { // @TODO introduce a stadalone class for {left, top}
		left: event.pageX,
		top : event.pageY,
	};
	this.setPosition(origin);
};

ContextMenuDriver.prototype.refillContent = function (contextMenu)
{
	this.contextMenuCaption.innerHTML = contextMenu.caption;
	this.contextMenuSections.textContent = '';
	for (let optionSection of contextMenu.optionSectioning) { // @TODO more OOP design, probably some responsibility should be delgated to `ContextMenu`
		const hr = this.document.createElement('hr');
		this.contextMenuSections.appendChild(hr);
		for (let option of optionSection) {
			const li = this.document.createElement('li');
			li.classList.add('context-menu-option');
			option.maybeTitle.map(
				title => li.setAttribute('title', title)
			);
			li.innerHTML = option.text;
			this.contextMenuSections.appendChild(li);
		}
	}
};
