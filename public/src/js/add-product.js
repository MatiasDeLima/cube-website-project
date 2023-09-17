
let user = JSON.parse(sessionStorage.user || null);

window.onload = () => {
    if(user == null) {
        location.replace('/login');
    }
}

// adiciona o nome do placeholder no elemento que editable
let editables = [...document.querySelectorAll('*[contenteditable="true"]')];

editables.map((element) => {
    let placehoder = element.getAttribute('data-placeholder');
    element.innerHTML = placehoder;
    element.addEventListener('focus', () => {
        if(element.innerHTML === placehoder) {
            element.innerHTML = '';
        }
    })

    element.addEventListener('focusout', () => {
        if(!element.innerHTML.length) {
            element.innerHTML = placehoder
        }
    })
})

// image upload
let uploadInput = document.querySelector("#upload-image");
let imagePath = []; // default image

uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    // console.log(file)
    let imageUrl;

    if(file.type.includes('image')) {
        // means its an image
        fetch('/s3url').then(res => res.json())
        .then(url => {
            // console.log(url);
           fetch(url, {
                method: 'PUT',
                headers: new Headers({ 'Content-Type': file.type }),
                body: file
            }).then(res => {
                imagePath = url.split("?")[0];
                console.log(imagePath);

                let productImage = document.querySelector(".product-image");
                productImage.src = imagePath;
            })
        })
        .catch(error => {
            console.error("Erro ao obter a URL de upload:", error);
        });
    }
})

// form submission enviar o conteudo do produto

let addProductBtn = document.querySelector('.add-product-btn');

let productName = document.querySelector('.product__info-title');
let categorie = document.querySelector('.product__info-category');
let shortDes = document.querySelector('.product__info-description');
let price = document.querySelector('.product__total');
//let details = document.querySelector('.');
let tags = document.querySelector('.product__tag');

addProductBtn.addEventListener("click", () => {

    //verification
    if(productName.innerHTML == productName.getAttribute('data-placeholder')){
        showFormError('🤷‍♂️ Should enter product name!');
    }  else if (categorie.innerHTML == categorie.getAttribute('data-placeholder')) {
        showFormError('🤷‍♂️ Should enter categorie name!');
    } else if (shortDes.innerHTML == shortDes.getAttribute('data-placeholder')) {
        showFormError('🤷‍♂️ Short des must be 80 letters long!');
    } else if (price.innerHTML == price.getAttribute('data-placeholder') || !Number(price.innerHTML)) {
        showFormError('🤷‍♂️ Enter valid price!');
    } else if (tags.innerHTML == tags.getAttribute('data-placeholder')) {
        showFormError('🤷‍♂️ Enter tags!');
    } else {
        // submit this form
        let data = productData();
        // impede que o produto se duplicado ao ser editado
        // edita no backend
        if(productId) {
            data.id = productId;
        }
        sendData('/add-product', data);
    }
})

// formato do produto a ser mandado para o server
const productData = () => {
    let tagsArr = tags.innerText.split(",");
    tagsArr.forEach((item, i) => tagsArr[i].trim().toLowerCase());

    return {
        name: productName.innerText,
        categorie: categorie.innerText,
        shortDes: shortDes.innerText,
        price: price.innerText,
        image: imagePath,
        tags: tags.innerText,
        email: JSON.parse(sessionStorage.user).email,
        draft: false
    }
}

// draft btn
let draftButton = document.querySelector('.draft-btn')

draftButton.addEventListener("click", () => {
    if(!productName.innerHTML.length || productName.innerHTML == productName.getAttribute('data-placeholder')) {
        showFormError("Enter product name atleast");
    } else { // don't validate the form
        let data = productData();
        data.draft = true;
        if(productId) {
            data.id = productId;
        }

        sendData("/add-product", data)
    }
})


// edit page

// pagina de editar produtos funcionalidades
// envia produto atualizado adicionar id em get-products
const fetchProductData = () => {
    addProductBtn.innerHTML = 'save product';
    fetch('/get-products', {
        method: 'POST',
        headers: new Headers({ 'Content-Type' : 'application/json' }),
        body: JSON.stringify({ id: productId })
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        // funcao de setar os novos dados
        setFormData(data);
    })
    .catch(err => console.log(err));
}

// redenriza dados do produto de acordo com id 
// para serem editados
const setFormData = (data) => {
    productName.innerHTML = data.name;
    categorie.innerHTML = data.categorie;
    shortDes.innerHTML = data.shortDes;
    price.innerHTML = data.price;
    tags.innerHTML = data.tags;

    let productImg = document.querySelector(".product-image");
    productImg.src = imagePath = data.image;
}

// edit page editar produto
let productId = null;
// no console do navergado se quiser ver o path location.pathname
if(location.pathname != '/add-product') {
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}
