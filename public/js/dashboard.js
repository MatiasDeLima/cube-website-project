// user validation
let user = JSON.parse(sessionStorage.user || null);

if (user == null) {
	location.replace("/login");
} else if (!user.seller) {
	location.replace("/admin");
}

// insere nome do user na dashboard
document.addEventListener("DOMContentLoaded", function () {
	// Seu código aqui
	let greeting = document.getElementById("seller-greeting");
	greeting.innerHTML += user.name;
});

// dashboard action
let noProductsDiv = document.querySelector(".no__products");

// adiciona produtos criados a dashboard
const setupProducts = () => {
	fetch("/get-products", {
		method: "POST",
		headers: new Headers({ "Content-Type": "application/json" }),
		body: JSON.stringify({ email: user.email })
	})
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			if(data == "no products") {
				//se nao tiver produtos no db
				noProductsDiv.style.opacity = "1";
			} else {
				// se tiver chama uma funcrao para criar o producto na tela
				data.forEach(product => createProduct(product));
			}
		});
};

setupProducts();