/* eslint-env jquery */
const API_KEY = '82bc3045329d4d2adcd1b3d37460e828';
const TAG = document.getElementById('search_tag');
const PHOTO_NUM = document.getElementById('num_photos');
const SUBMIT_BTN = document.getElementById('submit_button');

function clearInputs() {
    TAG.value = '';
    PHOTO_NUM.selectedIndex = 0;
}

function makeApiCall() {
    if (TAG.value !== '' && PHOTO_NUM.value !== '') {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${TAG.value}&privacy_filter=1&safe_search=1&extras=url_sq&per_page=${PHOTO_NUM.value}&page=1&format=json&nojsoncallback=1`;
        clearInputs();
        jQuery('#results_container').empty();
        jQuery('#alert_box')
            .append(`<div class="alert alert-info alert-dismissible col-md-6 text-center" id="warning_alert" role="alert">
                Loading results
                <button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`);
        const xmlObj = new XMLHttpRequest();
        const handleRequestStateChange = () => {
            if (xmlObj.readyState === 4 && xmlObj.status === 200) {
                const responseJson = JSON.parse(xmlObj.responseText);
                if (responseJson.photos.photo.length !== 0) {
                    responseJson.photos.photo.forEach((entry) => {
                        jQuery('#results_container')
                            .append(`<div class="col mb-3 mb-sm-">
                <div class="card">
                    <img class="card-img-top" src="${entry.url_sq}">
                    <div class="card-body">
                        <h5 class="card-title">${entry.title}</h5>
                    </div>
                </div>
            </div>`);
                    });
                    jQuery('#alert_box').empty();
                }
            } else {
                jQuery('#alert_box').empty();
                jQuery('#alert_box')
                    .append(`<div class="alert alert-danger alert-dismissible col-md-6 text-center" id="warning_alert" role="alert">
                No Results found!
                <button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`);
            }
        };
        xmlObj.open('GET', url, true);
        xmlObj.onreadystatechange = handleRequestStateChange;
        xmlObj.send();
    } else {
        clearInputs();
        jQuery('#alert_box')
            .append(`<div class="alert alert-warning alert-dismissible col-md-6 text-center" id="warning_alert" role="alert">
                Please fill out both fields!
                <button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`);
        console.log('error');
    }
}

$('.alert .close').on('click', function (e) {
    $(this).parent().hide();
});

SUBMIT_BTN.addEventListener('click', () => {
    jQuery('#alert_box').empty();
    makeApiCall();
});
