let user = JSON.parse(sessionStorage.user || null);

window.onload = () => {
	if(user == null) {
		location.replace("/login");
	} else if(!user.seller) {
		location.replace("/admin");
	}
};

// image upload
let uploadInput = document.querySelector("#upload-image");
let imagePath = []; // default image

uploadInput.addEventListener("change", () => {
	const file = uploadInput.files[0];
	// console.log(file)

	if(file.type.includes("image")) {
		// means its an image
		fetch("/s3url").then(res => res.json())
			.then(url => {
				// console.log(url);
				fetch(url, {
					method: "PUT",
					headers: new Headers({ "Content-Type": file.type }),
					body: file
				}).then(res => {
					imagePath = url.split("?")[0];
					console.log(imagePath);

					let productImage = document.querySelector(".product-image");
					productImage.src = imagePath;
				});
			})
			.catch(error => {
				console.error("Erro ao obter a URL de upload:", error);
			});
	}
});

// form selectores
let addProductBtn = document.querySelector(".add-product-btn");
let productName = document.querySelector("#product-name");
let productCategorie = document.querySelector("#product-categorie");
let productDes = document.querySelector("#product-description");
let productPrice = document.querySelector("#product-price");
let productTags = document.querySelector("#product-tags");

// form validation
addProductBtn.addEventListener("click", () => {
	//verification
	if(!productName.value.length){
		showFormError("🤷‍♂️ Should enter product name!");
	}  else if (!productCategorie.value.length) {
		showFormError("🤷‍♂️ Should enter categorie!");
	} else if (productDes.value.length < 80) {
		showFormError("🤷‍♂️ Short des must be 80 letters long!");
	} else if (!productPrice.value.length || !Number(productPrice.value)) {
		showFormError("🤷‍♂️ Enter valid price!");
	} else if (!productTags.value.length) {
		showFormError("🤷‍♂️ Enter tags!");
	} else {
		// submit this form
		let data = productData();
		// impede que o produto se duplicado ao ser editado
		// edita no backend
		if(productId) {
			data.id = productId;
		}
		sendData("/add-product", data);
	}
});

// formato do produto a ser mandado para o server
const productData = () => {
	let tagsArr = productTags.innerText.split(",");
	tagsArr.forEach((item, i) => tagsArr[i].trim().toLowerCase());

	return {
		name: productName.value,
		categorie: productCategorie.value,
		shortDes: productDes.value,
		price: productPrice.value,
		tags: tagsArr,
		image: imagePath,
		email: JSON.parse(sessionStorage.user).email,
		draft: false // draft button // nao e um draft
	};
};

// draft btn
let draftButton = document.querySelector(".draft-btn");

// draft function
draftButton.addEventListener("click", () => {
	if(!productName.innerHTML.length || productName.innerHTML == productName.getAttribute("data-placeholder")) {
		showFormError("Enter product name atleast");
	} else { // don't validate the form
		let data = productData();
		data.draft = true;
		if(productId) {
			data.id = productId;
		}

		sendData("/add-product", data);
	}
});

// edit page

// pagina de editar produtos funcionalidades
// envia produto atualizado adicionar id em get-products
const fetchProductData = () => {
	addProductBtn.innerHTML = "save product";
	fetch("/get-products", {
		method: "POST",
		headers: new Headers({ "Content-Type" : "application/json" }),
		body: JSON.stringify({ id: productId })
	})
		.then(res => res.json())
		.then(data => {
			// console.log(data);
			// funcao de setar os novos dados
			setFormData(data);
		})
		.catch(err => console.log(err));
};

// redenriza dados do produto de acordo com id 
// para serem editados
const setFormData = (data) => {
	productName.innerHTML = data.name;
	productCategorie.innerHTML = data.categorie;
	productDes.innerHTML = data.shortDes;
	productPrice.innerHTML = data.price;
	productTags.innerHTML = data.tags;

	let productImg = document.querySelector(".product-image");
	productImg.src = imagePath = data.image;
};

// edit page editar produto
let productId = null;
// no console do navergado se quiser ver o path location.pathname
// para ir para a pagina de edite product pelo id
if(location.pathname != "/add-product") {
	productId = decodeURI(location.pathname.split("/").pop());
	fetchProductData();
}