function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function movieDBRequest(method, action, callback) {
	const api_key = 'bdb0fe98b5b90ef657125820170aa5d8';
	const language = 'fr-FR';
	const url = 'https://api.themoviedb.org/3/';
	const params = `?api_key=${api_key}&language=${language}`;

	fetch(url + action + params, {
		method: method
	})
	.then(function (response) {
		return response.json();
	})
	.then(callback)
	.catch(function (error) {
		console.log('Request failed', error);
	});
}

function start(movieId) {
	movieDBRequest('GET', `movie/${movieId}/similar`, (res) => {
		let iRandom = getRandomInt(res.results.length);
		const movieToFound = res.results[iRandom];

		let resumeImg = document.querySelector('#resume-img');
		resumeImg.style.transition = '';
		resumeImg.src = `https://image.tmdb.org/t/p/w200/${movieToFound.poster_path}`;
		resumeImg.style.filter = 'blur(5rem)';
		setTimeout(() => { resumeImg.style.transition = '1s' }, 500);
		document.querySelector('#resume-text').innerHTML = movieToFound.overview;

		movieDBRequest('GET', `movie/${movieToFound.id}/similar`, (res) => {
			let responses = [];

			const randomInsertMovie = getRandomInt(4);

			for(let i = 0; i < 4; i++) {
				if(i == randomInsertMovie) {
					responses.push(movieToFound);
				}

				iRandom = getRandomInt(res.results.length);
				responses.push(res.results[iRandom]);
			}

			responses.sort();

			const ul = document.querySelector('#responses-list');
			ul.innerHTML = '';

			responses.forEach((movie) => {
				let li = document.createElement('li');
				li.setAttribute('movieId', movie.id);

				if(movie.id == movieToFound.id) {
					li.classList.add('response');
				}

				li.style.backgroundImage = `url('https://image.tmdb.org/t/p/w300/${movie.poster_path}')`

				let movieTitle = document.createElement('div');
				movieTitle.classList.add('movie-title');
				movieTitle.appendChild(document.createTextNode(movie.title));

				li.addEventListener('click', checkResponse);

				li.appendChild(movieTitle);

				ul.appendChild(li);
			});
		});
	});
}

function checkResponse(event) {
	const target = event.target;
	const response = document.querySelector('.response');

	document.querySelectorAll('#responses-list li').forEach((li) => {
		if(li != target && li != response){
			li.style.filter = 'blur(1.5rem)';
		}
	});

	if(target != response) {
		target.querySelector('.movie-title').style.backgroundColor = 'red';
		target.style.transform = 'rotate(5deg)';
	}

	response.querySelector('.movie-title').style.backgroundColor = 'green';

	document.querySelector('#resume-img').style.filter = 'blur(0)';

	setTimeout(() => { start(target.getAttribute('movieId')) }, 5000);
}

window.addEventListener("DOMContentLoaded", () => {
	start(120); // 120 = id Seigneur des anneaux
});