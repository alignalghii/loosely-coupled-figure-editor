// namespace SimpleFailableInstantAjaj (abbrev SFIA):

const SFIA =
{
	get: function (url, processMaybeResponse)
	{
		SFIA._get(
			url,
			SFIA.toLow(processMaybeResponse, true ),
			SFIA.toLow(processMaybeResponse, false).
		);
	},

	_get: function (url, xhrOnLoad, xhrOnLowProblem)
	{
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json'; // @TODO `'json'` portability is weak, use `JSON.parse(httpRequest.responseText)` instead
		xhr.addEventListener('load' , xhrOnLoad);
		xhr.addEventListener('error', xhrOnLowProblem);
		xhr.addEventListener('abort', xhrOnLowProblem);
		xhr.open('GET', url);
		xhr.send();
	},

	toLow: function (processMaybeResponse, isLoad)
	{
		return event =>
		{
			if (isLoad) {
				const xhr = event.target;
				switch (xhr.status) {
					case 200: return processMaybeResponse(Maybe.just(xhr.response), event);
					default : return processMaybeResponse(Maybe.nothing()         , event);
				}
			} else {
				return ;
			}
		};
	}
};

const SimpleFailableInstantAjaj = SFIA;
