// const SYPEX_URL = 'http://api.sypexgeo.net/';
const SYPEX_URL = 'http://api.sypexgeo.net/json/92.255.196.137'; //Казань
const GLAVPUNKT_URL = 'https://glavpunkt.ru/api/get_rf_cities';
const GLAVPUNKT_DELIVERY_TARIF_URL = 'https://glavpunkt.ru/api/get_tarif';

let city = localStorage.getItem('user-city'), cities, tarif;

async function getRequest(request_obj) {
    await $.ajax({
        type: 'GET',
        dataType: "json",
        data: request_obj.query_data,
        url: request_obj.url,
        success: response => request_obj.success_callback.call(response),
        error: () => {
            if (request_obj.error_callback) {
                request_obj.error_callback();
            }
        }
    });
}

function setCity() {
    city = this.city.name_ru;
    $('#city-link').html(city);
}
function getCity() {
    $('#choose-city-popup').removeClass('hidden');
    $('#city_input').focus();

    if (!cities) {
        getRequest({ url: GLAVPUNKT_URL, success_callback: setCities });
    }
}

async function showCitiesList(string) {
    let html = '<ul>', counter = 0;

    const matches = cities.filter(item => item.name.toLowerCase().indexOf(string.toLowerCase()) > -1);

    for (let i in matches) {
        if (matches.length > 0 && counter < 5) {
            html += '<li>' + matches[i].name + '</li>';
            counter++;
        }
    }
    if (matches.length == 1) {
        const city = matches[0].name;
        await getDeliveryTarif(city);
    };
    html += '</ul>';

    $('#search_result').html(html);

}

function setCities() {
    cities = this;
}

async function getDeliveryTarif(city) {
    getRequest({
        url: GLAVPUNKT_DELIVERY_TARIF_URL, query_data: {
            serv: "выдача",
            cityFrom: "Санкт-Петербург",
            cityTo: city,
            weight: 1,
            price: 5000
        }, success_callback: showDeliveryTarif
    });    
    $('#delivery_price').html('Доставим билет в город ' + city + ' за ' + tarif + ' руб.!');
}

function showDeliveryTarif() {
    tarif = this.tarif;
}

$(document).ready(async function () {
    if (!city) {
        await getRequest({ url: SYPEX_URL, success_callback: setCity, error_callback: getCity });
    } else {
        $('#city-link').html(city);
    }
    await getDeliveryTarif(city);

    $('#city-link').on('click', function () {
        $('#choose-city-popup').removeClass('hidden');
        $('#delivery_price').html('Доставим билет в город ' + city + ' за ' + tarif + ' руб.!');
        $('#city_input').focus();
    });
    $('#choose-city-popup-close').on('click', function () {
        $('#choose-city-popup').addClass('hidden');
    });

    $('#city-link').on('click', function () {
        if (!cities) {
            getRequest({ url: GLAVPUNKT_URL, success_callback: setCities });
        }
    });

    $('#city_input').on('change paste keyup', function () {
        showCitiesList($(this).val());
    });

    $(document).on('click', '#search_result li', function () {
        const city = $(this).html();
        $('#city-link').html(city);
        $('#search_result').html('');
        $('#city_input').val('');
        $('#choose-city-popup').addClass('hidden');
        localStorage.setItem('user-city', city);
    });
});