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
const machine = document.getElementById("machine");

let currDrink = 0;
let allDrinks = [];
let currBalance = 0;

coins.forEach(coin => {
    coin.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("coinValue", event.target.dataset.value);
    })
});

machine.addEventListener("dragover", (event) => {
    event.preventDefault();
    machine.style.background = "#e0e0e0"
})

machine.addEventListener("dragleave", (event) => {
    event.preventDefault();
    machine.style.background = "";
})

machine.addEventListener("drop", (event) => {
    event.preventDefault();
    machine.style.background = "";

    const value = parseFloat(event.dataTransfer.getData("coinValue"));

    if (!isNaN(value)) {
        currBalance += value;
        console.log(currBalance);
    }
});

// (async function getDrinks() {
//     const DATA_URL = "https://api.jsonbin.io/v3/b/69d64173aaba882197d7779a";
//     try {
//         const res = await fetch(DATA_URL);
//         if (!res.ok)
//             throw new Error(`Failed to fetch drinks! Error: ${response.status}`);

//         const json = (await res.json()).record.bebidas;

//         const data = json.map((drink) => {
//             {
//                 return new Drink(drink.sabor, drink.preco, drink.imagem);
//             }
//         })

//         return data;
//     } catch (error) {
//         console.error(error.message);
//     }
// })().then((drinks) => listDrinks(drinks))

const drinks = [{ name: "test", price: 10, img: "o" }, { name: "testtttttt", price: 50, img: "aaaaaa" }, { name: "testtttttt", price: 50, img: "aaaaaa" }, { name: "testtttttt", price: 50, img: "aaaaaa" }, { name: "testtttttt", price: 50, img: "aaaaaa" }, { name: "testtttttt", price: 50, img: "aaaaaa" }]

listDrinks(drinks);

function listDrinks(drinks) {
    setAllDrinks(drinks);
    for (const [idx, drink] of drinks.entries()) {
        let listItem = document.createElement("li");
        let drinkButton = document.createElement("button");

        listItem.className = "drinkItem";

        drinkButton.innerHTML = drink.name;
        drinkButton.value = idx;
        drinkButton.onclick = () => setCurrDrink(idx);

        listItem.appendChild(drinkButton);
        drinksList.appendChild(listItem);
    }
}

function setAllDrinks(drinks) {
    allDrinks = drinks;
    console.log(allDrinks);
}

function setCurrDrink(drinkIdx) {
    currDrink = allDrinks[drinkIdx];
}