
// send data to backend
const sendData = (path, data) => {
    //console.log(data);
    fetch(path, {
        method: 'POST',
        headers: new Headers({ 'Content-Type' : 'application/json' }),
        body: JSON.stringify(data)
    })
    .then(res =>  res.json())
    .then(data => processData(data));
};

const processData = (data) => {
    console.log(data); // os dados atuais
    // backend alerts
    if(data.alert) {
        showFormError(data.alert);
        // user register session
    } else if (data.name) {
        sessionStorage.user = JSON.stringify(data);
        location.replace('/');
    }
};

// form error
const showFormError = (err) => {
    let erroEle = document.querySelector(".form__error");
    erroEle.innerHTML = err;
    erroEle.classList.add("show__form-error");
    setTimeout(() => {
        erroEle.classList.remove("show__form-error");
    }, 3000) 
};