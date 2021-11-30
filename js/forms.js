/* ========== Получи подарок ========== */
const getGiftPopup_form = document.querySelector('#get-gift-popup-form');
const getGiftPopup_submitButton = document.querySelector('#get-gift-popup-submit-btn');
const getGiftPopup_nameFieldWrapper = document.querySelector('#get-gift-popup input[name="name"]').parentNode;
const getGiftPopup_emailFieldWrapper = document.querySelector('#get-gift-popup input[name="email"]').parentNode;
const getGiftPopup_giftListFieldWrapper = document.querySelector('#get-gift-popup select[name="gift-list"]').parentNode;
const getGiftPopup_agreeMarkFieldWrapper = document.querySelector('#get-gift-popup input[name="get-gift-agree"]').parentNode;
const getGiftPopup_successSubmitMsg = document.querySelector('#get-gift-popup-form .success-submit-msg');

const getGiftPopup_nameField = initFormItem(getGiftPopup_nameFieldWrapper, 'input', 'input_filled', 'input_error');
const getGiftPopup_emailField = initFormItem(getGiftPopup_emailFieldWrapper, 'input', 'input_filled', 'input_error');
const getGiftPopup_giftListField = initFormItem(getGiftPopup_giftListFieldWrapper, 'select', 'input_filled', 'input_error');
const getGiftPopup_agreeMarkField = initFormItem(getGiftPopup_agreeMarkFieldWrapper, 'checkbox', 'checkbox_filled', 'checkbox_error');

getGiftPopup_form.addEventListener('submit', function (event) {
    event.preventDefault();
    const getGiftPopup_nameValue = getGiftPopup_nameField.getValue();
    const getGiftPopup_emailValue = getGiftPopup_emailField.getValue();
    const getGiftPopup_giftListValue = getGiftPopup_giftListField.getValue();
    const getGiftPopup_agreeMarkValue = getGiftPopup_agreeMarkField.getValue();

    if (!getGiftPopup_nameValue) {
        getGiftPopup_nameField.setError('Поле обязательно для заполнения');
        getGiftPopup_nameField.focus();
        return;
    }
    if (!getGiftPopup_emailValue) {
        getGiftPopup_emailField.setError('Поле обязательно для заполнения');
        getGiftPopup_emailField.focus();
        return;
    }
    if (getGiftPopup_giftListValue === 'none') {
        getGiftPopup_giftListField.setError('Поле обязательно для заполнения');
        getGiftPopup_giftListField.focus();
        return;
    }

    if (!getGiftPopup_agreeMarkValue) {
        getGiftPopup_agreeMarkField.setError('Поле обязательно для заполнения');
        getGiftPopup_agreeMarkField.focus();
        return;
    }
    const data = {
        name: getGiftPopup_nameValue,
        email: getGiftPopup_emailValue,
        gift: getGiftPopup_giftListValue,
        agree: getGiftPopup_agreeMarkValue,
    }

    getGiftPopup_form.disabled = true;

    const url = new URL('http://inno-ijl.ru/multystub/stc-21-03/feedback');
    url.search = new URLSearchParams(data).toString();
    fetch(url.toString());

    getGiftPopup_successSubmitMsg.classList.toggle('hidden');
});

/* ========== Обратная связь ========== */
const feedback_form = document.querySelector('#feedback-form');
const feedback_submitButton = document.querySelector('#feedback-submit-btn');
const feedback_nameFieldWrapper = document.querySelector('#feedback-form input[name="name"]').parentNode;
const feedback_emailFieldWrapper = document.querySelector('#feedback-form input[name="email"]').parentNode;
const feedback_seatNumberFieldWrapper = document.querySelector('#feedback-form select[name="place"]').parentNode;
const feedback_feedbackTextFieldWrapper = document.querySelector('#feedback-form textarea[name="feedbackText"]').parentNode;
const feedback_agreeMarkFieldWrapper = document.querySelector('#feedback-form input[name="agree"]').parentNode;
const feedback_successSubmitMsg = document.querySelector('#feedback-form .success-submit-msg');

const feedback_nameField = initFormItem(feedback_nameFieldWrapper, 'input', 'input_filled', 'input_error');
const feedback_emailField = initFormItem(feedback_emailFieldWrapper, 'input', 'input_filled', 'input_error');
const feedback_seatNumberField = initFormItem(feedback_seatNumberFieldWrapper, 'select', 'input_filled', 'input_error');
const feedback_feedbackTextField = initFormItem(feedback_feedbackTextFieldWrapper, 'input', 'input_filled', 'input_error');
const feedback_agreeMarkField = initFormItem(feedback_agreeMarkFieldWrapper, 'checkbox', 'checkbox_filled', 'checkbox_error');

feedback_form.addEventListener('submit', function (event) {
    event.preventDefault();
    const feedback_nameValue = feedback_nameField.getValue();
    const feedback_emailValue = feedback_emailField.getValue();
    const feedback_seatNumberValue = feedback_seatNumberField.getValue();
    const feedback_feedbackTextValue = feedback_feedbackTextField.getValue();
    const feedback_agreeMarkValue = feedback_agreeMarkField.getValue();

    if (!feedback_nameValue) {
        feedback_nameField.setError('Поле обязательно для заполнения');
        feedback_nameField.focus();
        return;
    }
    if (!feedback_emailValue) {
        feedback_emailField.setError('Поле обязательно для заполнения');
        feedback_emailField.focus();
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
        email: feedback_emailValue,
        feedbackText: feedback_feedbackTextValue,
        gift: feedback_seatNumberValue,
        agree: feedback_agreeMarkValue,
    }

    feedback_submitButton.disabled = true;

    const url = new URL('http://inno-ijl.ru/multystub/stc-21-03/feedback');
    url.search = new URLSearchParams(data).toString();
    fetch(url.toString());

    let data_post = new FormData(document.querySelector(feedbackFormId));

    $.ajax({
        url: 'http://study.xeol.ru/api/new_order',
        type: 'post',
        data: data_post,
        dataType: 'json',
        success: (...args) => {
            feedback_successSubmitMsg.classList.toggle('hidden');
            clearFormFields(feedbackFormId);
        },
        error: function (msg) {
            showErrors(msg);
        },
        cache: false,
        contentType: false,
        processData: false,
    });
});


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
    fieldItem.addEventListener('change', function () {
        clearError();
    });
    fieldItem.addEventListener('keyup', function () {
        if ((this.type == 'text' || this.type == 'email' || this.type == 'textarea') && this.value.length > 0) {
            clearError();
        }
    });
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