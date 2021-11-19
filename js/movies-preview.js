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

  const movieItem = document.createElement('div');
  movieItem.classList.add('movies-item', 'movies__movies-item');

  const webLink = document.createElement('a');
  webLink.href = filmData.webUrl;
  webLink.target = '_blank';
  webLink.title = film.nameRu;
  movieItem.append(webLink);

  const moviePoster = document.createElement('img');
  moviePoster.src = film.posterUrlPreview;
  moviePoster.alt = `Постер фильма "${film.nameRu}"`;
  moviePoster.classList.add('movies-img', 'movies__movies-img');
  webLink.append(moviePoster);

  const movieCover = document.createElement('div');
  movieCover.classList.add('movies-item-cover', 'movies__movies-item-cover');
  webLink.append(movieCover);

  const movieDesc = document.createElement('div');
  movieDesc.classList.add('movies-item-desc', 'movies__movies-item-desc');
  movieDesc.id = filmDescId;
  webLink.append(movieDesc);

  const movieHeader = document.createElement('h3');
  movieHeader.classList.add('movies-item-desc-h3', 'movies__movies-item-desc-h3');
  movieHeader.innerText = film.nameRu;
  movieDesc.append(movieHeader);

  const movieText = document.createElement('p');
  movieText.classList.add('movies-item-desc-p');
  movieText.innerText = filmData.description;
  movieDesc.append(movieText);

  return movieItem.outerHTML;
}

const getBlockFilmsData = async () => {
  try {
    const answer = await getTopFilms();
    const data = await answer.json();
    const filmsLayout = new Map();

    const getDataSeries = async () => {
      for (let film of data.films) {
        try {
          const answer = await getFilmDetails(film.filmId);
          const filmData = await answer.json();

          const filmBlock = renderFilmBlock(film, filmData);
          filmsLayout.set(film.filmId, filmBlock);
        } catch (error) {
          console.error(error);
        }
      }

      let i = 0;
      let moviesContainerHTML = '';

      for (const [, filmLayout] of filmsLayout) {
        moviesContainerHTML += filmLayout;

        i++;
        if (i == 9) { break; }
      }

      moviesContainer.innerHTML = moviesContainerHTML;
    }
    await getDataSeries();
  } catch (error) {
    console.error(error);
  }
}

getBlockFilmsData();