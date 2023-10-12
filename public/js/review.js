
let ratingStarInput = [...document.querySelectorAll(".rating-star")];
let rate = 0;

ratingStarInput.map((star, index) => {
	star.addEventListener("click", () => {
        rate = `${index + 1}.0`;
		for (let i = 0; i < 5; i++) {
			if (i <= index) {
				ratingStarInput[i].classList = "ri-star-s-fill";
			} else {
				ratingStarInput[i].classList = "ri-star-s-line";
			}
		}
	});
});


// add review form
let reviewHadline = document.querySelector(".review-headline");
let reviewText = document.querySelector(".review-text");

let addReviewButton = document.querySelector("#review-button");

addReviewButton.addEventListener("click", () => {
    // nao coloca review se nao estiver logado
    if(user.email == undefined) {
        // guarda a pagina pra quando fizer login
        location.href = `/login?after_page=${productId}`
    } else {
        if(!reviewHadline.value.length || !reviewText.value.length || rae == 0) {
            showFormError("Fill all the inputs");
        } else if(reviewHadline.value.length > 50) {
            showFormError("Headline should not be more then 50 letters");
        } else if(reviewText.value.length > 150) {
            showFormError("Review should not be more then 50 letters");
        } else {
            // send data to backend
            sendData("/add-review", {
                headline: reviewHadline.value,
                review: reviewText.value,
                rate: rate,
                email: user.email,
                product: productId
            })
        }
    }
})

// fetch reviews
const getReviews = () => {
    if(user == null) {
        user = {
            email: undefined
        }
    }

    fetch("/get-review", {
        method: "POST",
        headers: new Headers({ "Content-Type" : "application/json" }),
        body: JSON.stringify({
            email: user.email,
            product: productId
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.length) {
            // console.log(data);
            createReviewSection(data);
        }
    })

    // sendData("/get-review", {
    //     email: user.email,
    //     product: productId
    // })
    // .then(res => res.json())
    // .then(data => {
    //     if(data.length) {
    //         // console.log(data);
    //     }
    // })
}

const createReviewSection = (data) => {
    let section = document.querySelector(".customers");

    section.innerHTML += `
        <h2 class="section__title section__title-center">
        <span>Reviews<img src="../images/line.svg"></span>
        </h2>

        <div class="swiper customers__container container">
            <div class="swiper-wrapper">
            ${createReviewCard(data)}
            </div>

            <div class="swiper-pagination customer__pagination"></div>
        </div>
    `;
}

const createReviewCard = data => {
    let cards = "";

    for(let i = 0; i < 4; i++) {
        if(data[i]) {
            cards +=  `
                <article class="customers__card swiper-slide">
                    <div class="customers__card-img">
                        <img src="../images/customer-image-1.png">

                        <div class="customers__rating">
                            ${data[i].rate}
                        </div>
                    </div>

                    <h3 class="customers__card-title">
                        ${data[i].headline}
                    </h3>

                    <p class="customers__card-text">
                        ${data[i].review}
                    </p>
                </article>

            `;
        }
    }

    return cards;
}

getReviews();