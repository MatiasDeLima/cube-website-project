// creta cart card

const createCartCard = (data) => {
    return `
        <div class="cart__card">
            <div class="cart__card-data">
                <div class="cart__image">
                    <img src="${data.image}">
                </div>

                <div class="cart__data">
                    <h4 class="cart__title">${data.name}</h4>
                    <p class="cart__categorie">${data.categorie}</p>
                    <h4 class="cart__price" data-price="${data.price}">$${data.price * data.item}.00</h4>
                </div>
            </div>

            <div class="cart__card-actions">
                <button class="cart__remove-button">
                    <i class="ri-delete-bin-line"></i>
                </button>

                <div class="cart__count-buttons">
                    <button class="cart__minus"><i class="ri-subtract-line"></i></button>
                    <span class="cart__count">${data.item}</span>
                    <button class="cart__plus"><i class="ri-add-line"></i></button>
                </div>
            </div>
        </div>
    `;
}

let totalBill = 0;

const setCartProducts = () => {
    const cartContainer = document.querySelector(".cart__content");

    let cart = JSON.parse(localStorage.getItem("cart"));

    if(cart == null || !cart.length) {
        cartContainer.innerHTML += `<h1>No products</h1>`;
    } else {
        for(let i = 0; i < cart.length; i++) {
            cartContainer.innerHTML += createCartCard(cart[i]);
            totalBill += Number(cart[i].price * cart[i].item);

            updateBill();
        }
    }

    setupCardsEvents();
}

const updateBill = () => {
    updateNavCartCounter();
    let billPrice = document.querySelector(".cart__checkout-total");
    billPrice.innerHTML = `$${totalBill}`;
}

const setupCardsEvents = () => {
    // count event
    const couterMinus  = document.querySelectorAll(".cart__content .cart__minus");
    const couterPlus  = document.querySelectorAll(".cart__content .cart__plus");
    const count  = document.querySelectorAll(".cart__content .cart__count");
    const price  = document.querySelectorAll(".cart__content .cart__price");
    const deleteButton = document.querySelectorAll(".cart__content .cart__remove-button")

    let product = JSON.parse(localStorage.getItem("cart"));

    count.forEach((item, i) => {
        let cost = Number(price[i].getAttribute("data-price"));

        couterMinus[i].addEventListener("click", () => {
            if(item.innerHTML > 1) {
                item.innerHTML--;
                totalBill -= cost;
                updateBill();
                price[i].innerHTML = `$${item.innerHTML * cost}`;
                product[i].item = item.innerHTML;
                localStorage.setItem("cart", JSON.stringify(product));
            }
        })

        couterPlus[i].addEventListener("click", () => {
            if(item.innerHTML < 9) {
                item.innerHTML++;
                totalBill += cost;
                updateBill();
                price[i].innerHTML = `$${item.innerHTML * cost}`;
                product[i].item = item.innerHTML;
                localStorage.setItem("cart", JSON.stringify(product));
            }
        })
    })

    deleteButton.forEach((item, i) => {
        item.addEventListener("click", () => {
            product = product.filter((data, index) =>  index != i);
            localStorage.setItem("cart", JSON.stringify(product));
            location.reload();
        })
    })
}

setCartProducts();