/* eslint-env browser */
/* global Mustache, page */
'use strict';

if (window.location.href=='http://localhost:8080/login'){
    sessionStorage.setItem("user",null);
    sessionStorage.setItem("plan",null);
    sessionStorage.setItem("plat",null);
    sessionStorage.setItem("dessert",null);
    sessionStorage.setItem("order",null);

    let button = document.getElementById("submit");
        button.addEventListener('click', _=>{
            let email = document.getElementById("n1");
            sessionStorage.setItem("user",email.value);
        });
}