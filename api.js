/* eslint-env node */
'use strict';

// Ce module nodejs gère l'API de notre site
// Il définit l'ensemble des routes (relative à "/api") corresponant aux 
// points d'entrée de l'API

// Expressjs
const express = require('express');
// Notre module nodejs d'accès simplifié à la base de données
const dbHelper = require('./dbhelper.js');

// Comme c'est un module nodejs il faut exporter les fonction qu'on veut rendre publiques
// ici on n'exporte qu'ne seule fonction (anonyme) qui est le "constructeur" du module
// Cette fonction prend en paramètre un objet "passport" pour la gestion de l'authentification 
module.exports = (passport) => {
    const app = express();

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
    });
    */

    // obtenir 1 etudiant
    app.get('/api/user/:email', function (req, res, next) {
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
    app.get('/api/user', function (req, res, next) {
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

    app.get('/api/user/command/:email', function (req, res, next) {
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
    });
    */

    app.get('/api/qrc/:id', function (req, res, next) {
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
    app.get('/api/order/:id', function (req, res, next) {
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
    app.delete('/api/plan/:id', function (req, res, next) {
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

    app.get('/api/plan/:id', function (req, res, next) {
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

    
    app.delete('/api/meal/:id', function (req, res, next) {
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

    app.get('/api/meal/:id', function (req, res, next) {
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



    /*
    // Exemple de point d'entré (qui ne fait rien d'intressant) de l'api
    // qui nécessite une authentification.
    // C'est le "require('connect-ensure-login').ensureLoggedIn()" qui vérifie
    // que l'utilisateur est bien authentifié. Si ce n'est pas le cas il sera redirigé
    // vers la page de login
    app.get('/nimportequoi',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            // on fait ce qu'on a a faire (ici on renvoit juste du texte brut "nimp"
            // si l'utilisateur est bien authentifié
            res.send('nimp');
        })
    ;


    // Authentification pour accéder aux parties privées de l'api (on n'en a pas dans cet exemple)
    // et aux templates privés
    // C'est ici qu'on utilise passport pour créer une session utilisateur

    app.post('/login', function (req, res, next) {
        if (!req.body.email) {
            return res.send({success: false, message: 'empty username'});
        }
        if (!req.body.password) {
            return res.send({success: false, message: 'empty password'});
        }
        passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            if (!user) {
                return res.send({succes: false, message: 'authentication failed'});
            }
            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.send({success: true, message: 'authentication succeeded'});
            });
        })(req, res, next);
    });
    */
    return app;

}


