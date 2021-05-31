
--
-- Meals
--

create table if not exists Meals (
    ID_Meal integer primary key,
    Name text not null,
    description text not null,
    stock integer,
    type text not null,
    hot integer not null check (hot in (0, 1))
);

--
-- Plans
--

create table if not exists Plans (
    ID_Plan integer ,
    ID_Meal integer,
    Name text not null,
    description text not null,
    price real,
    PRIMARY KEY (ID_Plan, ID_Meal)
);

--
-- Users
--

create table if not exists Users (
    ID_user text not  null primary key,
    password text not null,
    Isstaff integer not null check (Isstaff in (0, 1))
);

--
-- Orders
--

create table if not exists Orders (
    ID_Order integer not null,
    ID_User text not null,
    ID_Plan integer,
    ID_Meal integer,
    price real,
    creation_time text,
    collecting_time text,
    status integer,
    FOREIGN KEY(ID_User) REFERENCES Users(ID_User),
    FOREIGN KEY(ID_Plan) REFERENCES Plans(ID_Plans),
    FOREIGN KEY(ID_Meal) REFERENCES Meals(ID_Meals),
    PRIMARY KEY (ID_Order, ID_User, ID_Plan, ID_Meal)
);

--TEXT as ISO8601 strings ("YYYY-MM-DD HH:MM:SS.SSS") date


--
-- QR_codes
--

create table if not exists QR_codes (
    ID_QRcode integer, 
    ID_Order integer,
    FOREIGN KEY(ID_Order) REFERENCES Orders(ID_Order),
    PRIMARY KEY (ID_QRcode ,ID_Order)
);

