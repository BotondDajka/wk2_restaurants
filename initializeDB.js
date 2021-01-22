const sqlite3 = require('sqlite3').verbose();
const fs = require('fs'); // Node.js file system module
// use a persistent database named db.sqlite
const db = new sqlite3.Database('./restaurantdb1.sqlite');


db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS RESTAURANTS (id INTEGER PRIMARY KEY, name TEXT, imagelink TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS MENUS (id INTEGER PRIMARY KEY, title TEXT, restaurantId INT, FOREIGN KEY (restaurantId) references RESTAURANTS(id))");
    db.run("CREATE TABLE IF NOT EXISTS MENU_ITEMS (id INTEGER PRIMARY KEY, menuId INT, name TEXT, price REAL, FOREIGN KEY (menuId) references MENUS(id))");

    db.close();
});