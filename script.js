class Drink {
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }
}

const drinksList = document.getElementById("drinksList");
const coins = document.querySelectorAll(".coin");
const coinSlot = document.getElementById("coinSlot");
const drinkText = document.getElementById("drinkDropText");
const changeText = document.getElementById("drinkChange");

let currDrink = -1;
let allDrinks = [];
let currBalance = 0;

coins.forEach(coin => {
    coin.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("coinValue", event.target.dataset.value);
    })
});

coinSlot.addEventListener("dragover", (event) => {
    event.preventDefault();
    coinSlot.style.backgroundColor = "#e0e0e0"
})

coinSlot.addEventListener("dragleave", (event) => {
    event.preventDefault();
    coinSlot.style.backgroundColor = "";
})

coinSlot.addEventListener("drop", (event) => {
    event.preventDefault();
    coinSlot.style.backgroundColor = "";

    const value = parseFloat(event.dataTransfer.getData("coinValue"));

    if (!isNaN(value)) {
        currBalance = parseFloat((currBalance + value).toFixed(2));
        updateBalance();
    }
});

(async function getDrinks() {
    const DATA_URL = "https://api.jsonbin.io/v3/b/69d64173aaba882197d7779a";
    try {
        const res = await fetch(DATA_URL);
        if (!res.ok)
            throw new Error(`Failed to fetch drinks! Error: ${response.status}`);

        const json = (await res.json()).record.bebidas;

        const data = json.map((drink) => new Drink(drink.sabor, drink.preco, drink.imagem));

        return data;
    } catch (error) {
        console.error(error.message);
    }
})().then((drinks) => listDrinks(drinks))

function listDrinks(drinks) {
    setAllDrinks(drinks);

    let shelf = document.createElement("div");
    shelf.className = "shelf flexRow";

    const drinkTemp = ["hot", "cold"];

    drinks.forEach((drink, idx) => {
        if (idx % 2 == 0 && idx != 0) {
            drinksList.appendChild(shelf);

            shelf = document.createElement("div");
            shelf.className = "shelf flexRow";
        }

        const item = document.createElement("div");
        item.className = "item flexCol center";

        const itemImg = document.createElement("img");
        itemImg.className = "item-image";
        itemImg.src = drink.image;

        const itemName = document.createElement("div");
        itemName.className = "item-name";
        itemName.textContent = drink.name;

        const itemBtn = document.createElement("button");
        const randomTemp = drinkTemp[Math.floor(Math.random() * drinkTemp.length)];
        itemBtn.className = `item-btn alignCenter ${randomTemp}`;
        itemBtn.textContent = `R$${drink.price.toFixed(2)}`;
        itemBtn.value = idx;
        itemBtn.onclick = () => buyDrink(idx);

        item.append(itemImg, itemName, itemBtn);
        shelf.appendChild(item);
    });

    drinksList.appendChild(shelf);
}

function setAllDrinks(drinks) {
    allDrinks = drinks;
}

function buyDrink(drinkIdx) {
    currDrink = allDrinks[drinkIdx];

    if (currDrink) {
        let targetPrice = currDrink.getPrice();
        if (currBalance >= targetPrice) {
            let change = parseFloat((currBalance - targetPrice).toFixed(2));
            currBalance = 0;
            updateBalance();

            dispenseDrink(change);
        }
        else {
            drinkText.textContent = "Dinheiro insuficiente."
            changeText.textContent = "";
        }
    }
}

function updateBalance() {
    const balanceDisplay = document.getElementById("balance");
    balanceDisplay.textContent = `R$${currBalance.toFixed(2)}`
}

function dispenseDrink(change) {
    drinkText.textContent = `Refrigerante ${currDrink.getName()} liberado`;
    if (change > 0)
        changeText.textContent = `Troco: R$${change.toFixed(2)}`;
    else
        changeText.textContent = "";    
}