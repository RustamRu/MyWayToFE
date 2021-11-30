const MOVIES_GALLERY_ID = 'movies-gallery';
const moviesContainer = document.getElementById(MOVIES_GALLERY_ID);
const MOVIES_GALLERY_CLASSNAME = 'movies-gallery';
const MOVIES_ITEM_CLASSNAME = 'movies-item';

const renderFilmBlock = (film, filmData) => {
  const filmDescId = `${MOVIES_ITEM_CLASSNAME}__desc-${film.filmId}`;

  const movieItem = document.createElement('div');
  movieItem.classList.add(MOVIES_ITEM_CLASSNAME, `${MOVIES_GALLERY_CLASSNAME}__${MOVIES_ITEM_CLASSNAME}`);

  const webLink = document.createElement('a');
  webLink.href = `/single/?id=${film.filmId}`;
  webLink.target = '_self';
  webLink.title = film.nameRu;
  movieItem.append(webLink);

  const moviePoster = document.createElement('img');
  moviePoster.src = film.posterUrlPreview;
  moviePoster.alt = `Постер фильма "${film.nameRu}"`;
  moviePoster.classList.add(`${MOVIES_ITEM_CLASSNAME}__img`);
  webLink.append(moviePoster);

  const movieCover = document.createElement('div');
  movieCover.classList.add(`${MOVIES_ITEM_CLASSNAME}__cover`);
  webLink.append(movieCover);

  const movieDesc = document.createElement('div');
  movieDesc.classList.add(`${MOVIES_ITEM_CLASSNAME}__desc`);
  movieDesc.id = filmDescId;
  webLink.append(movieDesc);

  const movieHeader = document.createElement('h3');
  movieHeader.classList.add(`${MOVIES_ITEM_CLASSNAME}__title`);
  movieHeader.innerText = film.nameRu;
  movieDesc.append(movieHeader);

  const movieText = document.createElement('p');
  movieText.innerText = filmData.description;
  movieDesc.append(movieText);

  return movieItem.outerHTML;
}

const getBlockFilmsData = async () => {
  try {
    const answer = await getTopFilms();
    const data = await answer.json();
    
    const requests = Array.from({ length: 9 }, (_v, i) => {
      const film = data.films[i];
      return new Promise((resolve) => {
        setTimeout(async () => {
          const answer = await getFilmDetails(film.filmId);
          const filmData = await answer.json();

          const filmBlock = renderFilmBlock(film, filmData);
          filmsLayout.set(film.filmId, filmBlock);
          resolve(filmsLayout);
        }, i * 300);
      });
    });

    const filmsLayout = new Map();

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