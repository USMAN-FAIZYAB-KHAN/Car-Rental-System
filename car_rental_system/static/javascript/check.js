document.querySelector('form').addEventListener('submit', function(event) {
    if (!this.checkValidity()) {
      event.preventDefault(); // Prevent form submission
      alert('Please fill out all required fields.');
    }
  });


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

