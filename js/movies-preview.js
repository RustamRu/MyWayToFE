const API_TOKEN = 'e6f0bb4e-a9a2-4b83-abb1-ac92a00a66b2';
const moviesContainer = document.getElementById('movies-container');
moviesContainer.innerHTML = 'Загрузка превью фильмов ...';

const getKinopoiskAPIData = (url) => {
  return fetch(url, {
    headers: {
      'X-API-KEY': API_TOKEN,
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

const renderFilmBlock = (film, filmData) => {
  const filmDescId = `movies-item-desc-${film.filmId}`;
  return `
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

const getBlockFilmsData = async () => {
  try {
    const answer = await getTopFilms();
    const data = await answer.json();
    const filmsLayout = new Map();

    const delay = (ms = 1) => new Promise(r => setTimeout(r, ms));

    const getDataSeries = async moviesfunc => {

      for (let film of data.films) {
        await delay();
        const answer = await getFilmDetails(film.filmId);
        const filmData = await answer.json();

        const filmBlock = renderFilmBlock(film, filmData);
        filmsLayout.set(film.filmId, filmBlock);
      }

      let i = 0;
      let moviesContainerHTML = '';

      for (const [,filmLayout] of filmsLayout) {
        moviesContainerHTML += filmLayout;

        i++;
        if (i == 9) { break; }
      }

      moviesContainer.innerHTML = moviesContainerHTML;
    }
    getDataSeries()
  } catch (error) {
    console.error(error);
  }
}

getBlockFilmsData();