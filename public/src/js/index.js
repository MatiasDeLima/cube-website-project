
/*############### HOME SWIPER ###############*/
// // eslint-disable-next-line no-undef
let homeSwiper = new Swiper(".swiper-home", {
	centeredSlides: true,
	slidesPerView: "auto",
	spaceBetween: 32,

	navigation: {
		nextEl: ".swiper-button-next",
	},

	pagination: {
		el: ".swiper-pagination",
	},
});

/*############### CUSTOMER SWIPER ###############*/
// eslint-disable-next-line no-undef
let customerSwiper = new Swiper(".customers__container", {
	centeredSlides: true,
	loop: true,
	slidesPerView: "auto",
	spaceBetween: 32,

	breakpoints: {
		1024: {
			// eslint-disable-next-line no-mixed-spaces-and-tabs
			slidesPerView: 3, // Number of slides per view when viewport width is 1024px or more
		},
	},

	pagination: {
		el: ".swiper-pagination",
	},
});

/*############### SCROLL SECTIONS ACTIVE LINK ###############*/
const sections = document.querySelectorAll("section[id]");

function scrollActive(){
	const scrollY = window.pageYOffset;

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			sectionTop = current.offsetTop - 58,
			sectionId = current.getAttribute("id");

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
		}else{
			document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
		}
	});
}
window.addEventListener("scroll", scrollActive);


/*############### SHOW SCROLL UP ###############*/
const scrollUp = () => {
	const scrollUp = document.getElementById("scroll-up");

	this.scrollY >= 350 ? scrollUp.classList.add("show-scrollup")
		: scrollUp.classList.remove("show-scrollup");
};

window.addEventListener("scroll", scrollUp);


/*############### EMAIL JS ###############*/


/*############### DARK AND LIGHT MODE ###############*/


/*############### SCROLL REVEAL ANIMATION ###############*/
const sr = ScrollReveal({
	origin: "top",
	distance: "60px",
	duration: 2500,
	delay: 400,
	// reset: true
});

sr.reveal(".swiper-home, .customers__container, .contact__container, .newsletter__container");
sr.reveal(".category__data, .footer__content, .collection__card", { interval: 100 });
sr.reveal(".about__data, .artwork__image", { origin: "left" });
sr.reveal(".about__image, .artwork__data", { origin: "right" });