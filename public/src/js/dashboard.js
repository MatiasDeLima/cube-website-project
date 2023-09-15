
let user = JSON.parse(sessionStorage.user || null);

// impede que nao ta autorizado accessar a dashboard
// se nao tiver longado
//se nao for admin
if (user == null) {
    location.replace('/login');
} else if (!user.seller) {
    location.replace('/admin');
}

// insere nome do user na dashboard


document.addEventListener('DOMContentLoaded', function () {
    // Seu código aqui
    let greeting = document.getElementById("#seller-greeting");
    greeting.innerHTML += user.name;
});

// dashboard action

let noProductsDiv = document.querySelector('.no__products');

// poste products actives in dashboard
const setupProducts = () => {
    fetch('/get-products', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ email: user.email })
    })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if(data == 'no products') {
                //se nao tiver produtos no db
                noProductsDiv.style.opacity = '1';
            } else {
                // se tiver chama uma funcrao para criar o producto na tela
                data.forEach(product => createProduct(product));
            }
        })
}

setupProducts();