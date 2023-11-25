

const getHomeProducts = (tag) => {
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

const createHomeProductCards = (data, title, sub, ele) => {
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
			${createHomeCards(data)}
		</div>
	`;
};

const createHomeCards = (data) => {
    let cards = ""; // this will contain card HTML
    let cardsRendered = 0;

    data.forEach(item => {
        if (item.id != productId && cardsRendered < 4) {
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
            cardsRendered++; 
        }
    })
    return cards;
};

getHomeProducts('wlop collection').then(data => createHomeProductCards(data, 'Top', 'Collections', '.top-collections'));