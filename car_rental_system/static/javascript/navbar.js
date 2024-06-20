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
<<<<<<< HEAD


=======
>>>>>>> 7951faaa05637f19d0734570cc3fa97e21137b5e
