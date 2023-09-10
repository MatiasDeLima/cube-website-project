// se voce estiver logodo impede de chamar outra URL
window.onload = () => {
    if (sessionStorage.user) {
        user = JSON.parse(sessionStorage.user);
        if (user.email) {
            location.replace('/');
        }
    }
};

const formButton = document.querySelector(".submit__button");

// form validation
formButton.addEventListener("click", () => {

    const username = document.querySelector("#name") || null;
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const number = document.querySelector("#number") || null;
    const checkbox = document.querySelector("#checkbox") || null;

    // sign up page
    if (username != null) {
        // validation form 
        if (username.value.length < 3) {
            showFormError("🤷‍♂️ Name most be 3 letters long!")
        } else if (!email.value.length) {
            showFormError("🤷‍♂️ Enter Your E-mail!");
        } else if (password.value.length < 8) {
            showFormError("🤷‍♂️ Password most be 8 numbers long!")
        } else if (!Number(number.value) || number.value.length < 10) {
            showFormError("🤷‍♂️ Invalid number, please enter valid one!")
        } else if (!checkbox.checked) {
            showFormError("🤷‍♂️ You most agree to our terms and condition!")
        } else {
            // submit form
            sendData('/signup', {
                name: username.value,
                email: email.value,
                password: password.value,
                number: number.value,
                checkbox: checkbox.checked,
            })
        }

        // login page
    } else {
        if(!email.value.length || !password.value.length) {
            showFormError('🤷‍♂️ Fill all the inputs!');
        } else {
            // submit form
            sendData('/login', {
                email: email.value,
                password: password.value,
            })
        }
    }
});