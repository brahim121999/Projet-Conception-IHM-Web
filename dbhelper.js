/* eslint-env node */
'use strict';

// Ce modules fournit quelques fonction pour simplifier l'accès
// à notre base de données sqlite

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./PolyKfet.db', sqlite3.OPEN_READWRITE, function (err) {
    if (err) {
        console.error(err + '\n' + 'run "npm run createDB" to create a database file');
        // Pas de problème pour faire un appel synchrone ici : on est dans la phase
        // d'initialisation du serveur et pas dans le traitement de requêtes.
        require('process').exit(-1);
    }
});

// Rend la fonction get de l'api sqlite compatible avec les promesses
const get = sql => new Promise(function (resolve, reject) {
    db.get(sql, function (err, row) {
        if (err) {
            reject(err);
        } else {
            resolve(row);
        }
    });
});

// Idem pour la fonction all
const all = sql => new Promise(function (resolve, reject) {
    db.all(sql, function (err, rows) {
        if (err) {
            reject(err);
        } else {
            resolve(rows);
        }
    });
});

// les trois prochaine fonction sont équivalente, elle servent juste a rendre le code plus compréhensible on utilisera :
// remove pour supprimer un élément de la  table
// post pour mettre un élément dans la table
// put pour mettre à jour un élément dans la table
const remove = sql => new Promise(function (resolve, reject) {
    db.run(sql, function (err, row) {
        if (err) {
            reject(err);
        } else {
            resolve(row);
        }
    });
});

const post = sql => new Promise(function (resolve, reject) {
    db.run(sql, function (err, row) {
        if (err) {
            reject(err);
        } else {
            resolve(row);
        }
    });
});

const put = sql => new Promise(function (resolve, reject) {
    db.run(sql, function (err, row) {
        if (err) {
            reject(err);
        } else {
            resolve(row);
        }
    });
});

// Cet export met à disposition des programmeurs 4 fonctions
// dbhelper.user.select, qui récupère les infos d'un utilisateur en particulier (email + mdp)
// dbhelper.user.all, qui récupère tous les users
// dbhelper.user.insert, qui ajoute un étudiant
//dbhelper.user.command, qui récupère les plats d'un étudiant
module.exports.user = {
    //renvoie lid et le password pour un email
    select: (email) => get(`
        select ID_User,password from Users
            where ID_User = "${email}"
            `),

    all: () => all('select * from Users'),

    insert: (email, password) => post(`
        insert into Users (ID_User,password,Isstaff) values("${email}","${password}",0);
            `),
    command: (email) => all(`
        select * from Orders
            where ID_User = '${email}'
            `)
};


// Cet export met à disposition des programmeurs 5 fonctions
// dbhelper.order.insert, qui ajoute une commande
// dbhelper.order.select, qui récupère une commande avec un id
// dbhelper.order.all, qui récupère toutes les commandes
// dbhelper.order.find qui récupère une commande avec id utilisateur et date de création
// dbhelper.order.delete, qui supprime un

module.exports.order = {
    insert: (ID_User, ID_Plan, price, creation_time, collecting_time, status) => post(`
        INSERT INTO Orders (ID_User,ID_Plan,price,creation_time,collecting_time,status)
            VALUES("${ID_User}",${ID_Plan},${price},"${creation_time}","${collecting_time}",${status})
            `),
    all: () => all('select * from Orders'),
    select: (ID_order) => get(`
        select * from Orders where ID_Order = ${ID_order}
            `),
    delete: (ID_Order) => remove(`
            DELETE FROM Orders 
                WHERE ID_Order = ${ID_Order}
                `),
    find: (ID_User, creation_time) => get(`
        select ID_Order from Orders 
            where ID_User = '${ID_User}' and creation_time = '${creation_time}'
                `)
};

// Cet export met à disposition des programmeurs 2 fonctions
// dbhelper.qrcode.insert, qui ajoute un qrcode
// dbhelper.qrcode.select, qui récupère tous les qrcode avec un tel id

module.exports.qrcode = {
    insert: (ID_QRcode, ID_Order) => post(`
        INSERT INTO QR_codes (ID_QRcode,ID_plan)
            VALUES(${ID_QRcode},${ID_Order})
            `),
    select: (ID_QRcode) => all(`
        select * from QR_codes where ID_QRcode = ${ID_QRcode}
            `)
};

// Cet export met à disposition des programmeurs 5 fonctions
// dbhelper.plan.select, qui récupère les infos un menu
// dbhelper.plan.delete, qui supprime un menu
// dbhelper.plan.insert, qui ajoute un menu
// dbhelper.plan.update, qui met a jour un menu
// dbhelper.plan.all , qui récupère tous les menus

module.exports.plan = {
    insert: (name, description, price) => post(`
        INSERT INTO Plans (Name,description,price)
            VALUES(${name},${description},${price})
            `),
    delete: (ID_plan) => remove(`
        DELETE FROM Plans 
            WHERE ID_Plan = ${ID_plan}
            `),
    update: (ID_plan, new_name, new_desc, new_price) => put(`
        UPDATE Plans SET
            Name = ${new_name}, description = ${new_desc}, price = ${new_price}
                WHERE ID_Plan = ${ID_Plan}
                    `),
    select: (ID_plan) => get(`
        select * from Plans where ID_Plan = ${ID_plan}
            `),
    all: () => all('select * from Plans')
};

// Cet export met à disposition des programmeurs 4 fonctions
// dbhelper.meal.select, qui récupère les infos un meal
// dbhelper.meal.delete, qui supprime un meal
// dbhelper.meal.insert, qui ajoute un meal
// dbhelper.meal.update, qui met a jour un meal

module.exports.meal = {
    insert: (name, description, stock, type, hot) => post(`
        INSERT INTO Meals (Name,description,stock,type,hot)
            VALUES(${name},${description},${stock},${type},${hot})
            `),
    delete: (ID_meal) => remove(`
        DELETE FROM Meals
            WHERE ID_Meal = ${ID_meal}
            `),
    update: (ID_Meal, new_name, new_desc, new_stock, new_price, new_hot) => put(`
        UPDATE Meals SET
            Name = ${new_name}, description = ${new_desc}, stock = ${new_stock},
                price = ${new_price}, hot = ${new_hot}
                    WHERE ID_Meal = ${ID_Meal}
            `),
    select: (ID_meal) => get(`
        SELECT * FROM Meals
            WHERE ID_Meal = ${ID_meal}
            `)
};

// Cet export met à disposition des programmeurs 4 fonctions
// dbhelper.planmeals.select, qui récupère les infos concernant un menu
// dbhelper.planmeals.delete, qui supprime un menu (les plats associé)
// dbhelper.planmeals.insert, qui ajoute un menu ( les plats associé)
// dbhelper.planmeals.update, qui met a jour un menu (change les plats associé)

module.exports.planmeals = {
    insert: (ID_Plan, Plat1, Plat2, Dessert1, Dessert2) => post(`
        INSERT INTO Plan_Meals 
            VALUES(${ID_Plan},${Plat1},${Plat2},${Dessert1},${Dessert2})
            `),
    select: (ID_Plan) => get(`
        select * from Plan_Meals where ID_Plan = ${ID_Plan}
            `),
    delete: (ID_Plan) => remove(`
        DELETE FROM Plan_Meals 
            WHERE ID_Order = ${ID_Order}
                `),
    update : (ID_plan, Plat1, Plat2, Dessert1, Dessert2) => put(`
        UPDATE Plan_Meals SET
            Plat1 = ${Plat1}, Plat2 = ${Plat2}, Dessert1 = ${Dessert1}, Dessert2 = ${Dessert2}
                WHERE ID_Plan = ${ID_Plan}
                    `)
};

// Cet export met à disposition des programmeurs 3 fonctions
// dbhelper.ordermeals.select, qui récupère les infos concernant une commande (plat associés)
// dbhelper.ordermeals.delete, qui supprime une commande (les plats associés)
// dbhelper.ordermeals.insert, qui ajoute une commande ( les plats associés)

module.exports.ordermeals = {
    insert: (ID_order, Plat, Dessert) => post(`
        INSERT INTO Order_Meals (ID_Order,Plat,Dessert)
            VALUES(${ID_order},${Plat},${Dessert})
            `),
    select: (ID_order) => get(`
        select * from Order_Meals where ID_Order = ${ID_order}
            `),
    delete: (ID_Order) => remove(`
            DELETE FROM Order_Meals 
                WHERE ID_Order = ${ID_Order}
                `)
};