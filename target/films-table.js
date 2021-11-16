"use strict";

var movies = [{
  starttime: '10:00',
  title: 'Человек-паук',
  genres: ['фантастика', 'боевик', 'приключения'],
  rate: "NC-17"
}, {
  starttime: '12:00',
  title: 'Собачья жизнь 2',
  genres: ['фэнтэзи', 'драма', 'комедия']
}, {
  starttime: '14:00',
  title: 'История игрушек 4',
  genres: ['мультфильм', 'фэнтэзи', 'комедия']
}, {
  starttime: '16:00',
  title: 'Люди в чёрном: Интэрнэшнл',
  genres: ['фантастика', 'боевик', 'комедия'],
  rate: "R"
}, {
  starttime: '14:00',
  title: 'История игрушек 4',
  genres: ['мультфильм', 'фэнтэзи', 'комедия']
}, {
  starttime: '16:00',
  title: 'Люди в чёрном: Интэрнэшнл',
  genres: ['фантастика', 'боевик', 'комедия'],
  rate: "R"
}, {
  starttime: '14:00',
  title: 'История игрушек 4',
  genres: ['мультфильм', 'фэнтэзи', 'комедия']
}, {
  starttime: '16:00',
  title: 'Люди в чёрном: Интэрнэшнл',
  genres: ['фантастика', 'боевик', 'комедия'],
  rate: "R"
}];
var outputTBody = document.getElementById("movies_output");
var output = movies.reduce(function (acc, movie) {
  var movie_ex = new Film(movie);
  return movie_ex.isNotForAdult() ? acc : "".concat(acc).concat(movie_ex.renderFilmTableItem());
}, '');
outputTBody.innerHTML = output;