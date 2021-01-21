const sqlite3 = require('sqlite3').verbose();
const fs = require('fs'); // Node.js file system module
// use a persistent database named db.sqlite
const db = new sqlite3.Database('./restaurantdb1.sqlite');


db.serialize(function () {
    db.run("DELETE FROM RESTAURANTS")
    db.run("DELETE FROM MENUS")
    db.run("DELETE FROM MENU_ITEMS")
});