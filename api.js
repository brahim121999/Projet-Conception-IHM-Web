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

    return app;
}


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

// creation du compte pas a jour encore
/*
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

// post 
app.post('/api/user/command/:email', function (req, res, next) {
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




