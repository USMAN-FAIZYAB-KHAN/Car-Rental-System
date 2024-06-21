let currentIndex = 0;
const images = ["../static/images/assets/car1.jfif", "../static/images/assets/car2.jfif", "../static/images/assets/car3.jfif"];
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
        line.className = line.className.replace(" active", "");
        if (index === currentIndex) {
            line.className += " active";
        }
    });
}

document.getElementById("reviewForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const reviewText = document.getElementById("review").value;
    
    const reviewList = document.querySelector(".review-list");
    const newReview = document.createElement("div");
    newReview.classList.add("review");
    newReview.innerHTML = `<p><strong>${name}:</strong> ${reviewText}</p>`;
    
    reviewList.appendChild(newReview);
    
    // Clear the form
    document.getElementById("reviewForm").reset();
});

// Initialize the first line as active
updateLines();
