const createHeader = () => {
	const header = document.querySelector(".header");

	header.innerHTML = `
		<nav class="nav container">
			<a href="/" class="nav__logo">
				<img src="../images/logo-image.svg">
			</a>

			<div class="nav__menu" id="nav-menu">
				<ul class="nav__list">
					<li class="nav__item">
						<a href="/" class="nav__link">Home</a>
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

					<a href="#" class="contact__button active-mobile">
						Contact us
					</a>
				</ul>

				<div class="nav__close" id="nav-close">
					<i class="ri-close-line"></i>
				</div>
			</div>

			<div class="header__buttons">
				<div class="nav__cart" id="cart-button">
					<span class="cart__status"></span>
					<i class="ri-shopping-bag-line"></i>
				</div>

				<div class="nav__toggle" id="nav-toggle">
					<i class="ri-menu-line"></i>
				</div>

				<div class="nav__user" id="nav-user">
					<span class="user__status user__status-active"></span>
					<i class="ri-user-3-line user-icon"></i>

					<div class="nav__user-popup">
						<p>Login to your account</p>
						<a>Login</a>
					</div>
				</div>

				<a href="/signup" class="contact__button active-desktop">
					Register
				</a>
			</div>
		</nav>
    `;
};

createHeader();

/*############### SHOW MENU ###############*/
const navMenu = document.getElementById("nav-menu"),
	navToggle = document.getElementById("nav-toggle"),
	navClose = document.getElementById("nav-close");

/*##### MENU SHOW #####*/
if(navToggle) {
	navToggle.addEventListener("click", () => {
		navMenu.classList.add("show-menu");
	});
}

/*##### MENU HIDDEN #####*/
if(navClose) {
	navClose.addEventListener("click", () => {
		navMenu.classList.remove("show-menu");
	});
}

/*############### REMOVE MENU MOBILE ###############*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
	const navMenu = document.getElementById("nav-menu");

	navMenu.classList.remove("show-menu");
};
navLink.forEach(n => n.addEventListener("click", linkAction));

/*############### CART MENU ###############*/
const cartToggle = document.getElementById("cart-button")

if(cartToggle) {
	cartToggle.addEventListener("click", () => {
		location.href = "/cart"
	});
}

/*############### CHANGE BACKGROUND HEADER ###############*/
const scrollHeader = () => {
	const header = document.getElementById("header");

	this.scrollY >= 50 ? header.classList.add("scroll-header")
		: header.classList.remove("scroll-header");
};

window.addEventListener("scroll", scrollHeader);

/*############### USER POPUP ###############*/
const userButton = document.getElementById("nav-user");
const userPopup = document.querySelector(".nav__user-popup");

userButton.addEventListener("click", () => userPopup.classList.toggle("show-popup"));

// user login backend data in frontend
let text = userPopup.querySelector("p");
let actionButton = userPopup.querySelector("a");
let user = JSON.parse(sessionStorage.user || null);

if(user != null) {
	text.innerHTML = `Log in as, ${user.name}`;
	actionButton.innerHTML = "Log Out";
	actionButton.addEventListener("click", () => logout());
} else {
	text.innerHTML = "Login to your account";
	actionButton.innerHTML = "Sign In";
	actionButton.addEventListener("click", () => location.href = "/login");
}

const logout = () => {
	sessionStorage.clear();
	location.reload();
};

/*############### SEARCH BAR ###############*/

// let searchButton = document.querySelector(".search-button");
// let searchBox = document.querySelector(".search");

// searchButton.addEventListener("click", () => {
// 	if(searchBox.value.length) {
// 		location.href = `/search/${searchBox.value}`;
// 	}
// })

// header cart count 

const updateNavCartCounter = () => {
	let cartCounter = document.querySelector(".cart__status")

	let cartItem = JSON.parse(localStorage.getItem("cart"));

	if(cartItem == null) {
		cartCounter.innerHTML = "0";
	} else {
		if(cartItem.length > 9) {
			cartCounter.innerHTML = "9+";
		} else if(cartItem.length <= 9){
			cartCounter.innerHTML = `${cartItem.length}`;
		}
	}
}

updateNavCartCounter();