
export class Api {

    #url = "https://jsonplaceholder.typicode.com"
    #header = {
        'Content-Type': 'application/json'
    }
    #fetch(url, params) {
        return fetch(url, params)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`--E--(ERROR): Request failed: (${response.status} : ${response.json()})`);
                }
                return response.json();
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw error;
            })
    }

    #format2(mtd, data) {
        let methods = ["get", "post", "put", "delete"]

        if (mtd) {
            if (methods.includes(mtd.toLowerCase())) {
                mtd = mtd.toUpperCase();
            } else {
                console.log(`--E--(ERROR): ${mtd} method is not allowed`)
                throw new Error(`--E--(ERROR): ${mtd} method is not allowed`);
            }
            
            if (data) {
                if (data.constructor === Object) {
                    // this is a js object {} make it json
                    data = JSON.stringify(data)
                }
            } else if (["post", "put"].includes(mtd.toLowerCase())) {
                console.log(`--E--(ERROR): ${data} data is required for ${mtd} method`)
                throw new Error(`--E--(ERROR): ${data} data is required for ${mtd} method`);
            }
        } else {mtd = "GET"}

        let params = {
            method: mtd,
            headers: this.#header,
            body: data
        }

        return params;
    }

    #formatUrl(url, data) {
        let keys = Object.keys(data);
        let dataStr = ""
        
        for (let key of keys) {
            let val = encodeURIComponent(data[key])
            if (keys[0] === key) {
                dataStr = `${key}=${val}`
            } else {
                dataStr = `${dataStr}&${key}=${val}`
            }
        }
        url = `${url}?${dataStr}`;
        return url;
    }

    #format({ url="", mtd="GET", id="", data={} }) {
        // mtd = "get" (get, post, put, delete)
        // id = "123"
        // data = {"minPrice": "10", "maxPrice": "100"}

        let methods = ["get", "post", "put", "delete"]
        let params = {}

        if (mtd) {
            if (methods.includes(mtd.toLowerCase())) {
                mtd = mtd.toUpperCase();
            } else {
                console.log(`--E--(ERROR): ${mtd} method is not allowed`)
                throw new Error(`--E--(ERROR): ${mtd} method is not allowed`);
            }
        }
        if (id) {
            url = `${url}/${id}`
        }
        if (data) {
            if (data.constructor === Object) {
                if (mtd.toLowerCase() === "get") {
                    url = this.#formatUrl(url, data);
                }
                else {
                    data = JSON.stringify(data)
                }
            }
        } else if (["post", "put"].includes(mtd.toLowerCase())) {
            console.log(`--E--(ERROR): ${data} data is required for ${mtd} method`)
            throw new Error(`--E--(ERROR): ${data} data is required for ${mtd} method`);
        }


        if (["get"].includes(mtd.toLowerCase())) {
            params = {
                method: mtd,
                headers: this.#header
            }
        } else {
            params = {
                method: mtd,
                headers: this.#header,
                body: data
            }
        }
        

        return [url, params];

    }

    user({ mtd="GET", id=false, data=undefined }) {
        // 
        // 

        let  url = `${this.#url}/users`
        let params = {}

        let inputArr = this.#format({ url: url, mtd: mtd, id: id, data: data });
        url = inputArr[0]
        params = inputArr[1]

        // console.log(url, params);

        return this.#fetch(url, params)
    }



    item({ mtd="GET", id="", data=false }) {
        // 

        let  url = `${this.#url}/photos`
        let params = {}

        let inputArr = this.#format({ url: url, mtd: mtd, id: id, data: data });
        url = inputArr[0]
        params = inputArr[1]

        console.log(url, params);

        return this.#fetch(url, params)
    }

    payment(mtd, data) {
        // 
    }
}