function changeImage(src, clickedLine) {
    // Change the main image
    document.getElementById('mainImage').src = src;
    
    // Remove 'active' class from all lines
    var lines = document.querySelectorAll('.lines .line');
    lines.forEach(function(line) {
        line.classList.remove('active');
    });
    
    // Add 'active' class to the clicked line
    clickedLine.classList.add('active');
}
const testimonials = [
    {
      name: "Eva Sawyer",
      job: "CEO, Fashworks",
      image: "person__2.jpg",
      testimonial:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati, tempore!",
    },
    {
      name: "Katey Topaz",
      job: "Developer, TechCrew",
      image: "person__1.jpg",
      testimonial:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati, tempore!",
    },
    {
      name: "Jae Robin",
      job: "UI Designer, Affinity Agency",
      image: "person__3.jpg",
      testimonial:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati, tempore!",
    },
    {
      name: "Nicola Blakely",
      job: "CEO,Zeal Wheels",
      image: "person__4.jpg",
      testimonial:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati, tempore!",
    },
    ];
  
  let currentIndex = 0;
  const testimonialContainer = document.getElementById("testimonial-container");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  
  const createTestimonialHTML = (testimonial) => {
    return `
      <div class="testimonial">
        <p>${testimonial.testimonial}</p>
        <img src=${testimonial.image} alt="${testimonial.name}">
        <h3>${testimonial.name}</h3>
        <h6>${testimonial.job}</h6>
      </div>
    `;
  };
  
  const updateTestimonials = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  
    testimonialContainer.innerHTML = `
      ${createTestimonialHTML(testimonials[prevIndex])}
      ${createTestimonialHTML(testimonials[currentIndex])}
      ${createTestimonialHTML(testimonials[nextIndex])}
    `;
    
    testimonialContainer.style.transform = 'translateX(-100%)';
  };
  
  const slideNext = () => {
    testimonialContainer.style.transition = 'transform 0.5s ease-in-out';
    testimonialContainer.style.transform = 'translateX(-200%)';
  
    testimonialContainer.addEventListener('transitionend', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateTestimonials();
      testimonialContainer.style.transition = 'none';
      testimonialContainer.style.transform = 'translateX(-100%)';
    }, { once: true });
  };
  
  const slidePrev = () => {
    testimonialContainer.style.transition = 'transform 0.5s ease-in-out';
    testimonialContainer.style.transform = 'translateX(0)';
  
    testimonialContainer.addEventListener('transitionend', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonials();
      testimonialContainer.style.transition = 'none';
      testimonialContainer.style.transform = 'translateX(-100%)';
    }, { once: true });
  };
  
  nextBtn.addEventListener("click", slideNext);
  prevBtn.addEventListener("click", slidePrev);
  
  updateTestimonials();
  testimonialContainer.style.transform = 'translateX(-100%)';
  testimonialContainer.style.transition = 'none';
  