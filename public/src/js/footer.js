const createFooter = () => {
    let footer = document.querySelector(".footer");

    footer.innerHTML = `
        <div class="footer__container container grid">
            <div class="footer__content">
                <a href="#" class="nav__logo">
                    <img src="./src/assets/images/logo-image.svg">
                </a>

                <p class="footer__description">
                    Explore our vast collection of GameBoy games,
                    from the iconic titles that defined the era to
                    hidden gems waiting.
                </p>
            </div>

            <div class="footer__content">
                <h3 class="footer__title">
                    Features
                </h3>

                <ul class="footer__links">
                    <li>
                        <a href="#" class="footer__link">Support Center</a>
                    </li>
                    <li>
                        <a href="#" class="footer__link">Customer Support</a>
                    </li>
                    <li>
                        <a href="#" class="footer__link">About Us</a>
                    </li>
                    <li>
                        <a href="#" class="footer__link">Copy Right</a>
                    </li>
                </ul>
            </div>

            <div class="footer__content">
                <h3 class="footer__title">
                    Services
                </h3>

                <ul class="footer__links">
                    <li>
                        <a href="#" class="footer__link">Contact us</a>
                    </li>
                    <li>
                        <a href="#" class="footer__link">Blog</a>
                    </li>
                    <li>
                        <a href="#" class="footer__link">About us</a>
                    </li>
                    <li>
                        <a href="#" class="footer__link">CEO</a>
                    </li>
                </ul>
            </div>

            <div class="footer__content">
                <h3 class="footer__title">
                    Support
                </h3>

                <ul class="footer__links">
                    <li>
                        <a href="#" class="footer__link">Support Center</a>
                    </li>
                    <li>
                        <a href="#" class="footer__link">Customer Support</a>
                    </li>
                    <li>
                        <a href="#" class="footer__link">About Us</a>
                    </li>
                    <li>
                        <a href="#" class="footer__link">Copy Right</a>
                    </li>
                </ul>
            </div>

            <div class="footer__content">
                <h3 class="footer__title">
                    Contact us
                </h3>

                <ul class="footer__links">
                    <li>
                        <a href="#" class="footer__link">Support Center</a>
                    </li>
                    <li>
                        <a href="#" class="footer__link">Customer Support</a>
                    </li>
                    <li>
                        <a href="#" class="footer__link">About Us</a>
                    </li>
                    <li>
                        <a href="#" class="footer__link">Copy Right</a>
                    </li>
                </ul>
            </div>

            <div class="footer__content">
                <h3 class="footer__title">Social</h3>

                <ul class="footer__social">
                    <a href="https://www.facebook.com/" target="_blank" class="footer__social-link">
                        <i class="ri-facebook-fill"></i>
                    </a>

                    <a href="https://twitter.com/" target="_blank" class="footer__social-link">
                        <i class="ri-twitter-line"></i>
                    </a>

                    <a href="https://www.instagram.com/" target="_blank" class="footer__social-link">
                        <i class="ri-instagram-line"></i>
                    </a>
                </ul>
            </div>
        </div>

        <span class="footer__copy">Design and code by matias</span>
    `;
}

createFooter();