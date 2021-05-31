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

// Comme c'est un module nodejs il faut exporter les fonction qu'on veut rendre publiques
// ici on n'exporte qu'ne seule fonction (anonyme) qui est le "constructeur" du module
// Cette fonction prend en paramètre un objet "passport" pour la gestion de l'authentification 
module.exports.user =  {


    /* post
    app.get('/api/user/createaccount', function (req, res, next) {
        dbHelper.user.insert().then(
            users => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(users));
            },
            err => {
                next(err);
            },
        );
    }),
    */

    // obtenir 1 etudiant
    select : () => app.get('/api/user/:email', function (req, res, next) {
        dbHelper.user.select(req.params.email).then(
            user => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(user));
            },
            err => {
                next(err);
            },
        );
    }),

     // obtenir tous les etudiants
    all :() =>app.get('/api/user', function (req, res, next) {
        dbHelper.user.all().then(
            user => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(user));
            },
            err => {
                next(err);
            },
        );
    }),

    select : () => app.get('/api/user/command/:email', function (req, res, next) {
        dbHelper.user.command(req.params.email).then(
            user => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(user));
            },
            err => {
                next(err);
            },
        );
    })
};

module.exports.qrcode =  {

    /* post qrcode
    app.post('/api/qrc', function (req, res, next) {
        dbHelper.order.insert(req.params.id).then(
            order => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(order));
            },
            err => {
                next(err);
            },
        );
    }),
    */

    select : () => app.get('/api/qrc/:id', function (req, res, next) {
        dbHelper.qrcode.select(req.params.id).then(
            qrcs => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(qrcs));
            },
            err => {
                next(err);
            },
        );
    })
};

module.exports.order =  {

    /* post order
    app.post('/api/order', function (req, res, next) {
        dbHelper.order.select(req.params.id).then(
            order => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(order));
            },
            err => {
                next(err);
            },
        );
    }),
    */

    select : () => app.get('/api/order/:id', function (req, res, next) {
        dbHelper.order.select(req.params.id).then(
            order => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(order));
            },
            err => {
                next(err);
            },
        );
    }),

    all : () => app.get('/api/order', function (req, res, next) {
        dbHelper.order.all().then(
            order => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(order));
            },
            err => {
                next(err);
            },
        );
    })
};

module.exports.plan =  {

    /* post plan
    app.post('/api/plan', function (req, res, next) {
        dbHelper.order.select(req.params.id).then(
            order => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(order));
            },
            err => {
                next(err);
            },
        );
    }),
    */
    delete : () =>app.delete('/api/plan/:id', function (req, res, next) {
        dbHelper.plan.delete(req.params.id)
    }),

    /* update plan
    app.put('/api/plan/:id', function (req, res, next) {
        dbHelper.plan.update(req.params.id).then(
            plans => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(plans));
            },
            err => {
                next(err);
            },
        );
    }),
    */

    select : () => app.get('/api/plan/:id', function (req, res, next) {
        dbHelper.plan.select(req.params.id).then(
            plans => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(plans));
            },
            err => {
                next(err);
            },
        );
    })
};

module.exports.meal =  {

    /* post meal
    app.post('/api/meal', function (req, res, next) {
        dbHelper.order.insert(req.params.id).then(
            meal => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(meal));
            },
            err => {
                next(err);
            },
        );
    }),
    */

    
    delete : () => app.delete('/api/meal/:id', function (req, res, next) {
            dbHelper.meal.delete(req.params.id)
        },
    ),


    /*update meal
    app.put('/api/meal', function (req, res, next) {
        dbHelper.order.insert(req.params.id).then(
            meal => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(meal));
            },
            err => {
                next(err);
            },
        );
    }),
    */

    select : () => app.get('/api/meal/:id', function (req, res, next) {
        dbHelper.meal.select(req.params.id).then(
            meal => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(meal));
            },
            err => {
                next(err);
            },
        );
    }),
}


