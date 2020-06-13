// namespace UnfailableInstantAjaj (abbrev UFIA):

const UFIA =
{
	get: function (url, processResponse)
	{
		UFIA._get(
			url,
			UFIA.toLow(processResponse)
		);
	},

	_get: function (url, xhrOnLoad)
	{
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json'; // @TODO 'json' portability is weak, use `JSON.parse(httpRequest.responseText)` instead
		xhr.addEventListener('load' , xhrOnLoad);
		xhr.addEventListener('error', e => {throw 'Error';});
		xhr.addEventListener('abort', e => {throw 'Abort';});
		xhr.open('GET', url);
		xhr.send();
	},

	toLow: function (processResponse)
	{
		return event =>
		{
			const xhr = event.target;
			switch (xhr.status) {
				case 200: return processResponse(xhr.response);
				default : throw 'Server-side error received while using `UnfailableInstantAJAJ` (`UFIA`)';
			}
		};
	}
};

const UnfailableInstantAjaj = UFIA;
