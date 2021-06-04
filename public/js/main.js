// js pour gérer la partie public de l'application

'use strict';

// en fonction de la fenêtre sur laquelle on se trouve fait différentes chose

//fenetre de login 
if (window.location.href == 'http://localhost:8080/public/index.html' || window.location.href == 'http://localhost:8080/login') {
    // mise des variables d'environnement à 0 (en cas de déconnexion)
    sessionStorage.setItem("user", null);
    sessionStorage.setItem("plan", null);
    sessionStorage.setItem("plat", null);
    sessionStorage.setItem("dessert", null);
    sessionStorage.setItem("order", null);

    // stockage de l'id_user a la connexion
    let button = document.getElementById("submit");
    button.addEventListener('click', _ => {
        let email = document.getElementById("n1");
        sessionStorage.setItem("user", email.value);
    });
}
else{ // fenetre de creation de compte
    // ajout d'un utilisateur à l'appuie sur le bouton
    let account = document.getElementById("validate");
    account.addEventListener('click', async function () {

        let email = document.getElementById("n1");
        let password = document.getElementById("n2");
        if (email.value === "" || password.value === "") { // mdp ou id vide
            alert("vous n'avez pas rempli le mot de passe et/ou votre adresse mail");
        } 
        else {
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