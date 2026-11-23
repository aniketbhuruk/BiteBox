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

let cart = [];
try {
    cart = JSON.parse(localStorage.getItem("biteboxCart")) || [];
    if (!Array.isArray(cart)) {
        cart = [];
    }
} catch (error) {
    localStorage.removeItem("biteboxCart");
}

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

    updateCartCount();
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

let searchInput = document.getElementById("menu-search");

let searchButton = document.getElementById("search-button");

let activeMenuCategory = "";

function searchMenu(searchText) {
    let searchValue = searchText.trim().toLowerCase();
    let menuCards = document.querySelectorAll("#menu-items article");
    let visibleItems = 0;

    menuCards.forEach(function (card) {
        let foodName = card.querySelector("h3").textContent.trim().toLowerCase();
        let category = (card.dataset.category || "").toLowerCase();
        let matchesSearch = foodName.includes(searchValue);
        let matchesCategory = !activeMenuCategory || category === activeMenuCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleItems++;
        }
        else {
            card.style.display = "none";
        }
    });
    let emptyState = document.getElementById("menu-empty-state");
    if (emptyState) {
        emptyState.hidden = visibleItems > 0;
    }
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
if (searchInput) {
    searchInput.addEventListener("input", function () {
        searchMenu(searchInput.value);
    });
}
let categoryCards = document.querySelectorAll("#categories article");
function selectMenuCategory(card) {
    let selectedCategory = card.querySelector("h3").textContent.trim().toLowerCase();
    activeMenuCategory = activeMenuCategory === selectedCategory ? "" : selectedCategory;
    categoryCards.forEach(function (categoryCard) {
        let isSelected = categoryCard === card && activeMenuCategory !== "";
        categoryCard.classList.toggle("selected", isSelected);
        categoryCard.setAttribute("aria-pressed", String(isSelected));
    });
    searchMenu(searchInput ? searchInput.value : "");
}
categoryCards.forEach(function (card) {
    card.addEventListener("click", function () {
        selectMenuCategory(card);
    });
    card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectMenuCategory(card);
        }
    });
});
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
    let themeIcon = themeButton ? themeButton.querySelector(".theme-icon") : null;
    let themeText = themeButton ? themeButton.querySelector(".theme-text") : null;

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
const menuStorageKey = "biteboxMenuItems";
let editingMenuId = null;
let menuItems = [];

function getInitialMenuItems() {
    const menuContainer = document.getElementById("menu-container");
    if (!menuContainer) {
        return [];
    }

    return Array.from(menuContainer.querySelectorAll(":scope > article")).map(function (card, index) {
        const ratingElement = card.querySelector(".rating");
        const ratingText = ratingElement ? ratingElement.textContent : "";
        const tag = card.querySelector(".tag");

        return {
            id: "menu-" + index,
            name: card.querySelector("h3").textContent.trim(),
            price: card.querySelector(".price").textContent.replace("₹", "").trim(),
            category: card.dataset.category || "",
            rating: ratingText.replace(/\(\d+\)/, "").trim(),
            reviews: (ratingText.match(/\((\d+)\)/) || ["", ""])[1],
            image: card.querySelector("img").getAttribute("src") || "",
            tag: tag ? tag.textContent.trim() : "",
            tagClass: tag && tag.classList.contains("spicy") ? "spicy" : ""
        };
    });
}

function saveMenuItems() {
    localStorage.setItem(menuStorageKey, JSON.stringify(menuItems));
}

function loadMenuItems() {
    const initialItems = getInitialMenuItems();
    try {
        const savedItems = JSON.parse(localStorage.getItem(menuStorageKey));
        menuItems = Array.isArray(savedItems) ? savedItems : initialItems;
    } catch (error) {
        console.error("Could not read saved menu items:", error);
        menuItems = initialItems;
    }
    displayMenuItems(menuItems);
    searchMenu(searchInput ? searchInput.value : "");
}

if (addMenuBtn && menuModal) {
    addMenuBtn.addEventListener("click", function () {
        editingMenuId = null;
        menuForm.reset();
        document.querySelector(".modal-header h2").textContent = "Add Menu Item";
        document.querySelector("#menu-form button[type='submit']").textContent = "Add Menu Item";
        menuModal.classList.add("show");
    });
}

if (cancelMenuForm && menuModal) {
    cancelMenuForm.addEventListener("click", function () {
        menuModal.classList.remove("show");
    });
}

if (menuModal) {
    menuModal.addEventListener("click", function (event) {
        if (event.target === menuModal) {
            menuModal.classList.remove("show");
        }
    });
}

if (menuForm) {
    menuForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("menu-name").value.trim();
        const price = Number(document.getElementById("menu-price").value);
        const category = document.getElementById("menu-category").value.trim();
        const rating = document.getElementById("menu-rating").value.trim();
        const reviews = Number(document.getElementById("menu-reviews").value);
        const image = document.getElementById("menu-image").value.trim();

        const menuItem = {
            name: name,
            price: price,
            category: category,
            rating: rating,
            reviews: reviews,
            image: image
        };

        const isUpdate = editingMenuId !== null;
        if (isUpdate) {
            menuItems = menuItems.map(function (item) {
                return String(item.id) === editingMenuId
                    ? Object.assign({}, item, menuItem, { id: editingMenuId })
                    : item;
            });
        } else {
            menuItem.id = "menu-" + Date.now();
            menuItems.push(menuItem);
        }

        saveMenuItems();
        displayMenuItems(menuItems);
        editingMenuId = null;
        menuForm.reset();
        menuModal.classList.remove("show");
        searchMenu(searchInput ? searchInput.value : "");
        showToast(isUpdate ? "Menu item updated successfully!" : "Menu item added successfully!", "success");
    });
}
function displayMenuItems(menuItems) {

    const menuContainer = document.getElementById("menu-container");
    if (!menuContainer) {
        return;
    }

    menuContainer.innerHTML = "";

    menuItems.forEach(menuItem => {
        const card = document.createElement("article");
        card.dataset.category = (menuItem.category || "").toLowerCase();
        if (menuItem.id) {
            card.dataset.menuId = String(menuItem.id);
        }

        card.innerHTML = `
            ${menuItem.tag ? `<span class="tag ${escapeHTML(menuItem.tagClass || "")}">${escapeHTML(menuItem.tag)}</span>` : ""}
            <img src="${escapeHTML(menuItem.image)}" alt="${escapeHTML(menuItem.name)}">
            <h3>${escapeHTML(menuItem.name)}</h3>
            <p class="rating">
                ${escapeHTML(menuItem.rating)}
                <small>(${escapeHTML(menuItem.reviews)})</small>
            </p>
          <p class="price">₹${escapeHTML(menuItem.price)}</p>
          <div class="menu-actions">
          <button type="button" class="update-menu-btn">
            Edit
          </button>
          <button type="button" class="delete-menu-btn">
             <img src="./assete/icons/Deleteicon.webp" alt="Delete">
          </button>
        </div>
            <button type="button" class="bite">
                <img src="./assete/image/redcart.webp" alt="Cart" width="14" height="14">
                Add to Cart
            </button>
        `;
        menuContainer.appendChild(card);
    });
}

const adminMenuContainer = document.getElementById("menu-container");
if (adminMenuContainer) {
    adminMenuContainer.addEventListener("click", function (event) {
        const updateButton = event.target.closest(".update-menu-btn");
        const deleteButton = event.target.closest(".delete-menu-btn");

        if (!updateButton && !deleteButton) {
            return;
        }

        const card = event.target.closest("article");
        if (!card) {
            return;
        }

        if (updateButton) {
            editingMenuId = card.dataset.menuId || null;
            document.querySelector(".modal-header h2").textContent = "Update Menu Item";
            document.getElementById("menu-name").value = card.querySelector("h3").textContent.trim();
            document.getElementById("menu-price").value =
                card.querySelector(".price").textContent.replace("₹", "").trim();
            document.getElementById("menu-category").value = card.dataset.category || "";

            const ratingText = card.querySelector(".rating").textContent;
            document.getElementById("menu-rating").value = ratingText.replace(/\(\d+\)/, "").trim();
            document.getElementById("menu-reviews").value =
                (ratingText.match(/\((\d+)\)/) || ["", ""])[1];
            document.getElementById("menu-image").value =
                card.querySelector("img").getAttribute("src") || "";
            document.querySelector("#menu-form button[type='submit']").textContent = "Update Menu Item";
            menuModal.classList.add("show");
            return;
        }

        if (deleteButton) {
            const itemName = card.querySelector("h3").textContent.trim();
            if (!window.confirm("Are you sure you want to delete " + itemName + "?")) {
                return;
            }

            menuItems = menuItems.filter(function (item) {
                return String(item.id) !== card.dataset.menuId;
            });
            saveMenuItems();
            displayMenuItems(menuItems);
            searchMenu(searchInput ? searchInput.value : "");
        }
    });
}
if (adminMenuContainer) {
    loadMenuItems();
}