/* ========== Получи подарок ========== */
const gifttoeveryonePopup = document.getElementById('gift-to-every-one-popup');
const gifttoeveryonePopup_openBtn = document.querySelector('#gift-to-every-one-popup-open');
const gifttoeveryonePopup_closeBtn = document.querySelector('#gift-to-every-one-popup-close');

gifttoeveryonePopup_openBtn.addEventListener('click', function () {
    popupToggle(gifttoeveryonePopup);
    gifttoeveryonePopup_nameField.focus();
});
gifttoeveryonePopup_closeBtn.addEventListener('click', function () {
    popupToggle(gifttoeveryonePopup);
});

/* ========== Функции ========== */
function popupToggle(popup) {
    popup.classList.toggle('hidden');
}