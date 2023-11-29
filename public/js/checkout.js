window.onload = () => {
    if (!sessionStorage.user) {
        location.replace("/login");
    }
}

const placeOrderButton = document.querySelector(".place__order");

placeOrderButton.addEventListener("click", () => {
    let address = getAddress();

    if (address) {
        fetch("/stripe-checkout", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({
                items: JSON.parse(localStorage.cart),
                email: JSON.parse(sessionStorage.user).email,
                add: address,
            })
        })
        .then(res => res.json())
        .then(url => {
            location.href = url;
            // console.log(url)
            // if(data.alert == "your order is placed") {
            //     delete localStorage.cart;
            //     alert(data.alert, "success");
            // } else {
            //     alert(data.alert);
            // }


            // se o pagamento for bem sucedido faz um fetch para enviar email
            // if(ok) {
            //     fetch("/order", {

            //     })
            // }
        })
        .catch(err => console.log(err))
    }
})

const getAddress = () => {
    // validation
    let address = document.querySelector("#address").value;
    let street = document.querySelector("#street").value;
    let city = document.querySelector("#city").value;
    let state = document.querySelector("#state").value;
    let pincode = document.querySelector("#pincode").value;
    let landmark = document.querySelector("#landmark").value;

    if (!address.length || !street.length || !city.length || !state.length || !pincode.length || !landmark.length) {
        showFormError("Enter all inputs! ⚠️")
    } else {
        return { address, state, street, city, pincode, landmark }
    }
}