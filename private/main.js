var user = -1;
var order = -1;
var plan = -1;
var meal = -1;

function recupid()
{
    if(this.id){
        order = this.id;
    }
    console.log(order);
    return false;
}

const loadorder = async function () {
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
        detail.setAttribute('href','http://localhost:8080/private/recu.html')
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

const naviguateapp = function(){
    let commande = document.getElementById('commande');
    commande.addEventListener('click', _ => {
        window.location.href='http://localhost:8080/private/selection_menu.html';
    });
    $(document).click(function(){
        order = $(this).attr("id");
    });
};

const naviguaterecu = function(){
    let annuler = document.getElementById('bouton_annuler');
    annuler.addEventListener('click', _ => {
        if ( confirm( "voulez-vous supprimer cette commande" ) ) {
            if (order != -1){
                fetch('api/order'+order, {method: 'DELETE',})
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
    loadorder();
    naviguateapp();
}
else if(window.location.href=='http://localhost:8080/private/recu.html'){

    naviguaterecu();
}