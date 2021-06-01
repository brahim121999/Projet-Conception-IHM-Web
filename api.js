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

module.exports = (passport) => {

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
    }),

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
    }),

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
    });
    */

    app.get('/order/:id', function (req, res, next) {
        dbHelper.order.select(req.params.id).then(
            order => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(order));
            },
            err => {
                next(err);
            },
        );
    });

    app.get('/order', function (req, res, next) {
        dbHelper.order.all().then(
            order => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(order));
            },
            err => {
                next(err);
            },
        );
    });


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
    });
    */
    app.delete('/plan/:id', function (req, res, next) {
        dbHelper.plan.delete(req.params.id)
    });

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
    });
    */

    app.get('/plan/:id', function (req, res, next) {
        dbHelper.plan.select(req.params.id).then(
            plans => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(plans));
            },
            err => {
                next(err);
            },
        );
    });

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
    });
    */


    app.delete('/meal/:id', function (req, res, next) {
            dbHelper.meal.delete(req.params.id)
        },
    );


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
    });
    */

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
    return app;
}