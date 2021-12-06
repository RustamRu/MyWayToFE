
const FILLED_CLASS = 'form-item_filled';
const ERROR_CLASS = 'form-item_error';
class FormField {
    constructor(formField) {
        this.name = formField.name;
        this.formField = formField;
        this.tagName = this.formField.tagName.toLowerCase();
        this.type = this.formField.type;
        this.fieldContainer = this.formField.closest('.form-item');
        this.errorTextContainer = this.fieldContainer.querySelector('.form-item__err-msg');
    }

    clearErrorState() {
        this.fieldContainer.classList.remove(ERROR_CLASS);
        this.errorTextContainer.innerText = '';
    }

    clearFilledState() {
        this.fieldContainer.classList.remove(FILLED_CLASS);
    }

    clearValue() {
        this.formField.value = '';
    }

    getValue() {
        return this.formField.value;
    }

    hasInvalidValue() {
        return !this.getValue();
    }

    setError(error) {
        this.errorTextContainer.innerText = error;
        this.fieldContainer.classList.add(ERROR_CLASS);
    }

    addFocusListener() {
        this.formField.addEventListener('focus', function () {
            this.fieldContainer.classList.add(FILLED_CLASS);
        }.bind(this));
    }

    addChangeListener() {
        this.formField.addEventListener('input', function () {
            if (this.formField.value.length > 0) {
                this.clearErrorState();
            }
        }.bind(this));
    }

    addBlurListener() {
        this.formField.addEventListener('blur', function () {
            if (!this.formField.value) {
                this.fieldContainer.classList.remove(FILLED_CLASS);
            }
        }.bind(this));
    }
}

class SelectField extends FormField {
    clearValue() {
        this.formField.value = 'none';
    }

    hasInvalidValue() {
        return this.getValue() === 'none';
    }

    addChangeListener() {
        this.formField.addEventListener('change', function () {
            if (this.formField.value !== 'none') {
                this.clearErrorState();
            }
        }.bind(this));
    }

    addBlurListener() {
        this.formField.addEventListener('blur', function () {
            if (this.formField.value === 'none') {
                this.fieldContainer.classList.remove(FILLED_CLASS);
            };
        }.bind(this));
    }
}

class CheckboxField extends FormField {
    clearValue() {
        this.formField.checked = false;
    }

    getValue() {
        return this.formField.checked;
    }

    addBlurListener() {
        this.formField.addEventListener('blur', function () {
            if (this.formField.checked) {
                this.fieldContainer.classList.remove(FILLED_CLASS);
            }
        }.bind(this));
    }
}
class Form {
    constructor(id, serverUrl) {
        this.id = id;
        this.form = document.getElementById(this.id);
        this.submitBtn = this.form.querySelector('[type="submit"]');
        this.successSubmitTextContainer = this.form.querySelector(`.success-submit-msg`);
        this.serverUrl = serverUrl;

        this._initFormField = function (htmlFormField) {
            let formField;
            if (htmlFormField.tagName === 'SELECT') {
                formField = new SelectField(htmlFormField);
            } else if (htmlFormField.type === 'checkbox') {
                formField = new CheckboxField(htmlFormField);
            } else {
                formField = new FormField(htmlFormField);
            }

            formField.clearErrorState();
            formField.clearFilledState();
            formField.addFocusListener();
            formField.addChangeListener();
            formField.addBlurListener();

            return formField;
        }

        this.formFields = [...this.form.querySelectorAll('.form-item__field')].map(htmlFormField =>
            this._initFormField.call(this, htmlFormField));

        this._getFormData = function () {
            this.form.disabled = true;

            let data = {};
            for (let formField of this.formFields) {
                data[formField.name] = formField.getValue();
            }

            return data;
        };

        this._processSuccessMsg = function () {
            this.successSubmitTextContainer.classList.toggle('hidden');
        };

        this._processErrorMsg = function (msg) {
            console.log("Ошибка HTTP: " + msg); // прописать пользовательские сценарии для различных сообщений об ошибке
        };

        this._sendData = async function (data) {
            let response = await fetch(this.serverUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            response.ok ? this._processSuccessMsg() : this._processErrorMsg(response.status);
        };

        this._validateForm = function (event) {
            event.preventDefault();

            for (let formField of this.formFields) {
                if (formField.hasInvalidValue()) {
                    formField.setError('Поле обязательно для заполнения');
                    formField.formField.focus();
                    return;
                }
            };

            this._sendData(this._getFormData());
        }

        this.form.addEventListener('submit', this._validateForm.bind(this));
    }
}

class FeedbackForm extends Form {
    constructor(id, serverUrl) {
        super(id, serverUrl);

        this._getFormData = function () {
            return new FormData(document.getElementById(this.id));
        };

        this._processErrorMsg = function (msg) {
            switch (msg) {
                case 403:
                    alert("Возникла ошибка, повторите попытку позже!");
                    break;

                case 422:
                    for (let item in errors) {
                        const htmlFormField = this.form.querySelector(`[name="${item}"]`);
                        htmlFormField.setError(errors[item]);
                    }
                    break;
            }
        }

        this._sendData = async function () {
            const data = this._getFormData();

            $.ajax({
                url: this.serverUrl,
                type: 'post',
                data: data,
                dataType: 'json',
                success: () => this._processSuccessMsg(),
                error: (msg) => this._processErrorMsg(msg.status),
                cache: false,
                contentType: false,
                processData: false,
            });
        }
    }

}

const giftPopupForm = new Form('get-gift-popup-form', 'http://inno-ijl.ru/multystub/stc-21-03/feedback');
const feedbackForm = new FeedbackForm('feedback-form', 'http://study.xeol.ru/api/new_order');