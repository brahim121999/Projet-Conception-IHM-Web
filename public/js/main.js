/* eslint-env browser */
/* global Mustache, page */
'use strict';

if (window.location.href=='http://localhost:8080/login'){
    sessionStorage.setItem("user",null);
    sessionStorage.setItem("plan",null);
    sessionStorage.setItem("plat",null);
    sessionStorage.setItem("dessert",null);
    sessionStorage.setItem("order",null);

    console.log(sessionStorage.getItem("plat"))
}