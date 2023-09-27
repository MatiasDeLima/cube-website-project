/*############### CUSTOMER SWIPER ###############*/
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