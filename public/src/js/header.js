const createHeader = () => {
	const header = document.querySelector(".header");

	header.innerHTML = `
       
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
const cartMenu = document.getElementById("cart-menu"),
	cartToggle = document.getElementById("cart-button"),
	cartClose = document.getElementById("cart-close");

if(cartToggle) {
	cartToggle.addEventListener("click", () => {
		cartMenu.classList.add("show-cart");
	});
}

if(cartClose) {
	cartClose.addEventListener("click", () => {
		cartMenu.classList.remove("show-cart");
	});
}

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
