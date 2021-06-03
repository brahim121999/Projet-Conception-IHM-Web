/* eslint-env browser */
/* global Mustache, page */
'use strict';

if (window.location.href=='http://localhost:8080/index.html'|| window.location.href=='http://localhost:8080/login'){
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

    let account = document.getElementById("account");
    account.textContent = "allo?";
    account.addEventListener('click', async function() {
        let email = document.getElementById("n1");
        let password = document.getElementById("n2");
        console.log(email.value,password.value);
        fetch('/api/createaccount' ,
            {
                method: "POST",
                body: JSON.stringify({"email": email.value,"password":password.value}),
                headers: { "Content-Type": "application/json" }
            })
    });

    
}
