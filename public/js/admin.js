
// se voce tentar acessar a pagina de admin sem estar logado error
// se voce for admin ou seller = true
window.onload = () => {
	let user = JSON.parse(sessionStorage.user || null);

	if (user == null) {
		// redireciona login page
		location.replace("/login");
	} else if (user.seller) {
		// se tentar acessar admin => redireciona dashboard
		// redireciona dashboard page
		location.replace("/dashboard");
	}
};

let adminButton = document.querySelector(".admin-button");

adminButton.addEventListener("click", () => {
	let adminUser = document.querySelector("#admin-user").value;
	let adminPassword = document.querySelector("#admin-password").value;
	let adminCode = document.querySelector("#admin-code").value;

	if (adminUser.lenght < 3 || !adminPassword.length || !Number(adminCode) || adminCode.length < 10) {
		//alert("enter all filds")
		showFormError("🤷‍♂️ Please enter all filds!");
	} else {
		//alert("ok")

		sendData("/admin", {
			adminuser: adminUser,
			adminpassword: adminPassword,
			admincode: adminCode,
			email: JSON.parse(sessionStorage.user).email
		});
	}
});