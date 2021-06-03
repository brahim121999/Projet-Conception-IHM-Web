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
var bodyParser = require("body-parser");

module.exports = (passport) => {

    /* post */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));



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


    /* post order*/
    app.post('/order/post', function (req, res, next) {
        console.log(req.body);
        console.log(req.body.ID_User, req.body.ID_Plan, req.body.price, req.body.creation_time, req.body.collecting_time, req.body.status);
        dbHelper.order.select(req.body.ID_User, req.body.ID_Plan, req.body.price, req.body.creation_time, req.body.collecting_time, req.body.status).then(
            order => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(order));
            },
            err => {
                next(err);
            },
        );
    });

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
    app.delete('/order/:id', function (req, res, next) {
        dbHelper.order.delete(req.params.id).then(
            order => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(order));
            },
            err => {
                next(err);
            }
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
    }, );


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





    app.get('/ordermeals/:id', function (req, res, next) {
        dbHelper.ordermeals.select(req.params.id).then(
            meal => {
                res.set('Content-type', 'application/json');
                res.send(JSON.stringify(meal));
            },
            err => {
                next(err);
            },
        );
    });


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