/* eslint-env browser */
/* global Mustache, page */
'use strict';

if (window.location.href == 'http://localhost:8080/public/index.html' || window.location.href == 'http://localhost:8080/login') {
    sessionStorage.setItem("user", null);
    sessionStorage.setItem("plan", null);
    sessionStorage.setItem("plat", null);
    sessionStorage.setItem("dessert", null);
    sessionStorage.setItem("order", null);

    let button = document.getElementById("submit");
    button.addEventListener('click', _ => {
        let email = document.getElementById("n1");
        sessionStorage.setItem("user", email.value);
    });
}
else{
    let account = document.getElementById("validate");
    account.addEventListener('click', async function () {

        let email = document.getElementById("n1");
        let password = document.getElementById("n2");
        if (email.value === "" || password.value === "") {
            alert("vous n'avez pas rempli le mot de passe et/ou votre adresse mail");
        } else {
            fetch('/api/createaccount', {
                method: "POST",
                body: JSON.stringify({
                    "email": email.value,
                    "password": password.value
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            window.location.href = 'http://localhost:8080/public/index.html';
        }
    });
}