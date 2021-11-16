const movies = [
  {
    starttime: '10:00',
    title: 'Человек-паук',
    genres: ['фантастика', 'боевик', 'приключения'],
    rate: "NC-17"
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
    rate: "R"
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
    rate: "R"
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
    rate: "R"
  }
]

const outputTBody = document.getElementById("movies_output");
const output = movies.reduce((acc, movie) => {
  const movie_ex = new Film(movie);  
  return movie_ex.isNotForAdult() ?
    acc :
    `${acc}${movie_ex.renderFilmTableItem()}`
},
  '');

outputTBody.innerHTML = output;