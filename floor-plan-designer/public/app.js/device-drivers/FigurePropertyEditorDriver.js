function FigurePropertyEditorDriver(aDocument, numberHelperAndValidator, quoteHelper) // @TODO `numberHelperAndValidator` collaborator should come rather to the controller
{
	this.document = aDocument;
	this.figurePropertyEditor      = aDocument.getElementById('figurepropertyeditor');
	this.figurePropertyEditorPanel = aDocument.getElementById('figure-property-editor-panel');

	// @TODO: Handle boundary ( > 26)
	this.vertexNames =      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	this.angleNames  =      'αβγδεζηθικλμνξοπρστυφχψω'  .split('');
	this.edgeNames   = tour('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')).map(([A, B]) => `${A}${B}`);

	this.numberHelperAndValidator = numberHelperAndValidator;
	this.quoteHelper              = quoteHelper;
}

FigurePropertyEditorDriver.prototype.pipeToSM = function (dispatch)
{
	const changeInput = event =>
	{
		const target = event.target;
		const [fullMatch, edgeSubmatch, invarianceSubmatch, dasharraySubmatch] = /edge_(.*)|(areainvariance)|dasharray_(.*)|/.exec(target.id);
		if ( edgeSubmatch && !invarianceSubmatch && !dasharraySubmatch) {
			const edgeIndex = parseInt(edgeSubmatch);
			either(
				errMsg     => {this.document.getElementById(`error_${edgeIndex}`).innerHTML = errMsg;},
				edgeLength => dispatch('change', ['edge', 'number'], {edge: edgeIndex, value: edgeLength}),
				this.numberHelperAndValidator.eitherERead(`Nem szám!`, target.value)
			);
		}
		if (!edgeSubmatch &&  invarianceSubmatch && !dasharraySubmatch) dispatch('change', ['areaInvariance', 'bool'], {areaInvariance: target.checked});
		if (!edgeSubmatch && !invarianceSubmatch &&  dasharraySubmatch) dispatch('change', ['string', 'string'], {dasharrayAttribute: dasharraySubmatch, value: target.value});
		const checkFlags = [edgeSubmatch, invarianceSubmatch, dasharraySubmatch].filter(Boolean);
		if (checkFlags.length != 1) throw 'Change event piping bug';
	}
	this.figurePropertyEditor.addEventListener('change', changeInput);

	this.figurePropertyEditor.addEventListener(
		'click',
		event => {
			if (event.target.dataset.name) {
				dispatch('click', ['string'], {floorPattern: event.target.dataset.name});
			}
		}
	);
};

FigurePropertyEditorDriver.prototype.open = function (name, n, perimeter, area, edgeAndAngleMeasures, furnitureNames, svgAttributes)
{
	const content_old = this.document.getElementById('figurepropertyeditor_content');
	if (content_old) content_old.remove();

	const content = this.document.createElement('div');
	content.id = 'figurepropertyeditor_content';
	this.figurePropertyEditor.appendChild(content);

	const spanN = this.document.createElement('span');
	spanN.id = 'n';
	spanN.innerHTML = `${n}-szög`;
	const spanName = this.document.createElement('span');
	spanName.id = 'name';
	spanName.innerHTML = name;
	const spanArea = this.document.createElement('span');
	spanArea.id = 'area';
	spanArea.innerHTML = this.numberHelperAndValidator.show(area);
	const spanPerimeter = this.document.createElement('span');
	spanPerimeter.id = 'perimeter';
	spanPerimeter.innerHTML = this.numberHelperAndValidator.show(perimeter);
	const ulPA  = this.document.createElement('ul');
	const liName = this.document.createElement('li');
	const liN = this.document.createElement('li');
	const liP = this.document.createElement('li');
	const liA = this.document.createElement('li');
	const liDA  = this.document.createElement('li');
	const liDAO = this.document.createElement('li');
	liName.innerHTML = 'Név: ';
	liName.appendChild(spanName);
	liN.appendChild(spanN);
	liP.innerHTML = 'Kerület: ';
	liP.appendChild(spanPerimeter);
	liA.innerHTML = 'Terület: ';
	liA.appendChild(spanArea);
	ulPA.appendChild(liName);
	ulPA.appendChild(liN);
	ulPA.appendChild(liP);
	ulPA.appendChild(liA);
	ulPA.appendChild(liDA);
	ulPA.appendChild(liDAO);
	content.appendChild(ulPA);
	const inDA  = this.document.createElement('input');
	inDA.type = 'text';
	inDA.id = 'dasharray_stroke-dasharray';
	if ('stroke-dasharray' in svgAttributes) inDA.value = svgAttributes['stroke-dasharray'];
	const inDAO = this.document.createElement('input');
	inDAO.type = 'number';
	inDAO.id = 'dasharray_stroke-dashoffset';
	if ('stroke-dashoffset' in svgAttributes) inDAO.value = svgAttributes['stroke-dashoffset'];
	liDA .appendChild(inDA);
	const spanDA = this.document.createElement('span');
	spanDA.innerHTML = 'dasharray';
	liDA .appendChild(spanDA);
	liDAO.innerHTML = this.quoteHelper.onlyTechnicalSpan('dasharray-offset');
	liDAO.prepend(inDAO);
	//liDAO.appendChild(this.quoteHelper.onlyTechnicalSpan('daooffset'));

	const table = this.document.createElement('table');
	table.id = 'edgeAndAngleMeasures';
	content.appendChild(table);
	for (let i in edgeAndAngleMeasures) {
		const [edge, angle] = edgeAndAngleMeasures[i];
		const trA = this.document.createElement('tr');
		table.appendChild(trA);
		const tdAN =  this.document.createElement('td');
		tdAN.innerHTML = `${this.angleNames[i]} (${this.vertexNames[i]}<sub>∡</sub>):`;
		const tdA = this.document.createElement('td');
		tdA.innerHTML = `${this.numberHelperAndValidator.show(angle)}°`;
		trA.appendChild(tdAN);
		trA.appendChild(tdA);
		trA.appendChild(this.document.createElement('td'));
		trA.appendChild(this.document.createElement('td'));
		trA.appendChild(this.document.createElement('td'));
		const trE = this.document.createElement('tr');
		table.appendChild(trE);
		trE.appendChild(this.document.createElement('td'));
		trE.appendChild(this.document.createElement('td'));
		const tdEN = this.document.createElement('td');
		tdEN.innerHTML = `${this.edgeNames[i]}:`;
		trE.appendChild(tdEN);
		const tdE = this.document.createElement('td');
		const inputE = this.document.createElement('input');
		inputE.id = `edge_${i}`;
		inputE.size = 5;
		inputE.value = this.numberHelperAndValidator.show(edge);
		trE.appendChild(tdE);
		tdE.appendChild(inputE);
		const tdErr = this.document.createElement('td');
		tdErr.id = `error_${i}`;
		tdErr.className = 'error';
		trE.appendChild(tdErr);
	}

	const furnitureList = this.document.createElement('ul');
	furnitureList.id = 'furnitureNames';
	content.appendChild(furnitureList);
	for (let furnitureName of furnitureNames) {
		const li = this.document.createElement('li');
		furnitureList.appendChild(li);
		li.innerHTML = furnitureName;
	}

	if (!this.document.getElementById('floor-patterns-list')) {
		UnfailableInstantAjaj.get(
			'/floor-patterns',
			response => {
				const ul = this.document.createElement('ul');
				ul.id = 'floor-patterns-list';
				content.appendChild(ul);
				for (let name of response) {
					const li = this.document.createElement('li');
					const img = this.document.createElement('img');
					const span = this.document.createElement('span');
					span.innerHTML= name;
					span.dataset.name = name;
					img.setAttribute('src', `/img-vendor/floor-patterns/${name}`);
					img.setAttribute('width', 50);
					img.setAttribute('height', 20);
					img.dataset.name = name;
					li.appendChild(img);
					li.appendChild(span);
					ul.appendChild(li)
					li.dataset.name = name;
				}
			}
		);
	}

	this.display();
};

FigurePropertyEditorDriver.prototype.close = function ()
{
	const content = this.document.getElementById('figurepropertyeditor_content');
	if (content) content.remove();

	this.undisplay();
};

FigurePropertyEditorDriver.prototype.  display = function () {this.figurePropertyEditorPanel.style.display = 'initial';};
FigurePropertyEditorDriver.prototype.undisplay = function () {this.figurePropertyEditorPanel.style.display = 'none'   ;};
