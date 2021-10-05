movies = [
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

const renderMoviesTable = { /* filmHelper */
  getMovieId() {
    return this.id || `${movies[index].title.replaceAll(" ", "")}-${movies[index].starttime}`;
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
for (index in movies) {
  if (!renderMoviesTable.getIsForAdults.apply(movies[index])) {
    output += renderMoviesTableRow(movies, index);
  }
}

outputTBody.innerHTML = output;

function renderMoviesTableRow(movies, index) {
  return `<tr class="choose-movie-tr">
<td class="choose-movie-td choose-movie__choose-movie-td">
<input
  type="checkbox"
  class="choose-movie__checkbox"
  id="${renderMoviesTable.getMovieId.apply(movies[index])}"
/>
<label for="${renderMoviesTable.getMovieId.apply(movies[index])}">
</label>
</td>
<td class="choose-movie-td choose-movie__choose-movie-td">
  ${renderMoviesTable.getMovieStartTime.apply(movies[index])}
</td>
<td class="choose-movie-td choose-movie__choose-movie-td">
  ${renderMoviesTable.getMovieTitle.apply(movies[index])}
</td>
<td class="choose-movie-td choose-movie__choose-movie-td">
  ${renderMoviesTable.getMovieGenres.apply(movies[index])}
</td>
</tr>`;
};