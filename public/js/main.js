

const getProducts = (tag) => {
	return fetch("/get-products", {
		method: "POST",
		headers: new Headers({ "Content-Type": "application/json" }),
		body: JSON.stringify({ tag: tag })
	})
		.then(res => res.json())
		.then(data => {
			return data;
		});
};

let productId = null;

// create collections cards
const createProductCards = (data, title, sub, ele) => {
	// console.log(data);
	let container = document.querySelector(`${ele}`);
	container.innerHTML += `
		<div class="top__actions">
			<h2 class="section__title section__title-center">
				<span>${title}<img src="../images/line.svg"></span>
				${sub}
			</h2>

			<a href="#" class="outline__button button-flex">
				View All Collections <i class="ri-arrow-right-s-line"></i>
			</a>
		</div>
		<div class="collection__container container grid">
			${createCards(data)}
		</div>
	`;
};

const createCards = (data) => {
	let cards = ""; // this will contain card HTML

	data.forEach(item => {
		if (item.id != productId) {
			cards += `
				<article class="collection__card">
					<div class="collection__card-img">
						<img src="${item.image}" onclick="location.href = '/products/${item.id}'">
						<div class="card__img-like">
							<i class="ri-heart-3-line"></i>
						</div>
					</div>

					<div class="collection__card-infos">
						<h4 class="collection__card-title">
								${item.name}
						</h4>

						<p class="collection__card-categorie">
								${item.categorie}
						</p>
					</div>

					<div class="collection__card-actions">
						<span class="collection__card-price">
							$${item.price}
						</span>

						<button class="button small-button button-flex">
							Order Now
						</button>
					</div>
				</article>
			`;
		}
	})
	return cards;
};

// cart function
const add_product_to_cart = product => {
	updateNavCartCounter();
	let cart = JSON.parse(localStorage.getItem("cart"));

	if (cart == null) {
		cart = [];
	}

	product = {
		item: 1,
		name: product.name,
		price: product.price,
		shortDes: product.shortDes,
		image: product.image
	}

	cart.push(product);
	localStorage.setItem("cart", JSON.stringify(cart));
	return "added "
}