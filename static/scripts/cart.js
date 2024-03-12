
// cart js 

let totalItems = document.getElementById("total-items");
let items = document.getElementsByClassName("at-item");
let totalPriceAll = document.getElementById("total-price-all");
let totalAll = 0;

// console.log(totalPriceAll.textContent);


totalItems.textContent = items.length

for (let item of items) {
    console.log(item);

    // get the class price-@ value
    let priceEach = item.getElementsByClassName("price-each");
    let subTotal = item.getElementsByClassName("sub-total");
    
    let priceEachContent = getNumber(priceEach[0].textContent);    

    let minus = item.querySelector('.minus');
    let qty = item.querySelector('.qty');
    let plus = item.querySelector('.plus');

    let qtyContent = parseFloat(qty.textContent);
    let totals = (priceEachContent * qtyContent);
    subTotal[0].textContent = getPrice(totals);

    totalAll = (totalAll + totals);
    totalPriceAll.textContent = totalAll;

    minus.addEventListener("click", function () {
        if (qtyContent > 1) {
            qtyContent = (qtyContent - 1);
            qty.textContent = qtyContent

            totals = (priceEachContent * qtyContent);
            subTotal[0].textContent = getPrice(totals);

            // totalAll = (totalAll - totals);
            totalPriceAll.textContent = (parseFloat(totalPriceAll.textContent) - priceEachContent);
        }
        
    });
    plus.addEventListener("click", function () {
        qtyContent = (qtyContent + 1);
        qty.textContent = qtyContent

        totals = (priceEachContent * qtyContent);
        subTotal[0].textContent = getPrice(totals);

        // totalAll = (totalAll + totals);
        totalPriceAll.textContent = (parseFloat(totalPriceAll.textContent) + priceEachContent);
    });
}

console.log(totalAll)

function getPrice(numVal) {
    // numVal = 2200 -> Ksh 2, 200
    // to be uptaded soon

    return `Ksh ${numVal}`;
}

function getNumber(strNum) {
    // strNo = "Ksh 3, 400" or " ksh3 , 400" return 3400 
    
    let strNo = strNum.toLowerCase();
    if (strNo.includes("ksh")) {
        strNo = strNo.split("ksh").pop().trim();
    }
    strNo = strNo.replace(/,/g, "");
    strNo = strNo.replace(/\s/g, "");

    let numVal = parseFloat(strNo);

    return numVal
}


function removeItem(itemId) {
    let itemDel = document.getElementById(itemId);
    let delItemSubtotal = itemDel.querySelector(".sub-total").textContent;
    let delPrice = getNumber(delItemSubtotal)

    itemDel.remove();
    totalPriceAll.textContent = (totalPriceAll.textContent - delPrice)
    totalItems.textContent = (totalItems.textContent - 1);

}