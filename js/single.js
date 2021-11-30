const info = new URLSearchParams(location.search);
const filmId = Number(info.get('id'));

const getFilmData = async () => {
    const response = await getFilmDetails(filmId);
    const filmData = await response.json();

    const header = document.getElementById('movie-header');
    header.textContent = filmData.nameRu;

    const poster = document.getElementById('movie-poster');
    poster.src = filmData.posterUrl;
    poster.alt = `Постер фильма ${filmData.nameRu}`;

    const desc = document.querySelector('#movie-desc p');
    desc.textContent = filmData.description;

    const countries = document.getElementById('movie-country');
    countries.innerText = filmData.countries.flatMap(x => x.country).join(', ');

    const duration = document.querySelector('#movie-duration strong');
    duration.innerText = `${filmData.filmLength} мин. / ${getFormattedTime(filmData.filmLength)}`;

    const scoreSource = document.querySelector('#movie-score-source');
    scoreSource.innerText = "Кинопоиск";

    const scoreValue = document.querySelector('#movie-score-value');
    scoreValue.innerText = `${filmData.ratingKinopoisk}/10`;
}

const getFilmDistrData = async () => {
    const filmDistrData = await getFilmDistrDetails(filmId).then(d => d.json());

    const releaseDate = document.getElementById('movie-release-date');
    releaseDate.innerText = getFormattedDate(filmDistrData.items.find(x => x.type === 'WORLD_PREMIER').date);
}

const RANK_STAR_CLASS_SELECTED = 'rank__svg_selected';
const RANK_STAR_CLASS_BLOCKED = 'rank__svg_blocked';
const stars = document.querySelectorAll('.rank__svg');
const likes = document.getElementById('likes-counter');

const getFilmMetaInfo = async () => {
    const { body: filmInfo } = await fetch(`http://inno-ijl.ru/multystub/stc-21-03/film/${filmId}`).then(d => d.json());

    const views = document.getElementById('views-counter');
    views.textContent = `${filmInfo.views} просмотр(а, ов)`;


    const rank = document.getElementById('rank');
    const rankAvg = filmInfo.ratings.reduce((acc, item) => acc + +item, 0) / filmInfo.ratings.length;
    const rankValue = Math.round(rankAvg * 10) / 10;
    const rankString = String(rankValue).padEnd(3, '.0');
    rank.textContent = rankString;

    const LSF_RANK_KEY = `film-rank-${filmId}`;

    if (localStorage.getItem(LSF_RANK_KEY)) {
        for (let i = 0; i < stars.length; i++) {
            stars[i].classList.add(RANK_STAR_CLASS_BLOCKED);
            if (i <= Math.round(rankValue) - 1) {
                stars[i].classList.add(RANK_STAR_CLASS_SELECTED);
            } else {
                stars[i].classList.remove(RANK_STAR_CLASS_SELECTED);
            }
        }
    } else {
        for (let i = 0; i < stars.length; i++) {
            if (i <= Math.round(rankValue) - 1) {
                stars[i].classList.add(RANK_STAR_CLASS_SELECTED);
            } else {
                stars[i].classList.remove(RANK_STAR_CLASS_SELECTED);
            }
        }

        for (const star of stars) {
            star.addEventListener('click', function () {
                if (!star.classList.contains(RANK_STAR_CLASS_BLOCKED)) {
                    const rating = +this.dataset.ratingValue;

                    fetch(`http://inno-ijl.ru/multystub/stc-21-03/film/${filmId}/rating`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ rating }),
                    }).then(getFilmMetaInfo);

                    localStorage.setItem(LSF_RANK_KEY, true);
                }
            });
        }
    }

    const likeIcon = document.getElementById('likes-counter-svg');
    likes.textContent = `${filmInfo.likes} лайк(а, ов)`;
    likes.dataset.likesCount = filmInfo.likes;

    const LSF_LIKE_KEY = `film-like-${filmId}`;

    if (localStorage.getItem(LSF_LIKE_KEY)) {
        likeIcon.classList.add('likes-counter__svg_selected');
    } else {
        likeIcon.addEventListener('click', function () {
            if (!likeIcon.classList.contains('likes-counter__svg_selected')) {
                fetch(`http://inno-ijl.ru/multystub/stc-21-03/film/${filmId}/like`, {
                    method: 'POST'
                });

                this.classList.add('likes-counter__svg_selected');
                const currentLikesCount = Number(likes.dataset.likesCount);
                likes.textContent = `${currentLikesCount + 1} лайк(а, ов)`;

                localStorage.setItem(LSF_LIKE_KEY, true);
            }
        });
    }
}

const getFilmStaff = async () => {
    const filmStaffData = await getFilmStaffDetails(filmId).then(d => d.json());

    const filmStaff = {
        directors: [],
        writers: [],
        producers: [],
        operators: [],
        composers: [],
        designers: [],
    };

    filmStaffData.forEach(staff => {
        if (staff.nameRu != '') {
            switch (staff.professionKey) {
                case 'DIRECTOR':
                    filmStaff.directors.push(staff.nameRu);
                    break;
                case 'WRITER':
                    filmStaff.writers.push(staff.nameRu);
                    break;
                case 'PRODUCER':
                    filmStaff.producers.push(staff.nameRu);
                    break;
                case 'OPERATOR':
                    filmStaff.operators.push(staff.nameRu);
                    break;
                case 'COMPOSER':
                    filmStaff.composers.push(staff.nameRu);
                    break;
                case 'DESIGN':
                    filmStaff.designers.push(staff.nameRu);
                    break;
            }
        }
    });

    for (const professionStaff in filmStaff) {
        const staffList = document.getElementById(`movie-${professionStaff}`);
        staffList.innerText = filmStaff[professionStaff].join(', ');
    }
}

const getOtherFilmsData = async () => {
    const { films } = await getTopFilms().then(d => d.json());

    const requests = [];
    const actionFilms = [];
    const dramaFilms = [];
    let i = 0;

    films.forEach(film => {
        if (film.filmId != filmId) {
            i++;
            const getDirectorName = new Promise((resolve) => {
                setTimeout(async () => {
                    const filmStaffData = await getFilmStaffDetails(film.filmId).then(d => d.json());
                    const directorName = filmStaffData.find(staff => staff.professionKey === 'DIRECTOR').nameRu;
                    resolve(directorName);
                }, i * 200);
            })
                .then((directorName) => {
                    for ({ genre } of film.genres) {
                        if (genre === "боевик") {
                            actionFilms.push({
                                filmId: film.filmId,
                                nameRu: film.nameRu,
                                posterUrlPreview: film.posterUrlPreview,
                                year: film.year,
                                director: directorName,
                            });
                        }
                        if (genre === "драма") {
                            dramaFilms.push({
                                filmId: film.filmId,
                                nameRu: film.nameRu,
                                posterUrlPreview: film.posterUrlPreview,
                                year: film.year,
                                director: directorName,
                            });
                        }
                    }
                });

            requests.push(getDirectorName);
        }
    });

    await Promise.all(requests);

    renderOtherFilmsGallery(actionFilms, 'jenre-movies-slider__items-container1', 'jenre-movies-slider__nav1');
    renderOtherFilmsGallery(dramaFilms, 'jenre-movies-slider__items-container2', 'jenre-movies-slider__nav2');

    function renderOtherFilmsGallery(genreFilms, containerId, navId) {
        const filmsContainer = document.getElementById(containerId);
        filmsContainer.innerHTML = '';

        genreFilms.forEach(genreFilm => {
            const filmsContainerItem = document.createElement('div');
            filmsContainerItem.classList.add('jenre-movies-slider-item');
            filmsContainer.append(filmsContainerItem);

            const filmPoster = document.createElement('div');
            filmPoster.classList.add('jenre-movies-slider-item__img');
            filmsContainerItem.append(filmPoster);

            const filmLink = document.createElement('a');
            filmLink.target = '_blank';
            filmLink.href = `/single/?id=${genreFilm.filmId}`;
            filmPoster.append(filmLink);

            const filmPosterImg = document.createElement('img');
            filmPosterImg.src = genreFilm.posterUrlPreview;
            filmPosterImg.alt = `Постер фильма ${genreFilm.nameRu}`;
            filmLink.append(filmPosterImg);

            const filmHeader = document.createElement('div');
            filmHeader.classList.add('jenre-movies-slider-item__title');
            filmHeader.innerText = genreFilm.nameRu;
            filmsContainerItem.append(filmHeader);

            const filmInfo = document.createElement('div');
            filmInfo.classList.add('jenre-movies-slider-item__info');
            filmInfo.innerText = genreFilm.year + ', фильм ' + genreFilm.director;
            filmsContainerItem.append(filmInfo);
        });

        renderOwlCarousel(`#${containerId}`, genreFilms.length >= 6 ? 6 : genreFilms.length, `#${navId}`, 'div');
    }
}

getFilmData();
getFilmDistrData();
getFilmMetaInfo();
getFilmStaff();

renderOwlCarousel('#jenre-movies-slider__items-container1', 6, '#jenre-movies-slider__nav1', 'div');
renderOwlCarousel('#jenre-movies-slider__items-container2', 6, '#jenre-movies-slider__nav2', 'div');
getOtherFilmsData();
updateOwlCarousel('#jenre-movies-slider__items-container1', { w320: 1, w550: 2, w768: 3, wdefault: 6 }, '#jenre-movies-slider__nav1', 'div');
updateOwlCarousel('#jenre-movies-slider__items-container2', { w320: 1, w550: 2, w768: 3, wdefault: 6 }, '#jenre-movies-slider__nav2', 'div');