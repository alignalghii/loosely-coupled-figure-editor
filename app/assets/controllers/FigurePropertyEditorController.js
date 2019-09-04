function FigurePropertyEditorController(state, aDocument, statusBarDriver)
{
	this.state = state;
	this.document = aDocument
	this.statusBarDriver = statusBarDriver;

	// @TODO: Handle boundary ( > 26)
	this.vertexNames =      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	this.angleNames  =      'αβγδεζηθικλμνξοπρστυφχψω'  .split('');
	this.edgeNames   = tour('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')).map(([A, B]) => `${A}${B}`);

	this.element = aDocument.getElementById('figurepropertyeditor');
}

FigurePropertyEditorController.prototype.main = function (currentWEPos, eitherTarget)
{
	this.statusBarDriver.report(`Alakzat szerkeszthető tulajdonságai. Kattintási pozíció: ${JSON.stringify(currentWEPos)}. Kattintás ${either(_ => 'üres vászonfelületre', _ => 'widgetre', eitherTarget)}.`);
	either(
		canvas => this.close(),
		widget => this.open(widget),
		eitherTarget
	);
};

FigurePropertyEditorController.prototype.open = function (widget)
{
	const content_old = this.document.getElementById('figurepropertyeditor_content');
	if (content_old) content_old.remove();

	this.state.mbFigurePropertyEditorForm = ['just', widget];

	const vertices = widget.high.vertices;
	const edgeMeasures  = getEdgeMeasures(vertices);
	const angleMeasures = getAngleMeasures(vertices);
	const perimeter     = getPerimeter(vertices);
	const area          = getArea(vertices);
	const n             = vertices.length;
	const content = this.document.createElement('div');
	content.id = 'figurepropertyeditor_content';
	this.element.appendChild(content);

	const spanN = this.document.createElement('span');
	spanN.id = 'n';
	spanN.innerHTML = `${n}-szög`;
	const spanName = this.document.createElement('span');
	spanName.id = 'name';
	spanName.innerHTML = widget.domainObject.name;
	const spanArea = this.document.createElement('span');
	spanArea.id = 'area';
	spanArea.innerHTML = area;
	const spanPerimeter = this.document.createElement('span');
	spanPerimeter.id = 'perimeter';
	spanPerimeter.innerHTML = perimeter;
	const ulAP  = this.document.createElement('ul');
	const liName = this.document.createElement('li');
	const liN = this.document.createElement('li');
	const liA = this.document.createElement('li');
	const liP = this.document.createElement('li');
	liName.innerHTML = 'Név: ';
	liName.appendChild(spanName);
	liN.appendChild(spanN);
	liA.innerHTML = 'Terület: ';
	liA.appendChild(spanArea);
	liP.innerHTML = 'Kerület: ';
	liP.appendChild(spanPerimeter);
	ulAP.appendChild(liName);
	ulAP.appendChild(liN);
	ulAP.appendChild(liA);
	ulAP.appendChild(liP);
	content.appendChild(ulAP);

	const table = this.document.createElement('table');
	table.id = 'edgeAndAngleMeasures';
	content.appendChild(table);
	const edgeAndAngleMeasures = getEdgeAndAngleMeasures(vertices);
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

FigurePropertyEditorController.prototype.close = function ()
{
	this.state.mbFigurePropertyEditorForm = ['nothing'];

	const content = this.document.getElementById('figurepropertyeditor_content');
	if (content) content.remove();
};
