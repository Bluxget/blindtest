function movieDBRequest(method, action, callback) {
	const api_key = 'bdb0fe98b5b90ef657125820170aa5d8';
	const language = 'fr-FR';
	const url = 'https://api.themoviedb.org/3/';
	const params = `?api_key=${api_key}&language=${language}`;

	fetch(url + action + params, {
		method: method,
		headers: {
			//"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
		}/*,
		body: 'foo=bar&lorem=ipsum'*/
	})
	.then(function (response) {
		return response.json();
	})
	.then(callback)
	.catch(function (error) {
		console.log('Request failed', error);
	});
}

movieDBRequest('GET', 'movie/120', (res) => {console.log(res)})

movieDBRequest('GET', 'movie/120/similar', (res) => {console.log(res)})

movieDBRequest('GET', 'movie/120/videos', (res) => {console.log(res)})