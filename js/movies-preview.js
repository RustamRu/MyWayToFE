moviesContainer.innerHTML = 'Загрузка превью фильмов ...';

const renderFilmBlock = (film, filmData) => {
  const filmDescId = `movies-item-desc-${film.filmId}`;

  const movieItem = document.createElement('div');
  movieItem.classList.add('movies-item', 'movies__movies-item');

  const webLink = document.createElement('a');
  webLink.href = `/single/?id=${film.filmId}`;
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
    const requests = [];
    const filmsLayout = new Map();

    for (let film of data.films) {
      const getFilmData = new Promise((resolve) => {
        setTimeout(async () => {
          const answer = await getFilmDetails(film.filmId);
          const filmData = await answer.json();

          const filmBlock = renderFilmBlock(film, filmData);
          filmsLayout.set(film.filmId, filmBlock);
          resolve(filmsLayout);
        }, requests.length * 40);
      });

      requests.push(getFilmData);

      if (requests.length == 9) { break; }
    }

    await Promise.all(requests);

    let moviesContainerHTML = '';

    for (const [, filmLayout] of filmsLayout) {
      moviesContainerHTML += filmLayout;
    }

    moviesContainer.innerHTML = moviesContainerHTML;
  } catch (error) {
    console.error(error);
  }
}

getBlockFilmsData();