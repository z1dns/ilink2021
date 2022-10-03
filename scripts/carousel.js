let currentIdx = 0;
const indexCount = 3;

const pictures = document.querySelectorAll(".carousel .picture");
const previousButton = document.querySelector(".carousel .button.previous");
const nextButton = document.querySelector(".carousel .button.next");
const carouselDots = document.querySelectorAll(".carousel .navigation > .dot");

function setPicture(index) {
    if (0 <= index && index < indexCount) {
        pictures.forEach(pic => pic.style.visibility = "hidden");
        carouselDots.forEach(dot => dot.classList.remove("active"));
        pictures[index].style.visibility = "visible";
        carouselDots[index].classList.add("active");
    }
}

function nextPicture() {
    currentIdx = ((currentIdx + 1) < indexCount) ?  (currentIdx + 1) : 0;
    setPicture(currentIdx);
}

function previousPicture() {
    currentIdx = ((currentIdx - 1) >= 0) ?  (currentIdx - 1) : (indexCount - 1);
    setPicture(currentIdx);
}

function onDotClick(event) {
    currentIdx = Number(event.target.dataset.idx);
    setPicture(currentIdx);
}

document.addEventListener("DOMContentLoaded", () => {setPicture(currentIdx);});
previousButton.addEventListener("click", previousPicture);
nextButton.addEventListener("click", nextPicture);
carouselDots.forEach(dot => {dot.addEventListener("click", onDotClick);});
