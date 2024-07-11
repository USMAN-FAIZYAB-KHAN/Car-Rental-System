
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


//-------------------------------------- Make Counter For Organization Detail ------------------------------------------------//
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


//-------------------------------------- Vehicle Fleet ------------------------------------------------//
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

const slideNext = () => {
  currentIndex = (currentIndex + 3) % 9;
  vehicle_fleet_Container.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
};

const slidePrev = () => {
  currentIndex = (currentIndex - 3 +9) % 9;
  vehicle_fleet_Container.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
};

nextBtn.addEventListener("click", slideNext);
prevBtn.addEventListener("click", slidePrev);

//-------------------------------------- Animation ------------------------------------------------//
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



// <------------------------------ Thoast Notification ------------------------------>

// showToast Function ( Display Different Thoast according to the input field )

const toast_notification = document.querySelector("#toast_notification");   //   thoastNotification Container

const showToast = (message, type) => {
  let border = document.querySelector("#toast-border");
  border.classList.remove("toastBoderAnimation");

  toast_notification.classList.remove("toastanimate", "toastanimateout");
  void toast_notification.offsetWidth;

  border.classList.add("toastBoderAnimation");

  toast_notification.classList.add("toastanimate");

  // Update the toast message and icon
  toast_notification.querySelector('.toast__message h4').innerText = type;
  toast_notification.querySelector('.toast__message p').innerText = message;

  
    toast_notification.querySelector('.toast__link i').classList.remove('fa-xmark');
    toast_notification.querySelector('.toast__link i').classList.add('fa-check');
  
  toast_notification.classList.add('show');

  setTimeout(() => {
    toast_notification.classList.remove("toastanimate");
    toast_notification.classList.add("toastanimateout");
    setTimeout(() => {
      toast_notification.classList.remove("toastanimateout");
      toast_notification.classList.remove('show');
    }, 300);
  }, 2300);
};


const checklogout = ()=>{
  check = sessionStorage.getItem("logout");
  if (check === "true"){
    showToast("You have been logged out", "Success")
    sessionStorage.removeItem("logout");
  }
};
checklogout();