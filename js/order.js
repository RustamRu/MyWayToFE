const feedbackFormId = '#feedback-form';

$(document).ready(function () {
    $(feedbackFormId).on('submit', function (e) {
        e.preventDefault();
        let data = new FormData(document.querySelector(feedbackFormId));

        $.ajax({
            url: 'http://study.xeol.ru/api/new_order',
            type: 'post',
            data: data,
            dataType: 'json',
            success: function () {
                alert('Форма успешно отправлена!');
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

    $('input').on('keyup', function () {
        $(this).parent().removeClass('input_error');
    });

});

function showErrors(msg) {
    if (msg.status != 403) {
        let errors = msg.responseJSON.errors;
        if (errors) {
            for (let item in errors) {
                if (item != 'agree') {
                    const input = $(feedbackFormId + ' [name="' + item + '"]');
                    const label = input.parent();
                    label.addClass('input_error');
                    label.children('.input__err-msg').html(errors[item]);
                } else {
                    const label = $(feedbackFormId + ' .checkbox');
                    label.addClass('checkbox_error');
                    label.children('.input__err-msg').html(errors[item]);
                }
            }
        }
    } else {
        alert("Возникла ошибка, повторите попытку позже!");
    }
}

function clearFormFields(feedbackFormId) {
    const fields = $(feedbackFormId + ' .input__input');
    for (let field of fields) {
        if (field.type != 'checkbox') {
            field.value = '';
        } else {
            field.checked = false;
        }
    }
};