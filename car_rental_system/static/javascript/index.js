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


const vehicle_fleets = [
  {
    car_name: "Jeep Renegade",
    car_type: "Sedan",
    car_image: "../static/images/assets/lexus.jpg",
    car_seats: "4",
    car_idk: "2",
    car_doors: "4",
    car_price: "$6183",
  },
  {
    car_name: "Ford Mustang",
    car_type: "Sports Car",
    car_image: "../static/images/assets/lexus.jpg",
    car_seats: "2",
    car_idk: "3",
    car_doors: "2",
    car_price: "$7500",
  },
  {
    car_name: "Toyota Camry",
    car_type: "Sedan",
    car_image: "../static/images/assets/lexus.jpg",
    car_seats: "5",
    car_idk: "2",
    car_doors: "4",
    car_price: "$4500",
  },
  {
    car_name: "Honda CR-V",
    car_type: "SUV",
    car_image: "../static/images/assets/lexus.jpg",
    car_seats: "5",
    car_idk: "4",
    car_doors: "4",
    car_price: "$5500",
  },
  {
    car_name: "Chevrolet Malibu",
    car_type: "Sedan",
    car_image: "../static/images/assets/lexus.jpg",
    car_seats: "5",
    car_idk: "2",
    car_doors: "4",
    car_price: "$4600",
  },
  {
    car_name: "BMW X5",
    car_type: "SUV",
    car_image: "../static/images/assets/lexus.jpg",
    car_seats: "5",
    car_idk: "4",
    car_doors: "4",
    car_price: "$7000",
  },
];

let currentIndex = 0;
const vehicle_fleet_Container = document.querySelector(".main__fleet__box");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

// const createVehicleFleetHTML = (vehicle) => {
//   return `
    
//   `;
// };

// const updateVehicleFleets = () => {
//   vehicle_fleet_Container.innerHTML = '';
//   vehicle_fleets.forEach(vehicle => {
//     vehicle_fleet_Container.innerHTML += createVehicleFleetHTML(vehicle);
//   });
// };

const slideNext = () => {
  currentIndex = (currentIndex + 3) % vehicle_fleets.length;
  vehicle_fleet_Container.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
};

const slidePrev = () => {
  currentIndex = (currentIndex - 3 + vehicle_fleets.length) % vehicle_fleets.length;
  vehicle_fleet_Container.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
};

nextBtn.addEventListener("click", slideNext);
prevBtn.addEventListener("click", slidePrev);

updateVehicleFleets();




























//____________________________________ANIMATION_______________________________________________//


// const observerDown = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//           entry.target.classList.add('show-down');
//       } else {
//           entry.target.classList.remove('show-down');
//       }
//   });
// });

// const observerLeft = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//           setTimeout(() => {
//               entry.target.classList.add('show');
//           }, 500); // Delay for left elements
//       } else {
//           entry.target.classList.remove('show');
//       }
//   });
// });

// const observerRight = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//           setTimeout(() => {
//               entry.target.classList.add('show');
//           }, 700); // Delay for right elements
//       } else {
//           entry.target.classList.remove('show');
//       }
//   });
// });

// const hiddenElementsDown = document.querySelectorAll('.hidden-down');
// hiddenElementsDown.forEach((el) => observerDown.observe(el));

// const hiddenElementsLeft = document.querySelectorAll('.hidden-left');
// hiddenElementsLeft.forEach((el) => observerLeft.observe(el));

// const hiddenElementsRight = document.querySelectorAll('.hidden-right');
// hiddenElementsRight.forEach((el) => observerRight.observe(el));
