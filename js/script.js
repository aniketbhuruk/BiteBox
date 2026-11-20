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


function escapeHTML(value) {
    let entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };

    return String(value).replace(/[&<>"']/g, function (character) {
        return entities[character];
    });
}

// for cart system

let cart = JSON.parse(localStorage.getItem("biteboxCart")) || [];

let menuContainer = document.getElementById("menu-items");
let card = document.querySelector("#menu-items article");

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

                <h4>
                    Add some delicious food
                    from our Menu!
                </h4>

            </div>

        </td>

    `;


        cartBody.appendChild(row);

        return;

    }


    cart.forEach(function (item, index) {

        let itemTotal = item.price * item.quantity;
        let name = escapeHTML(item.name);
        let image = escapeHTML(item.image);
        let price = escapeHTML(item.price);
        let quantity = escapeHTML(item.quantity);
        let row = document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="cart-item">

                    <img
                        src="${image}"
                        alt="${name}"
                    >

                    <div>

                        <h3>
                            ${name}
                        </h3>

                    </div>

                </div>

            </td>


            <td>
                ₹${price}
            </td>


            <td>

                <div class="quantity-box">

                    <button
                        class="decrease"
                        data-index="${index}">
                        −
                    </button>

                    <span>
                        ${quantity}
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
    updateCartCount();
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
    updateCartCount();
}


function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("biteboxCart", JSON.stringify(cart));

    renderCart();
    updateOrderSummary();
    updateCartCount();
}

function clearCart() {
    cart = [];
    localStorage.removeItem("biteboxCart");
    renderCart();
    updateOrderSummary();
    updateCartCount();
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
            event.preventDefault();
            let index = parseInt(link.dataset.index);
            removeFromCart(index);
        }
        

    });
}



renderCart();
updateOrderSummary();



// serach and filter

let menuCards = document.querySelectorAll("#menu-items article");



let searchInput = document.getElementById("menu-search");

let searchButton = document.getElementById("search-button");

// let searchText=searchInput.value;

function searchMenu(searchText) {
    let searchValue = searchText.trim().toLowerCase();

    menuCards.forEach(function (card) {
        let foodName = card.querySelector("h3").textContent.trim().toLowerCase();

        if (foodName.includes(searchValue)) {
            card.style.display = "";
        }
        else {
            card.style.display = "none";
        }
    });

}
if (searchButton) {
    searchButton.addEventListener(
        "click",
        function () {

            searchMenu(
                searchInput.value
            );
        }
    );
}
let categoryCards = document.querySelectorAll("#categories article");
function filterMenu(category) {

    menuCards.forEach(function (card) {
        let cardCategory = card.dataset.category.toLowerCase();

        if (cardCategory === category) {
            card.style.display = "";
        }
        else {
            card.style.display = "none";
        }
    });

}
categoryCards.forEach(
    function (card) {

        card.addEventListener("click", function () {
            let category = card.querySelector("h3")
                .textContent
                .trim()
                .toLowerCase();
            filterMenu(category);
        }
        );
    }
);

//theme toggle



let themeButton = document.getElementById("theme-toggle");


function toggleTheme() {
    document.body.classList.toggle("dark-theme");

    let themeIcon = themeButton.querySelector(".theme-icon");

    let themeText = themeButton.querySelector(".theme-text");

    if (document.body.classList.contains("dark-theme")) {
        themeIcon.textContent = "☾";
        themeText.textContent = "NIGHT MODE";
        localStorage.setItem("biteboxTheme", "dark");
    }

    else {
        themeIcon.textContent = "☀";
        themeText.textContent = "DAY MODE";
        localStorage.setItem("biteboxTheme", "light");

    }
}


//loadTheme

function loadTheme() {
    let savedTheme = localStorage.getItem("biteboxTheme");

    /* Disable animation while loading */
    document.body.classList.add("theme-loading");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }

    else {
        document.body.classList.remove("dark-theme");
    }
    let themeIcon = themeButton.querySelector(".theme-icon");
    let themeText = themeButton.querySelector(".theme-text");

    if (savedTheme === "dark") {
        if (themeIcon) {
            themeIcon.textContent = "☾";
        }

        if (themeText) {
            themeText.textContent = "NIGHT MODE";
        }
    }

    else {

        if (themeIcon) {
            themeIcon.textContent = "☀";
        }


        if (themeText) {
            themeText.textContent = "DAY MODE";
        }
    }

    /* Allow animation again */
    setTimeout(function () {
        document.body.classList.remove("theme-loading");
    }, 50);

}
//Runner block
if (themeButton) {
    themeButton.addEventListener("click", function () {
        toggleTheme();
    }
    );
}
loadTheme();


function updateCartCount() {

    let cartCount = 0;

    cart.forEach(function (item) {
        cartCount += item.quantity;
    });

    let cartCountElement =
        document.getElementById("cart-count");

    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}
updateCartCount();


//contact from

let contactForm = document.querySelector(".right-column form");

function showToast(message, type) {
    let toast = document.createElement("div");
    toast.className = "toast " + type;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(function () {
        toast.classList.add("show");
    }, 100);

    setTimeout(function () {
        toast.classList.remove("show");

        setTimeout(function () {
            toast.remove();
        }, 300);

    }, 3000);
}
// let name = contactForm.querySelector('input[name="name"]');
// let email = contactForm.querySelector('input[name="email"]');
// let phone = contactForm.querySelector('input[name="phone"]');
// let subject = contactForm.querySelector('input[name="subject"]');
// let message = contactForm.querySelector('textarea[name="message"]');

// contactForm.addEventListener("submit", function (event) {
//     event.preventDefault();
// });



if (contactForm) {
    contactForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            let name = contactForm.querySelector('input[name="name"]');
            let email = contactForm.querySelector('input[name="email"]');
            let phone = contactForm.querySelector('input[name="phone"]');
            let subject = contactForm.querySelector('input[name="subject"]');
            let message = contactForm.querySelector('textarea[name="message"]');

            if (!name.value.trim()) {
                showToast("⚠ Please enter your name.", "error");
                return;
            }

            if (!email.value.trim()) {
                showToast("⚠ Please enter your email address.", "error");
                return;
            }

            if (!email.validity.valid) {
                showToast("⚠ Please enter a valid email address.", "error");
                return;
            }

            let phonePattern = /^[6-9]\d{9}$/;
            if (!phone.value.trim()) {
                showToast("⚠ Please enter your phone number.", "error");
                return;
            }

            if (!phonePattern.test(phone.value.trim())) {
                showToast("⚠ Please enter a valid 10-digit phone number.",
                    "error");
                return;
            }

            if (!subject.value.trim()) {
                showToast("⚠ Please enter a subject.", "error");
                return;
            }
            if (!message.value.trim()) {
                showToast("⚠ Please enter your message.", "error");
                return;
            }
            showToast("✓ Message sent successfully!", "success");
            contactForm.reset();
        }
    );
}
const addMenuBtn = document.getElementById("add-menu-btn");
const menuModal = document.getElementById("menu-modal");
const cancelMenuForm = document.getElementById("cancel-menu-form");

const menuForm = document.getElementById("menu-form");

if (addMenuBtn && menuModal) {
    addMenuBtn.addEventListener("click", function () {
        menuModal.classList.add("show");
    });
}

if (cancelMenuForm && menuModal) {
    cancelMenuForm.addEventListener("click", function () {
        menuModal.classList.remove("show");
    });
}

if (menuForm) {
    menuForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("menu-name").value.trim();
        const price = document.getElementById("menu-price").value.trim();
        const category = document.getElementById("menu-category").value.trim();
        const rating = document.getElementById("menu-rating").value.trim();
        const reviews = document.getElementById("menu-reviews").value.trim();
        const image = document.getElementById("menu-image").value.trim();

        const menuItem = {
            name: name,
            price: price,
            category: category,
            rating: rating,
            reviews: reviews,
            image: image
        };

        const API_URL = "https://6afee9ae3a0e70bc8d543141.mockapi.io/menu";

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(menuItem)
            });

            if (!response.ok) {
                throw new Error("Request failed with status " + response.status);
            }

            const data = await response.json();
            console.log("Menu item added:", data);

            if (typeof showToast === "function") {
                showToast("Menu item added successfully!", "success");
            }

            menuForm.reset();
            menuModal.classList.remove("show");
        } catch (error) {
            console.error("Error adding menu item:", error);
            if (typeof showToast === "function") {
                showToast("Could not add menu item.", "error");
            }
        }
    });
}
async function fetchMenuItems() {
    try {
        const response = await fetch(API_URL);
        const menuItems = await response.json();
        console.log("Menu items fetched:", menuItems);
    } catch (error) {
        console.error("Error fetching menu items:", error);
    } }