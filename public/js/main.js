/* eslint-env browser */
/* global Mustache, page */
'use strict';

// Le script principal de notre application single page
// Celui-ci effectue le routing coté client (et d'autres choses)


//fonction asynchrone pour charger les différentes orders
const loadorders = function (){
    
};

// route pour la page d'authentification des utilisateurs
page('login', async function () {
    // pas besoin de faire de await sur cet appel puisqu'il n'y a pas d'autre 
    // traitement ensuite
    renderLoginPage(context);

    // fonction interne d'affichage de la page 
    async function renderLoginPage(context) {
        // On rend le template
        await renderTemplate(templates('public/templates/login.mustache'), context);

        // Puis on ajoute l'écouteur d'évenement sur les boutons
        const cancel_btn = document.querySelector('#cancel-btn');
        cancel_btn.addEventListener('click', function () {
            page('/');
        });
        const login_btn = document.querySelector('#login-btn');
        login_btn.addEventListener('click', async function () {
            // Récupération du login et du mot de passe
            const username = document.querySelector('input[placeholder="username"]').value;
            console.log('username: ' + username);
            const password = document.querySelector('input[placeholder="password"]').value;
            let result;
            try {
                // On fait ensuite un fetch sur l'api pour s'authentifier
                result = await fetch('api/login', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                    },
                    method: 'POST',
                    body: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password),
                });
            }
            catch (e) {
                console.error(e);
                return;
            }
            try {
                if (result.ok) {
                    // Si tout s'est bien passé
                    result = await result.json();
                    // Et que l'authentification s'est bien passée
                    if (result.success) {
                        // on passe à la page d'administration
                        context.logged = true;
                        page('/admin');
                    }
                    else {
                        // Sinon on réaffiche la page avec quelques infos pour expliquer ce qui n'a pas marché
                        renderLoginPage({...context, username, password, message: result.message});
                    }
                }
            }
            catch (e) {
                console.error(e);
                return;
            }
        });
    }
});
/*
// Route pour la page principale (index.html)
page('/', async function () {
};
*/

page('/private/app.html', async function () {
    let response = await fetch('api/order');
    let orders = await response.json();
            
    let section = document.querySelector('main section');
    for ( let i = 0; i < orders.length; i = i + 1){ // pour chaque order
        //creation article
        let article = document.createElement('article');

        //creation des différents paragraphe
        let date = document.createElement('p');
        date.class = 'date';
        date.textContent = orders[i].creation_time

        let heure = document.createElement('p');
        heure.class = 'heure';
        heure.textContent = orders[i].collecting_time

        let price = document.createElement('p');
        price.class = 'price';
        price.textContent = orders[i].price

        let statut = document.createElement('p');
        statut.class = 'statut';
        if(orders[i].status == 0){
            statut.textContent = 'Status : en cours';
            stattut.style.color = 'red';
        }
        else{
            statut.textContent = 'Status : prêt';
            stattut.style.color = 'green';
        }
        // ajout comme fils de l'article
        article.appendChild(date);
        article.appendChild(heure);
        article.appendChild(price);
        article.appendChild(price);
        article.appendChild(statut);
        section.appendChild(article);

    }
});

// On démarre le routing
//page.base('/'); // psi votre projet n'est pas hébergé à la racine de votre serveur, ajuster son url de base ici !
page.start('/private/app.html');

