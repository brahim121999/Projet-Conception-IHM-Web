// js pour gérer la partie privée de l'application

'use strict';

// fonction qui s'applique sur les boutons pour stocker des informations malgré le changement de page html
const reply_click = function (name, id) {
    sessionStorage.setItem(name, id);
};

// fonction active sur la page des commandes
const loadorders = async function (id) {
    // affichage des commandes de l'utilisateur
    let response = await fetch('/api/user/command/' + id);
    let orders = await response.json();

    let section = document.querySelector('main section');
    for (let i = 0; i < orders.length; i = i + 1) { // pour chaque order
        //creation article
        let article = document.createElement('article');

        //creation des différents paragraphe
        let date = document.createElement('p');
        date.setAttribute('class', 'date');
        date.textContent = orders[i].creation_time;

        let heure = document.createElement('p');
        heure.setAttribute('class', 'heure');
        heure.textContent = orders[i].collecting_time;

        let price = document.createElement('p');
        price.setAttribute('class', 'price');
        price.textContent = orders[i].price + '€';

        let statut = document.createElement('p');
        statut.setAttribute('class', 'statut');
        if (orders[i].status == 0) {
            statut.textContent = 'Status : en cours';
            statut.style.color = 'red';
        } else {
            statut.textContent = 'Status : prêt';
            statut.style.color = 'green';
        }

        let detail = document.createElement('a');
        detail.setAttribute('class', 'detail');
        detail.setAttribute('id', orders[i].ID_Order);
        detail.setAttribute('onClick', 'reply_click("order",this.id)');
        detail.setAttribute('href', 'recu.html');
        detail.textContent = 'details';

        // ajout comme fils de l'article
        article.appendChild(date);
        article.appendChild(heure);
        article.appendChild(price);
        article.appendChild(price);
        article.appendChild(statut);
        article.appendChild(detail);
        section.appendChild(article);

    }
};

// fonction utilisé à l'arrivé sur la page de recu d'une commande
const loadorder = async function (idorder) {
    // on va cherche les différentes info dans la bd
    let responseorder = await fetch('/api/order/' + idorder);
    let order = await responseorder.json();

    let responseordermeal = await fetch('/api/ordermeals/' + idorder);
    let ordermeal = await responseordermeal.json();

    let responseplat = await fetch('/api/meal/' + ordermeal.Plat);
    let plat = await responseplat.json();

    let responsedessert = await fetch('/api/meal/' + ordermeal.Dessert);
    let dessert = await responsedessert.json();

    let responseplan = await fetch('/api/plan/' + order.ID_Plan);
    let plan = await responseplan.json();

    // on met les infos dans le html
    let h3 = document.querySelector('main h3');
    h3.textContent = order.creation_time + ' a ' + order.collecting_time

    let statut = document.getElementById('statut');
    if (order.status == 0) {
        statut.textContent = 'Status : en cours';
        statut.style.color = 'red';
    } else {
        statut.textContent = 'Status : prêt';
        statut.style.color = 'green';
    }
    let prixfin = document.getElementById('prix_fin');
    prixfin.textContent = order.price + '€';

    let prix = document.getElementById('prix');
    prix.textContent = order.price + '€';

    //plat
    let docplat = document.getElementById('plat');
    docplat.textContent = '- 1 ' + plat.Name;

    // dessert
    let docdessert = document.getElementById('dessert');
    docdessert.textContent = '- 1 ' + dessert.Name;

    // menu name
    let menuname = document.getElementById('menuname');
    menuname.textContent = plan.Name;

};

const naviguaterecu = function () { // fonction qui se déclenche sur la page des recu
    // à l'appuie sur le boutons croix on supprime la commande après une alerte
    let annuler = document.getElementById('bouton_annuler');
    annuler.addEventListener('click', async function () {
        if (confirm("voulez-vous supprimer cette commande")) {
            let order = sessionStorage.getItem("order");
            order = Number(order);
            if (order) {
                let resp = await fetch('/api/order/delete/' + order, {
                    method: 'DELETE'
                });
                let rep = await fetch('/api/ordermeals/delete/' + order, {
                    method: 'DELETE'
                });
                window.location.href = 'http://localhost:8080/private/app.html';

            } else {
                alert("selectionner la commande depuis l'écran des commandes");
                window.location.href = 'http://localhost:8080/private/app.html';
            }
        }
    });
};

// fonction qui se déclenche sur la pages des menus
const loadmenus = async function () {
    // chargement de tous les menus
    let response = await fetch('/api/plan');
    let plans = await response.json();

    // insertions des infos dans le html
    let section = document.querySelector('main section');
    for (let i = 0; i < plans.length; i = i + 1) { // pour chaque plan
        //creation article
        let article = document.createElement('article');

        let h3 = document.createElement('h3');
        h3.textContent = plans[i].Name

        // on va chercher les informations complémentaires
        let responseplanmeal = await fetch('/api/planmeals/' + plans[i].ID_Plan);
        let planmeal = await responseplanmeal.json();

        let responseplat1 = await fetch('/api/meal/' + planmeal.Plat1);
        let plat1 = await responseplat1.json();

        let responsedessert1 = await fetch('/api/meal/' + planmeal.Dessert1);
        let dessert1 = await responsedessert1.json();

        let responseplat2 = await fetch('/api/meal/' + planmeal.Plat2);
        let plat2 = await responseplat2.json();

        let responsedessert2 = await fetch('/api/meal/' + planmeal.Dessert2);
        let dessert2 = await responsedessert2.json();

        // on met les infos dans le html
        let div = document.createElement('div');
        div.setAttribute('class', 'plat');

        let p1 = document.createElement('p');
        p1.textContent = plat1.Name + " ou " + plat2.Name

        let p2 = document.createElement('p');
        p2.textContent = " + "

        let p3 = document.createElement('p');
        p3.textContent = dessert1.Name + " ou " + dessert2.Name;

        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);

        let p = document.createElement('p');
        p.setAttribute('class', 'price');
        p.textContent = plans[i].price + "€";

        let a = document.createElement('a');
        a.setAttribute('id', plans[i].ID_Plan);
        a.setAttribute('href', 'selection_plat.html');
        a.setAttribute('onClick', 'reply_click("plan",this.id)');

        let button = document.createElement('button');
        button.textContent = "selectionner";
        button.setAttribute('class', 'select');

        // ajout dans la section
        a.appendChild(button);
        article.appendChild(h3);
        article.appendChild(div);
        article.appendChild(p);
        article.appendChild(a);
        section.appendChild(article);
    }
};

// chargement sur la page de selection des plats dans le menu
const loadmenu = async function (id) {
    //on va chercher les informations dans la bd
    let response = await fetch('/api/plan/' + id);
    let plan = await response.json();

    let responseplanmeal = await fetch('/api/planmeals/' + id);
    let planmeal = await responseplanmeal.json();

    let responseplat1 = await fetch('/api/meal/' + planmeal.Plat1);
    let plat1 = await responseplat1.json();

    let responsedessert1 = await fetch('/api/meal/' + planmeal.Dessert1);
    let dessert1 = await responsedessert1.json();

    let responseplat2 = await fetch('/api/meal/' + planmeal.Plat2);
    let plat2 = await responseplat2.json();

    let responsedessert2 = await fetch('/api/meal/' + planmeal.Dessert2);
    let dessert2 = await responsedessert2.json();

    // on ecrit les informations dans le html
    let h2 = document.querySelector('h2');
    h2.textContent = plan.Name;

    let firstplat = document.getElementById('plat1');
    firstplat.textContent = plat1.Name;
    let bplat1 = document.getElementById('bplat1');
    bplat1.value = plat1.ID_Meal;

    let secondplat = document.getElementById('plat2');
    secondplat.textContent = plat2.Name;
    let bplat2 = document.getElementById('bplat2');
    bplat2.value = plat2.ID_Meal;

    let firstdessert = document.getElementById('dessert1');
    firstdessert.textContent = dessert1.Name;
    let bdessert1 = document.getElementById('bdessert1');
    bdessert1.value = dessert1.ID_Meal;

    let seconddessert = document.getElementById('dessert2');
    seconddessert.textContent = dessert2.Name;
    let bdessert2 = document.getElementById('bdessert2');
    bdessert2.value = dessert2.ID_Meal;

};

// fonction qui se declenche au chargement de la page panier
const loadpanier = async function (id_plan, id_plat, id_dessert) {

    // verification que l'utilisateur a selection un plat
    if (id_plan === "null" || id_plat === "null" || id_dessert === "null") { // pas de selection de plat 
        let retrait = document.getElementById('retrait');
        retrait.style.visibility = "hidden";

        let menus = document.getElementById('menus');
        menus.style.visibility = "hidden";

        let nomenu = document.getElementById('nomenu');
        nomenu.style.visibility = "visible";

        let valider = document.querySelector('footer');
        valider.style.visibility = "hidden";

    } 
    else { // selection d'un plat
        // on va chercher les infos des plats selectionner dans la bd
        let response = await fetch('/api/plan/' + id_plan);
        let plan = await response.json();

        let responseplat = await fetch('/api/meal/' + id_plat);
        let plat = await responseplat.json();

        let responsedessert = await fetch('/api/meal/' + id_dessert);
        let dessert = await responsedessert.json();

        // on rempli le html
        let h3 = document.getElementById('menuname')
        h3.textContent = plan.Name;

        let divplat = document.getElementById('plat');
        divplat.textContent = plat.Name;

        let divdessert = document.getElementById('dessert');
        divdessert.textContent = dessert.Name;

        let divprice = document.getElementById('price');
        divprice.textContent = plan.price + "€";

        let total = document.getElementById('total');
        total.textContent = "total = " + plan.price + "€";

        let retrait = document.getElementById('retrait');
        retrait.style.visibility = "visible";

        let menus = document.getElementById('menus');
        menus.style.visibility = "visible";

        let nomenu = document.getElementById('nomenu');
        nomenu.style.visibility = "hidden";

        let valider = document.querySelector('footer');
        valider.style.visibility = "visible";

        // à l'appuie sur le bouton valider 
        let button = document.getElementById("valider");
        button.addEventListener('click', async function () {

            let heure = document.getElementById("heure");
            let minute = document.getElementById("minute");
            // on verfie que l'heure de retrait a bien été rentrée
            if (minute.value.length != 2 || heure.value.length != 2) {
                alert("vous n'avez pas selectionner d'heure (pensez à mettre des 0 , par exemple 07h08)");
            } 
            else if (Number(minute.value) >= 60 || Number(minute.value) < 0 || Number(heure.value) >= 24 || Number(heure.value) < 0) {
                alert("l'heure selectionner n'est pas valide");
            } 
            else { // l'heure est bonne , on ajoute la commande dans la base de données
                let user = sessionStorage.getItem("user");
                let idplan = sessionStorage.getItem("plan");
                let horaire = heure.value + ":" + minute.value;
                if (user !== "null" && plan !== "null") {
                    let today = new Date();

                    let month = (today.getMonth() + 1);
                    if (month < 10) {
                        month = '0' + month;
                    }

                    let day = today.getDate();
                    if (day < 10) {
                        day = '0' + day;
                    }

                    let hours = today.getHours();
                    if (hours < 10) {
                        hours = '0' + hours;
                    }

                    let minutes = today.getMinutes();
                    if (minutes < 10) {
                        minutes = '0' + minutes
                    }

                    let secondes = today.getSeconds();
                    if (secondes < 10) {
                        secondes = '0' + secondes
                    }
                    // date de la commande a la seconde près pour pouvoir la retrouver facilement
                    let date = today.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + secondes;
                    //ajout dans la bd
                    fetch('/api/order/post', {
                        method: "POST",
                        body: JSON.stringify({
                            "ID_User": user,
                            "ID_Plan": Number(idplan),
                            "price": plan.price,
                            "creation_time": date,
                            "collecting_time": horaire,
                            "status": 0
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    // on cherche l'id de la commande qu'on vient d'ajouter
                    let response = await fetch('/api/order/' + user + '/' + date);
                    let Order = await response.json();

                    // on ajoute les plats choisit dans la deuxième table
                    fetch('/api/ordermeals/post', {
                        method: "POST",
                        body: JSON.stringify({
                            "ID_Order": Order.ID_Order,
                            "ID_Plat": Number(sessionStorage.getItem("plat")),
                            "ID_Dessert": Number(sessionStorage.getItem("dessert"))
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    // on reinitialise les variables de selection des plats, menu et commande
                    sessionStorage.setItem("plan", null);
                    sessionStorage.setItem("plat", null);
                    sessionStorage.setItem("dessert", null);
                    sessionStorage.setItem("order", null);
                    // retour sur la page des commandes pour que l'utilisateur voit que ca commande est prise en compte
                    window.location.href = "app.html";
                }
            }
        });

        // à l'appuie sur la poubelle on supprime les plats selectionner et on recharge la page
        let poubelle = document.getElementById("poubelle")
        poubelle.addEventListener("click", _ => {
            if (confirm("voulez-vous supprimer ce menu")) {
                sessionStorage.setItem("plan", null);
                sessionStorage.setItem("plat", null);
                sessionStorage.setItem("dessert", null);
                document.location.reload();
            }
        });

    }
}

// appel des fonctions en fonction de la page sur laquelle on se trouve
if (window.location.href == 'http://localhost:8080/private/app.html') {
    loadorders(sessionStorage.getItem("user"));
} 
else if (window.location.href == 'http://localhost:8080/private/recu.html') {
    loadorder(sessionStorage.getItem("order"));
    naviguaterecu();
} 
else if (window.location.href == 'http://localhost:8080/private/selection_menu.html') {
    loadmenus();
} 
else if (window.location.href == 'http://localhost:8080/private/selection_plat.html') {
    loadmenu(sessionStorage.getItem("plan"));
} 
else if (window.location.href == 'http://localhost:8080/private/panier.html') {
    loadpanier(sessionStorage.getItem("plan"), sessionStorage.getItem("plat"), sessionStorage.getItem("dessert"));
}