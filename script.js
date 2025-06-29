const textData = {
  a:'Code',
  b:'Solve',
  c:'Grow',
}
const text = textData.a;
const typingSpeed = 150;
const erasingSpeed = 100;
const delayBeforeErase = 1000;
const delayBeforeType = 500;
let i = 0;
let typing = true;

function typeLoop() {
  const element = document.getElementById("type-text");

  if (typing) {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeLoop, typingSpeed);
    } else {
      typing = false;
      setTimeout(typeLoop, delayBeforeErase);
    }
  } else {
    if (i > 0) {
      element.textContent = text.substring(0, i - 1);
      i--;
      setTimeout(typeLoop, erasingSpeed);
    } else {
      typing = true;
      setTimeout(typeLoop, delayBeforeType);
    }
  }
}

window.onload = typeLoop;
// slider testimonial

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".slider-dot");
  const prevArrow = document.querySelector(".prev");
  const nextArrow = document.querySelector(".next");
  let currentIndex = 0;

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Show the selected slide
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentIndex = index;
  }

  // Dot navigation
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-index"));
      showSlide(slideIndex);
    });
  });

  // Arrow navigation
  prevArrow.addEventListener("click", function () {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = slides.length - 1;
    }
    showSlide(newIndex);
  });

  nextArrow.addEventListener("click", function () {
    let newIndex = currentIndex + 1;
    if (newIndex >= slides.length) {
      newIndex = 0;
    }
    showSlide(newIndex);
  });

  // Auto-rotate slides every 5 seconds
  setInterval(() => {
    let newIndex = currentIndex + 1;
    if (newIndex >= slides.length) {
      newIndex = 0;
    }
    showSlide(newIndex);
  }, 5000);
});



// static header

fetch('header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header-Container').innerHTML = data;

    // Initialize behavior after load
    setupHeaderFunctions();
  });

  // phone responsive burger icon 
  function toggleMenu() {
        document.getElementById("navLinks").classList.toggle("active");
      }

      window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        navbar.classList.toggle("scrolled", window.scrollY > 50);
      });