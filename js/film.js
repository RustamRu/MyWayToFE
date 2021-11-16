class Film {
    constructor(filmData) {
        this._data = filmData;
        this._data.time = `${getRandomTime(9, 23)}:${getRandomTime(0, 60)}`;
    }
    getMovieId() {
        return this._data.id || `${this._data.title.replaceAll(" ", "")}-${this._data.starttime}`; // id нужно для идентификации записи, будет добавлено позже
    }
    getMovieStartTime() {
        return this._data.starttime;
    }
    getMovieTitle() {
        return this._data.title;
    }
    getMovieGenres() {
        return this._data.genres.join(', ');
    }
    getMovieTitle() {
        return this._data.title;
    }
    isNotForAdult() {
        return this._data.rate !== "R" && this._data.rate !== "NC-17";
    }

    renderFilmTableItem() {
        return `<tr class="choose-movie-tr">
      <td class="choose-movie-td _text-centered choose-movie__choose-movie-td">
      <input
        type="checkbox"
        class="choose-movie__checkbox"
        id="${this.getMovieId()}"
      />
      <label for="${this.getMovieId()}">
      </label>
      </td>
      <td class="choose-movie-td choose-movie__choose-movie-td">
        ${this._data.time}
      </td>
      <td class="choose-movie-td choose-movie__choose-movie-td">
        ${this.getMovieTitle()}
      </td>
      <td class="choose-movie-td choose-movie__choose-movie-td">
        ${this.getMovieGenres()}
      </td>
      </tr>`;
      };
}