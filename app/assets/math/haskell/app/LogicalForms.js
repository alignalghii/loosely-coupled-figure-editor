function tour(points)
{
	var n = points.length;
	var res = [];
	for (let i = 0; i < n; i++) {
		res.push([points[i], points[(i+1) % n]]);
	}
	return res;
}

function cycleToOpsTerminatedListWith(areConvex, inequalityOf, edges)
{
	var localizedAngles = tour(edges);
	function opTerminateIt([leg1, leg2]) {return opTerminate(areConvex, inequalityOf, leg1, leg2);}
	return localizedAngles.map(opTerminateIt);
}

function opTerminate(areConvex, inequalityOf, edge1, edge2) {return [inequalityOf(edge1), areConvex(edge1, edge2) ? 'and' : 'or'];}

function opsTerminatedListToDnf(boundnessSign, opTerminatedHalfPlanes)
{
	switch (boundnessSign) {
		case 'containment':
			var [halfPlaneSequences, maybeHalfPlaneSequence] = takeSubTermsSeparatedBy('and', opTerminatedHalfPlanes);
			var cnf = spliceBackIfNeeded(halfPlaneSequences, maybeHalfPlaneSequence);
			return cnfToDnf(cnf);
		case 'complementary':
			var [halfPlaneSequences, maybeHalfPlaneSequence] = takeSubTermsSeparatedBy('or' , opTerminatedHalfPlanes);
			return spliceBackIfNeeded(halfPlaneSequences, maybeHalfPlaneSequence);
	}
}


// Op -> [OpTerminated halfPlane] -> ([[halfPlane]], Maybe [halfPlane])
function takeSubTermsSeparatedBy(separatorOp, oppeds)
{
	var [subterms, maybeSplicebackSubterm] = [[], ['nothing']];
	var index = 0;
	while (index < oppeds.length) {
		var [subterm, maybeIndex] = takeSubTermTerminatedBy(separatorOp, oppeds[index], oppeds, index+1);
		switch (maybeIndex[0]) {
			case 'just':
				subterms.push(subterm);
				index = maybeIndex[1];
				break;
			case 'nothing':
				maybeSplicebackSubterm = ['just', subterm];
				index = oppeds.length;
		}
	}
	return [subterms, maybeSplicebackSubterm];
}


// Op -> OpTerminated halfPlane -> [OpTerminated halfPlane] -> ([halfPlane], Maybe [OpTerminated halfPlane])
function takeSubTermTerminatedBy(terminatorOp, [halfPlane, postOp], oppeds, index)
{
	var subterm = [halfPlane];
	while (index < oppeds.length && postOp != terminatorOp) {
		[halfPlane, postOp] = oppeds[index++];
		subterm.push(halfPlane);
	}
	var maybeIndependentCorpusRemainderIndex = postOp == terminatorOp ? ['just', index] : ['nothing']
	return [subterm, maybeIndependentCorpusRemainderIndex];
}

function cnfToDnf(cnf)
{
	var dnf = [[]];
	var n = cnf.length;
	for (let i = 1; i <= cnf.length; i++) {
		dnf = descartesWith(consX, cnf[n-i], dnf);
	}
	return dnf;
}

function dnfAnd(dnf1, dnf2) {return descartesWith(append, dnf1, dnf2);}

function spliceBackIfNeeded(terms, maybeTermToBeSplicedBack)
{
	function spliceItBack(termToBeSplicedBack) {return spliceBack(terms, termToBeSplicedBack);}
	return maybe(terms, spliceItBack, maybeTermToBeSplicedBack);
}

function spliceBack(terms, termToBeSplicedBack)
{
	function prefixItIfFirst(item, i) {return i == 0 ? termToBeSplicedBack.concat(item) : item;}
	return terms.length > 0 ? terms.map(prefixItIfFirst) : [termToBeSplicedBack];
}
