
const navLinks = document.querySelectorAll(".nav__link");
const movingSelector = document.querySelector(".hori-selector");
const navbar = document.querySelector(".nav__items");

const moveSelector = (target) => {
  let rect = target.getBoundingClientRect();
  let navbarRect = navbar.getBoundingClientRect();

  let left = rect.left - navbarRect.left;
  let top = rect.top - navbarRect.top;
  let height = rect.height;
  let width = rect.width;

  movingSelector.style.top = `${top}px`;
  movingSelector.style.left = `${left}px`;
  movingSelector.style.height = `${height}px`;
  movingSelector.style.width = `${width}px`;

};

const horiLink = ()=> navLinks.forEach((navLink) => {

  // if (navLink.classList.contains('active')){
  //   console.log(navLink)
  //   moveSelector(navLink)
  //   window.location  = navLink.children[0].href
  // }
  navLink.addEventListener("click", (e) => {
    e.preventDefault();
    let target = e.currentTarget;
    

    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
    
    target.classList.add("active");
    moveSelector(target);
    e.preventDefault()
  });
});

horiLink()
// window.addEventListener("DOMContentLoaded", () => {
//   const activeLink = document.querySelector(".nav__link.active");
//   if (activeLink) {
//     moveSelector(activeLink);
//   }
// });

const arrows = document.querySelectorAll(".questionArrow");

const removeEvent = ()=>{

    arrows.forEach((item) => {
        if (item.parentNode.nextElementSibling.style.display === "block"){
            item.src = "static/images/assets/arrow-down-light.png";
            item.parentNode.nextElementSibling.style.height = "0";
            setTimeout(() => {
                item.parentNode.nextElementSibling.style.display = "none";
            }, 700);
        }
    });
};

arrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
        let target = e.target;
        let detailParagraph = target.parentNode.nextElementSibling;        
        if (detailParagraph.style.display === "block") {
            target.src = "static/images/assets/arrow-down-light.png ";
            detailParagraph.style.height = "0";
            setTimeout(() => {
                detailParagraph.style.display = "none";
            }, 700); // Match this with the CSS transition duration
        } else {
            removeEvent();
            target.src = "static/images/assets/arrow-up-light.png";
            detailParagraph.style.display = "block";
            detailParagraph.style.height = detailParagraph.scrollHeight + "px";
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
  let orderCompleted = document.querySelector('#order');
  let customerReview = document.querySelector('#review');
  let vehicle = document.querySelector('#vehicle');
  let carExperience = document.querySelector('#experience');

  // Initialize counters to 0 initially
  orderCompleted.innerHTML = 0;
  customerReview.innerHTML = 0;
  vehicle.innerHTML = 0;
  carExperience.innerHTML = 0;

  // Target values
  let orderCompletedTarget = 7487;
  let customerReviewTarget = 5844;
  let vehicleTarget = 246;
  let carExperienceTarget = 15;

  // Total duration in milliseconds
  let delay = 500; 
  let duration = 2000; 
  let intervalTime = 140;

  // Function to start counters after a brief delay
  setTimeout(() => {
    // Calculate the number of steps for each target value to finish within the duration
    let steps = duration / intervalTime;

    // Calculate increments for each counter
    let orderCompletedIncrement = orderCompletedTarget / steps;
    let customerReviewIncrement = customerReviewTarget / steps;
    let vehicleIncrement = vehicleTarget / steps;
    
    let orderCompletedCurrent = 0;
    let customerReviewCurrent = 0;
    let vehicleCurrent = 0;
    let carExperienceCurrent = 0;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;

      // Update each counter
      orderCompletedCurrent = Math.min(orderCompletedTarget, Math.round(orderCompletedCurrent + orderCompletedIncrement));
      customerReviewCurrent = Math.min(customerReviewTarget, Math.round(customerReviewCurrent + customerReviewIncrement));
      vehicleCurrent = Math.min(vehicleTarget, Math.round(vehicleCurrent + vehicleIncrement));
      
      if (carExperienceCurrent < carExperienceTarget) {
        carExperienceCurrent++;
      }

      orderCompleted.innerHTML = Math.round(orderCompletedCurrent);
      customerReview.innerHTML = Math.round(customerReviewCurrent);
      vehicle.innerHTML = Math.round(vehicleCurrent);
      carExperience.innerHTML = carExperienceCurrent;

      // Check if all counters have reached their targets
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);
  }, delay);
});

