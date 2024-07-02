let currentIndex = 0;
const images = [
    "../static/images/assets/car1.jfif",
    "../static/images/assets/car2.jfif",
    "../static/images/assets/car3.jfif"
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


changeImage(images[0], 0);

document.querySelector('.thumbnails').addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG') {
        const index = Array.from(this.children).indexOf(event.target);
        currentImage(index);
    }
});

document.getElementById("reviewForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const reviewText = document.getElementById("review").value;
    const rating = document.getElementById("rating").value;
    
    const reviewList = document.querySelector(".review-list");
    const newReview = document.createElement("div");
    newReview.classList.add("review");
    
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '★' : '☆';
    }
    
    newReview.innerHTML = `<p><strong>${name}:</strong> ${reviewText}</p><div class="rating">${stars}</div>`;
    
    reviewList.appendChild(newReview);
    
  
    document.getElementById("reviewForm").reset();
    
    
    showReview(reviewList.children.length - 1);
});

let reviewIndex = 0;
const reviews = document.querySelectorAll('.review');

function showReview(n) {
    reviews.forEach(review => review.classList.remove('active'));
    
    reviewIndex = n;
    
    if (reviewIndex >= reviews.length) {
        reviewIndex = 0;
    } else if (reviewIndex < 0) {
        reviewIndex = reviews.length - 1;
    }
    
    reviews[reviewIndex].classList.add('active');
}



document.addEventListener('DOMContentLoaded', function() {
    const reviews = document.querySelectorAll('.review');
    let currentIndex = 0;
    const totalReviews = reviews.length;

    function showNextReview() {
        
        reviews[currentIndex].style.transform = 'translateY(100%)';
        
        currentIndex = (currentIndex + 1) % totalReviews;
        
        reviews[currentIndex].style.transform = 'translateY(0)';
    }

    // Automatically switch reviews every 3 seconds (adjust interval as needed)
    setInterval(showNextReview, 3000);
});

var swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 1500, 
        disableOnInteraction: false, 
    },
});
