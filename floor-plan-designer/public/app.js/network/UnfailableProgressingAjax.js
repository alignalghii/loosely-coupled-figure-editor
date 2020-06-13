// namespace UnfailableProgressingAjax (abbrev UFPAx):

const UFPAx =
{
	get: function (url, processResponse, progressing, responseType = 'json')
	{
		UFPAx._get(
			url,
			UFPAx.toLow(processResponse),
			progressing,
			responseType // @TODO 'json' portability is weak, use `JSON.parse(httpRequest.responseText)` instead
		);
	},

	post: function (url, requestBody, processResponse, progressing, requestMediaType = 'application/json', responseType = 'json')
	{
		UFPAx._post(
			url,
			requestBody,
			UFPAx.toLow(processResponse),
			progressing,
			requestMediaType,
			responseType // @TODO 'json' portability is weak, use `JSON.parse(httpRequest.responseText)` instead
		);
	},

	_get: function (url, xhrOnLoad, progressing, responseType = 'json')
	{
		const xhr = new XMLHttpRequest();
		xhr.responseType = responseType;
		xhr.addEventListener('load' , e => {progressing(false); xhrOnLoad(e) ;});
		xhr.addEventListener('error', e => {progressing(false); throw 'Error';});
		xhr.addEventListener('abort', e => {progressing(false); throw 'Abort';});
		xhr.open('GET', url);
		xhr.send();
		progressing(true);
	},

	_post: function (url, requestBody, xhrOnLoad, progressing, requestMediaType = 'application/json', responseType = 'json')
	{
		const xhr = new XMLHttpRequest();
		xhr.responseType = responseType;
		xhr.addEventListener('load' , e => {progressing(false); xhrOnLoad(e) ;});
		xhr.addEventListener('error', e => {progressing(false); throw 'Error';});
		xhr.addEventListener('abort', e => {progressing(false); throw 'Abort';});
		xhr.open('POST', url);
		xhr.setRequestHeader("Content-Type", requestMediaType);
		xhr.send(requestBody);
		progressing(true);
	},

	toLow: function (processResponse)
	{
		return event =>
		{
			const xhr = event.target;
			switch (xhr.status) {
				case 200: return processResponse(xhr.response);
				default : throw 'Server-side error received while using `UnfailableProgressingAjax` (`UFPA`)';
			}
		};
	}
};

const UnfailableProgressingAjax = UFPAx;
