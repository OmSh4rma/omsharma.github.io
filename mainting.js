let carts = document.querySelectorAll('.add-cart');

let products =  [
    {
        name:'Alien Tshirt',
        tag:'alienTshirt',
        price: 40,
        inCart: 0
    },
    {
        name:'Beastin Tshirt',
        tag:'beastinTshirt',
        price: 40,
        inCart: 0
    },
    {
        name:'Moto Tshirt',
        tag:'motoTshirt',
        price: 50,
        inCart: 0
    },
    {
        name:'Space Tshirt',
        tag:'SpaceTshirt',
        price: 150,
        inCart: 0
    }
]
 
for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers); 
    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }  else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log("My cartItems are", cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1; 

        cartItems = {
            [product.tag]: product
        }
    }
    

    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));    
}

function totalCost(product){
    //console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
   
    console.log("My cart cosy is", cartCost);
    console.log(typeof cartCost); 
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + 
        product.price);
    }else {
    localStorage.setItem("totalCost", product.price);
    }
}

function displaycart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

   
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');


    console.log(cartItems);

    if( cartItems && productContainer) {
    productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="/images/${item.tag}.PNG">
                <span>${item.name}</span>

            </div>
            <div class="price">${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease"
                name="arrow-back-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase"
                name="arrow-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>

             `
        });
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                 <h4 class="basketTotalTitle">
                    Basket Toal
                 </h4>
                 <h4 class="basketTotal">
                 $${cartCost},00
                 </h4>
        `
        ;


    }

}

onLoadCartNumbers();
displaycart();
