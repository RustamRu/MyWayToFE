/* $(document).ready(function () {
  $(".reviews-gallery.owl-carousel").owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    items: window.matchMedia('(max-width: 768px)').matches ? 1 : 3,
  });
}); */

const API_TOKEN = 'e6f0bb4e-a9a2-4b83-abb1-ac92a00a66b2';

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

  $('.nav-menu').find('a').click(function () {
    let $href = $(this).attr('href');
    let $anchor = $($href).offset();
    $("html").animate({ scrollTop: $anchor.top });
    return false;
  });

  $('.nav-contacts a[href*="#how-to-get"]').click(function () {
    let $href = $(this).attr('href');
    let $anchor = $($href).offset();
    $("html").animate({ scrollTop: $anchor.top });
    return false;
  });
})

$(window).scroll(() => { $(this).scrollTop() > 200 ? $('.scrollup').fadeIn() : $('.scrollup').fadeOut() });

renderOwlCarousel('#reviews-gallery', 3);
updateOwlCarousel('#reviews-gallery', { w320: 1, w550: 1, w768: 2, wdefault: 3 });

function renderOwlCarousel(items_container, items_amount, nav_container, nav_element) {
  $(items_container).trigger('destroy.owl.carousel');

  $(items_container).owlCarousel({
      loop: true,
      nav: true,
      dots: false,
      navElement: nav_element,
      navContainer: nav_container,
      items: localStorage.getItem(items_container + "-items_amount") > 0 ? localStorage.getItem(items_container + "-items_amount") : items_amount,
      margin: 0,
  });
}

function updateOwlCarousel(items_container, media, nav_container, nav_element) {

  window.matchMedia('screen and (max-width: 320px)').onchange = (e) => {
      if (e.matches) {
          localStorage.setItem(items_container + "-items_amount", media.w320);
          renderOwlCarousel(items_container, media.w320, nav_container, nav_element);
      }
  }
  window.matchMedia('screen and (max-width: 550px) and (min-width: 321px)').onchange = (e) => {
      if (e.matches) {
          localStorage.setItem(items_container + "-items_amount", media.w550);
          renderOwlCarousel(items_container, media.w550, nav_container, nav_element);
      }
  }
  window.matchMedia('screen and (max-width: 768px) and (min-width: 551px)').onchange = (e) => {
      if (e.matches) {
          localStorage.setItem(items_container + "-items_amount", media.w768);
          renderOwlCarousel(items_container, media.w768, nav_container, nav_element);
      }
  }
  window.matchMedia('screen and (min-width: 769px)').onchange = (e) => {
      if (e.matches) {
          localStorage.setItem(items_container + "-items_amount", media.wdefault);
          renderOwlCarousel(items_container, media.wdefault, nav_container, nav_element);
      }
  }
}