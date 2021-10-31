const movies = [
  {
    starttime: '10:00',
    title: 'Человек-паук',
    genres: ['фантастика', 'боевик', 'приключения'],
    isForAdults: true
  },
  {
    starttime: '12:00',
    title: 'Собачья жизнь 2',
    genres: ['фэнтэзи', 'драма', 'комедия']
  },
  {
    starttime: '14:00',
    title: 'История игрушек 4',
    genres: ['мультфильм', 'фэнтэзи', 'комедия']
  },
  {
    starttime: '16:00',
    title: 'Люди в чёрном: Интэрнэшнл',
    genres: ['фантастика', 'боевик', 'комедия'],
    isForAdults: true
  },
  {
    starttime: '14:00',
    title: 'История игрушек 4',
    genres: ['мультфильм', 'фэнтэзи', 'комедия']
  },
  {
    starttime: '16:00',
    title: 'Люди в чёрном: Интэрнэшнл',
    genres: ['фантастика', 'боевик', 'комедия'],
    isForAdults: true
  },
  {
    starttime: '14:00',
    title: 'История игрушек 4',
    genres: ['мультфильм', 'фэнтэзи', 'комедия']
  },
  {
    starttime: '16:00',
    title: 'Люди в чёрном: Интэрнэшнл',
    genres: ['фантастика', 'боевик', 'комедия'],
    isForAdults: true
  }
]

const MoviesTable = { 
  getMovieId() {
    return this.id || `${this.title.replaceAll(" ", "")}-${this.starttime}`; // id нужно для идентификации записи, будет добавлено позже
  },
  getMovieStartTime() {
    return this.starttime;
  },
  getMovieTitle() {
    return this.title;
  },
  getMovieGenres() {
    return this.genres.join(', ');
  },
  getIsForAdults() {
    return this.isForAdults;
  }
}

const outputTBody = document.getElementById("movies_output");
let output = '';

let index_last = movies.length - 1;
for (let index in movies) {
  if (!MoviesTable.getIsForAdults.apply(movies[index])) {
    output += renderMoviesTableRow(movies[index]);
  }
}

outputTBody.innerHTML = output;

function renderMoviesTableRow(movie) {
  return `<tr class="choose-movie-tr">
<td class="choose-movie-td _text-centered choose-movie__choose-movie-td">
<input
  type="checkbox"
  class="choose-movie__checkbox"
  id="${MoviesTable.getMovieId.apply(movie)}"
/>
<label for="${MoviesTable.getMovieId.apply(movie)}">
</label>
</td>
<td class="choose-movie-td choose-movie__choose-movie-td">
  ${MoviesTable.getMovieStartTime.apply(movie)}
</td>
<td class="choose-movie-td choose-movie__choose-movie-td">
  ${MoviesTable.getMovieTitle.apply(movie)}
</td>
<td class="choose-movie-td choose-movie__choose-movie-td">
  ${MoviesTable.getMovieGenres.apply(movie)}
</td>
</tr>`;
};