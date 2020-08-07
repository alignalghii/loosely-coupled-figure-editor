// Most similar to `SimpleFailableInstantAjaj` (abbrev `SFIA`):

const Logger =
{
	write: function (report)
	{
		Logger.post(
			'/log',
			report,
			(maybeResponse, event) => console.log(
				maybeResponse.maybe_val(
					'Log without response',
					response => `Log with response ${JSON.stringify(response)}`
				)
			)
		);
		throw report;
	},

	post: function (url, report, processMaybeResponse)
	{
		Logger._post(
			url,
			report,
			Logger.toLow(processMaybeResponse, true ),
			Logger.toLow(processMaybeResponse, false)
		);
	},

	_post: function (url, report, xhrOnLoad, xhrOnLowProblem)
	{
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json'; // @TODO `'json'` portability is weak, use `JSON.parse(httpRequest.responseText)` instead
		xhr.addEventListener('load' , xhrOnLoad);
		xhr.addEventListener('error', xhrOnLowProblem);
		xhr.addEventListener('abort', xhrOnLowProblem);
		xhr.open('POST', url);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(
			JSON.stringify({
				"report": report,
				"client-time": new Date,
				"call-stack": new Error().stack
			})
		);
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
