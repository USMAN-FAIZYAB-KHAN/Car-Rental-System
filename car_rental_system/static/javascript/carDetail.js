
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

// <------------------------------ Thoast Notification ------------------------------>

// showToast Function ( Display Different Thoast according to the input field )
const payment_cross = document.querySelector('#payment-cross');
const toast_notification = document.querySelector("#toast_notification");
const checkButton = document.querySelector("#btn");
const payment = document.querySelector(".main-payment");


payment_cross.addEventListener('click', () => {
    payment.style.display = "none";
});

const showToast = (message, type, shouldShowPayment) => {
    if (shouldShowPayment && payment) {
        payment.style.display = "flex"; // Use "flex" to match your CSS
        return
    }

    let border = document.querySelector("#toast-border");
    border.classList.remove("toastBoderAnimation");

    toast_notification.classList.remove("toastanimate", "toastanimateout");
    void toast_notification.offsetWidth;

    border.classList.add("toastBoderAnimation");
    toast_notification.classList.add("toastanimate");

    // Update the toast message and icon
    toast_notification.querySelector('.toast__message h4').innerText = type;
    toast_notification.querySelector('.toast__message p').innerText = message;

    toast_notification.querySelector('.toast__link i').classList.remove('fa-check');
    toast_notification.querySelector('.toast__link i').classList.add('fa-xmark');

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

// Email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@gmail\.com$/;
  return emailRegex.test(email);
};

checkButton.addEventListener("click", (e) => {
    e.preventDefault();
    let pickDate = document.querySelector("#pickdate").value;
    let dropDate = document.querySelector("#dropdate").value;
    let number = document.querySelector("#number").value;
    let address = document.querySelector("#address").value;

    if (pickDate === "" || dropDate === "" || number === "" || address === "") {
      showToast("Fill out all the input fields", "Error", false);
    } else if (number.length !== 10 || typeof number === 'number') {
      showToast("Phone number must be 10 digits.", "Error", false);
    } else {
      // Clear the input fields
      document.querySelector("#pickdate").value = "";
      document.querySelector("#dropdate").value = "";
      document.querySelector("#number").value = "";
      document.querySelector("#address").value = "";
      showToast("Your booking was successful.", "Success", true);
    }
});


