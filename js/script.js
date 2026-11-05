//let restaurantName = "BiteBox";
// let customerName = prompt(
//     'Welcome to ' + restaurantName + '!\n\nWhat is your name?'
// );
// alert('Hello, ' + customerName + '! We are glad to have you here at ' + restaurantName + '.');

// let exploreMenu = confirm(
//     "Would you like to explore our menu?"
// );

// if (exploreMenu) {

//     alert("Great! Let's explore the BiteBox menu.");

// }

// else {

//     alert("No problem! You can explore the menu anytime.");

// }
// let choice = prompt( "Choose a BiteBox category:\n" +
//     "1. Pizza\n" +
//     "2. Burgers\n" +
//     "3. Pasta\n" +
//     "4. Desserts"
// );

// switch (choice) {
//     case "1":
//         console.log("You selected Pizza!");
//         break;
//     case "2":
//         console.log("You selected Burgers!");
//         break;
//     case "3":
//         console.log("You selected Pasta!");
//         break;
//     case "4":
//         console.log("You selected Desserts!");
//         break;
//     default:
//         console.log("Invalid category selection.");
// }
// for (initalization; condition;incr/decr){
//     //code block
// }

// let age =17;
// if(age >= 18){
//     console.log("you are eligible to donote the blood");
//     let weight = 40;
//     if(weight >= 50){
//         console.log("you are eligible to donote the blood");
//     }else{
//         console.log("you are not eligible to donote the blood");
//     }
// }
//     else{
//     console.log("you are not eligible to donote the blood");
// }


// let pay='creadit card';
// switch(pay){
//     case'wallet':
//         console.log("you are pay by wallet");
//         break;
//         case'upi':
//         console.log("you are pay by upi");
//         break;
//         case'creadit card':
//         console.log("you are pay by creadit card");
//         break;
//         case'debit card':
//         console.log("you are pay by debit card");
//         break;
//         default:
//             console.log("you are not pay by any method");
// }





// order summary
// calculateing total vale of the  item 



function calculateItemtotal(price, quantity) {
    return price * quantity;
}

// calculateing  subTotal 
function calculateSubTotal() {

    let subtotal = 0;

    cart.forEach(function (item) {

        let itemTotal =
            calculateItemtotal(
                item.price,
                item.quantity
            );

        subtotal += itemTotal;

    });

    return subtotal;
}

// Delivery charges
function calculateDeliveryCharges(subTotal) {
    if (subTotal == 0) {
        return 0;
    }
    return 40;
}

function calculatePackingCharges(subTotal) {
    if (subTotal == 0) {
        return 0;
    }
    return 20;
}

// Discount 
function calculateDiscount(subTotal) {
    if (subTotal >= 500) {
        return subTotal * 0.1;
    }
    return 0;
}

// Total price 
function calculateTotalPrice(subTotal, DeliveryCharges, PackingCharges, Discount) {
    return subTotal + DeliveryCharges + PackingCharges - Discount;
}

function updateOrderSummary() {
    let subElement = document.getElementById("subTotal-amount");
    if (!subElement) {
        return;
    }
    let subTotal = calculateSubTotal();
    let DeliveryCharges = calculateDeliveryCharges(subTotal);
    let PackingCharges = calculatePackingCharges(subTotal);
    let Discount = calculateDiscount(subTotal);
    let totalPrice = calculateTotalPrice(subTotal, DeliveryCharges, PackingCharges, Discount);

    console.log(subTotal, DeliveryCharges, PackingCharges, Discount);

    document.getElementById("subTotal-amount").textContent = "₹" + subTotal.toFixed(2);
    document.getElementById("delivery-charges-amount").textContent = "₹" + DeliveryCharges.toFixed(2);
    document.getElementById("packing-charges-amount").textContent = "₹" + PackingCharges.toFixed(2);
    document.getElementById("discount-amount").textContent = "-₹" + Discount.toFixed(2);
    document.getElementById("total-amount").textContent = "₹" + totalPrice.toFixed(2);
}



// for cart system

let cart = JSON.parse(localStorage.getItem("biteboxCart")) || [];

let menuContainer = document.getElementById("menu-items");

if (menuContainer) {
    menuContainer.addEventListener("click", function (event) {
        let button = event.target.closest("button");
        if (!button) {
            return;
        }
        if (button.textContent.includes("Add to Cart")) {

            let card = button.closest("article");

            addToCart(card);
        }
    }
    );
}

// let cartItem={};
function addToCart(card) {
    let name = card.querySelector("h3").textContent.trim();
    let priceText = card.querySelector(".price").textContent;
    let price = parseFloat(priceText.replace("₹", ""));
    let image = card.querySelector("img").getAttribute("src");

    console.log("Name:", name);
    console.log("Price:", price);
    console.log("Image:", image);

    let cartItem = {

        name: name,
        price: price,
        image: image,
        quantity: 1

    };
    // for cart system
    let existingItem =
        cart.find(function (item) {
            return item.name === name;
        });


    if (existingItem) {
        existingItem.quantity++;
    }
    else {
        cart.push(cartItem);
    }
    console.log("Name:", name);
    console.log("Price:", price);
    console.log("Image:", image);

    console.log("Cart:", cart);

    localStorage.setItem(
        "biteboxCart",
        JSON.stringify(cart)
    );

    renderCart();
}

let cartBody = document.querySelector("#shopping-cart tbody");

function renderCart() {

    if (!cartBody) {
        return;
    }

    cartBody.innerHTML = "";

    if (cart.length === 0) {

        let row = document.createElement("tr");


        row.innerHTML = `

        <td colspan="5">

            <div class="empty-cart">

                <h3>
                    Your Cart is Empty
                </h3>

                <p>
                    Add some delicious food
                    from our Menu!
                </p>

            </div>

        </td>

    `;


        cartBody.appendChild(row);

        return;

    }


    cart.forEach(function (item, index) {

        let itemTotal = item.price * item.quantity;
        let row = document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                    </div>

                </div>

            </td>


            <td>
                ₹${item.price}
            </td>


            <td>

                <div class="quantity-box">

                    <button
                        class="decrease"
                        data-index="${index}">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        class="increase"
                        data-index="${index}">
                        +
                    </button>

                </div>

            </td>


            <td>
                ₹${itemTotal.toFixed(2)}
            </td>
 <td>
    <a href="#" class="remove-item" data-index="${index}">
    <img src="./assete/image/delete.jpg" alt="Delete" width="25">
    </a>

            </td>

        `;
        cartBody.appendChild(row);
    });
}


function increaseQuantity(index) {
    cart[index].quantity++;
    localStorage.setItem(
        "biteboxCart",
        JSON.stringify(cart)
    );
    renderCart();
    updateOrderSummary();
}


function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem(
            "biteboxCart",
            JSON.stringify(cart)
        );
    }
    renderCart();
    updateOrderSummary();
}


function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("biteboxCart", JSON.stringify(cart));

    renderCart();
    updateOrderSummary();

}

function clearCart() {
    cart = [];
    localStorage.removeItem("biteboxCart");
    renderCart();
    updateOrderSummary();
}


let clearCartButton =
    document.getElementById("clear-cart");


if (clearCartButton) {

    clearCartButton.addEventListener(
        "click",
        function () {

            clearCart();

        }
    );

}



if (cartBody) {
    cartBody.addEventListener("click", function (event) {

        let button = event.target.closest("button");

        if (button) {
            let index = parseInt(button.dataset.index);
            if (button.classList.contains("increase")) {
                increaseQuantity(index);
            }

            if (button.classList.contains("decrease")) {
                decreaseQuantity(index);
            }
        }


        let link = event.target.closest("a");
        if (link && link.classList.contains("remove-item")) {
            //  event.preventDefault();
            let index = parseInt(link.dataset.index);
            removeFromCart(index);
        }

    });
}



renderCart();
updateOrderSummary(); 