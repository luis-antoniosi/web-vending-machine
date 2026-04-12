class Drink {
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
    }

    getName() {
        return this.name;
    }

    getValue() {
        return this.price;
    }
}

const drinksList = document.getElementById("drinksList");
const coins = document.querySelectorAll(".coin");
const coinSlot = document.getElementById("coinSlot");

let currDrink = 0;
let allDrinks = [];
let currBalance = 0;

coins.forEach(coin => {
    coin.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("coinValue", event.target.dataset.value);
    })
});

coinSlot.addEventListener("dragover", (event) => {
    event.preventDefault();
    coinSlot.style.background = "#e0e0e0"
})

coinSlot.addEventListener("dragleave", (event) => {
    event.preventDefault();
    coinSlot.style.background = "";
})

coinSlot.addEventListener("drop", (event) => {
    event.preventDefault();
    coinSlot.style.background = "";

    const value = parseFloat(event.dataTransfer.getData("coinValue"));

    if (!isNaN(value)) {
        currBalance += value;
        console.log(currBalance);
    }
});

(async function getDrinks() {
    const DATA_URL = "https://api.jsonbin.io/v3/b/69d64173aaba882197d7779a";
    try {
        const res = await fetch(DATA_URL);
        if (!res.ok)
            throw new Error(`Failed to fetch drinks! Error: ${response.status}`);

        const json = (await res.json()).record.bebidas;

        const data = json.map((drink) => {
            {
                return new Drink(drink.sabor, drink.preco, drink.imagem);
            }
        })

        return data;
    } catch (error) {
        console.error(error.message);
    }
})().then((drinks) => listDrinks(drinks))

function listDrinks(drinks) {
    setAllDrinks(drinks);

    let shelf = document.createElement("div");
    shelf.className = "shelf";

    const drinkTemp = ["hot", "cold"];

    drinks.forEach((drink, idx) => {
        if (idx % 2 == 0 && idx != 0) {
            drinksList.appendChild(shelf);

            shelf = document.createElement("div");
            shelf.className = "shelf";
        }

        const item = document.createElement("div");
        item.className = "item";

        const itemImg = document.createElement("img");
        itemImg.className = "item-image";
        itemImg.src = drink.image;

        const itemName = document.createElement("div");
        itemName.className = "item-name";
        itemName.textContent = drink.name;

        const itemBtn = document.createElement("button");
        const randomTemp = drinkTemp[Math.floor(Math.random() * drinkTemp.length)];
        itemBtn.className = `item-btn ${randomTemp}`;
        itemBtn.textContent = `R$${drink.price.toFixed(2)}`;
        itemBtn.value = idx;
        itemBtn.onclick = () => setCurrDrink(idx);

        item.append(itemImg, itemName, itemBtn);
        shelf.appendChild(item);
    }); 

    drinksList.appendChild(shelf);
}

function setAllDrinks(drinks) {
    allDrinks = drinks;
    console.log(allDrinks);
}

function setCurrDrink(drinkIdx) {
    currDrink = allDrinks[drinkIdx];
}