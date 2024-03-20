/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "?50e4":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://e-cmp-2/fs_(ignored)?");

/***/ }),

/***/ "?a1ac":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://e-cmp-2/path_(ignored)?");

/***/ }),

/***/ "?f7b7":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://e-cmp-2/url_(ignored)?");

/***/ }),

/***/ "./static/scripts/app.js":
/*!*******************************!*\
  !*** ./static/scripts/app.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services_storage_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/storage/storage.js */ \"./static/scripts/services/storage/storage.js\");\n/* harmony import */ var _components_search_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/search.js */ \"./static/scripts/components/search.js\");\n\n\nconst storage = new _services_storage_storage_js__WEBPACK_IMPORTED_MODULE_0__.Store();\n\n// storage.commit()\n// storage.reload();\n// console.log(storage.get({\"user\": \"id\"}))\n// console.log(storage.delete({\"user\": \"id\"}));\n// storage.reload();\n// console.log(storage.get({\"user\": \"id\"}))\n\n//# sourceURL=webpack://e-cmp-2/./static/scripts/app.js?");

/***/ }),

/***/ "./static/scripts/components/search.js":
/*!*********************************************!*\
  !*** ./static/scripts/components/search.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Search: () => (/* binding */ Search),\n/* harmony export */   search: () => (/* binding */ search)\n/* harmony export */ });\nclass Search {}\nfunction search() {\n  let input = document.getElementById(\"search-input\");\n  if (input) {\n    let inputValue = input.value;\n    alert(inputValue);\n  } else {\n    alert(`Error`);\n  }\n}\n\n//# sourceURL=webpack://e-cmp-2/./static/scripts/components/search.js?");

/***/ }),

/***/ "./static/scripts/services/storage/storage.js":
/*!****************************************************!*\
  !*** ./static/scripts/services/storage/storage.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Store: () => (/* binding */ Store)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"?50e4\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url */ \"?f7b7\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"?a1ac\");\n\n\n\n\n// Store\nclass Store {\n  #returnType = \"json\";\n  #storeName = \"store\";\n  #cwd = false;\n  #storePath = false;\n  constructor() {\n    if (typeof window !== \"undefined\") {\n      console.log(`\\n\\t\\t---Running on Broswer (${navigator.userAgent})---\\n`);\n    } else if (typeof global !== \"undefined\") {\n      console.log(`\\n\\t\\t---Runnung on Node (${process.version})---\\n`);\n      this.#cwd = path__WEBPACK_IMPORTED_MODULE_2__.dirname((0,url__WEBPACK_IMPORTED_MODULE_1__.fileURLToPath)(\"file:///mnt/c/GIT/ME/Tailwind/E-Cmp-2/static/scripts/services/storage/storage.js\"));\n      this.#storePath = path__WEBPACK_IMPORTED_MODULE_2__.join(this.#cwd, this.#storeName);\n      // this.#snapshot()\n    } else {\n      console.log(\"\\n\\t\\tUnknown env\");\n    }\n  }\n  #user = {\n    \"id\": {\n      \"id\": \"uuid4\",\n      \"firstName\": \"Jack\",\n      \"lastName\": \"Njenga\",\n      \"email\": \"jacknjenga@gmail.com\",\n      \"pwd\": \"********\",\n      \"mpesaNumber\": \"0712345678\",\n      \"phoneNumber\": \"0712345678\",\n      \"ip\": [\"ip1\", ...\"ip2\"]\n    }\n  };\n  #item = {\n    \"id\": {\n      \"id\": \"uuid4\",\n      \"name\": \"itemName\",\n      \"img\": \"itemImg\",\n      \"description\": \"itemDesc\",\n      \"category\": \"itemCategory\",\n      \"price\": 1000,\n      \"brand\": \"itemBrand\",\n      \"other\": {\n        \"voltage\": \"1.4\",\n        \"model number\": \"12Q\",\n        \"blablabla\": \"...\"\n      }\n    },\n    \"id1\": {\n      \"id\": \"uuid4\",\n      \"name\": \"itemName\",\n      \"img\": \"itemImg\",\n      \"description\": \"itemDesc\",\n      \"category\": \"itemCategory1\",\n      \"price\": 1000,\n      \"brand\": \"itemBrand\",\n      \"other\": {\n        \"voltage\": \"1.4\",\n        \"model number\": \"12Q\",\n        \"blablabla\": \"...\"\n      }\n    }\n  };\n  #filter = {\n    \"id\": {\n      \"id\": \"uuid4\",\n      \"category\": \"all\",\n      \"price\": \"all\"\n    }\n  };\n  #cart = {\n    \"id\": {\n      \"id\": \"uuid4\",\n      \"items\": {\n        \"this.items.id\": 4,\n        \"this.items.id-1\": 2,\n        \"this.items.id-2\": 3\n      }\n    }\n  };\n  #deliveryDetails = {\n    \"id\": {\n      \"id\": \"uuid4\",\n      \"county\": \"Kiambu\",\n      \"location\": \"Juja\",\n      \"specificLocation\": \"kimbo\",\n      \"deliveryFee\": 400,\n      \"deliveryTimeHrs\": 48\n    }\n  };\n  #pages = {\n    \"id\": {\n      \"id\": \"uuid4\",\n      \"totalItems\": 200,\n      \"default\": 20\n    }\n  };\n  #order = {\n    \"id\": {\n      \"id\": \"uuid4\",\n      \"orderNumber\": \"#001\",\n      \"dateOfPlacement\": \"01-01-2024\",\n      \"deliveryDetails\": this.#deliveryDetails.id,\n      \"cart\": this.#cart.id,\n      \"status\": \"Processing\",\n      \"rating\": 4\n    }\n  };\n  #orders = {\n    \"id\": {\n      \"id\": \"uuid4\",\n      \"orders\": [...this.#order.id.id]\n    }\n  };\n  #checkout = {\n    \"id\": {\n      \"id\": \"uuid4\",\n      \"deliveyDetails\": this.#deliveryDetails.id.id,\n      \"cart\": this.#cart.id.id,\n      \"status\": \"Payed, Not payed, Pay On Delivery\",\n      \"paymentMethod\": \"Mpesa Send Money\",\n      \"user\": this.#user.id.id,\n      \"mpesaCode\": \"Q...\"\n    }\n  };\n  #tables = {\n    \"user\": this.#user,\n    \"item\": this.#item,\n    \"filter\": this.#filter,\n    \"cart\": this.#cart,\n    \"deliveryDetails\": this.#deliveryDetails,\n    \"pages\": this.#pages,\n    \"order\": this.#order,\n    \"checkout\": this.#checkout\n  };\n  #where() {\n    // returns true if on browser else false\n    if (typeof window !== \"undefined\") {\n      return true;\n    } else if (typeof global !== \"undefined\") {\n      return false;\n    } else {\n      return false;\n    }\n  }\n  #snapshot() {\n    if (this.#where()) {\n      localStorage.setItem(this.#storeName, this.format(this.#tables, \"json\"));\n      console.log(`--SP--(SNAP): Snapshot Taken->browser on(localStorage)`);\n      return true;\n    } else {\n      fs__WEBPACK_IMPORTED_MODULE_0__.writeFileSync(this.#storePath, JSON.stringify(this.#tables));\n      console.log(`--SP--(SNAP): Snapshot Taken->node on(${this.#storePath})`);\n      return true;\n    }\n  }\n  commit() {\n    // commits everything to store\n    this.#snapshot();\n  }\n  reload() {\n    if (this.#where()) {\n      const data = localStorage.getItem(this.#storeName);\n      this.#tables = JSON.parse(data);\n      console.log(`--RL--(RELOAD): Data reloaded`);\n      return true;\n    } else {\n      const data = fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync(this.#storePath, \"utf8\");\n      this.#tables = JSON.parse(data);\n      console.log(`--RL--(RELOAD): Data reloaded`);\n      return true;\n    }\n  }\n  #getmethods(strict = false) {\n    let methods = Object.getOwnPropertyNames(this.constructor.prototype);\n    let index = methods.indexOf(\"constructor\");\n    methods.splice(index, 1);\n    if (strict && methods.includes(strict)) {\n      if (strict == \"update\") {\n        return [\"update\"];\n      }\n      return methods;\n    }\n    console.log(`--E--(ERROR): You must provide a strict filter got strict=${strict}`);\n    return methods;\n  }\n  #checkInTables(table) {\n    if (table in this.#tables) {\n      return true;\n    } else {\n      console.log(`--R--(REJECT): '${table}' is not a table`);\n      return false;\n    }\n  }\n  #getTableKeys(table, id = true) {\n    if (this.#checkInTables(table)) {\n      let firstKey = Object.keys(this.#tables[table])[0];\n      let firstItem = this.#tables[table][firstKey];\n      let firstItemKeys = Object.keys(firstItem);\n      if (id) {\n        return firstItemKeys;\n      } else {\n        let id = \"id\";\n        let index = firstItemKeys.indexOf(id);\n        if (index !== -1) {\n          firstItemKeys.splice(index, 1);\n        } else {\n          console.log(`--E--(ERROR): ${id} cannot be found`);\n        }\n        return firstItemKeys;\n      }\n    }\n    return false;\n  }\n  #checkKeyInTable(table, key) {\n    // takes in (user, email)\n    // check if the user table has a key named \"email\"\n    if (this.#checkInTables(table)) {\n      let firstKey = Object.keys(this.#tables[table])[0];\n      let firstItem = this.#tables[table][firstKey];\n      let firstItemKeys = Object.keys(firstItem);\n      if (firstItemKeys.includes(key)) {\n        return true;\n      }\n      console.log(`--N--(NOTIFY): '${key}' no such key`);\n      return false;\n    }\n    return false;\n  }\n  format(data, how, status) {\n    // data = {} | \"{}\" | \"\"\n    // how = \"json\" | \"object\"\n    if (data) {\n      if (Array.isArray(data) && !data[0]) {\n        return false;\n      }\n    } else {\n      return false;\n    }\n    if (how.toLowerCase() === \"json\") {\n      // check if it is already a json\n      // console.log(typeof data)\n      try {\n        let dt = JSON.parse(data); // if the data is json already\n        return JSON.stringify(dt);\n      } catch (error) {\n        return JSON.stringify(data);\n      }\n    } else if (how.toLowerCase() === \"object\") {\n      // check if it is already a object\n      // console.log(typeof data)\n      try {\n        return JSON.parse(data);\n      } catch (error) {\n        return data;\n      }\n    }\n    return data;\n  }\n\n  // getter\n  get(table, type = this.#returnType) {\n    // obj = \"user\"\n    //       {\"user\": \"\"} gets all users\n    //       {\"user\": \"di\"} gets user with id == di\n    //       {\"user\": {\"id\": \"123\"}} gets user === id=123\n    let rtn = [];\n    console.log(`\\t...getting`);\n\n    // getting all items \"imgration purpose only\"\n    if (table === \"__all__\") {\n      return this.format([this.#tables], type);\n    }\n    // handling \"user\" gets all users case\n    else if (typeof table === \"string\") {\n      if (this.#checkInTables(table)) {\n        let objs = this.#tables[table];\n        return this.format(objs, type);\n      } else {\n        console.log(`--E--(ERROR): Can't find ${table}`);\n      }\n    }\n\n    // handling {\"user\": \"\"} gets all users case\n    else if (typeof table === \"object\" && table.constructor === Object) {\n      let objKeys = Object.keys(table);\n      let tb = objKeys[0];\n      if (objKeys.length > 1) {\n        console.log(`--N--(NOTIFY): Please One item at a time '${tb}'`);\n      }\n      if (this.#checkInTables(tb)) {\n        let objObj = this.#tables[tb];\n        let objs = JSON.stringify(objObj);\n        let objKeys = Object.keys(objObj);\n        if (table[tb]) {\n          if (typeof table[tb] === \"object\" && table[tb].constructor === Object) {\n            // console.log(`typeof ${table[tb]}: ${typeof table[tb]}`)\n            let innerObj = table[tb];\n            let innerObjKeys = Object.keys(innerObj);\n\n            // if {\"user\": {\"id\": \"uuid4\"}} is passed\n            if (innerObjKeys[0] === \"id\") {\n              let idVal = innerObj[innerObjKeys[0]];\n              rtn.push(objObj[idVal]);\n              return this.format(rtn, type);\n            }\n\n            // if {\"price\": [123, 334], \"category\": \"cate...\"} is passed\n            else {\n              for (let key of innerObjKeys) {\n                if (this.#checkKeyInTable(tb, key)) {\n                  let val = innerObj[key];\n                  for (let id of objKeys) {\n                    let currObj = objObj[id];\n                    // log the GET transaction\n                    // console.log(`From '${tb}' Table GET '${key}' = ${val} : (${val} == ${currObj[key]})`)\n                    if (val === currObj[key]) {\n                      if (!rtn.includes(currObj)) {\n                        rtn.push(currObj);\n                      }\n                    }\n                  }\n                }\n              }\n              return this.format(rtn, type);\n            }\n          }\n          // handling {\"user\": \"id\"} get user with id == id\n          else if (typeof table[tb] === \"string\") {\n            // console.log(`{user: \"id}: ${table[tb]}`)\n            let id = table[tb];\n            let item = this.get({\n              [tb]: {\n                \"id\": id\n              }\n            });\n            return this.format(item, type);\n          } else {\n            console.log(`--E--(ERROR): Expected a 'string' or '{}' GOT -${typeof table[tb]}`);\n          }\n        } else {\n          console.log(`--W--(WARN): No id(${table[tb]}) passed ...Getting everything`);\n          for (let key of objKeys) {\n            rtn.push(objObj[key]);\n          }\n          return this.format(rtn, type);\n        }\n      }\n    } else {\n      console.log(`--E--(ERROR): Expected a 'string' or '{}' GOT ${typeof table}`);\n    }\n    if (rtn.length > 0) {\n      return this.format(rtn, type);\n    } else {\n      return false;\n    }\n  }\n\n  // add\n  add(table, tableObj, own = false) {\n    console.log(`\\t...adding`);\n    // table = \"user\"\n    // tableObj = {\"id\": \"...\", \"firstName\": \"...\", ...}\n\n    if (this.#checkInTables(table)) {\n      let tableKeys = this.#getTableKeys(table);\n      let newObj = {};\n      if (!\"id\" in Object.keys(tableObj)) {\n        console.log(`--R--(REJECT): an id is required`);\n      } else {\n        for (let key of Object.keys(tableObj)) {\n          if (tableKeys.includes(key)) {\n            newObj[key] = tableObj[key];\n          } else {\n            console.log(`--R--(REJECT): '${key}' rejected `);\n          }\n        }\n        if (newObj) {\n          // let currObj = this.get({[table]: id}, \"object\")\n          let currTable = this.#tables[table];\n          let id = tableObj[\"id\"];\n          if (this.get({\n            [table]: id\n          }, \"object\")) {\n            if (this.#getmethods(own).includes(own)) {\n              currTable[id] = newObj;\n\n              // then commit to the db\n              console.log(`--A--(ALERT): ${own}->add modified '${table}' with id='${id}'`);\n              return this.format(newObj, this.#returnType);\n            }\n            console.log(`--R--(REJECT): Object with id='${id}' already exist`);\n            console.log(`--SW--(SHOW): ${this.get({\n              [table]: id\n            }, \"json\")}`);\n            console.log(`--X--(CANCEL): Operation canceled`);\n          } else {\n            currTable[id] = newObj;\n\n            // then commit to the db\n            this.commit();\n            return this.format(newObj, this.#returnType);\n          }\n        }\n      }\n    }\n    return false;\n  }\n  update(table, id, obj) {\n    // table = \"user\"\n    // id = \"123\" (uuid4)\n    // obj = {\"key\": \"val\"}\n    // update(table, id, {\"key\": \"val\"})\n    console.log(\"\\t...updating\");\n    let status = false;\n    if (this.#checkInTables(table) && id) {\n      let currObj = this.get({\n        [table]: id\n      }, \"object\");\n      if (currObj) {\n        if (Array.isArray(currObj)) {\n          currObj = currObj[0];\n        }\n        if (currObj === null) {\n          console.log(`--E--(ERROR): No object with id='${id}' found`);\n          return false;\n        }\n      } else {\n        return false;\n      }\n      if (obj && typeof obj === \"object\") {\n        let newObj = {};\n        let originalKeys = this.#getTableKeys(table, id = false);\n        for (let key of Object.keys(obj)) {\n          let val = obj[key];\n          if (originalKeys.includes(key) && key !== \"id\") {\n            currObj[key] = val;\n            status = true;\n          } else {\n            console.log(`--R--(REJECT): '${key}' rejected`);\n          }\n        }\n        if (status) {\n          let me = this.update.name;\n\n          // add will commit changes\n          return this.add(table, currObj, me);\n        }\n      } else {\n        console.log(`--E--(ERROR): What do you want to update (${obj})`);\n      }\n    }\n    return false;\n  }\n  #del(table, id) {\n    let currTable = this.#tables[table];\n    delete currTable[id];\n    console.log(`...deleted`);\n    // commit changes\n    this.commit();\n    return true;\n  }\n\n  // delete\n  delete(table, id) {\n    // table = \"user\" | {\"user\": \"123\"}\n    // id = \"123\"\n    // deletes the user with id=123\n    if (table) {\n      if (typeof table === \"object\" && !Array.isArray(table)) {\n        let keys = Object.keys(table);\n        if (keys && keys.length > 0) {\n          if (keys.length > 1) {\n            console.log(`--N--(NOTIFY): One item at a time please got ${keys}`);\n          }\n          let tb = keys[0];\n          let _id = table[tb];\n          if (this.get({\n            [tb]: _id\n          }, \"object\")) {\n            this.#del(tb, _id);\n            return true;\n          } else {\n            return false;\n          }\n        } else {\n          return this.delete();\n        }\n      }\n      // handle delete(table, id)\n      else if (typeof table === \"string\" && id) {\n        return this.delete({\n          [table]: id\n        });\n      } else {\n        return this.delete();\n      }\n    } else {\n      console.log(`--U--(USAGE): delete(table: id) or delete({table: id})`);\n      return false;\n    }\n  }\n\n  // checker\n  check(table, id) {\n    // table = \"user\" | {\"user\", \"123\"}\n    // id = \"123\"\n    if (table) {\n      if (typeof table === \"object\" && table.constructor === Object) {\n        let keys = Object.keys(table);\n        if (keys && keys.length > 0) {\n          if (keys.length > 1) {\n            console.log(`--N--(NOTIFY): One item at a time please got ${keys}`);\n          }\n          let tb = keys[0];\n          let _id = table[tb];\n          if (this.get({\n            [tb]: _id\n          }, \"object\")) {\n            return true;\n          } else {\n            return false;\n          }\n        } else {\n          return this.check();\n        }\n      }\n      // handle delete(table, id)\n      else if (typeof table === \"string\" && id) {\n        return this.check({\n          [table]: id\n        });\n      } else {\n        return this.check();\n      }\n    } else {\n      console.log(`--U--(USAGE): Check(table: id) or delete({table: id})`);\n      return false;\n    }\n  }\n}\n\n// const storage = new Store()\n\n// // console.log(storage.get({\"user\": \"id\"}))\n// storage.commit()\n// storage.reload();\n// console.log(storage.get({\"user\": \"id\"}))\n// console.log(storage.delete({\"user\": \"id\"}));\n// storage.reload();\n// console.log(storage.get({\"user\": \"id\"}))\n\n// // data = [{\"id\": \"1\"}, {\"id\": 2}]\n// // console.log(storage.format(data, \"json\"));\n// const items = storage.add(\"user\",{\"id\":\"13\",\"firstName\":\"jk\", \"lastName\": \"nj\", \"ips\": \"wed\"});\n// // let iitems = storage.get(\"__all__\")\n// // console.log(items)\n// // console.log(iitems)\n\n// console.log(storage.update(\"user\", \"13\", {\"lastName\": \"j---k\"}))\n\n// console.log(storage.check({\"user\": \"13\"}))\n\n// storage.delete({\"user\": \"13\"})\n\n// console.log(storage.get({\"user\": \"13\"}, \"object\"))\n\n// if (typeof window !== \"undefined\") {\n//     console.log(\"Running in Browser\")\n// } else if (typeof global !== \"undefined\") {\n//     console.log(\"Running on node env\")\n// } else {\n//     console.log(\"Unkown env\");\n// }\n\n//# sourceURL=webpack://e-cmp-2/./static/scripts/services/storage/storage.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./static/scripts/app.js");
/******/ 	
/******/ })()
;