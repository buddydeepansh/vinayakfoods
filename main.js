let carts = document.querySelectorAll(".add-cart");
let product = [
  {
    name: "Round Cat Cake",
    tag: "RoundCat",
    price: 450,
    inCart: 0,
  },
  {
    name: "White Sugar Cake",
    tag: "nathan white sugar",
    price: 500,
    inCart: 0,
  },
  {
    name: "Flower Basket Cake",
    tag: "Flower Basket Cake",
    price: 200,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(product[i]);
    totalCost(product[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null)
   {
       if(cartItems[product.tag] == undefined){
           cartItems = {
            ...cartItems,
            [product.tag]: product
           }
       }
    cartItems[product.tag].inCart += 1;
   } 
  else
   {
        product.inCart = 1;
        cartItems = {
        [product.tag]: product
        };
   }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function totalCost(product){        
    //console.log("the product price is",product.price);
    //localStorage.setItem("totalCost",product.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cart cost is",cartCost);
    console.log(typeof cartCost);
    
    if(cartCost != null)
    {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost + product.price);
    }
    else{
        localStorage.setItem("totalCost",product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    if (cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class ="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="./images/Cake Pics/${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class = "price">
            <i class="fa fa-rupee" style="font-size:15px"></i>
            &nbsp
            ${item.price}
            </div>
            <div class = "quantity">
            <ion-icon name="caret-back-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="caret-forward-outline"></ion-icon>
            </div>
            <div class = "total">
            <i class="fa fa-rupee" style="font-size:15px"></i>
            &nbsp${item.inCart * item.price}
            </div>
            `
        });

        productContainer.innerHTML += `
            <div class = "basketTotalContainer">
                <h4 class="basketTotalTitle">
                BASKET TOTAL
                </h4>
                <h4 class="basketTotal">
                <i class="fa fa-rupee" style="font-size:15px"></i>
                &nbsp${cartCost}
                </h4>
            </div>
        `
    }
}

onLoadCartNumbers();
displayCart();