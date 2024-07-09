
// <------------------------------ Crarousel Image Funtionality ------------------------------>

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
// <------------------------------ Toast Notification ------------------------------>

// showToast Function (Display Different Toast according to the input field)
const payment_cross = document.querySelector('#payment-cross');
const toast_notification = document.querySelector("#toast_notification");
const checkButton = document.querySelector("#btn");
const payment = document.querySelector(".main-payment");

const payment_method_checkouts = document.querySelectorAll("input[name='paymentMethod']");

payment_method_checkouts.forEach(paymentMethod => {
  paymentMethod.addEventListener('change', (e) => {
    // Ensure only one checkbox is selected at a time
    payment_method_checkouts.forEach(pm => {
      if (pm !== e.target) {
        pm.checked = false;
      }
    });

    // Handle the selected payment method
    if (e.target.checked) {
      const selectedMethod = e.target.value;
    }
  });
});

payment_cross.addEventListener('click', () => {
  payment.style.display = "none";
});

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

  // Check if booking date is always less than pickup date
  if (new Date(dropDate) <= new Date(pickDate)) {
    showToast("Drop date must be later than pick date", "Error");
    return;
  }

  if (pickDate === "" || dropDate === "" || number === "" || address === "") {
    showToast("Fill out all the input fields", "Error");
  } else if (number.length !== 10 || isNaN(number)) {
    showToast("Phone number must be 10 digits.", "Error");
  } else {
    // Clear the input fields
    if (payment) {
      payment.style.display = "flex"; // Use "flex" to match your CSS
      document.querySelector("#pickdate").value = "";
      document.querySelector("#dropdate").value = "";
      document.querySelector("#number").value = "";
      document.querySelector("#address").value = "";
      display_order_detail(pickDate, dropDate, number, address);
    }
  }
});

const display_order_detail = (pickdate, dropdate, number, address) => {
  let payment_detail = document.querySelector(".order__detail");
  let mainImage = document.getElementById("mainImage").src;
  let rate = document.querySelector("#daily_rate").innerHTML.slice(0, 4);
  console.log(rate);

  payment_detail.innerHTML = `
    <div class="order__img">
      <img src="${mainImage}" alt="Book Car Image">
    </div>
    <div class="order__info">
      <p style="font-weight: 500; color: #1ECB15;">Daily Price</p>
      <p style="color:#121212;">Rs. ${rate}</p>
    </div>
    <input type="text" value="Muhammad zuanin" readonly>
    <input type="date" name="" id="" value="${pickdate}" readonly>
    <input type="date" name="" id="" value="${dropdate}" readonly>
    <input type="tel" name="" id="" maxlength="13" value="+92 ${number}" readonly>
    <input type="text" name="" id="" value="${address}" readonly>
  `;
};

const payNowButton = document.querySelector(".account__btn");
payNowButton.addEventListener("click", (e) => {
  e.preventDefault();

  const cardNumber = document.querySelector("#card-number").value;
  const expiryDate = document.querySelector("#expiry-date").value;
  const cvv = document.querySelector("#cvv").value;
  const email = document.querySelector("#email").value;
  const selectedPaymentMethod = Array.from(payment_method_checkouts).some(pm => pm.checked);

  if (!selectedPaymentMethod) {
    showToast("Select a payment method", "Error");
  } else if (cardNumber === "") {
    showToast("Card number is required", "Error");
  } else if (cardNumber.length !== 16 || isNaN(cardNumber)) {
    showToast("Card number must be 16 digits", "Error");
  } else if (expiryDate === "") {
    showToast("Expiry date is required", "Error");
  } else if (cvv === "") {
    showToast("CVV is required", "Error");
  } else if (cvv.length !== 3 || isNaN(cvv)) {
    showToast("CVV must be 3 digits", "Error");
  } else if (email === "") {
    showToast("Email is required", "Error");
  } else if (!isValidEmail(email)) {
    showToast("Invalid email address", "Error");
  } else {
  }
  
});

