// namespace UnfailableProgressingAjaj (abbrev UFPA):

const UFPA =
{
	get: function (url, processResponse, progressing)
	{
		UFPA._get(
			url,
			UFPA.toLow(processResponse),
			progressing
		);
	},

	_get: function (url, xhrOnLoad, progressing)
	{
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json'; // @TODO 'json' portability is weak, use `JSON.parse(httpRequest.responseText)` instead
		xhr.addEventListener('load' , e => {progressing(false); xhrOnLoad(e) ;});
		xhr.addEventListener('error', e => {progressing(false); throw 'Error';});
		xhr.addEventListener('abort', e => {progressing(false); throw 'Abort';});
		xhr.open('GET', url);
		xhr.send();
		progressing(true);
	},

	toLow: function (processResponse)
	{
		return event =>
		{
			const xhr = event.target;
			switch (xhr.status) {
				case 200: return processResponse(xhr.response);
				default : throw 'Server-side error received while using `UnfailableProgressingAJAJ` (`UFPA`)';
			}
		};
	}
};

const UnfailableProgressingAjaj = UFPA;
