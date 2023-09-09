const createHeader = () => {
    const header = document.querySelector(".header");

    header.innerHTML = `
        <nav class="nav container">
            <a href="#" class="nav__logo">
                <img src="./src/assets/images/logo-image.svg">
            </a>

            <div class="nav__menu" id="nav-menu">
                <ul class="nav__list">
                    <li class="nav__item">
                        <a href="#" class="nav__link">Home</a>
                    </li>

                    <li class="nav__item">
                        <a href="#" class="nav__link">Collection</a>
                    </li>

                    <li class="nav__item">
                        <a href="#" class="nav__link">Artist</a>
                    </li>

                    <li class="nav__item">
                        <a href="#" class="nav__link">Library</a>
                    </li>

                    <a href="#" class="contact__button">
                        Contact us
                    </a>
                </ul>

                <div class="nav__close" id="nav-close">
                    <i class="ri-close-line"></i>
                </div>
            </div>

            <div class="header__buttons">
                <div class="nav__cart" id="cart-button">
                    <i class="ri-shopping-bag-line"></i>
                </div>

                <div class="nav__toggle" id="nav-toggle">
                    <i class="ri-menu-line"></i>
                </div>

                <div class="nav__user" id="nav-user">
                    <div>
                        <i class="ri-user-3-line"></i>
                    </div>
                </div>
            </div>
        </nav>
    `;
}

createHeader();

/*############### SHOW MENU ###############*/
const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close")

/*##### MENU SHOW #####*/
if(navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    })
}

/*##### MENU HIDDEN #####*/
if(navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu")
    })
}

/*############### REMOVE MENU MOBILE ###############*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
    const navMenu = document.getElementById("nav-menu");

    navMenu.classList.remove("show-menu");
}
navLink.forEach(n => n.addEventListener("click", linkAction));

/*############### CART MENU ###############*/
const cartMenu = document.getElementById("cart-menu"),
      cartToggle = document.getElementById("cart-button"),
      cartClose = document.getElementById("cart-close")

if(cartToggle) {
    cartToggle.addEventListener("click", () => {
        cartMenu.classList.add("show-cart");
    })
}

if(cartClose) {
    cartClose.addEventListener("click", () => {
        cartMenu.classList.remove("show-cart");
    })
}
