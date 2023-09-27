const createFooter = () => {
	let footer = document.querySelector(".footer");

	footer.innerHTML = `
		<div class="footer__container container grid">
			<div class="footer__content">
				<a href="#" class="nav__logo">
					<img src="../images/logo-image.svg">
				</a>

				<p class="footer__description">
					Explore our vast collection of GameBoy games,
					from the iconic titles that defined the era to
					hidden gems waiting.
				</p>
			</div>

			<div class="footer__content-grid">
				<div class="content-left grid">
					<div class="footer__content">
						<h3 class="footer__title">
							Features
						</h3>

						<ul class="footer__links">
							<li>
								<a href="#" class="footer__link">Museum</a>
							</li>
							<li>
								<a href="#" class="footer__link">Artist</a>
							</li>
							<li>
								<a href="#" class="footer__link">Collection</a>
							</li>
							<li>
								<a href="#" class="footer__link">Community</a>
							</li>
						</ul>
					</div>

					<div class="footer__content">
						<h3 class="footer__title">
							Services
						</h3>

						<ul class="footer__links">
							<li>
								<a href="#" class="footer__link">Creative Art</a>
							</li>
							<li>
								<a href="#" class="footer__link">Support</a>
							</li>
							<li>
								<a href="#" class="footer__link">Products</a>
							</li>
							<li>
								<a href="#" class="footer__link">CEO</a>
							</li>
						</ul>
					</div>
				</div>

				<div class="content-rigth grid">
					<div class="footer__content">
						<h3 class="footer__title">
							About
						</h3>

						<ul class="footer__links">
							<li>
								<a href="#" class="footer__link">Our company</a>
							</li>
							<li>
								<a href="#" class="footer__link">Our Team</a>
							</li>
							<li>
								<a href="#" class="footer__link">Customers</a>
							</li>
							<li>
								<a href="#" class="footer__link">Our story</a>
							</li>
						</ul>
					</div>

					<div class="footer__content">
						<h3 class="footer__title">
							Support
						</h3>

						<ul class="footer__links">
							<li>
								<a href="#" class="footer__link">Awards</a>
							</li>
							<li>
								<a href="#" class="footer__link">FAQ</a>
							</li>
							<li>
								<a href="#" class="footer__link">Privacy policy</a>
							</li>
							<li>
								<a href="#" class="footer__link">Terms of service</a>
							</li>
						</ul>
					</div>
				</div>

			</div>
		</div>

		<span class="footer__copy">&#169; Design and code by Matias</span>
    `;
};

createFooter();