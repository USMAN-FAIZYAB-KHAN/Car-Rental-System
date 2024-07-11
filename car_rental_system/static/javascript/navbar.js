function getCSRFToken() {    // Generate CSRF token 
  return document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
}

const csrftoken = getCSRFToken();


//----------------------------------------- Nav Bar Hori Selector--------------------------------------//
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
};

document.addEventListener('DOMContentLoaded',()=>{
  navLinks.forEach((navLink) => {
    if (navLink.classList.contains('active')) {
      setTimeout(() => {
        moveSelector(navLink);
      }, 500); 
    }
  });
});

//----------------------------------------- Scroll Up Button --------------------------------------//
let scrollHome = document.querySelector(".scroll-up");
const scroll = () => {
  let windowHeight = window.innerHeight;
  if (window.scrollY >= windowHeight) { // Show button when scrolled down the height of one page
    scrollHome.classList.add('show');
  } else {
    scrollHome.classList.remove('show');
  }
};

window.addEventListener('scroll', scroll);
scrollHome.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});



//-----------------------------------------ANIMATION--------------------------------------//
const hiddenElements3 = document.querySelectorAll('.hidden-up')
const observer = new IntersectionObserver((entries)=> {
  entries.forEach((entry) => {
      if (entry.isIntersecting){
          entry.target.classList.add('show')       
      }else {
          entry.target.classList.remove('show')
      }
  })
})
hiddenElements3.forEach((el) => observer.observe(el))