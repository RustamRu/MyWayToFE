const moviesContainer = document.getElementById('movies-container');
moviesContainer.innerHTML = '';

fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1', {
    headers: {
        'X-API-KEY': 'e6f0bb4e-a9a2-4b83-abb1-ac92a00a66b2',
        accept: 'application/json'
    }
})
    .then(answer => answer.json())
    .then(data => {
        data.films.forEach(film => {
            fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${film.filmId}`, {
                headers: {
                    'X-API-KEY': 'e6f0bb4e-a9a2-4b83-abb1-ac92a00a66b2',
                    accept: 'application/json'
                }
            })
                .then(answer => answer.json())
                .then(filmData => {
                    const filmDescId = `movies-item-desc-${film.filmId}`;
                    moviesContainer.innerHTML += `
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
                    `
                });
        })
    });