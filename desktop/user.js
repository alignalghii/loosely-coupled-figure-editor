window.addEventListener('load',  main);

function main(e)
{
	const img = document.getElementById('work-svg'); // @TODO DRY
	img.addEventListener('click', communicate);
};

function communicate(e)
{	const xhr = new XMLHttpRequest;
	//xhr.responseType = 'json';
	xhr.addEventListener('load', updateDOM);
	xhr.open('POST', '/');
	xhr.send(
		JSON.stringify(
			{x: e.clientX, y: e.clientY}
		)
	);
}

function updateDOM(e)
{
	const name = e.target.response;
	console.log(name);
	const img = document.getElementById('work-svg'); // @TODO DRY
	img.setAttribute('src', `work.svg?case=${name}`); // @credit to https://instructobit.com/tutorial/119/Force-an-image-to-reload-and-refresh-using-Javascript
}
