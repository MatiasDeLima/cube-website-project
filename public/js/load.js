let progressBar = document.querySelector(".circular__progress");
let valueNumber = document.querySelector(".loading__number");

// console.log(progressBar, valueNumber);
onload = () => {
    const load = document.getElementById("loading-page");

    setTimeout(() => {
        load.style.display = 'none';
    }, 6000)
}

let progressValue = 0;
let progressValueEnd = 100;
let speed = 50;

let progress = setInterval(() => {
    progressValue++;
    valueNumber.textContent = `${progressValue}%`;
    progressBar.style.background  = `conic-gradient(
        var(--first-color) ${progressValue * 3.6}deg,
        var(--container-color) ${progressValue *3.6}deg
    )`;
    // console.log(progressValue);
    if (progressValue == progressValueEnd) {
        clearInterval(progress);
    }
}, speed);