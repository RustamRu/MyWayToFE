"use strict";

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    nav: true,
    dots: false
  });
});

function showHeaderMenu() {
  var headermenu = document.getElementById("nav-wrapper");
  headermenu.style.display = "block";
  var viewportcover = document.getElementById("viewport-cover");
  viewportcover.style.display = "block";
  var burgermenu = document.getElementById("burger-menu");
  burgermenu.style.display = "none";
  document.body.style.overflowY = "hidden";
}

function hideHeaderMenu() {
  var headermenu = document.getElementById("nav-wrapper");
  headermenu.style.display = "none";
  var viewportcover = document.getElementById("viewport-cover");
  viewportcover.style.display = "none";
  var burgermenu = document.getElementById("burger-menu");
  burgermenu.style.display = "block";
  document.body.style.overflowY = "visible";
}