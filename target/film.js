"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Film = /*#__PURE__*/function () {
  function Film(filmData) {
    _classCallCheck(this, Film);

    this._data = filmData;
    this._data.time = "".concat(getRandomTime(9, 23), ":").concat(getRandomTime(0, 60));
  }

  _createClass(Film, [{
    key: "getMovieId",
    value: function getMovieId() {
      return this._data.id || "".concat(this._data.title.replaceAll(" ", ""), "-").concat(this._data.starttime); // id нужно для идентификации записи, будет добавлено позже
    }
  }, {
    key: "getMovieStartTime",
    value: function getMovieStartTime() {
      return this._data.starttime;
    }
  }, {
    key: "getMovieTitle",
    value: function getMovieTitle() {
      return this._data.title;
    }
  }, {
    key: "getMovieGenres",
    value: function getMovieGenres() {
      return this._data.genres.join(', ');
    }
  }, {
    key: "isNotForAdult",
    value: function isNotForAdult() {
      return this._data.rate !== "R" && this._data.rate !== "NC-17";
    }
  }, {
    key: "renderFilmTableItem",
    value: function renderFilmTableItem() {
      return "<tr class=\"choose-movie-tr\">\n      <td class=\"choose-movie-td _text-centered choose-movie__choose-movie-td\">\n      <input\n        type=\"checkbox\"\n        class=\"choose-movie__checkbox\"\n        id=\"".concat(this.getMovieId(), "\"\n      />\n      <label for=\"").concat(this.getMovieId(), "\">\n      </label>\n      </td>\n      <td class=\"choose-movie-td choose-movie__choose-movie-td\">\n        ").concat(this._data.time, "\n      </td>\n      <td class=\"choose-movie-td choose-movie__choose-movie-td\">\n        ").concat(this.getMovieTitle(), "\n      </td>\n      <td class=\"choose-movie-td choose-movie__choose-movie-td\">\n        ").concat(this.getMovieGenres(), "\n      </td>\n      </tr>");
    }
  }]);

  return Film;
}();