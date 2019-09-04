function FigurePropertyEditorDriver(aDocument)
{
	this.document = aDocument;
	this.figurePropertyEditor = aDocument.getElementById('figurepropertyeditor');

	// @TODO: Handle boundary ( > 26)
	this.vertexNames =      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	this.angleNames  =      'αβγδεζηθικλμνξοπρστυφχψω'  .split('');
	this.edgeNames   = tour('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')).map(([A, B]) => `${A}${B}`);
}

FigurePropertyEditorDriver.prototype.pipeToSM = function (dispatch)
{
	const changeInput = event =>
	{
		const target = event.target;
		const [fullMatch, edgeSubmatch, invarianceSubmatch] = /edge_(.*)|(areainvariance)/.exec(target.id);
		if ( edgeSubmatch && !invarianceSubmatch) dispatch('change', ['edge', 'number'], {edge: parseInt(edgeSubmatch), value: Number(target.value)});
		if (!edgeSubmatch &&  invarianceSubmatch) dispatch('change', ['areaInvariance', 'bool'], {areaInvariance: target.checked});
		if ( edgeSubmatch &&  invarianceSubmatch || !edgeSubmatch && !invarianceSubmatch) throw 'Change event piping bug';
	}
	this.figurePropertyEditor.addEventListener('change', changeInput);
};

FigurePropertyEditorDriver.prototype.open = function (name, n, perimeter, area, edgeAndAngleMeasures)
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
	spanArea.innerHTML = area;
	const spanPerimeter = this.document.createElement('span');
	spanPerimeter.id = 'perimeter';
	spanPerimeter.innerHTML = perimeter;
	const ulPA  = this.document.createElement('ul');
	const liName = this.document.createElement('li');
	const liN = this.document.createElement('li');
	const liP = this.document.createElement('li');
	const liA = this.document.createElement('li');
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
	content.appendChild(ulPA);

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
		tdA.innerHTML = `${angle}°`;
		trA.appendChild(tdAN);
		trA.appendChild(tdA);
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
		inputE.value = edge;
		trE.appendChild(tdE);
		tdE.appendChild(inputE);
	}
};
