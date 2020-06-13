// namespace SimpleFailableProgressingAjaj (abbrev SFPA):

const SFPA =
{
	get: function (url, processMaybeResponse, progressing)
	{
		SFPA._get(
			url,
			SFPA.toLow(processMaybeResponse, true ),
			SFPA.toLow(processMaybeResponse, false),
			progressing
		);
	},

	_get: function (url, xhrOnLoad, xhrOnLowProblem, progressing)
	{
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json'; // @TODO 'json' portability is weak, use `JSON.parse(httpRequest.responseText)` instead
		xhr.addEventListener('load' , e => {progressing(false); xhrOnLoad      (e);});
		xhr.addEventListener('error', e => {progressing(false); xhrOnLowProblem(e);});
		xhr.addEventListener('abort', e => {progressing(false); xhrOnLowProblem(e);});
		xhr.open('GET', url);
		xhr.send();
		progressing(true);
	},

	toLow: function (processMaybeResponse, isLoad)
	{
		const xhr = event.target;
		return event =>
		{
			if (isLoad) {
				switch (xhr.status) {
					case 200: return processMaybeResponse(Maybe.just(xhr.response), event);
					default : return processMaybeResponse(Maybe.nothing()         , event);
				}
			} else {
				return processMaybeResponse(Maybe.nothing(), event);
			}
		};
	}
};

const SimpleFailableProgressingAjaj = SFPA;
