
let user = JSON.parse(sessionStorage.user || null);

// impede que nao ta autorizado accessar a dashboard
// se nao tiver longado
//se nao for admin
if(user == null) {
    location.replace('/login');
} else if (!user.seller) {
    location.replace('/admin');
}

// insere nome do user na dashboard
let greeting = document.getElementById("#seller-greeting");
greeting.innerHTML += user.name;