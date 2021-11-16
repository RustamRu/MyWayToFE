$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
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