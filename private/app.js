'use strict';

const express = require('express');
const dbHelper = require('dbhelper.js');
const api = require('api.js');


//fonction asynchrone pour charger les différentes
const loadorders = function (){
    api.order.all()
        .then(response => {
            if (!response.ok){// erreur
                throw new Error('there is a problem');
            }
            response.json() // extraction du texte json
                .then(orders => {
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
                    }
                });
        })
        .catch(error => alert('Erreur : ' + error));
};

console.log("je suis la");
console.debug("je suis la");
loadorders();