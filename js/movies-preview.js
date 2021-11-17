const API_TOKEN = 'e6f0bb4e-a9a2-4b83-abb1-ac92a00a66b2';
const moviesContainer = document.getElementById('movies-container');
moviesContainer.innerHTML = 'Загрузка превью фильмов ...';

const getKinopoiskAPIData = (url) => {
  return fetch(url, {
    headers: {
      'X-API-KEY': 'e6f0bb4e-a9a2-4b83-abb1-ac92a00a66b2',
      accept: 'application/json'
    }
  })
}

const getTopFilms = () => {
  return getKinopoiskAPIData('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1');
}
const getFilmDetails = (id) => {
  return getKinopoiskAPIData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`);
}

const getBlockFilmsData = async () => {
  try {
    const answer = await getTopFilms();
    const data = await answer.json();

    const delay = (ms = 1) => new Promise(r => setTimeout(r, ms));

    const getDataSeries = async moviesfunc => {
      let results = '';
      for (let i = 0; i < 9; i++) {
        let film = data.films[i];
        await delay();

        const filmDescId = `movies-item-desc-${film.filmId}`;
        const answer = await getFilmDetails(film.filmId);
        const filmData = await answer.json();
        results += `
        <div class="movies-item movies__movies-item">
          <a
            href="${filmData.webUrl}"
            target="_blank"
            title="${film.nameRu}"
          >
            <img
              src="${film.posterUrlPreview}"
              alt='Постер фильма "${film.nameRu}"'
              class="movies-img movies__movies-img"
            />
            <div class="movies-item-cover movies__movies-item-cover"></div>
            <div class="movies-item-desc movies__movies-item-desc" id="${filmDescId}">
              <h3 class="movies-item-desc-h3 movies__movies-item-desc-h3">
              ${film.nameRu}
              </h3>
              <p class="movies-item-desc-p">${filmData.description}
              </p>
            </div>
          </a>
        </div>
        `;
      }
      moviesContainer.innerHTML = results;
      return;
    }
    getDataSeries();
  } catch (error) {
    console.error(error);
  }
}

getBlockFilmsData();