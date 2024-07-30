function getCSRFToken() {    // Generate CSRF token 
  return document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
}

const csrftoken = getCSRFToken();
const input = document.querySelector("#hidden-input");
const review_cross = document.querySelector("#review-cross");
const review = document.querySelector(".main-review");
const checkButton = document.querySelectorAll(".button");
const ratingStars = document.querySelectorAll(".rating_star i");
const submitButton = document.querySelector(
  ".review-container button[type='submit']"
);
let selectedRating = 0; // Variable to store the selected rating
const toast_notification = document.querySelector("#toast_notification"); // Assuming you have a toast element

review_cross.addEventListener("click", () => {
  review.style.display = "none";
});

// Add event listeners to the rating stars
ratingStars.forEach((star, index) => {
  star.addEventListener("click", () => {
    selectedRating = index + 1; // Update the selected rating
    input.value = selectedRating; // Update the hidden input value
    updateStarStyles(); // Update the styles of the stars
  });
});

const updateStarStyles = () => {
  ratingStars.forEach((star, index) => {
    if (index < selectedRating) {
      star.classList.remove("fa-regular");
      star.classList.add("fa-solid");
    } else {
      star.classList.remove("fa-solid");
      star.classList.add("fa-regular");
    }
  });
};

const showToast = (message, type) => {
  let border = document.querySelector("#toast-border");
  border.classList.remove("toastBoderAnimation");

  toast_notification.classList.remove("toastanimate", "toastanimateout");
  void toast_notification.offsetWidth;

  border.classList.add("toastBoderAnimation");

  toast_notification.classList.add("toastanimate");

  // Update the toast message and icon
  toast_notification.querySelector(".toast__message h4").innerText = type;
  toast_notification.querySelector(".toast__message p").innerText = message;

  if (type === "Success") {
    toast_notification
      .querySelector(".toast__link i")
      .classList.remove("fa-xmark");
    toast_notification
      .querySelector(".toast__link i")
      .classList.add("fa-check");
  } else {
    toast_notification
      .querySelector(".toast__link i")
      .classList.remove("fa-check");
    toast_notification
      .querySelector(".toast__link i")
      .classList.add("fa-xmark");
  }
  toast_notification.classList.add("show");

  setTimeout(() => {
    toast_notification.classList.remove("toastanimate");
    toast_notification.classList.add("toastanimateout");
    setTimeout(() => {
      toast_notification.classList.remove("toastanimateout");
      toast_notification.classList.remove("show");
    }, 300);
  }, 2300);
};

const check_input = (e) => {
  e.preventDefault(); // Prevent form submission for demo purposes
  const message = document.querySelector("#message").value.trim();
  if (selectedRating === 0) {
    showToast("Please select a rating", "Error");
  } else if (message === "") {
    showToast("Fill out the input fields", "Error");
  } else {
    const data = {
      rating: selectedRating,
      message: message,
      rental_id: sessionStorage.getItem("rental_id"),
    };

    fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          review.style.display = "none";
          showToast("Review submitted successfully", "Success");
          document.querySelector("#message").value = ""; // Clear the message input
          selectedRating = 0; // Reset the rating
          input.value = ""; // Clear the hidden input value
          sessionStorage.removeItem("rental_id");
          updateStarStyles(); // Update the star styles to reflect the reset rating
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((error) => {
        showToast("Your reviews was not submitted", "Error");
        console.error("Error:", error);
      });
  }
};

// Add event listener to the submit button
submitButton.addEventListener("click", check_input);

checkButton.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    review.style.display = "flex";
    let rental_id =
      e.target.parentElement.parentElement.parentElement.children[0].children[0].getAttribute(
        "data-rental-id"
      );
    sessionStorage.setItem("rental_id", rental_id);
  });
});
