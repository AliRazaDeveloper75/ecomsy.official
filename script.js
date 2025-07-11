const texts = ["Dream ", "Design ", "Deliver"];
const typingSpeed = 150;
const erasingSpeed = 100;
const delayBeforeErase = 1000;
const delayBeforeType = 500;

let textIndex = 0;
let charIndex = 0;
let typing = true;

function typeLoop() {
  const element = document.getElementById("type-text");
  const currentText = texts[textIndex];

  if (typing) {
    if (charIndex < currentText.length) {
      element.textContent += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeLoop, typingSpeed);
    } else {
      typing = false;
      setTimeout(typeLoop, delayBeforeErase);
    }
  } else {
    if (charIndex > 0) {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeLoop, erasingSpeed);
    } else {
      typing = true;
      textIndex = (textIndex + 1) % texts.length; // move to next word in list
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

fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("header-Container").innerHTML = data;

    // Initialize behavior after load
    setupHeaderFunctions();
  });

function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const hamburgers = document.querySelectorAll(".hamburger");

  navLinks.classList.toggle("active");

  hamburgers.forEach((hamburger) => {
    hamburger.classList.toggle("active");
  });
}
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Counter functions
function runCounters() {
  const counters = document.querySelectorAll(".number");
  const countersPer = document.querySelectorAll(".PerNumber");

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      const speed = target / 20;

      if (count < target) {
        counter.innerText = Math.ceil(count + speed);
        setTimeout(updateCount, 100);
      } else {
        counter.innerText = target.toLocaleString() + "+";
      }
    };

    updateCount();
  });

  countersPer.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target-per");
      const count = +counter.innerText;

      const speed = target / 200;

      if (count < target) {
        counter.innerText = Math.ceil(count + speed);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target.toLocaleString() + "%";
      }
    };

    updateCount();
  });
}

// Observer to trigger only when visible
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounters();
        observer.unobserve(entry.target); // only run once
      }
    });
  },
  {
    threshold: 0.5, // Adjust if needed
  }
);

// Observe the section that contains counters
const counterSection = document.querySelector(".counter-section");
if (counterSection) {
  observer.observe(counterSection);
}
