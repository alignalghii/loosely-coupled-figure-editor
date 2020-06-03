/** @credit to https://dev.to/iamafro/how-to-create-a-custom-context-menu--5d7p for the underlying HTML menu and its CSS, and the main logic of the JavaScript
 *  @TODO We adapted the lightweight phase of the above homepage. Quick and temporarily satisfactory, but hacky and nonscalable untenable solution
 */

function ContextMenuDriver (aDocument, modeLegacy)
{
	this.document = aDocument; // needed directly due to createElement

	this.contextMenu = aDocument.getElementById('sample-context-menu');
	this.contextMenuCaption = aDocument.getElementById('sample-context-menu-caption');
	this.contextMenuSections = aDocument.getElementById('sample-context-menu-options');

	this.contextMenu.addEventListener('contextmenu', event => event.preventDefault());
}

ContextMenuDriver.prototype.pipeToSM = function (dispatch) {this.dispatch = dispatch;} // it cannot be used right now, but it will be useful at the left clicks // @TODO if not called, this.dispatch will be undefined (nontotal, partial OOP)


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
	const clickHandler = event => {
		const idTag = /sample-context-menu-opion-(.*)/.exec(event.target.id)[1];
		this.dispatch('click', ['void'], {contextAction: idTag}, event);
		for (let i = 0; i < this.contextMenuSections.children.length; i++) {
			const current = this.contextMenuSections.children[i];
			current.style['font-weight'] = current == event.target ? 'bold' : 'normal';
		}
	};

	this.contextMenuCaption.innerHTML = contextMenu.caption;
	this.contextMenuSections.textContent = '';
	for (let optionSection of contextMenu.optionSectioning) { // @TODO more OOP design, probably some responsibility should be delgated to `ContextMenu`
		const hr = this.document.createElement('hr');
		this.contextMenuSections.appendChild(hr);
		for (let option of optionSection) {
			const li = this.document.createElement('li');
			li.classList.add('context-menu-option');
			li.id = `sample-context-menu-opion-${option.idTag}`;
			option.maybeTitle.map(
				title => li.setAttribute('title', title)
			);
			li.innerHTML = option.text;
			this.contextMenuSections.appendChild(li);

			li.addEventListener('click', clickHandler);
		}
	}
};
