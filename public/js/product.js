
// product page setting

let productName = document.querySelector(".product__info-title");
let productDesc = document.querySelector(".product__info-description");
let productPrice = document.querySelector(".product__total");
let productCategorie = document.querySelector(".product__info-category");
let productImage = document.querySelector(".product__img");

let cartButton = document.querySelector(".add-to-cart-button");

const setData = (data) => {
	productName.innerHTML = data.name;
	productImage.src = data.image;
	productDesc.innerHTML = data.shortDes;
	productPrice.innerHTML = "$" + data.price;
	productCategorie.innerHTML = data.categorie;

	cartButton.addEventListener("click", () => {
		cartButton.innerHTML = add_product_to_cart(data);
		location.reload();
	})
};

const fetchProductData = () => {
	fetch("/get-products", {
		method: "POST",
		headers: new Headers({ "Content-Type": "application/json" }),
		body: JSON.stringify({ id: productId })
	})
		.then(res => res.json())
		.then(data => {
			// console.log(data);
			// funcao de setar os novos dados
			setData(data);
			// eslint-disable-next-line no-undef
			getProducts(data.tags[0]).then(data => createProductCards(data, "Simillar", "collections", ".collections"));
		})
		.catch(err => {
			console.log(err);
			// alert("no product found");
			// location.replace("/404");
		});
};

// let productId = null;
// necessario pra quando usar product id 
// url /products/:id
if (location.pathname != "/add-product") {
	// adiciona o id do product na url / uri
	productId = decodeURI(location.pathname.split("/").pop());
	fetchProductData();
}