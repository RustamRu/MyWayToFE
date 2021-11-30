class Popup {
    constructor(name) {
        this.name = name;
        this.popup = document.getElementById(this.name);
        this.popupWrapper = document.querySelector(`#${this.name} .popup__wrapper`);
        this.openBtn = document.getElementById(`${this.name}-open`);
        this._showPopup = function () {
            this.popup.classList.toggle('hidden');
            const inputs = this.popup.querySelectorAll('input');
            for (let input of inputs) {
                input.value = '';
            }            
            inputs[0].focus();
            document.body.style.overflowY = "hidden";
        }
        this.openBtn.addEventListener('click', this._showPopup.bind(this));

        this.closeBtn = document.getElementById(`${this.name}-close`);
        this._hidePopup = function () {
            this.popup.classList.toggle('hidden');
            document.body.style.overflowY = "visible";
        }
        this.closeBtn.addEventListener('click', this._hidePopup.bind(this));

        this._closeOnOutsideClick = function (e) {
            const targetId = e.target.id;

            if (targetId == this.name) {
                if (!this.popupWrapper.contains(e.target) && !this.openBtn.contains(e.target)) {
                    this._hidePopup();
                }
            }
        }

        window.addEventListener('click', this._closeOnOutsideClick.bind(this));
    }
}

const chooseCityPopup = new Popup('choose-city-popup');
const getGiftPopup = new Popup('get-gift-popup');