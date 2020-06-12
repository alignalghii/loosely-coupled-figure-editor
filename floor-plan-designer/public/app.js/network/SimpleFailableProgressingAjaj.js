// namespace SimpleFailableProgressingAjaj (abbrev SFPA):

const SFPA =
{
	get: function (url, processMaybeResponse, progressing)
	{
		SFPA._get(
			url,
			SFPA.toLow(processMaybeResponse),
			progressing
		);
	},

	_get: function (url, xhrOnLoad, progressing)
	{
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.addEventListener('load', e => {progressing(false); xhrOnLoad(e);});
		xhr.open('GET', url);
		xhr.send();
		progressing(true);
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

const SimpleFailableProgressingAjaj = SFPA;
