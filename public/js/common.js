let char = `123abcde.fmnopqlABCDE@FJKLMNOPQRSTUVWXYZ456789stuvwxyz0!#$%&ijkrgh'*+-/=?^_${'`'}{|}~`;

const generateToken = (key) => {
    let token = "";

    for(let i = 0; i < key.length; i++) {
        let index = char.indexOf(key[i]) || char.length / 2;
        let randomIndex = Math.floor(Math.random() * index);
        token += char[randomIndex] + char[index - randomIndex];
    }
    return token;
}

const compareToken = (token, key) => {
    let string = "";
    for(let i = 0; i < token.length; i=i+2) {
        let index1 = char.indexOf(token[i]);
        let index2 = char.indexOf(token[i+1]);
        string += char[index1 + index2];
    }

    if(string === key) {
        return true;
    }
    return false;
}

// send data to backend
// eslint-disable-next-line no-unused-vars
const sendData = (path, data) => {
	//console.log(data); // dados no front
	fetch(path, {
		method: "POST",
		headers: new Headers({ "Content-Type" : "application/json" }),
		body: JSON.stringify(data)
	})
		.then(res =>  res.json())
		.then(data => processData(data));
};

// dados vindo do backend
const processData = (data) => {
	console.log(data); // dados atuais do backend
	// backend alerts
	if(data.alert) {
		showFormError(data.alert);
		// user register session
	}/* else if (data.name) {
		sessionStorage.user = JSON.stringify(data);
		location.replace("/");
	}*/else if(data.email) {
		data.authToken = generateToken(data.email);
		sessionStorage.user = JSON.stringify(data);
		// caso eu entre em um produto tente fazer o review mas nao esteja longado
		// ele redireciona para login e quando voce faz o login te coloca no
		// produto que voce estava
		if(location.search.includes("after")) {
			let pageId = location.search.split('=')[1];
			location.replace(`/products/${pageId}`);
		} else {
			location.replace("/");
		}
		// admin form
	} else if (data.seller) {
		let user = JSON.parse(sessionStorage.user);
		user.seller = true;
		sessionStorage.user = JSON.stringify(user);
		location.replace("/dashboard");
		// add products
	} else if(data.product) {
		location.replace("/dashboard");
		// review
	} else if(data == "review") {
		alert('got the review');
		location.reload();
	}
};

// form error
const showFormError = (err) => {
	let erroEle = document.querySelector(".form__error");
	erroEle.innerHTML = err;
	erroEle.classList.add("show__form-error");
	setTimeout(() => {
		erroEle.classList.remove("show__form-error");
	}, 3000); 
};