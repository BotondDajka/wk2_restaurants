const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const db = new sqlite3.Database("./restaurantdb1.sqlite");

function insertData(data) {
	const insertRestaurant = db.prepare("INSERT INTO RESTAURANTS (name, imagelink) VALUES (?,?)");
	const insertMenu = db.prepare("INSERT INTO MENUS (title, restaurantId) VALUES (?,?)");
	const insertItem = db.prepare("INSERT INTO MENU_ITEMS (menuId, name, price) VALUES (?,?,?)");

	let menuIdIndex = 1;
	for (let i = 0; i < data.length; i++) {
        const restaurantName = data[i].name;
        const restaurantImage = data[i].image;

		insertRestaurant.run(restaurantName, restaurantImage);

		for (let i2 = 0; i2 < data[i].menus.length; i2++) {
            const menuTitle = data[i].menus[i2].title
            const restaurantId = i + 1;

            insertMenu.run(menuTitle , restaurantId);
            
            for (let i3 = 0; i3 < data[i].menus[i2].items.length; i3++){
                const itemName = data[i].menus[i2].items[i3].name;
                const itemPrice = data[i].menus[i2].items[i3].price;

                insertItem.run(menuIdIndex, itemName, itemPrice)
            }
            menuIdIndex++;
		}
	}

	insertRestaurant.finalize();
	insertMenu.finalize();
	insertItem.finalize();

	db.close();
}



fs.readFile("./restaurants.json", (err, data) => {
    if (err) throw new Error(err);

    const parsedData = JSON.parse(data);

    insertData(parsedData);
});

