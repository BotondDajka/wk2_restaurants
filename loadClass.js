const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./restaurantdb1.sqlite");

class Restaurant{
    id;
    name;
    imagelink;
    
    menus = [];

    constructor(id,name,imagelink){
        this.id = id;
        this.name = name;
        this.imagelink = imagelink;
    }

    addMenu(menu){
        this.menus.push(menu);
    }
    getMenus(){
        return this.menus;
    }
    getMenu(index){
        return this.menus[index];
    }
    removeMenu(index){
        this.menus.splice(index, 1);
    }

}

class Menu{
    id;
    title;

    items = [];

    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    addItem(item){
        this.items.push(item);
    }
    getItems(){
        return this.items;
    }
    getItem(index){
        return this.items[index];
    }
    removeItem(index){
        this.items.splice(index, 1);
    }
}

class MenuItem {
    id;
    name;
    price;

    constructor(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price;
    }
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getPrice(){
        return this.price;
    }
}



async function getRestaurants(){
    return new Promise((resolve, reject)=>[
        db.all("SELECT * FROM RESTAURANTS", (err,rows)=>{
            if (err) reject(err);

            resolve(rows);
        })
    ])
}

async function getMenus(restaurantId){
    return new Promise((resolve, reject)=>[
        db.all(`SELECT * FROM MENUS WHERE restaurantId=${restaurantId}`, (err,rows)=>{
            if (err) reject(err);

            resolve(rows);
        })
    ])
}

async function getMenuItems(menuId){
    return new Promise((resolve, reject)=>[
        db.all(`SELECT * FROM MENU_ITEMS WHERE menuId=${menuId}`, (err,rows)=>{
            if (err) reject(err);

            resolve(rows);
        })
    ])
}

let restaurantList = [];

async function loadClasses(){

    const restaurants = await getRestaurants()
    for(let i = 0; i < restaurants.length; i++){
        const restaruantId = restaurants[i].id;
        const restaurantName = restaurants[i].name;
        const restaurantImagelink = restaurants[i].imagelink;
    
        const restaurant = new Restaurant(restaruantId, restaurantName, restaurantImagelink);


        const menus = await getMenus(restaurant.id);   
        for (let i2 = 0; i2 < menus.length; i2++){
            const menuId = menus[i2].id;
            const menuTitle = menus[i2].title;

            const menu = new Menu(menuId, menuTitle);


            const menuItems = await getMenuItems(menuId);   
            for(let i3 = 0; i3 < menuItems.length; i3++){
                const itemId = menuItems[i3].id;
                const itemName = menuItems[i3].name;
                const itemPrice = menuItems[i3].price;

                const menuItem = new MenuItem(itemId, itemName, itemPrice)

                menu.addItem(menuItem);
            }

            restaurant.addMenu(menu);
        }

        restaurantList.push(restaurant);
    }

    console.log(restaurantList[3].name);
    console.log(restaurantList[3].menus[1].title);
    console.log(restaurantList[3].menus[1].items[0].name);
    console.log(restaurantList.length);
    
}


loadClasses();






