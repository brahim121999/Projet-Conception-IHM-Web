/* eslint-env node */
'use strict';

// Ce module nodejs gère l'API de notre site
// Il définit l'ensemble des routes (relative à "/api") corresponant aux 
// points d'entrée de l'API

// Expressjs
const express = require('express');
// Notre module nodejs d'accès simplifié à la base de données
const dbHelper = require('./dbhelper.js');
const app = express();
var bodyParser = require("body-parser"); // pour obtenir req.body bien formé

module.exports = (passport) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    //creer un compte
    app.post('/createaccount', function (req, res, next) {
        dbHelper.user.insert(req.body.email, req.body.password).then(
            user => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(user));
            },
            err => {
                next(err);
            },
        );
    });


    // obtenir 1 utilisateur avec son adresse mail
    app.get('/user/:email', function (req, res, next) {
        dbHelper.user.select(req.params.email).then(
            user => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(user));
            },
            err => {
                next(err);
            },
        );
    });

    // obtenir tous les etudiants
    app.get('/user', function (req, res, next) {
        dbHelper.user.all().then(
            user => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(user));
            },
            err => {
                next(err);
            },
        );
    });

    //obtenir les commandes d'un étudiant
    app.get('/user/command/:email', function (req, res, next) {
        dbHelper.user.command(req.params.email).then(
            user => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(user));
            },
            err => {
                next(err);
            },
        );
    });

    // fonction du qrcode pas implémentée
    /* 
    app.post('/qrc/post', function (req, res, next) {
        dbHelper.qrcode.insert(req.body.ID_Qrcode,req.body.ID_Order).then(
            qrc => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(qrc));
            },
            err => {
                next(err);
            },
        );
    }),
    

    app.get('/qrc/:id', function (req, res, next) {
        dbHelper.qrcode.select(req.params.id).then(
            qrcs => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(qrcs));
            },
            err => {
                next(err);
            },
        );
    });
    */

    // rajouter une commande
    app.post('/order/post', function (req, res, next) {
        dbHelper.order.insert(req.body.ID_User, req.body.ID_Plan, req.body.price, req.body.creation_time, req.body.collecting_time, req.body.status).then(
            order => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(order));
            },
            err => {
                next(err);
            },
        );
    });

    // obtenir les informations d'un commande
    app.get('/order/:id', function (req, res, next) {
        dbHelper.order.select(Number(req.params.id)).then(
            order => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(order));
            },
            err => {
                next(err);
            },
        );
    });

    //obtenir toutes les commandes
    app.get('/order', function (req, res, next) {
        dbHelper.order.all().then(
            order => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(order));
            },
            err => {
                next(err);
            }
        );
    });

    // trouver l'id d'un order avec l'iduser et la date de creation
    app.get('/order/:id/:time', function (req, res, next) {
        dbHelper.order.find(req.params.id, req.params.time).then(
            order => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(order));
            },
            err => {
                next(err);
            }
        );
    });

    // supprimer une commande
    app.delete('/order/delete/:id', function (req, res, next) {
        dbHelper.order.delete(Number(req.params.id)).then(
            order => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(order));
            },
            err => {
                next(err);
            }
        );
    });

    /* non implémenté
    // rajouter un menu
    app.post('/plan/post', function (req, res, next) {
        dbHelper.plan.insert(req.body.Name,req.body.description,req.body.price).then(
            plan => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(plan));
            },
            err => {
                next(err);
            },
        );
    });
    
    // supprimer un menu
    app.delete('/plan/:id', function (req, res, next) {
        dbHelper.plan.delete(req.params.id).then(
            plan => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(plan));
            },
            err => {
                next(err);
            },
        );
    });
    

    // mettre a jour un menu
    app.put('/api/plan/:id', function (req, res, next) {
        dbHelper.plan.update(req.params.id).then(
            plan => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(plan));
            },
            err => {
                next(err);
            },
        );
    });
    */

    // obtenir les informations d'un menu
    app.get('/plan/:id', function (req, res, next) {
        dbHelper.plan.select(req.params.id).then(
            plan => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(plan));
            },
            err => {
                next(err);
            },
        );
    });

    // obtenir tous les menus
    app.get('/plan', function (req, res, next) {
        dbHelper.plan.all().then(
            plans => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(plans));
            },
            err => {
                next(err);
            },
        );
    });

    /* non implémenté
    // rajouter un plat
    app.post('/meal/post', function (req, res, next) {
        dbHelper.meal.insert(req.params.id).then(
            meal => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(meal));
            },
            err => {
                next(err);
            },
        );
    });
    

    // supprimer un plat : non implémenté
    app.delete('/meal/delete/:id', function (req, res, next) {
        dbHelper.meal.delete(req.params.id).then(
            meal => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(meal));
            },
            err => {
                next(err);
            }
        );
    });
    


    // mettre a jour un plat
    app.put('/api/meal/:id', function (req, res, next) {
        dbHelper.meal.insert(req.params.id).then(
            meal => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(meal));
            },
            err => {
                next(err);
            },
        );
    });
    */

    //obtenir un plat avec son ID
    app.get('/meal/:id', function (req, res, next) {
        dbHelper.meal.select(req.params.id).then(
            meal => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(meal));
            },
            err => {
                next(err);
            },
        );
    });

    //table reliant une commande et les plats contenus dedans
    // obtenir les plats contenus dans une commande avec ID commande
    app.get('/ordermeals/:id', function (req, res, next) {
        dbHelper.ordermeals.select(Number(req.params.id)).then(
            ordermeal => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(ordermeal));
            },
            err => {
                next(err);
            },
        );
    });

    // ajouter une commande 
    app.post('/ordermeals/post', function (req, res, next) {
        dbHelper.ordermeals.insert(req.body.ID_Order, req.body.ID_Plat, req.body.ID_Dessert).then(
            ordermeal => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(ordermeal));
            },
            err => {
                next(err);
            },
        );
    });

    //supprimer une commande
    app.delete('/ordermeals/delete/:id', function (req, res, next) {
        dbHelper.ordermeals.delete(req.params.id).then(
            ordermeal => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(ordermeal));
            },
            err => {
                next(err);
            },
        );
    });


    // table reliant un menu et tous les plats contenus dedans
    app.get('/planmeals/:id', function (req, res, next) {
        dbHelper.planmeals.select(req.params.id).then(
            meal => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(meal));
            },
            err => {
                next(err);
            },
        );
    });

    return app;
}