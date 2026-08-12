let products = [];


/* =========================
   START
========================= */

async function initCheckout() {

    const response =
        await fetch("products.json");

    products =
        await response.json();

    displayCheckout();

    updateCartCount();
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


/* =========================
   VISA BESTÄLLNING
========================= */

function displayCheckout() {

    const cart = getCart();

    const container =
        document.getElementById(
            "checkout-summary"
        );


    if (cart.length === 0) {

        container.innerHTML = `
            <h2>Kundkorgen är tom</h2>

            <a
                href="products.html"
                class="button"
            >
                Till produkter
            </a>
        `;

        return;
    }


    let total = 0;

    let orderText = "";


    let html = `
        <h2>Din beställning</h2>
    `;


    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );

        if (!product) {
            return;
        }


        const itemTotal =
            product.price * item.quantity;

        total += itemTotal;


      orderText +=
    `Produkt-ID: ${product.id.replace("produkt-", "")}\n` +
    `Produkt: ${product.name}\n` +
    `Antal: ${item.quantity}\n` +
    `Summa: ${itemTotal} kr\n\n`;

        html += `
            <div class="checkout-item">

                <span>
                    ${product.name}
                    × ${item.quantity}
                </span>

                <strong>
                    ${itemTotal} kr
                </strong>

            </div>
        `;
    });


    html += `
        <hr>

        <div class="checkout-total">

            <span>
                Produktsumma
            </span>

            <strong>
                ${total} kr
            </strong>

        </div>

        <p>
            Frakt tillkommer.
        </p>
    `;


    container.innerHTML = html;


    document.getElementById(
        "order-data"
    ).value = orderText;


    document.getElementById(
        "product-total"
    ).value = `${total} kr`;
}


/* =========================
   KUNDKORGSANTAL
========================= */

function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    const element =
        document.getElementById(
            "cart-count"
        );

    if (element) {
        element.textContent = count;
    }
}


/* =========================
   FORMULÄR
========================= */

document
    .getElementById("order-form")
    .addEventListener(
        "submit",
        function () {

            /*
                Formspree tar emot formuläret.

                Vi tömmer inte kundkorgen här,
                eftersom Formspree först måste
                få möjlighet att behandla
                formuläret.
            */

        }
    );


/* =========================
   START
========================= */

initCheckout();
