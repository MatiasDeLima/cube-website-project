/*############### CHANGE BACKGROUND HEADER ###############*/
const scrollHeader = () => {
    const header = document.getElementById("header");

    this.scrollY >= 50 ? header.classList.add("scroll-header")
        : header.classList.remove("scroll-header")
}

window.addEventListener("scroll", scrollHeader);

/*############### NEW SWIPER ###############*/
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

/*############### SCROLL SECTIONS ACTIVE LINK ###############*/


/*############### SHOW SCROLL UP ###############*/


/*############### EMAIL JS ###############*/


/*############### DARK AND LIGHT MODE ###############*/


/*############### CART MENU ###############*/


/*############### SCROLL REVEAL ANIMATION ###############*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.home-swiper, .new-swiper, .newsletter__container`)
sr.reveal(`.category__data, .trick__content, .footer__content`, { interval: 100 })
sr.reveal(`.about__data, .discount__img`, { origin: 'left' })
sr.reveal(`.about__img, .discount__data`, { origin: 'right' })