// namespace SimpleFailableInstantAjaj (abbrev SFIA):

const SFIA =
{
	get: function (url, processMaybeResponse)
	{
		SFIA._get(
			url,
			SFIA.toLow(processMaybeResponse)
		);
	},

	_get: function (url, xhrOnLoad)
	{
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.addEventListener('load', xhrOnLoad);
		xhr.open('GET', url);
		xhr.send();
	},

	toLow: function (processMaybeResponse)
	{
		return event =>
		{
			const xhr = event.target;
			switch (xhr.status) {
				case 200: return processMaybeResponse(Maybe.just(xhr.response));
				default : return processMaybeResponse(Maybe.nothing());
			}
		};
	}
};

const SimpleFailableInstantAjaj = SFIA;
