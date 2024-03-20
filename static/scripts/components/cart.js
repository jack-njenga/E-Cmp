
import { Store } from "../services/storage/storage.js"
import { Formatter } from "../services/utils/formats.js";


export class Cart {

    #store = new Store()
    #formatter = new Formatter()

    #cart = document.querySelector("[-cart-]");
    #cartId = this.#cart.getAttribute("cartId");

    HeadercartItemCount = document.querySelector("[cartItemCount]")

    totalItems = document.getElementById("total-items")
    totalPriceAll = document.getElementById("total-price-all")
    totalAll = 0;

    deliveryFee = document.querySelector("[deliver-fee]");
    actualDeliveryFee = this.deliveryFee.getAttribute("fee")
    storePickUp = document.querySelector("[storePickUp]")

    cartItemContainer = document.querySelector("[cart-item-container]");
    cartItems = [...this.cartItemContainer.children]

    summaryInfoContainer = document.querySelector("[summary-info]")

    constructor() {

        if (!this.#cartId) {
            let uuid = this.#formatter.uuid()
            
            this.#setCartId(uuid);
        }
        // this.#cartId = this.#cart.getAttribute("cartId");

    }
    #setCartId(id) {
        this.#cart.setAttribute("cartId", id);
        this.#cartId = this.#cart.getAttribute("cartId");
    }

    #reloadItems() {
        // cart shape = {"cartId": {"id": "cartId", "items": {"itemId": "qty", "itemId": "qty"}}}
        let currCartItems = this.#store.get("cart");

        if (currCartItems.constructor === String) {
            currCartItems = JSON.parse(currCartItems);
        }
        let keys = Object.keys(currCartItems)

        if (keys && keys.length > 0) {
            if (keys.length > 1) {
                console.log(`More than 1 ids for cart: ${keys}`)
            }
            this.#setCartId(keys[0]);
            let items = currCartItems[keys[0]]
            let itemKeys = Object.keys(items)

            // api is needed ...
            // console.log(items[itemKeys[1]])
        }
        
    }

    #addItem(itemId) {
        // cart shape = {"cartId": {"id": "cartId", "items": {"itemId": "qty", "itemId": "qty"}}}
        let itemDel = document.getElementById(itemId);
        
        let currCartItems = this.#store.get("cart");
        console.log(currCartItems);
    }

    #removeItem(itemId) {
        let itemDel = document.getElementById(itemId);
        let delItemSubtotal = itemDel.querySelector("[sub-total]").textContent;
        let delPrice = this.#formatter.stringToPrice(delItemSubtotal)
    
        itemDel.remove();
        this.totalPriceAll.textContent = this.#formatter.numberToPrice((this.#formatter.stringToPrice(this.totalPriceAll.textContent) - delPrice))
        this.totalItems.textContent = (this.#formatter.stringToPrice(this.totalItems.textContent) - 1);
        this.#populateItemCount()
    }

    #checkStorePickUp() {
        this.storePickUp.addEventListener("click", () => {
            
            let deliveryfee = this.#formatter.stringToPrice(this.deliveryFee.textContent)
            let currTotal = document.getElementById("total-price-all")
            let currT = this.#formatter.stringToPrice(currTotal.textContent)
            console.log(currT)

            if (this.storePickUp.checked) {
                currTotal.textContent = this.#formatter.numberToPrice((currT - deliveryfee))
                
            } else {
                currTotal.textContent = this.#formatter.numberToPrice((currT + deliveryfee))
               
            }
        })
    }

    cart() {
        let deliveryfee = this.#formatter.stringToPrice(this.deliveryFee.textContent)
        this.totalAll = (this.totalAll + deliveryfee)
        // this.#checkStorePickUp()

        for (let item of this.cartItems) {
            // console.log(item);
            
            let removeBtn = item.querySelector("[remove-btn]");
            
            let priceEach = item.querySelector("[price-each]");
            let subTotal = item.querySelector("[sub-total]");
            
            let priceEachContent = this.#formatter.stringToPrice(priceEach.textContent);

            let minus = item.querySelector("[minus]");
            let qty = item.querySelector("[qty]");
            let plus = item.querySelector("[plus]");
        
            let qtyContent = parseFloat(qty.textContent);
            let totals = (priceEachContent * qtyContent);
            subTotal.textContent = this.#formatter.numberToPrice(totals);
        
            this.totalAll = (this.totalAll + totals);
            this.totalPriceAll.textContent = this.#formatter.numberToPrice(this.totalAll);
        
            minus.addEventListener("click", () => {
                if (qtyContent > 1) {
                    qtyContent = (qtyContent - 1);
                    qty.textContent = qtyContent
        
                    totals = (priceEachContent * qtyContent);
                    subTotal.textContent = this.#formatter.numberToPrice(totals);
        
                    // totalAll = (totalAll - totals);
                    this.totalPriceAll.textContent = this.#formatter.numberToPrice((this.#formatter.stringToPrice(this.totalPriceAll.textContent) - this.#formatter.stringToPrice(priceEachContent)))
                }
                
            });
            plus.addEventListener("click", () => {
                qtyContent = (qtyContent + 1);
                qty.textContent = qtyContent
        
                totals = (priceEachContent * qtyContent);
                subTotal.textContent = this.#formatter.numberToPrice(totals);
        
                // totalAll = (totalAll + totals);
                this.totalPriceAll.textContent = this.#formatter.numberToPrice((this.#formatter.stringToPrice(this.totalPriceAll.textContent) + this.#formatter.stringToPrice(priceEachContent)))
            });

            removeBtn.addEventListener("click", () => {
                this.#removeItem(item.id);
            })
        }
        
    }
    #populateItemCount() {
        let currItems = document.querySelector("[cart-item-container]").children
        let len = parseFloat(currItems.length)

        

        this.totalItems.textContent = len;
        this.HeadercartItemCount.textContent = len;
        if (len < 1) {
            this.summaryInfoContainer.remove();
        }
    }

    activate() {
        this.#reloadItems()
        this.#populateItemCount()
        this.cart()
        this.#checkStorePickUp()
    }


}

