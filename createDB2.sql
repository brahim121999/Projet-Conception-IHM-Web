drop table if exists Users;
drop table if exists Meals;
drop table if exists Plans;
drop table if exists Orders;
drop table if exists QR_codes;
drop table if exists Plan_Meals;
drop table if exists Order_Meals;



--
-- Meals
--

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
--

create table if not exists Plans (
    ID_Plan integer primary key,
    Name text not null,
    description text not null,
    price real
);

--
-- Plan_Meals
--

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
-- Order_Meals
--

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
--

create table if not exists Users (
    ID_user text not null primary key unique,
    password text not null,
    Isstaff BOOLEAN not null check (Isstaff in (0, 1))
);

--
-- Orders
--

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
-- QR_codes
--

create table if not exists QR_codes (
    ID_QRcode integer, 
    ID_Order integer,
    FOREIGN KEY(ID_Order) REFERENCES Orders(ID_Order),
    PRIMARY KEY (ID_QRcode ,ID_Order)
);


insert into Users (ID_User,password, Isstaff) values ('rabadan.felix@gmail.com','qwerty',0);
insert into Users (ID_User,password, Isstaff) values ('rocheteau.axel@gmail.com','azerty',0);

insert into Meals (ID_Meal,Name,description,stock,type,hot) values(1,'compote','compote au fruit',3,'type',0);
insert into Meals (ID_Meal,Name,description,stock,type,hot) values(2,'donut','gateau',3,'type',0);
insert into Meals (ID_Meal,Name,description,stock,type,hot) values(3,'jambon beurre','sandwich baguette',154,'type',0);
insert into Meals (ID_Meal,Name,description,stock,type,hot) values(4,'fromage crudité','sandwich baguette',154,'type',0);

insert into Plans (ID_plan,Name,description,price) values (1,'low cost etu','all low cost things',8.50);

insert into Plan_Meals (ID_Plan,Plat1,Plat2,Dessert1,Dessert2) values (1,1,2,3,4);

insert into Order_Meals (ID_Order,Plat,Dessert) values(1,3,2);
insert into Order_Meals (ID_Order,Plat,Dessert) values(2,4,1);

insert into Orders (ID_Order, ID_User, ID_Plan,price,creation_time,collecting_time,status) values (1,'rabadan.felix@gmail.com',1,3.54,'2021-05-31','15:40',1);
insert into Orders (ID_Order, ID_User, ID_Plan,price,creation_time,collecting_time,status) values (2,'rabadan.felix@gmail.com',1,4.50,'2021-05-31','16:40',1);
