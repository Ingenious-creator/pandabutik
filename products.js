let products = [];


/* =========================
   HÄMTA PRODUKTER
========================= */

async function loadProducts() {

    try {

        const response = await fetch("products.json");

        if (!response.ok) {
            throw new Error("Kunde inte läsa products.json");
        }

        products = await response.json();

        displayProducts();
        updateCartCount();

    } catch (error) {

        console.error(error);

        const container =
            document.getElementById("products-container");

        if (container) {
            container.innerHTML = `
                <p>
                    Kunde inte ladda produkterna.
                    Försök igen senare.
                </p>
            `;
        }
    }
}


/* =========================
   VISA PRODUKTER
========================= */

function displayProducts() {

    const container =
        document.getElementById("products-container");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image-wrapper">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                    onerror="this.style.display='none'"
                >

            </div>

            <div class="product-content">

                <h2>${product.name}</h2>

                <p class="product-description">
                    ${product.description}
                </p>

                <p class="product-price">
                    ${product.price} kr
                </p>

                <button
                    class="button"
                    onclick="addToCart('${product.id}')"
                >
                    Lägg i kundkorg
                </button>

            </div>
        `;

        container.appendChild(card);
    });
}


/* =========================
   KUNDKORG
========================= */

function getCart() {

    const cart = localStorage.getItem("panda-cart");

    if (!cart) {
        return [];
    }

    try {
        return JSON.parse(cart);
    } catch {
        return [];
    }
}


function saveCart(cart) {

    localStorage.setItem(
        "panda-cart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


function addToCart(productId) {

    const product = products.find(
        p => p.id === productId
    );

    if (!product) {
        return;
    }

    const cart = getCart();

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: product.id,
            quantity: 1
        });

    }

    saveCart(cart);

    alert(`${product.name} lades till i kundkorgen.`);
}


function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.querySelectorAll("#cart-count")
        .forEach(element => {
            element.textContent = count;
        });
}


/* =========================
   START
========================= */

loadProducts();
