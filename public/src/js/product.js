let ratingStarInput = [...document.querySelectorAll('.rating-star')];

ratingStarInput.map((star, index) => {
    star.addEventListener('click', () => {
        for(let i = 0; i < 5; i++) {
            if(i <= index) {
                ratingStarInput[i].classList = "ri-star-s-fill";
            } else {
                ratingStarInput[i].classList = "ri-star-s-fill";
            } 
        }
    })
})