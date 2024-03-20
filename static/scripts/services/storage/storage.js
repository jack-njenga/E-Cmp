// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import path from 'path';


// Store
export class Store {

    #returnType = "json"
    #storeName = "store"
    #cwd = false
    #storePath = false

    

    constructor() {
        if (typeof window !== "undefined") {
            console.log(`\n\t\t---Running on Broswer (${navigator.userAgent})---\n`);  
        }        
        else if (typeof global !== "undefined") {
            console.log(`\n\t\t---Runnung on Node (${process.version})---\n`);
            this.#cwd = path.dirname(fileURLToPath(import.meta.url));
            this.#storePath = path.join(this.#cwd, this.#storeName);
            // this.#snapshot()
        } else {
            console.log("\n\t\tUnknown env");
        }
    }

    #user = {
        "id": {
            "id": "uuid4",
            "firstName": "Jack",
            "lastName": "Njenga",
            "email": "jacknjenga@gmail.com",
            "pwd": "********",
            "mpesaNumber": "0712345678",
            "phoneNumber": "0712345678",
            "ip": ["ip1", ..."ip2"]
        }        
    };
    #item = {
        "id": {
            "id": "uuid4",
            "name": "itemName",
            "img": "itemImg",
            "description": "itemDesc",
            "category": "itemCategory",
            "price": 1000,
            "brand": "itemBrand",
            "other": {"voltage": "1.4", "model number": "12Q", "blablabla": "..."}
        },
        "id1": {
            "id": "uuid4",
            "name": "itemName",
            "img": "itemImg",
            "description": "itemDesc",
            "category": "itemCategory1",
            "price": 1000,
            "brand": "itemBrand",
            "other": {"voltage": "1.4", "model number": "12Q", "blablabla": "..."}
        }
    };

    #filter = {
        "id": {
            "id": "uuid4",
            "category": "all",
            "price": "all"
        }        
    };

    #cart = {
        "cartId": {
            "cartId": "123",
            "items": {
                "itemId": "Qty",
                "123": 2,
            }
        }     
    };

    #deliveryDetails = {
        "id": {
            "id": "uuid4",
            "county": "Kiambu",
            "location": "Juja",
            "specificLocation": "kimbo",
            "deliveryFee": 400,
            "deliveryTimeHrs": 48
        }
    };

    #pages = {
        "id": {
            "id": "uuid4",
            "totalItems": 200,
            "default": 20
        }        
    };
    #order = {
        "id": {
            "id": "uuid4",
            "orderNumber": "#001",
            "dateOfPlacement": "01-01-2024",
            "deliveryDetails": this.#deliveryDetails.id,
            "cart": this.#cart.id,
            "status": "Processing",
            "rating": 4
        }        
    };


    #orders = {
        "id": {
            "id": "uuid4",
            "orders": [...this.#order.id.id]
        }        
    };


    #checkout = {
        "id": {
            "id": "uuid4",
            "deliveyDetails": this.#deliveryDetails.id.id,
            "cart": this.#cart,
            "status": "Payed, Not payed, Pay On Delivery",
            "paymentMethod": "Mpesa Send Money",
            "user": this.#user.id.id,
            "mpesaCode": "Q..."
        }        
    }
    
    #tables = {
        "user": this.#user,
        "item": this.#item,
        "filter": this.#filter,
        "cart": this.#cart,
        "deliveryDetails": this.#deliveryDetails,
        "pages": this.#pages,
        "order": this.#order,
        "checkout": this.#checkout
    }

    #where() {
        // returns true if on browser else false
        if (typeof window !== "undefined") {           
            return true;
        }        
        else if (typeof global !== "undefined") {
            return false;
        } else {
            return false
        }
    }
    #snapshot() {
        if (this.#where()) {
            localStorage.setItem(this.#storeName, this.format(this.#tables, "json"));
            console.log(`--SP--(SNAP): Snapshot Taken->browser on(localStorage)`)
            return true
        } else {
            fs.writeFileSync(this.#storePath, JSON.stringify(this.#tables))
            console.log(`--SP--(SNAP): Snapshot Taken->node on(${this.#storePath})`)
            return true            
        }
    }
    commit() {
        // commits everything to store
        this.#snapshot()
    }
    reload() {
        if (this.#where()) {
            const data = localStorage.getItem(this.#storeName);
            this.#tables = JSON.parse(data);
            console.log(`--RL--(RELOAD): Data reloaded`);
            return true
        } else {
            const data = fs.readFileSync(this.#storePath, "utf8");
            this.#tables = JSON.parse(data);
            console.log(`--RL--(RELOAD): Data reloaded`);
            return true
        }
    }

    #getmethods(strict=false) {
        let methods = Object.getOwnPropertyNames(this.constructor.prototype)
        let index = methods.indexOf("constructor")

        methods.splice(index, 1);
        if (strict && methods.includes(strict)) {
            if (strict == "update") {
                return ["update"]
            }
            return methods
        }   
        console.log(`--E--(ERROR): You must provide a strict filter got strict=${strict}`)
        return methods
    }

    #checkInTables(table) {
        if (table in this.#tables) {
            return true;
        } else {
            console.log(`--R--(REJECT): '${table}' is not a table`);
            return false;
        }
    }
    #getTableKeys(table, id=true) {
        if (this.#checkInTables(table)) {
            let firstKey = Object.keys(this.#tables[table])[0];
            let firstItem = this.#tables[table][firstKey];
            let firstItemKeys = Object.keys(firstItem);
            if (id) {
                return firstItemKeys;
            } else {
                let id = "id"
                let index = firstItemKeys.indexOf(id);
                if (index !== -1) {
                    firstItemKeys.splice(index, 1);
                } else {
                    console.log(`--E--(ERROR): ${id} cannot be found`)
                }
                return firstItemKeys;
            }
            
        }   
        return false;
    }
    #checkKeyInTable(table, key) {
        // takes in (user, email)
        // check if the user table has a key named "email"
        if (this.#checkInTables(table)) {
            let firstKey = Object.keys(this.#tables[table])[0];
            let firstItem = this.#tables[table][firstKey];
            let firstItemKeys = Object.keys(firstItem);
            if (firstItemKeys.includes(key)) {
                return true
            }
            console.log(`--N--(NOTIFY): '${key}' no such key`);
            return false}
        return false
    }
    format(data, how, status) {
        // data = {} | "{}" | ""
        // how = "json" | "object"
        if (data) {
            if (Array.isArray(data) && !data[0]) {
                return false;
            }
        } else {return false}
        
        
        if (how.toLowerCase() === "json") {
            // check if it is already a json
            // console.log(typeof data)
            try {
                let dt = JSON.parse(data) // if the data is json already
                return JSON.stringify(dt);
            } catch(error) {
                return JSON.stringify(data);
            }
        } 
        
        else if (how.toLowerCase() === "object") {
            // check if it is already a object
            // console.log(typeof data)
            try {
                return JSON.parse(data)
            } catch(error) {
                return data;
            }

        }
        return data
    }

    // getter
    get(table, type=this.#returnType) {
        // obj = "user"
        //       {"user": ""} gets all users
        //       {"user": "di"} gets user with id == di
        //       {"user": {"id": "123"}} gets user === id=123
        let rtn = []
        console.log(`\t...getting`);
        
        // getting all items "imgration purpose only"
        if (table === "__all__") {
            return this.format([this.#tables], type)
        }
        // handling "user" gets all users case
        else if (typeof table === "string") {
            if (this.#checkInTables(table)) {
                let objs = this.#tables[table]
                return this.format(objs, type);
            } else { console.log(`--E--(ERROR): Can't find ${table}`) }
        } 
        
        // handling {"user": ""} gets all users case
        else if (typeof table === "object" && table.constructor === Object) {            
            let objKeys = Object.keys(table);
            let tb = objKeys[0]
            if (objKeys.length > 1) {
                console.log(`--N--(NOTIFY): Please One item at a time '${tb}'`);
            }
            if (this.#checkInTables(tb)) {
                let objObj = this.#tables[tb];
                let objs = JSON.stringify(objObj);
                let objKeys = Object.keys(objObj);

                if (table[tb]) {
                    if (typeof table[tb] === "object" && table[tb].constructor === Object) {
                        // console.log(`typeof ${table[tb]}: ${typeof table[tb]}`)
                        let innerObj = table[tb]
                        let innerObjKeys = Object.keys(innerObj);

                        // if {"user": {"id": "uuid4"}} is passed
                        if (innerObjKeys[0] === "id") {
                            let idVal = innerObj[innerObjKeys[0]]
                            rtn.push(objObj[idVal])
                            return this.format(rtn, type)
                        } 

                        // if {"price": [123, 334], "category": "cate..."} is passed
                        else {
                            for (let key of innerObjKeys) {
                                if (this.#checkKeyInTable(tb, key)) {
                                    let val = innerObj[key]
                                    
                                    for (let id of objKeys) {
                                        let currObj = objObj[id]
                                        // log the GET transaction
                                        // console.log(`From '${tb}' Table GET '${key}' = ${val} : (${val} == ${currObj[key]})`)
                                        if (val === currObj[key]) {
                                            if (!rtn.includes(currObj)) {                                              
                                                rtn.push(currObj);
                                            }
                                        }
                                    }
                                }                                
                            }
                            return this.format(rtn, type)
                        }                  
                    } 
                    // handling {"user": "id"} get user with id == id
                    else if (typeof table[tb] === "string") {
                        // console.log(`{user: "id}: ${table[tb]}`)
                        let id = table[tb];
                        let item = this.get({[tb]: {"id": id}});
                        return this.format(item, type)
                    }
                    else {
                        console.log(`--E--(ERROR): Expected a 'string' or '{}' GOT -${typeof table[tb]}`);
                    }                
                } 
                else {
                    console.log(`--W--(WARN): No id(${table[tb]}) passed ...Getting everything`)
                    for (let key of objKeys) {
                        rtn.push(objObj[key])
                    }
                    return this.format(rtn, type)
                }                
            }
        } else {
            console.log(`--E--(ERROR): Expected a 'string' or '{}' GOT ${typeof table}`);
        }
        if (rtn.length > 0) {
            return this.format(rtn, type)
        } else { return false }
    }

    // add
    add(table, tableObj, own=false) {
        console.log(`\t...adding`)
        // table = "user"
        // tableObj = {"id": "...", "firstName": "...", ...}
        
        if (this.#checkInTables(table)) {
            let tableKeys = this.#getTableKeys(table);
            let newObj = {};
            
            if (!"id" in Object.keys(tableObj)) {
                console.log(`--R--(REJECT): an id is required`)
            } 
            else {
                for (let key of Object.keys(tableObj)) {
                    if (tableKeys.includes(key)) {
                        newObj[key] = tableObj[key];
                    } else {
                        console.log(`--R--(REJECT): '${key}' rejected `)
                    }
                }
                if (newObj) {
                    // let currObj = this.get({[table]: id}, "object")
                    let currTable = this.#tables[table]
                    let id = tableObj["id"]
                    
                    if (this.get({[table]: id}, "object")) {
                        if (this.#getmethods(own).includes(own)) {
                            currTable[id] = newObj;

                            // then commit to the db
                            console.log(`--A--(ALERT): ${own}->add modified '${table}' with id='${id}'`)
                            return this.format(newObj, this.#returnType);
                        }

                        console.log(`--R--(REJECT): Object with id='${id}' already exist`);
                        console.log(`--SW--(SHOW): ${this.get({[table]: id}, "json")}`);
                        console.log(`--X--(CANCEL): Operation canceled`);
                    } else {
                        
                        currTable[id] = newObj;

                        // then commit to the db
                        this.commit()
                        return this.format(newObj, this.#returnType);
                    }
                }
            }            
        }
        return false
    }

    update(table, id, obj) {
        // table = "user"
        // id = "123" (uuid4)
        // obj = {"key": "val"}
        // update(table, id, {"key": "val"})
        console.log("\t...updating")
        let status = false;

        if (this.#checkInTables(table) && id) {
            let currObj = this.get({[table]: id}, "object")
            
            if (currObj) {
                if (Array.isArray(currObj)) {
                    currObj = currObj[0];
                }
                if (currObj === null) {
                    console.log(`--E--(ERROR): No object with id='${id}' found`);
                    return false;
                }              
            } else { return false }

            if (obj && (typeof obj === "object")) {
                let newObj = {}
                let originalKeys = this.#getTableKeys(table, id=false);

                for (let key of Object.keys(obj)) {
                    let val = obj[key]
                    if (originalKeys.includes(key) && key !== "id") {
                        currObj[key] = val;
                        status = true;
                    } else {
                        console.log(`--R--(REJECT): '${key}' rejected`)
                    }
                }
                if (status) {
                    let me = this.update.name

                    // add will commit changes
                    return this.add(table, currObj, me);
                }
            } else {
                console.log(`--E--(ERROR): What do you want to update (${obj})`);
            }
        }   
        return false
    }
    #del(table, id) {
        let currTable = this.#tables[table]

        delete currTable[id]
        
        console.log(`...deleted`)
        // commit changes
        this.commit()
        return true
    }

    // delete
    delete(table, id) {
        // table = "user" | {"user": "123"}
        // id = "123"
        // deletes the user with id=123
        if (table) {
            if (typeof table === "object" && !Array.isArray(table)) {
                let keys = Object.keys(table)
                if (keys && (keys.length > 0)) {
                    if (keys.length > 1) {
                        console.log(`--N--(NOTIFY): One item at a time please got ${keys}`)
                    }
                    let tb = keys[0]
                    let _id = table[tb]

                    if (this.get({[tb]: _id}, "object")) {   
                        this.#del(tb, _id)
                        return true
                    } else {return false}               
                } else {return this.delete()}
            }
            // handle delete(table, id)
            else if (typeof table === "string" && id) {
                return this.delete({[table]: id})
            } else {return this.delete()}            
        } else {
            console.log(`--U--(USAGE): delete(table: id) or delete({table: id})`)
            return false
        }
    }

    // checker
    check(table, id) {
        // table = "user" | {"user", "123"}
        // id = "123"
        if (table) {
            if (typeof table === "object" && table.constructor === Object) {
                let keys = Object.keys(table)
                if (keys && (keys.length > 0)) {
                    if (keys.length > 1) {
                        console.log(`--N--(NOTIFY): One item at a time please got ${keys}`)
                    }
                    let tb = keys[0]
                    let _id = table[tb]
                    
                    if (this.get({[tb]: _id}, "object")) { 
                        return true;
                    } else { 
                        return false 
                    }            
                } else {return this.check()}
            }
            // handle delete(table, id)
            else if (typeof table === "string" && id) {
                return this.check({[table]: id})
            } else {return this.check()}            
        } else {
            console.log(`--U--(USAGE): Check(table: id) or delete({table: id})`)
            return false
        }
    }
}



// const storage = new Store()

// // console.log(storage.get({"user": "id"}))
// storage.commit()
// storage.reload();
// console.log(storage.get({"user": "id"}))
// console.log(storage.delete({"user": "id"}));
// storage.reload();
// console.log(storage.get({"user": "id"}))



// // data = [{"id": "1"}, {"id": 2}]
// // console.log(storage.format(data, "json"));
// const items = storage.add("user",{"id":"13","firstName":"jk", "lastName": "nj", "ips": "wed"});
// // let iitems = storage.get("__all__")
// // console.log(items)
// // console.log(iitems)

// console.log(storage.update("user", "13", {"lastName": "j---k"}))

// console.log(storage.check({"user": "13"}))

// storage.delete({"user": "13"})

// console.log(storage.get({"user": "13"}, "object"))

// if (typeof window !== "undefined") {
//     console.log("Running in Browser")
// } else if (typeof global !== "undefined") {
//     console.log("Running on node env")
// } else {
//     console.log("Unkown env");
// }

