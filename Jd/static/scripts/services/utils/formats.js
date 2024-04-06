

export class Formatter {

    currency = "Ksh"

    uuid() {
        let uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
        return uuid;
    }

    stringToPrice(price) {
        // converts "Ksh 13, 430" -> 13430
        price = `${price}`
        let numPrice = parseFloat(price.replace(/[^\d.]/g, '')); // Removes non-numeric characters except for '.'
        
        if (!isNaN(numPrice)) {
            return numPrice;
        } else {
            console.log("Invalid price format");
            return false; 
        }
    }

    stringToNumPrice(price) {
        // converts "Ksh 13, 430" -> 13430
        price = `${price}`
        let numPrice = parseFloat(price.replace(/[^\d.]/g, '')); // Removes non-numeric characters except for '.'
        
        if (!isNaN(numPrice)) {
            return numPrice;
        } else {
            console.log("Invalid price format");
            return false; 
        }
    }

    numberToPrice(price="", currency=this.currency) {
        // converts 13430.5 -> "Ksh 13, 430.5"

        let newPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: this.currency,
        });

        let strPrice = newPrice.format(price)

        if (strPrice.toLowerCase().includes("nan")) {
            console.error(`Invalid price: ${price} ->  ${strPrice}`)
        } else {
            if (strPrice.toLowerCase().includes("ksh")) {
                strPrice = strPrice.replace(/ksh/gi, "Ksh");
            }
            return strPrice
        }
        return false        
    }
}

// const formatter = new Formatter()

// formatter.stringToPrice("Ksh 20, 5hsdjhd40.50");
// formatter.numberToPrice("20540");