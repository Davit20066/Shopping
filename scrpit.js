let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
openShopping.addEventListener("click", () => {
    body.classList.add('active');
})
closeShopping.addEventListener("click", () => {
    body.classList.remove('active');
})
let products = [
    {
        id: 1,
        name: 'Product Name 1',
        image: './img/image1.jpg',
        price: 12000
    },
    {
        id: 2,
        name: 'Product Name 2',
        image: './img/image2.jpg',
        price: 15000
    },
    {
        id: 3,
        name: 'Product Name 3',
        image: './img/image3.jpg',
        price: 12500
    },
    {
        id: 4,
        name: 'Product Name 4',
        image: './img/image4.jpg',
        price: 10000
    },
    {
        id: 5,
        name: 'Product Name 5',
        image: './img/image5.jpg',
        price: 11500
    },
    {
        id: 6,
        name: 'Product Name 6',
        image: './img/image6.jpg',
        price: 20000
    }
];
let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        console.log(value.image);
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}"/>
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>
        `;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = {...products[key]};
        listCards[key].quantity = 1;
        listCards[key].price = products[key].price
    } 
    reloadCard();
}
function reloadCard() {
    listCard.innerHTML = ``;
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity) {
    if (quantity === 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}