movies = [
    {
        starttime: '10:00',
        title: 'Человек-паук',
        genres: ['фантастика', 'боевик', 'приключения']
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
        genres: ['фантастика', 'боевик', 'комедия']
    }
]

const outputTBody = document.getElementById("movies_output");
let output = '';

let index_last = movies.length - 1;
for (index in movies) {
    output += `<tr class="choose-movie-tr ${index % 2 ? "choose-movie-tr_light" : "choose-movie-tr_dark"}">
    <td class="choose-movie-td choose-movie__choose-movie-td ${index == index_last ? "choose-movie-td_rounded-bottom-left" : ""}">
      &#10004;
    </td>
    <td class="choose-movie-td choose-movie__choose-movie-td">
      ${movies[index].starttime}
    </td>
    <td class="choose-movie-td choose-movie__choose-movie-td">
      ${movies[index].title}
    </td>
    <td class="choose-movie-td choose-movie__choose-movie-td ${index == index_last ? "choose-movie-td_rounded-bottom-right" : ""}">
      ${movies[index].genres.join(', ')}
    </td>
    </tr>`
}

outputTBody.innerHTML = output;