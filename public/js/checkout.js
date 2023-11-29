window.onload = () => {
    if (!sessionStorage.user) {
        location.replace("/login");
    }

    if(location.search.includes("payment=done")) {
        let items = [];
        localStorage.setItem("cart", JSON.stringify(items));
        showFormError("Order is done")
    }

    if(location.search.includes("payment_fail=true")) {
        showFormError("Some error occured. Please try again")
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
                items: JSON.parse(localStorage.getItem("cart")),
                address: address,
                email: JSON.parse(sessionStorage.user).email,
            })
        })
            .then(res => res.json())
            .then(url => {
                location.href = url;
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