let carts =document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Paper Mario',
        tag: 'PaperMarioTheOrigamiKing',
        price: 499,
        inCart: 0
    },
    {
        name: 'Zelda',
        tag: 'ZeldaBreathOfTheWild',
        price: 599,
        inCart: 0
    },
    {
        name: 'Animal Crossing',
        tag: 'AnimalCrossing',
        price: 299,
        inCart: 0
    },
    {
        name: 'Pokemon Brilliant Diamond',
        tag: 'PokemonBrilliantDiamond',
        price: 699,
        inCart: 0
    },
    {
        name: 'Links Awakening',
        tag: 'LinksAwakening',
        price: 499,
        inCart: 0
    }
];


// Loopar genom alla carts på sidan och när man klickar på Add så summeras totalet klick
for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

//Laddar varukorgen när man uppdaterar sidan
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1; //Lagrar click i .cart classen och i <span> taggen
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;

        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product) {
    let cartCost = localStorage.getItem("totalCost");

    if(cartCost != null) {

        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");

    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML +=
                `<article class="product"><img src="./img/${item.tag}.jpg" />
                <span class="sm-hide">${item.name}</span>
            </article>
            <article class="price sm-hide">${item.price} kr</article>
            <article class="quantity">
                    <span>${item.inCart}</span>   
            </article>
            <article class="total">${item.inCart * item.price} kr</article>`;
        });

        productContainer.innerHTML += `
            <article class="basketTotalContainer">
                <h4 class="basketTotalTitle">Total kostnad</h4>
                <h4 class="basketTotal">${cartCost} kr</h4>
            </article>`
    }
}

onLoadCartNumbers(); //Sparar antalet i local storage, även när sidan laddas om.
displayCart();