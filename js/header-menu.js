/* ========== БОКОВОЕ МЕНЮ ========== */
const sideHaderMenu = document.getElementById('nav-wrapper');
const sideHaderMenu_openBtn = document.querySelector('#burger-menu-btn');
const sideHaderMenu_closeBtn = document.querySelector('#nav-wrapper__close-btn');
const headermenu = document.getElementById("nav-wrapper");
const burgermenu = document.getElementById("burger-menu-btn");
const viewportcover = document.getElementById("viewport-cover");

sideHaderMenu_openBtn.addEventListener('click', showHeaderMenu);
sideHaderMenu_closeBtn.addEventListener('click', hideHeaderMenu);

window.matchMedia('screen and (max-width: 768px)').onchange = (e) => {
    if (!e.matches) {
        resetHeaderMenu();
    }
}

function resetHeaderMenu() {
    headermenu.style.display = "";
    viewportcover.style.display = "";
    burgermenu.style.display = "";
    document.body.style.overflowY = "";
}

function showHeaderMenu() {
    headermenu.style.display = "grid";
    viewportcover.style.display = "block";
    burgermenu.style.display = "none";
    document.body.style.overflowY = "hidden";
}

function hideHeaderMenu() {
    headermenu.style.display = "none";
    viewportcover.style.display = "none";
    burgermenu.style.display = "block";
    document.body.style.overflowY = "visible";
}