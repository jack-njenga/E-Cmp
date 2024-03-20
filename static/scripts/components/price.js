import { Api } from "../services/api/api.js"
import { Formatter } from "../services/utils/formats.js"


export class Price {

    minPrice = 1
    maxPrice = 50000
    applyBtn = document.querySelector("[apply-price]")
    minPriceInput = document.querySelector("[min-price]")
    maxPriceInput = document.querySelector("[max-price]")

    itemsContainer = document.querySelector("[items-container]");

    api = new Api();
    formatter = new Formatter();

    #getItems(minPrice, maxPrice) {
        let data = {"minPrice": minPrice, "maxPrice": maxPrice};
        this.api.item({ data: data })
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    #filterItems({ minPrice=this.minPrice, maxPrice=this.maxPrice }) {
        let items = Array.from(this.itemsContainer.children);
        
        for (let item of items) {
            let itemPrice = item.querySelector("[item-price]").textContent
            itemPrice = this.formatter.stringToPrice(itemPrice);
            
            if ((itemPrice < minPrice) || (itemPrice > maxPrice)) {
                // item.remove()
                item.style.display = "none";
            } else {
                if (item.style.display === "none") {
                    item.style.display = "inherit";
                }
            }
            
        }
    }

    applyPrice(dataId) {
        if (dataId) {
            this.applyBtn = document.querySelector(dataId);
            if (!this.applyBtn) {
                return;
            }
        }

        this.applyBtn.addEventListener("click", (e) => {
            if (this.minPriceInput.checkValidity() && this.maxPriceInput.checkValidity()) {
                e.preventDefault();
                this.minPrice = parseFloat(this.minPriceInput.value);
                this.maxPrice = parseFloat(this.maxPriceInput.value);

                if (this.maxPrice <= this.minPrice) {
                    alert(`Max Price '${this.maxPrice}' must be grater than '${this.minPrice}'`)
                    return
                }
                this.#filterItems(this.minPrice, this.maxPrice)
                // this.#getItems(this.minPrice, this.maxPrice);
                
                // console.log(`min: ${this.minPrice} - max: ${this.maxPrice}`); 
            }
        })
    }
}