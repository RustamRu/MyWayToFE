$(document).ready(function () {
  $(".reviews-container.owl-carousel").owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    items: window.matchMedia('(max-width: 768px)').matches ? 1 : 3,
  });
});

function showHeaderMenu() {
  const headermenu = document.getElementById("nav-wrapper");
  headermenu.style.display = "block";

  const viewportcover = document.getElementById("viewport-cover");
  viewportcover.style.display = "block";

  const burgermenu = document.getElementById("burger-menu");
  burgermenu.style.display = "none";

  document.body.style.overflowY = "hidden";
}
function hideHeaderMenu() {
  const headermenu = document.getElementById("nav-wrapper");
  headermenu.style.display = "none";

  const viewportcover = document.getElementById("viewport-cover");
  viewportcover.style.display = "none";

  const burgermenu = document.getElementById("burger-menu");
  burgermenu.style.display = "block";

  document.body.style.overflowY = "visible";
}

const API_TOKEN = 'e6f0bb4e-a9a2-4b83-abb1-ac92a00a66b2';
const moviesContainer = document.getElementById('movies-container');
const getKinopoiskAPIData = (url) => {
  return fetch(url, {
    headers: {
      'X-API-KEY': API_TOKEN,
      accept: 'application/json'
    }
  })
}

const getTopFilms = () => {
  return getKinopoiskAPIData('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1');
}
const getFilmDetails = (id) => {
  return getKinopoiskAPIData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`);
}
const getFilmDistrDetails = (id) => {
  return getKinopoiskAPIData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/distributions`);
}
const getFilmStaffDetails = (id) => {
  return getKinopoiskAPIData(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`);
}

$(function () {
  $('.scrollup').click(function () {
    $("html").animate({
      scrollTop: 0
    }, 1000);
  })
})

$(window).scroll(() => { $(this).scrollTop() > 200 ? $('.scrollup').fadeIn() : $('.scrollup').fadeOut() });