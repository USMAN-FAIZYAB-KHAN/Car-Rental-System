let currentIndex = 0;
const images = [
    "{% static 'images/assets/car1.jfif' %}",
    "{% static 'images/assets/car2.jfif' %}",
    "{% static 'images/assets/car3.jfif' %}"
];
const lines = document.querySelectorAll('.line');

function changeImage(image, index) {
    document.getElementById("mainImage").src = image;
    currentIndex = index;
    updateLines();
}

function currentImage(index) {
    changeImage(images[index], index);
}

function updateLines() {
    lines.forEach((line, index) => {
        line.classList.remove("active");
        if (index === currentIndex) {
            line.classList.add("active");
        }
    });
}

// Initialize the first image
changeImage(images[0], 0);
lines.forEach((line, index) => {
    line.addEventListener('click', () => {
        currentImage(index);
    });
});
