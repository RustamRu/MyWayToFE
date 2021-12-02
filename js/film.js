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
    const chooseMovieRow = document.createElement('tr');

    const checkBoxCell = document.createElement('td');
    chooseMovieRow.append(checkBoxCell);

    const checkBoxLabel = document.createElement('label');
    checkBoxLabel.classList.add("checkbox");
    checkBoxCell.append(checkBoxLabel);

    const checkBoxInput = document.createElement('input');
    checkBoxInput.type = "checkbox";
    checkBoxInput.id = this.getMovieId();
    checkBoxInput.classList.add("choose-movie-table__checkbox");
    checkBoxLabel.append(checkBoxInput);

    const checkBoxSvg = document.createElement('svg');
    checkBoxSvg.classList.add("ico-checkmark");
    checkBoxLabel.append(checkBoxSvg);

    const checkBoxSvgUse = document.createElement('use');
    checkBoxSvgUse.setAttribute('xlink:href', '#ico-check-mark');
    checkBoxSvg.append(checkBoxSvgUse);

    const dataTimeCell = document.createElement('td');
    dataTimeCell.innerText = this._data.time;
    chooseMovieRow.append(dataTimeCell);

    const movieTitleCell = document.createElement('td');
    movieTitleCell.innerText = this.getMovieTitle();
    chooseMovieRow.append(movieTitleCell);

    const movieGenresCell = document.createElement('td');
    movieGenresCell.innerText = this.getMovieGenres();
    chooseMovieRow.append(movieGenresCell);

    return chooseMovieRow.outerHTML;
  };
}