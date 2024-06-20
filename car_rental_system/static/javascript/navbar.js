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

  setTimeout(() => {
    window.location = target.children[0].href;
  }, 300);


};

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (e) => {
    e.preventDefault();
    let target = e.currentTarget;

    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    target.classList.add("active");
    moveSelector(target);
  });
});


