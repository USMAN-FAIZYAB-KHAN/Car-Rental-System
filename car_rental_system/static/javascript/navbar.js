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

  // setTimeout(()=>{
    movingSelector.style.top = `${top}px`;
    movingSelector.style.left = `${left}px`;
    movingSelector.style.height = `${height}px`;
    movingSelector.style.width = `${width}px`;

  // },300)
};

document.addEventListener('DOMContentLoaded',()=>{
  navLinks.forEach((navLink) => {
    if (navLink.classList.contains('active')) {
      moveSelector(navLink);
    }
  });
});



const toast_notification = document.querySelector("#toast_notification");
console.log("onj")
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    toast_notification.classList.add("toastanimate");

    // Remove the class after the ::after animation completes (assuming 2s animation and 1.5s delay)
    setTimeout(() => {
      toast_notification.classList.remove("toastanimate");
      toast_notification.classList.add("toastanimateout");
    }, 3000); // 3500ms = 1.5s delay + 2s animation
  }, 10);
});
