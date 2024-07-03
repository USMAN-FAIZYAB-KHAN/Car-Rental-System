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

function countUp(counter, targetNumber, duration) {
  let startNumber = 0;
  const increment = targetNumber / (duration / 10);

  function updateCounter() {
      startNumber += increment;
      if (startNumber < targetNumber) {
          counter.innerText = Math.ceil(startNumber);
          setTimeout(updateCounter, 10);
      } else {
          counter.innerText = targetNumber;
      }
  }

  updateCounter();
}

const counters = document.getElementsByClassName("number");
for (let i = 0; i < counters.length; i++) {
  const targetNumber = counters[i].innerText;
  countUp(counters[i], targetNumber, 2000);
}


//--------------------------------------vehicle__fleet------------------------------------------------


// const vehicle___fleets = [
//   {
//     car_name: "Jeep Renegade",
//     car_type: "Sedan",
//     car_image: "../static/images/assets/lexus.jpg",
//     car_seats: "4",
//     car_idk: "2",
//     car_doors: "4",
//     car_price: "$6183",
//   },
//   {
//     car_name: "Ford Mustang",
//     car_type: "Sports Car",
//     car_image: "../static/images/assets/lexus.jpg",
//     car_seats: "2",
//     car_idk: "3",
//     car_doors: "2",
//     car_price: "$7500",
//   },
//   {
//     car_name: "Toyota Camry",
//     car_type: "Sedan",
//     car_image: "../static/images/assets/lexus.jpg",
//     car_seats: "5",
//     car_idk: "2",
//     car_doors: "4",
//     car_price: "$4500",
//   },
//   {
//     car_name: "Honda CR-V",
//     car_type: "SUV",
//     car_image: "../static/images/assets/lexus.jpg",
//     car_seats: "5",
//     car_idk: "4",
//     car_doors: "4",
//     car_price: "$5500",
//   },
// ];

// let currentIndex = 0;
// const vehicle___fleetContainer = document.getElementById("vehicle___fleet-container");
// const nextBtn = document.getElementById("next");
// const prevBtn = document.getElementById("prev");

// const createvehicle___fleetHTML = (vehicle___fleet) => {
//   return `
//     <div class="vehicle___fleet">
//       <img class="car__image" src="${vehicle___fleet.car_image}" alt="${vehicle___fleet.car_name}">
//       <span class="car__name">${vehicle___fleet.car_name}</span>
//       <div class="car__det" style="display: flex;top: 14px;position: relative;left: 17px;">
//         <span class="svg__img"><img src="../static/images/assets/1-green.svg" alt="" /><p>${vehicle___fleet.car_seats}</p></span>
//         <span class="svg__img"><img src="../static/images/assets/2-green.svg" alt="" /><p>${vehicle___fleet.car_idk}</p></span>
//         <span class="svg__img"><img src="../static/images/assets/3-green.svg" alt="" /><p>${vehicle___fleet.car_doors}</p></span>
//         <span class="svg__img"><img src="../static/images/assets/4-green.svg" alt="" /><p>${vehicle___fleet.car_type}</p></span>
//       </div>
//       <span class="rating_stars">
//         <i class="fa-solid fa-star"></i>
//         <i class="fa-solid fa-star"></i>
//         <i class="fa-solid fa-star"></i>
//         <i class="fa-solid fa-star"></i>
//       </span>  
//       <p style="font-size: 15px;
//     height: auto;
//     position: relative;
//     width: 145px;
//     top: 4px;">Daily Rate From</p>
//       <h4>${vehicle___fleet.car_price}</h4>  
//       <button class="slider__btn">
//         <span class="top"></span>
//         <a href="" class="primary__btn">Rent Now</a>
//         <span class="bottom"></span>
//       </button>
//     </div>
//   `;
// };

// const updatevehicle___fleets = () => {
//   vehicle___fleetContainer.innerHTML = '';

//   for (let i = currentIndex; i < currentIndex + vehicle___fleets.length; i++) {
//     const index = i % vehicle___fleets.length;
//     vehicle___fleetContainer.innerHTML += createvehicle___fleetHTML(vehicle___fleets[index]);
//   }
// };


// const slideNext = () => {
//   currentIndex = (currentIndex + 1) % vehicle___fleets.length;
//   updatevehicle___fleets();
// };

// const slidePrev = () => {
//   currentIndex = (currentIndex - 1 + vehicle___fleets.length) % vehicle___fleets.length;
//   updatevehicle___fleets();
// };


// nextBtn.addEventListener("click", slideNext);
// prevBtn.addEventListener("click", slidePrev);

// updatevehicle___fleets();

// const vehicle___fleets = [
//   {
//     car_name: "Jeep Renegade",
//     car_type: "Sedan",
//     car_image: "../static/images/assets/lexus.jpg",
//     car_seats: "4",
//     car_idk: "2",
//     car_doors: "4",
//     car_price: "$6183",
//   },
//   {
//     car_name: "Ford Mustang",
//     car_type: "Sports Car",
//     car_image: "../static/images/assets/lexus.jpg",
//     car_seats: "2",
//     car_idk: "3",
//     car_doors: "2",
//     car_price: "$7500",
//   },
//   {
//     car_name: "Toyota Camry",
//     car_type: "Sedan",
//     car_image: "../static/images/assets/lexus.jpg",
//     car_seats: "5",
//     car_idk: "2",
//     car_doors: "4",
//     car_price: "$4500",
//   },
//   {
//     car_name: "Honda CR-V",
//     car_type: "SUV",
//     car_image: "../static/images/assets/lexus.jpg",
//     car_seats: "5",
//     car_idk: "4",
//     car_doors: "4",
//     car_price: "$5500",
//   },
//   {
//     car_name: "Chevrolet Malibu",
//     car_type: "Sedan",
//     car_image: "../static/images/assets/lexus.jpg",
//     car_seats: "5",
//     car_idk: "2",
//     car_doors: "4",
//     car_price: "$4600",
//   },
//   {
//     car_name: "BMW X5",
//     car_type: "SUV",
//     car_image: "../static/images/assets/lexus.jpg",
//     car_seats: "5",
//     car_idk: "4",
//     car_doors: "4",
//     car_price: "$7000",
//   },
// ];

let currentIndex = 0;
// const vehicle___fleetContainer = document.querySelector(".vehicle___fleet-container");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

// const createVehicleFleetHTML = (vehicle___fleet) => {
//   return `
//     <div class="vehicle___fleet">
//       <img class="car__image" src="${vehicle___fleet.car_image}" alt="${vehicle___fleet.car_name}">
//       <span class="car__name">${vehicle___fleet.car_name}</span>
//       <div class="car__det">
//         <span class="svg__img"><img src="../static/images/assets/1-green.svg" alt="" /><p>${vehicle___fleet.car_seats}</p></span>
//         <span class="svg__img"><img src="../static/images/assets/2-green.svg" alt="" /><p>${vehicle___fleet.car_idk}</p></span>
//         <span class="svg__img"><img src="../static/images/assets/3-green.svg" alt="" /><p>${vehicle___fleet.car_doors}</p></span>
//         <span class="svg__img"><img src="../static/images/assets/4-green.svg" alt="" /><p>${vehicle___fleet.car_type}</p></span>
//       </div>
//       <span class="rating_stars">
//         <i class="fa-solid fa-star"></i>
//         <i class="fa-solid fa-star"></i>
//         <i class="fa-solid fa-star"></i>
//         <i class="fa-solid fa-star"></i>
//       </span>  
//       <p style="font-size: 15px; height: auto; position: relative; width: 145px; top: 4px;">Daily Rate From</p>
//       <h4>${vehicle___fleet.car_price}</h4>  
//       <button class="slider__btn">
//         <span class="top"></span>
//         <a href="" class="primary__btn">Rent Now</a>
//         <span class="bottom"></span>
//       </button>
//     </div>
//   `;
// };

// const updateVehicleFleets = () => {
//   vehicle___fleetContainer.innerHTML = '';
//   vehicle___fleets.forEach(vehicle => {
//     vehicle___fleetContainer.innerHTML += createVehicleFleetHTML(vehicle);
//   });
// };

const slideNext = () => {
  currentIndex = (currentIndex + 3) % vehicle___fleets.length;
  vehicle___fleetContainer.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
};

const slidePrev = () => {
  currentIndex = (currentIndex - 3 + vehicle___fleets.length) % vehicle___fleets.length;
  vehicle___fleetContainer.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
};

nextBtn.addEventListener("click", slideNext);
prevBtn.addEventListener("click", slidePrev);

updateVehicleFleets();




//____________________________________ANIMATION_______________________________________________//


const observerDown = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      if (entry.isIntersecting) {
          entry.target.classList.add('show-down');
      } else {
          entry.target.classList.remove('show-down');
      }
  });
});

const observerLeft = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      if (entry.isIntersecting) {
          setTimeout(() => {
              entry.target.classList.add('show');
          }, 500); // Delay for left elements
      } else {
          entry.target.classList.remove('show');
      }
  });
});

const observerRight = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      if (entry.isIntersecting) {
          setTimeout(() => {
              entry.target.classList.add('show');
          }, 700); // Delay for right elements
      } else {
          entry.target.classList.remove('show');
      }
  });
});

const hiddenElementsDown = document.querySelectorAll('.hidden-down');
hiddenElementsDown.forEach((el) => observerDown.observe(el));

const hiddenElementsLeft = document.querySelectorAll('.hidden-left');
hiddenElementsLeft.forEach((el) => observerLeft.observe(el));

const hiddenElementsRight = document.querySelectorAll('.hidden-right');
hiddenElementsRight.forEach((el) => observerRight.observe(el));
