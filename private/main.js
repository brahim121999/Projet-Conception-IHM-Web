'use strict';



const reply_click = function(name,id){
    sessionStorage.setItem(name,id);
};

console.log(sessionStorage.getItem("plan"));
console.log(sessionStorage.getItem("order"))


const loadorders = async function () {
    let response = await fetch('/api/order');
    let orders = await response.json();
            
    let section = document.querySelector('main section');
    for ( let i = 0; i < orders.length; i = i + 1){ // pour chaque order
        //creation article
        let article = document.createElement('article');

        //creation des différents paragraphe
        let date = document.createElement('p');
        date.setAttribute('class','date');
        date.textContent = orders[i].creation_time;

        let heure = document.createElement('p');
        heure.setAttribute('class','heure');
        heure.textContent = orders[i].collecting_time;

        let price = document.createElement('p');
        price.setAttribute('class','price');
        price.textContent = orders[i].price + '€';

        let statut = document.createElement('p');
        statut.setAttribute('class','statut');
        if(orders[i].status == 0){
            statut.textContent = 'Status : en cours';
            statut.style.color = 'red';
        }
        else{
            statut.textContent = 'Status : prêt';
            statut.style.color = 'green';
        }

        let detail = document.createElement('a');
        detail.setAttribute('class','detail');
        detail.setAttribute('id',orders[i].ID_Order);
        detail.setAttribute('onClick','reply_click("order",this.id)');
        detail.setAttribute('href','recu.html');
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

const loadorder = async function(idorder){
    // fetch
    let responseorder = await fetch('/api/order/'+ idorder);
    let order = await responseorder.json();

    let responseordermeal = await fetch('/api/ordermeals/'+idorder);
    let ordermeal = await responseordermeal.json();

    let responseplat = await fetch('/api/meal/'+ordermeal.Plat);
    let plat = await responseplat.json();

    let responsedessert = await fetch('/api/meal/'+ordermeal.Dessert);
    let dessert = await responsedessert.json();

    let responseplan = await fetch('/api/plan/'+order.ID_Plan);
    let plan = await responseplan.json();



    // order
    let h3 = document.querySelector('main h3');
    h3.textContent = order.creation_time + ' a ' + order.collecting_time

    let statut = document.getElementById('statut');
    if(order.status == 0){
        statut.textContent = 'Status : en cours';
        statut.style.color = 'red';
    }
    else{
        statut.textContent = 'Status : prêt';
        statut.style.color = 'green';
    }
    let prixfin = document.getElementById('prix_fin');
    prixfin.textContent = order.price + '€';

    let prix = document.getElementById('prix');
    prix.textContent = order.price + '€';


    //plat
    let docplat = document.getElementById('plat');
    docplat.textContent = '- 1 ' +  plat.Name;

    // dessert
    let docdessert = document.getElementById('dessert');
    docdessert.textContent = '- 1 ' +  dessert.Name;

    // menu name
    let menuname = document.getElementById('menuname');
    menuname.textContent = plan.Name;

};

const naviguaterecu = function(){
    let annuler = document.getElementById('bouton_annuler');
    annuler.addEventListener('click', _ => {
        if ( confirm( "voulez-vous supprimer cette commande" ) ) {
            let order = sessionStorage.getItem("order");
            order = Number(order);
            if (order){
                fetch('api/order/:'+order, {method: 'DELETE',})
                .then(_ => {
                    window.location.href='http://localhost:8080/private/app.html';
                    alert("vous avez supprimé la commande");
                });
            } 
            else {
                alert("selectionner la commande depuis l'écran des commandes");
                window.location.href='http://localhost:8080/private/app.html';
            }     
        }
    });
};


const loadmenus = async function(){
    let response = await fetch('/api/plan');
    let plans = await response.json();

    console.log(plans);

    let section = document.querySelector('main section');
    for ( let i = 0; i < plans.length; i = i + 1){ // pour chaque plan
        //creation article
        let article = document.createElement('article');
        
        let h3 = document.createElement('h3');
        h3.textContent = plans[i].Name

        let responseplanmeal = await fetch('/api/planmeals/'+plans[i].ID_Plan);
        let planmeal = await responseplanmeal.json();

        let responseplat1 = await fetch('/api/meal/'+planmeal.Plat1);
        let plat1 = await responseplat1.json();

        let responsedessert1 = await fetch('/api/meal/'+planmeal.Dessert1);
        let dessert1 = await responsedessert1.json();

        let responseplat2 = await fetch('/api/meal/'+planmeal.Plat2);
        let plat2 = await responseplat2.json();

        let responsedessert2 = await fetch('/api/meal/'+planmeal.Dessert2);
        let dessert2 = await responsedessert2.json();

        let div = document.createElement('div');
        div.setAttribute('class','plat');

        let p1 = document.createElement('p');
        p1.textContent = plat1.Name + " ou " + plat2.Name

        let p2 = document.createElement('p');
        p2.textContent =  " + "

        let p3 = document.createElement('p');
        p3.textContent = dessert1.Name + " ou " + dessert2.Name;

        div.appendChild(p3);
        div.appendChild(p2);
        div.appendChild(p1);
        
        let p = document.createElement('p');
        p.setAttribute('class','price');
        p.textContent = plans[i].price + "€";

        let a = document.createElement('a');
        a.setAttribute('id',plans[i].ID_Plan);
        a.setAttribute('href','selection_plat.html');
        a.setAttribute('onClick','reply_click("plan",this.id)');

        let button = document.createElement('button');
        button.textContent = "selectionner";
        button.setAttribute('class','select');

        a.appendChild(button);
        article.appendChild(h3);
        article.appendChild(div);
        article.appendChild(p);
        article.appendChild(a);
        section.appendChild(article);
    }
};

const loadmenu = async function(id){

};


if (window.location.href=='http://localhost:8080/private/app.html'){
    loadorders();
}
else if(window.location.href=='http://localhost:8080/private/recu.html'){
    loadorder(sessionStorage.getItem("order"));
    naviguaterecu();
}
else if(window.location.href=='http://localhost:8080/private/selection_menu.html'){
    loadmenus();
}
else if(window.location.href=='http://localhost:8080/private/selection_menu.html'){

    loadmenu(sessionStorage.getItem("plan"));
}