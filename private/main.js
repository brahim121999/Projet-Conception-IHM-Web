'use strict';



const reply_click = function(id){
    sessionStorage.setItem("order",id);
};


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
        detail.setAttribute('onClick','reply_click(this.id)');
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
    let response = await fetch('/api/order/'+ idorder);
    let order = await response.json();

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

}


const naviguateapp = function(){
    let commande = document.getElementById('commande');
    commande.addEventListener('click', _ => {
        window.location.href='http://localhost:8080/private/selection_menu.html';
    });
};

const naviguaterecu = function(){
    let annuler = document.getElementById('bouton_annuler');
    annuler.addEventListener('click', _ => {
        if ( confirm( "voulez-vous supprimer cette commande" ) ) {
            let order = sessionStorage.getItem("order");
            order = Number(order);
            console.log(typeof(order));
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

if (window.location.href=='http://localhost:8080/private/app.html'){

    loadorders();
    naviguateapp();
}
else if(window.location.href=='http://localhost:8080/private/recu.html'){

    loadorder(sessionStorage.getItem("order"));
    naviguaterecu();
}