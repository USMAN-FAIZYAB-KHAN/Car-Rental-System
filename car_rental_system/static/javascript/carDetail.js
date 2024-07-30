function getCSRFToken() {    // Generate CSRF token 
  return document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
}
const csrftoken = getCSRFToken();

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

  if (type === 'Success') {
    toast_notification.querySelector('.toast__link i').classList.remove('fa-xmark');
    toast_notification.querySelector('.toast__link i').classList.add('fa-check');
  } else {
    toast_notification.querySelector('.toast__link i').classList.remove('fa-check');
    toast_notification.querySelector('.toast__link i').classList.add('fa-xmark');
  }
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

var pickDate;
var dropDate;
var number;
var address;

checkButton.addEventListener("click", (e) => {
  e.preventDefault();

  pickDate = document.querySelector("#pickdate").value;
  dropDate = document.querySelector("#dropdate").value;
  number = document.querySelector("#number").value;
  address = document.querySelector("#address").value;

  // Check if booking date is always less than pickup date
  if (new Date(dropDate) <= new Date(pickDate)) {
    showToast("Drop date must be later than pick date", "Error");
    return;
  }

  else if (new Date(pickDate) <= new Date()) {
    showToast("Pick date must be later than today", "Error");
    return;
  }

  if (pickDate === "" || dropDate === "" || number === "" || address === "") {
    showToast("Fill out all the input fields", "Error");
  }

  else if (number.length !== 10 || isNaN(number)) {
    showToast("Phone number must be 10 digits.", "Error");
  }

  else {
    // Clear the input fields
    if (payment) {
      document.querySelector("#pickdate").value = "";
      document.querySelector("#dropdate").value = "";
      document.querySelector("#number").value = "";
      document.querySelector("#address").value = "";

      // Get car id from the url
      const url = window.location.href;
      const regex = /\/carDetail\/(\d+)\//;
      const match = url.match(regex);
      const car_id = match[1];

      fetch(`/carDetail/${car_id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({ 'booking': true, 'pickDate': pickDate, 'dropDate': dropDate })
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            showToast(data.error, "Error");
          } else if (data.success) {
            payment.style.display = "flex"; // Use "flex" to match your CSS
            display_order_detail(pickDate, dropDate);
          }
        })
        .catch(error => {
          showToast("An error occurred while booking the car.", "Error");
        });


    }
  }
});

const display_order_detail = (pickdate, dropdate) => {
  let payment_detail = document.querySelector(".order__detail");
  let mainImage = document.getElementById("mainImage").src;
  let rate = document.querySelector("#daily_rate").innerHTML.slice(0, 4);
  let days = Math.ceil((new Date(dropdate) - new Date(pickdate)) / (1000 * 60 * 60 * 24));

  payment_detail.innerHTML = `
    <div class="order__img">
      <img src="${mainImage}" alt="Book Car Image">
    </div>
    <div class="order__info">
      <p style="font-weight: 500; color: #1ECB15;">Daily Price</p>
      <p style="color:#121212;">Rs. ${rate}</p>
    </div>
    <input type="text" name="" id="" value="Pickup Date: ${pickdate}" readonly>
    <input type="text" name="" id="" value="Drop Date: ${dropdate}" readonly>
    <input type="text" name="" id="" value="Days: ${days}" readonly>
    <input type="text" name="" id="" value="Total Cost: ${days * rate} Rs" readonly>

  `;
};

const payNowButton = document.querySelector(".account__btn");
payNowButton.addEventListener("click", (e) => {
  e.preventDefault();

  const cardNumber = document.querySelector("#card-number").value;
  const expiryDate = document.querySelector("#expiry-date").value;
  const cvv = document.querySelector("#cvv").value;
  const cardHolder = document.querySelector("#card-holder").value;

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
  } else if (cardHolder === "") {
    showToast("Cardholder name is required", "Error");
  } else {

    submitPayment(selectedPaymentMethod, cardNumber, expiryDate, cvv, cardHolder, pickDate, dropDate, number, address);
  }


});

const submitPayment = (paymentMethod, cardNumber, expiryDate, cvv, cardHolder, pickDate, dropDate, phoneNo, address) => {
  const data = {
    "payment": true,
    paymentMethod,
    cardNumber,
    expiryDate,
    cvv,
    cardHolder,
    pickDate,
    dropDate,
    phoneNo,
    address
  };


  // Get car id from the url
  const url = window.location.href;
  const regex = /\/carDetail\/(\d+)\//;
  const match = url.match(regex);
  const car_id = match[1];

  fetch(`/carDetail/${car_id}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken
    },
    body: JSON.stringify(data)
  })
    .then(
      response => response.json()
    ).then(data => {
      if (data.error) {
        showToast(data.error, "Error");
      } else if (data.success) {
        payment.style.display = "none";
        showToast(data.success, "Success");
        setTimeout(() => {
          window.location.href = "/userDashboard";
        }, 3000);
      }
    })
    .catch(error => {
      showToast("An error occurred while processing your payment.", "Error");
      console.error("Error:", error);
    });
}

