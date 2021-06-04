-- reinitialisation de la base de données
drop table if exists Users;
drop table if exists Meals;
drop table if exists Plans;
drop table if exists Orders;
drop table if exists QR_codes;
drop table if exists Plan_Meals;
drop table if exists Order_Meals;



--
-- Meals 
-- table des plats que l'on peut proposer

create table if not exists Meals (
    ID_Meal integer not null primary key,
    Name text not null,
    description text not null,
    stock integer,
    type text not null,
    hot BOOLEAN not null check (hot in (0, 1))
);

--
-- Plans
-- table des menus 

create table if not exists Plans (
    ID_Plan integer primary key,
    Name text not null,
    description text not null,
    price real
);

--
-- Plan_Meals
-- table reliant les menus et les plat proposer

create table if not exists Plan_Meals (
    ID_Plan integer,
    Plat1 integer,
    Plat2 integer,
    Dessert1 integer,
    Dessert2 integer,
    FOREIGN KEY(ID_Plan) REFERENCES Plans(ID_Plan),
    FOREIGN KEY(Plat1) REFERENCES Meals(ID_Meal),
    FOREIGN KEY(Plat2) REFERENCES Meals(ID_Meal),
    FOREIGN KEY(Dessert1) REFERENCES Meals(ID_Meal),
    FOREIGN KEY(Dessert2) REFERENCES Meals(ID_Meal),
    PRIMARY KEY (ID_Plan)
);

--
-- Orders
-- table contenant les commandes

create table if not exists Orders (
    ID_Order integer primary key,
    ID_User text not null,
    ID_Plan integer,
    price real,
    creation_time text,
    collecting_time text,
    status integer,
    FOREIGN KEY(ID_User) REFERENCES Users(ID_User),
    FOREIGN KEY(ID_Plan) REFERENCES Plans(ID_Plan)
);

--TEXT as ISO8601 strings ('YYYY-MM-DD HH:MM:SS.SSS') date


--
-- Order_Meals
-- table reliant les commandes et les plats commandés

create table if not exists Order_Meals (
    ID_Order integer,
    Plat integer,
    Dessert integer,
    FOREIGN KEY(ID_Order) REFERENCES Orders(ID_Order),
    FOREIGN KEY(Plat) REFERENCES Meals(ID_Meal),
    FOREIGN KEY(Dessert) REFERENCES Meals(ID_Meal),
    primary key (ID_Order)
);

--
-- Users
-- table contenant les utilisateur du site

create table if not exists Users (
    ID_user text not null primary key unique,
    password text not null,
    Isstaff BOOLEAN not null check (Isstaff in (0, 1))
);

--
-- QR_codes
-- table contenant les qr_code pour les commandes (non utilisé ici)

create table if not exists QR_codes (
    ID_QRcode integer, 
    ID_Order integer,
    FOREIGN KEY(ID_Order) REFERENCES Orders(ID_Order),
    PRIMARY KEY (ID_QRcode ,ID_Order)
);

-- données nécessaire car la partie administration n'a pas eu le temps d'être créé
insert into Users (ID_User,password, Isstaff) values ('rabadan.felix@gmail.com','qwerty',0);
insert into Users (ID_User,password, Isstaff) values ('rocheteau.axel@gmail.com','azerty',0);

insert into Meals (ID_Meal,Name,description,stock,type,hot) values(1,'compote','compote au fruit',3,'type',0);
insert into Meals (ID_Meal,Name,description,stock,type,hot) values(2,'donut','gateau',3,'type',0);
insert into Meals (ID_Meal,Name,description,stock,type,hot) values(3,'jambon beurre','sandwich baguette',154,'type',0);
insert into Meals (ID_Meal,Name,description,stock,type,hot) values(4,'fromage crudité','sandwich baguette',154,'type',0);

insert into Meals (ID_Meal,Name,description,stock,type,hot) values(5,'cookie','gateau',3,'type',0);
insert into Meals (ID_Meal,Name,description,stock,type,hot) values(6,'pizza','pizza reine',154,'type',1);
insert into Meals (ID_Meal,Name,description,stock,type,hot) values(7,'hamburger','hamburger classique',154,'type',1);

insert into Plans (ID_plan,Name,description,price) values (1,'Menu etudiant','pas cher',4.5);
insert into Plans (ID_plan,Name,description,price) values (2,'Menu chaud','plat chaud',6);

insert into Plan_Meals (ID_Plan,Plat1,Plat2,Dessert1,Dessert2) values (1,3,4,1,2);
insert into Plan_Meals (ID_Plan,Plat1,Plat2,Dessert1,Dessert2) values (2,7,6,5,1);

insert into Order_Meals (ID_Order,Plat,Dessert) values(1,3,2);
insert into Order_Meals (ID_Order,Plat,Dessert) values(2,4,1);
insert into Order_Meals (ID_Order,Plat,Dessert) values(3,4,1);

insert into Orders (ID_Order, ID_User, ID_Plan,price,creation_time,collecting_time,status) values (1,'rabadan.felix@gmail.com',1,4.5,'2021-05-31 12:52:32','15:40',1);
insert into Orders (ID_Order, ID_User, ID_Plan,price,creation_time,collecting_time,status) values (2,'rabadan.felix@gmail.com',1,4.5,'2021-05-31 13:42:42','16:40',1);
insert into Orders (ID_Order, ID_User, ID_Plan,price,creation_time,collecting_time,status) values (3,'rocheteau.axel@gmail.com',1,4.5,'2021-05-31 18:45:32','17:40',1);
