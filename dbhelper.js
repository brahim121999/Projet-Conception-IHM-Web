/* eslint-env node */
'use strict';

// Ce modules fournit quelques fonction pour simplifier l'accès
// à notre base de données sqlite

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./PolyMusic.db', sqlite3.OPEN_READWRITE, function (err) {
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
        }
        else {
            resolve(row);
        }
    });
});

// Idem pour la fonction all
const all = sql => new Promise(function (resolve, reject) {
    db.all(sql, function (err, rows) {
        if (err) {
            reject(err);
        }
        else {
            resolve(rows);
        }
    });
});

const remove = sql => new Promise(function (resolve, reject) {
    db.delete(sql, function (err, row) {
        if (err) {
            reject(err);
        }
        else {
            resolve(row);
        }
    });
});

const post = sql => new Promise(function (resolve, reject) {
    db.post(sql, function (err, row) {
        if (err) {
            reject(err);
        }
        else {
            resolve(row);
        }
    });
});

const put = sql => new Promise(function (resolve, reject) {
    db.put(sql, function (err, row) {
        if (err) {
            reject(err);
        }
        else {
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
    select: ({email}) => get(`
        select ID_User,password from Users
            where ID_User = '${email}'
            `),

    a: Promise.resolve({
        ID_User: 0,
        checkPassword: (/*password*/) => true,
    }),

    all: () => all('select * from Users'),

    insert : ({email,password,isstaff})=> post(`
        insert into Users values('${email}','${password}',${isstaff});
            `),

    command : ({email})=>get(`
        select plans, meals ,price ,creation_time ,collecting_time, status
            from Orders, Users
                where Orders.ID_User = Users.ID_User
                    and Users.ID_User = '${email}'
            `)
};


// Cet export met à disposition des programmeurs 2 fonctions
// dbhelper.order.insert, qui ajoute un ordre
// dbhelper.order.select, qui récupère tous les ordres avec un tel id

module.exports.order = {
    insert: ({ID_order,user,plan,meal,price,creation_time,collecting_time,status}) => post(`
        INSERT INTO Orders 
            VALUES(${ID_order},'${user}',${plan},${meal},${price},'${creation_time}','${collecting_time}',${status})
            `),
    all: () => all('select * from Users'),
    select : ({ID_order})=> all(`
        select * from Orders where ID_Order = ${ID_order}
            `)
};

// Cet export met à disposition des programmeurs 2 fonctions
// dbhelper.order.insert, qui ajoute un qrcode
// dbhelper.order.select, qui récupère tous les qrcode avec un tel id

module.exports.qrcode = {
    insert: ({ID_QRcode,ID_plan}) => post(`
        INSERT INTO QR_codes 
            VALUES(${ID_QRcode},${ID_plan})
            `),
    select : ({ID_QRcode}) => all(`
        select * from QR_codes where ID_QRcode = ${ID_QRcode}
            `)
};

// Cet export met à disposition des programmeurs 4 fonctions
// dbhelper.plan.select, qui récupère les infos un plan
// dbhelper.plan.delete, qui supprime un plan
// dbhelper.plan.insert, qui ajoute un plan
// dbhelper.plan.update, qui met a jour un plan

module.exports.plan = {
    insert: ({ID_plan,meal,name,description,price}) => post(`
        INSERT INTO Plans 
            VALUES(${ID_plan},${meal},'${name}','${description}',${price})
            `),
    delete : ({ID_plan}) => remove(`
        DELETE FROM Plans 
            WHERE ID_Plan = ${ID_plan}
            `),
    update : ({ID_plan,ID_Meal,new_meal,new_name,new_desc,new_price}) => put(`
        DELETE FROM Plans
            WHERE ID_Plan = ${ID_plan} and ID_Meal = ${ID_Meal}

        INSERT INTO Plans 
            VALUES(${ID_plan},${new_meal},'${new_name}','${new_desc}',${new_price})
            `),
    select : ({ID_plan}) => all(`
        select * from Plans where ID_Plan = ${ID_plan}
            `)
};

// Cet export met à disposition des programmeurs 4 fonctions
// dbhelper.meal.select, qui récupère les infos un meal
// dbhelper.meal.delete, qui supprime un meal
// dbhelper.meal.insert, qui ajoute un meal
// dbhelper.meal.update, qui met a jour un meal

module.exports.meal = {
    insert : ({ID_meal,name,description,stock,type,hot}) => post(`
        INSERT INTO Meals 
            VALUES(${ID_meal},'${name}','${description}',${stock},'${type}',${hot})
            `),
    delete : ({ID_meal}) => remove(`
        DELETE FROM Meals
            WHERE ID_Meal = ${ID_meal}
            `),
    update : ({ID_Meal,new_name,new_desc,new_stock,new_price,new_hot}) => put(`
        UPDATE Meals SET
            Name = ${new_name}, description = ${new_desc}, stock = ${new_stock}
                price = ${new_price}, hot = ${new_hot}
                    WHERE ID_Meal = ${ID_Meal}
            `),
    select : ({ID_meal}) => get(`
        SELECT * FROM Meals
            WHERE ID_Meal = ${ID_meal}
            `)
}