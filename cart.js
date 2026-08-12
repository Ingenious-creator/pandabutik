let products = [];


/* =========================
   HÄMTA PRODUKTER
========================= */

async function loadProducts() {

    const response = await fetch("products.json");

    products = await response.json();

    displayCart();
}


/* =========================
   KUNDKORG
========================= */

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem("panda-cart")
        ) || [];

    } catch {

        return [];
    }
}


function saveCart(cart) {

    localStorage.setItem(
        "panda-cart",
        JSON.stringify(cart)
    );
}


/* =========================
   VISA KUNDKORG
========================= */

function displayCart() {

    const container =
        document.getElementById("cart-container");

    const cart = getCart();

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">

                <h2>Kundkorgen är tom</h2>

                <p>
                    Du har inte lagt till några produkter ännu.
                </p>

                <a
                    href="products.html"
                    class="button"
                >
                    Se produkter
                </a>

            </div>
        `;

        updateCartCount();

        return;
    }


    let total = 0;

    let html = `
        <div class="cart-items">
    `;


    cart.forEach(item => {

        const product = products.find(
            p => p.id === item.id
        );

        if (!product) {
            return;
        }

        const itemTotal =
            product.price * item.quantity;

        total += itemTotal;


        html += `
            <div class="cart-item">

                <div>

                    <h2>
                        ${product.name}
                    </h2>

                    <p>
                        ${product.price} kr/st
                    </p>

                </div>


                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(
                            '${product.id}',
                            -1
                        )"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(
                            '${product.id}',
                            1
                        )"
                    >
                        +
                    </button>

                </div>


                <strong>
                    ${itemTotal} kr
                </strong>


                <button
                    class="remove-button"
                    onclick="removeFromCart(
                        '${product.id}'
                    )"
                >
                    Ta bort
                </button>

            </div>
        `;
    });


    html += `
        </div>

        <div class="cart-summary">

            <h2>Produktsumma</h2>

            <p class="cart-total">
                ${total} kr
            </p>

            <p>
                Frakt tillkommer och beräknas separat.
            </p>

            <a
                href="checkout.html"
                class="button"
            >
                Gå vidare
            </a>

        </div>
    `;


    container.innerHTML = html;

    updateCartCount();
}


/* =========================
   ÄNDRA ANTAL
========================= */

function changeQuantity(productId, change) {

    const cart = getCart();

    const item = cart.find(
        item => item.id === productId
    );

    if (!item) {
        return;
    }

    item.quantity += change;


    if (item.quantity <= 0) {

        const index =
            cart.indexOf(item);

        cart.splice(index, 1);
    }


    saveCart(cart);

    displayCart();
}


/* =========================
   TA BORT
========================= */

function removeFromCart(productId) {

    const cart = getCart();

    const newCart = cart.filter(
        item => item.id !== productId
    );

    saveCart(newCart);

    displayCart();
}


/* =========================
   ANTAL I KUNDKORG
========================= */

function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    const element =
        document.getElementById("cart-count");

    if (element) {
        element.textContent = count;
    }
}


/* =========================
   START
========================= */

loadProducts();
