

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
        // ajout comme fils de l'article
        article.appendChild(date);
        article.appendChild(heure);
        article.appendChild(price);
        article.appendChild(price);
        article.appendChild(statut);
        section.appendChild(article);

    }
};

// On démarre le routing
//page.base('/'); // psi votre projet n'est pas hébergé à la racine de votre serveur, ajuster son url de base ici !
loadorder();
