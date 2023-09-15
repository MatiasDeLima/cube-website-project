/*############### PRODUTO DO CRIADO PELO ADMIN ############### */
// renderiza produto na dashboard
const createProduct = (data) => {
    let productContainer = document.querySelector(".dashboard__content");
    productContainer.innerHTML += `
        <article class="product__card">
            <img src="${data.image}">

            <div class="dashboard__actions">
                <button onclick="location.href = '/add-product/${data.id}' " ><i class="ri-pencil-line"></i></button>
                <button onclick="location.href = '/products/${data.id}' " ><i class="ri-send-plane-line"></i></button>
                <button onclick="deleteItem('${data.id}')" ><i class="ri-delete-bin-line"></i></button>
            </div>
            <p class="product-name">${data.tags[0]}<p/>
        </article>
    `;
}

// delete product for dashboard
const deleteItem = (id) => {
    fetch('/delete-product', {
        method: 'POST',
        headers: new Headers({ 'Content-Type' : 'application/json' }),
        body: JSON.stringify({ id: id })
    })
    .then(res => res.json())
    .then(data => {
        // process data
        if(data == 'success') {
            location.reload()
        } else {
            showAlert('some error occured')
        }

    })
}