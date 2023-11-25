/*############### EMAIL JS ############### */
const contactForm = document.getElementById("contact-form"),
    contactName = document.getElementById("contact-name"),
    contactEmail = document.getElementById("contact-email"),
    contactMessage = document.getElementById("contact-message"),
    contactAlert = document.getElementById("contact-alert");

const sendEmail = (e) => {
    const serviceID = "service_z86g21q";
    const templateID = "template_wmxis5o";
    const templateParams = "#contact-form";
    const publicKey = "--rTMfrK7YmYR5xkm";

    e.preventDefault();

    if (contactName.value === "" || contactEmail.value === "" || contactMessage.value === "") {

        contactAlert.classList.remove("green-color");
        contactAlert.classList.add("red-color");

        contactAlert.textContent = "Write all the input fields! ⚠️";
    } else {
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm(serviceID, templateID, templateParams, publicKey)
            .then(() => {
                contactAlert.classList.add("green-color");
                contactAlert.textContent = "Message sent! ✅";

                setTimeout(() => {
                    contactAlert.textContent = "";
                    contactName.value = "";
                    contactEmail.value = "";
                    contactMessage.value = "";
                }, 3500);
            }).catch(err => {
                contactAlert.textContent = "OOPS! SOMETHING HAS FAILED... ⚠️";
                console.log(err);
            });
    };
};

contactForm.addEventListener("submit", sendEmail);
