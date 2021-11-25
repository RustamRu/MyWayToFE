/* ========== Получи подарок ========== */
const gifttoeveryonePopup_form = document.querySelector('#gift-to-every-one-popup-form');
const gifttoeveryonePopup_submitButton = document.querySelector('#gift-to-every-one-popup-submit-btn');
const gifttoeveryonePopup_nameFieldWrapper = document.querySelector('#gift-to-every-one-popup input[name="name"]').parentNode;
const gifttoeveryonePopup_emailFieldWrapper = document.querySelector('#gift-to-every-one-popup input[name="email"]').parentNode;
const gifttoeveryonePopup_giftListFieldWrapper = document.querySelector('#gift-to-every-one-popup select[name="gift-list"]').parentNode;
const gifttoeveryonePopup_agreeMarkFieldWrapper = document.querySelector('#gift-to-every-one-popup input[name="gift-to-every-one-popup-pers_data_proc_agree"]').parentNode;

const gifttoeveryonePopup_nameField = initFormItem(gifttoeveryonePopup_nameFieldWrapper, 'input', 'input_filled', 'input_error');
const gifttoeveryonePopup_emailField = initFormItem(gifttoeveryonePopup_emailFieldWrapper, 'input', 'input_filled', 'input_error');
const gifttoeveryonePopup_giftListField = initFormItem(gifttoeveryonePopup_giftListFieldWrapper, 'select', 'input_filled', 'input_error');
const gifttoeveryonePopup_agreeMarkField = initFormItem(gifttoeveryonePopup_agreeMarkFieldWrapper, 'checkbox', 'checkbox_filled', 'checkbox_error');

gifttoeveryonePopup_submitButton.addEventListener('submit', function (event) {
    event.preventDefault();
    const gifttoeveryonePopup_nameValue = gifttoeveryonePopup_nameField.getValue();
    const gifttoeveryonePopup_emailValue = gifttoeveryonePopup_emailField.getValue();
    const gifttoeveryonePopup_giftListValue = gifttoeveryonePopup_giftListField.getValue();
    const gifttoeveryonePopup_agreeMarkValue = gifttoeveryonePopup_agreeMarkField.getValue();

    if (!gifttoeveryonePopup_nameValue) {
        gifttoeveryonePopup_nameField.setError('Поле обязательно для заполнения');
        gifttoeveryonePopup_nameField.focus();
        return;
    }
    if (!gifttoeveryonePopup_emailValue) {
        gifttoeveryonePopup_emailField.setError('Поле обязательно для заполнения');
        gifttoeveryonePopup_emailField.focus();
        return;
    }
    if (gifttoeveryonePopup_giftListValue === 'none') {
        gifttoeveryonePopup_giftListField.setError('Поле обязательно для заполнения');
        gifttoeveryonePopup_giftListField.focus();
        return;
    }

    if (!gifttoeveryonePopup_agreeMarkValue) {
        gifttoeveryonePopup_agreeMarkField.setError('Поле обязательно для заполнения');
        gifttoeveryonePopup_agreeMarkField.focus();
        return;
    }
    const data = {
        name: gifttoeveryonePopup_nameValue,
        email: gifttoeveryonePopup_emailValue,
        gift: gifttoeveryonePopup_giftListValue,
        agree: gifttoeveryonePopup_agreeMarkValue,
    }

    const url = new URL('http://inno-ijl.ru/multystub/stc-21-03/feedback');
    url.search = new URLSearchParams(data).toString();
    fetch(url.toString());
});

/* ========== Обратная связь ========== */
const feedback_form = document.querySelector('#feedback-form');
const feedback_submitButton = document.querySelector('#feedback-submit-btn');
const feedback_nameFieldWrapper = document.querySelector('#feedback-form input[name="name"]').parentNode;
const feedback_emailFieldWrapper = document.querySelector('#feedback-form input[name="email"]').parentNode;
const feedback_seatNumberFieldWrapper = document.querySelector('#feedback-form select[name="place"]').parentNode;
// const feedback_feedbackTextFieldWrapper = document.querySelector('#feedback-form textarea[name="feedbackText"]').parentNode;
const feedback_agreeMarkFieldWrapper = document.querySelector('#feedback-form input[name="agree"]').parentNode;

const feedback_nameField = initFormItem(feedback_nameFieldWrapper, 'input', 'input_filled', 'input_error');
const feedback_emailField = initFormItem(feedback_emailFieldWrapper, 'input', 'input_filled', 'input_error');
const feedback_seatNumberField = initFormItem(feedback_seatNumberFieldWrapper, 'select', 'input_filled', 'input_error');
// const feedback_feedbackTextField = initFormItem(feedback_feedbackTextFieldWrapper, 'input', 'input_filled', 'input_error');
const feedback_agreeMarkField = initFormItem(feedback_agreeMarkFieldWrapper, 'checkbox', 'checkbox_filled', 'checkbox_error');

/* feedback_form.addEventListener('submit', function (event) {
    event.preventDefault();
    const feedback_nameValue = feedback_nameField.getValue();
    const feedback_seatNumberValue = feedback_seatNumberField.getValue();
    const feedback_feedbackTextValue = feedback_feedbackTextField.getValue();
    const feedback_agreeMarkValue = feedback_agreeMarkField.getValue();

    if (!feedback_nameValue) {
        feedback_nameField.setError('Поле обязательно для заполнения');
        feedback_nameField.focus();
        return;
    }
    if (feedback_seatNumberValue === 'none') {
        feedback_seatNumberField.setError('Поле обязательно для заполнения');
        feedback_seatNumberField.focus();
        return;
    }
    if (!feedback_feedbackTextValue) {
        feedback_feedbackTextField.setError('Поле обязательно для заполнения');
        feedback_feedbackTextField.focus();
        return;
    }

    if (!feedback_agreeMarkValue) {
        feedback_agreeMarkField.setError('Поле обязательно для заполнения');
        feedback_agreeMarkField.focus();
        return;
    }
    const data = {
        name: feedback_nameValue,
        feedbackText: feedback_feedbackTextValue,
        gift: feedback_seatNumberValue,
        agree: feedback_agreeMarkValue,
    }

    const url = new URL('http://inno-ijl.ru/multystub/stc-21-03/feedback');
    url.search = new URLSearchParams(data).toString();
    fetch(url.toString());
}); */


/* ========== Функции ========== */
function initFormItem(field, type, filled_class, error_class) {
    const fieldItem = field.querySelector('.input__input');
    const errorText = field.querySelector('.input__err-msg');

    // удаление классов, сигнализирющих об ошибке
    clearError();
    // удаление классов, сигнализирющих о наличии фокуса на элементе; сброс к исходным значениям
    field.classList.remove(filled_class);
    if (type === 'checkbox') {
        fieldItem.checked = false;
    }
    else if (type === 'select') {
        fieldItem.value = 'none';
    } else {
        fieldItem.value = '';
    }
    // отслеживание появления фокуса на элементе
    fieldItem.addEventListener('focus', function () {
        field.classList.add(filled_class);
    });
    // отслеживание манипуляций с элементом
    fieldItem.addEventListener('change', clearError);
    // отслеживание потери фокуса на элементе
    fieldItem.addEventListener('blur', function () {
        const isBlurred = (type === 'checkbox' && fieldItem.checked) || (type === 'select' && fieldItem.value !== 'none') || (type === 'input' && !fieldItem.value)
        if (isBlurred) {
            field.classList.remove(filled_class);
        };
    });

    return {
        focus() {
            fieldItem.focus();
        },
        getValue() {
            return type === 'checkbox' ? fieldItem.checked : fieldItem.value;
        },
        setError(error) {
            errorText.innerText = error;
            field.classList.add(error_class);
        }
    }

    function clearError() {
        field.classList.remove(error_class);
        errorText.innerText = '';
    }
}