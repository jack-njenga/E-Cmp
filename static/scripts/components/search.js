import { Api } from "../services/api/api.js";

export class Search {

    #api = new Api();
    input = ""
    btn = ""
    searchItemContainer = document.querySelector("[search-items-container]")
    ulContainer = document.querySelector("[loaded-items]");
    items = [
        {"id": 1, "name": "Audio"},
    ]

    loadSearchItems() {
        this.#api.user("get")
        .then((data) => {
            this.items = data;
            // console.log("Serach Items Loaded", data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    #removeChildren() {        
        while (this.ulContainer.firstChild) {
            this.ulContainer.removeChild(this.ulContainer.firstChild);
        }
    }

    #populateItems(itemNames) {   
        if (itemNames && itemNames.length > 0) {
            this.#removeChildren();
            if (!this.searchItemContainer.classList.contains("active")) {
                this.searchItemContainer.classList.add("active");
            }

            for (let name of itemNames) {
                if (name.length > 0) {
                    let liTag = document.createElement("li");
                    let aTag = document.createElement('a');
                    aTag.href = "#";
                    aTag.textContent = name;
                    liTag.appendChild(aTag);
                    this.ulContainer.appendChild(liTag);
                } else {
                    if (this.searchItemContainer.classList.contains("active")) {
                        this.searchItemContainer.classList.remove("active");
                    }
                }         
            }
            
            this.searchItemContainer.appendChild(this.ulContainer);
        } else {
            if (this.searchItemContainer.classList.contains("active")) {
                this.searchItemContainer.classList.remove("active");
            }
        }
    }

    #searchFilterHelper(val) {
        let items = this.items;
        let itemNames = []

        if (items) {
            if (val.length > 0) {
                for (let item of items) {
                    if (item.name.toLowerCase().includes(val.toLowerCase())) {
                        // console.log(`'${val}' - ${item.name}`);
                        itemNames.push(item.name);
                    }
                }
            }            
        } else {
            this.loadSearchItems();
        }
        this.#populateItems(itemNames);
    }

    searchFilter(dataId) {
        this.input = document.querySelector(dataId);
        
        this.loadSearchItems();

        this.input.addEventListener("input", (e) => {
            let value = e.target.value

            // console.log(value)
            this.#searchFilterHelper(value);
        })
        this.input.addEventListener("blur", () => {
            if (!document.activeElement.isSameNode(this.input)) {
                if (this.searchItemContainer.classList.contains("active")) {
                    this.searchItemContainer.classList.remove("active");
                }
            }
        });
    }

    search(dataId) {
        this.btn = document.querySelector(dataId);

        this.btn.addEventListener("click", (e) => {
            if (this.input.checkValidity()) {
                e.preventDefault();
                if(this.input.value.length > 0) {
                    this.#searchHelper(this.input.value);
                }                
            }
        })
    }

    #searchHelper(data) {

        this.#api.user("get", data)
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
}



