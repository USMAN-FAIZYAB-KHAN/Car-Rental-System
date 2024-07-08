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



// const toast_notification = document.querySelector("#toast_notification");

// document.addEventListener("DOMContentLoaded", () => {
//   setTimeout(() => {
//     toast_notification.classList.add("toastanimate");

//     // Remove the class after the ::after animation completes (assuming 2s animation and 1.5s delay)
//     setTimeout(() => {
//       toast_notification.classList.remove("toastanimate");
//       toast_notification.classList.add("toastanimateout");
//     }, 3000); // 3500ms = 1.5s delay + 2s animation
//   }, 10);
// });

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



const observer = new IntersectionObserver((entries)=> {
  entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting){
          entry.target.classList.add('show')       
      }else {
          entry.target.classList.remove('show')
      }
  })
})



const hiddenElements3 = document.querySelectorAll('.hidden-up')
hiddenElements3.forEach((el) => observer.observe(el))