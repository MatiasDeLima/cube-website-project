let ratingStarInput = [...document.querySelectorAll(".rating-star")];

ratingStarInput.map((star, index) => {
	star.addEventListener("click", () => {
		for(let i = 0; i < 5; i++) {
			if(i <= index) {
				ratingStarInput[i].classList = "ri-star-s-fill";
			} else {
				ratingStarInput[i].classList = "ri-star-s-fill";
			} 
		}
	});
});


// product page setting

let productName = document.querySelector(".product__info-title");
let productDesc = document.querySelector(".product__info-description");
let productPrice = document.querySelector(".product__total");
let productCategorie = document.querySelector(".product__info-category");
let productImage = document.querySelector(".product__img");

const setData = (data) => {
	productName.innerHTML = data.name;
	productImage.src = data.image;
	productDesc.innerHTML = data.shortDes;
	productPrice.innerHTML = "$" + data.price;
	productCategorie.innerHTML = data.categorie;
};

const fetchProductData = () => {
	fetch("/get-products", {
		method: "POST",
		headers: new Headers({ "Content-Type" : "application/json" }),
		body: JSON.stringify({ id: productId })
	})
		.then(res => res.json())
		.then(data => {
			// console.log(data);
			// funcao de setar os novos dados
			setData(data);
			// eslint-disable-next-line no-undef
			getProducts(data.tags[0]).then(data => createProductCards(data, ".collections", "Simillar collections"));
		})
		.catch(err => {
			console.log(err);
			// alert("no product found");
			// location.replace("/404");
		});
};

let productId = null;
if(location.pathname != "/add-product") {
	productId = decodeURI(location.pathname.split("/").pop());
	fetchProductData();
}


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

// create collections cards
const createProductCards = (data, parent, title) => {
	// console.log(data);
	let container = document.querySelector(`${parent}`);
		container.innerHTML += `
			<div class="top__actions">
				<h2 class="section__title section__title-center">
					<span>${title}<img src="../images/line.svg"></span>
					Collections
				</h2>

				<a href="#" class="outline__button button-flex">
					View All Collections <i class="ri-arrow-right-s-line"></i>
				</a>
			</div>
			${createCards(data)}
		`;
};

const createCards = (data, parent) => {
	let start = '<div class="collection__container">';
    let cards = ""; // this will contain card HTML
    let end = '</div>';

	for(let i =0; i < data.length; i++) {
		if(data[i].id != decodeURI(location.pathname.split('/').pop())){
			cards += `
				<article class="collection__card">
					<div class="collection__card-img">
						<img src="${data[i].image}" onclick="location.href = '/products/${data[i].id}'">
						<div class="card__img-like">
							<i class="ri-heart-3-line"></i>
						</div>
					</div>

					<div class="collection__card-infos">
						<h4 class="collection__card-title">
							${data[i].name}
						</h4>

						<p class="collection__card-categorie">
							${data[i].categorie}
						</p>
					</div>

					<div class="collection__card-actions">
						<span class="collection__card-price">
							$${data[i].price}
						</span>

						<button class="button small-button button-flex">
							Order Now
						</button>
					</div>
				</article>
			`;
		}
	}


	return start + cards + end;
};