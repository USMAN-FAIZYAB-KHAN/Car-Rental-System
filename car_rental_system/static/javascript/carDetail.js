
const car_image_set = document.querySelectorAll(".car__thumnail__image");

car_image_set.forEach(link => {  
    link.addEventListener("click", (e) => {
        let src_target = e.target.src;
        let mainImage = document.getElementById("mainImage");

        mainImage.classList.remove("slide-in"); 

        setTimeout(() => {
            mainImage.src = src_target;
            mainImage.classList.add("slide-in"); 
        }, 10);
    });
});

const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", () => {
    document.querySelector(".payment-form").style.display = "none";
});