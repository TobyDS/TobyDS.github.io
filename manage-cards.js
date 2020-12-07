/* eslint-disable no-multi-str */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
let counter = 1;
function addCard(interest_id) {
    const tweet = $(
        `<div class="card bg-light m-1" id="unique${counter}"> <div class="card-body"> <button type="button" onclick="deleteCard('unique${counter}')" \
    class="btn btn-danger float-right btn-circle btn-sm mb-3"><i class="fa fa-minus fa-lg text-white" \
    aria-hidden="true"></i></button> </br> <p class="card-text">.... more card info goes here...</div></div>`
    );
    tweet.appendTo(`#${interest_id} > .card-body`);
    counter++;
}

function deleteCard(card_id) {
    document.getElementById(card_id).remove();
}
