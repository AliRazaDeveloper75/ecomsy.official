console.log("Head and Footer script loaded.");
// Statc Header
fetch("../../../pages/course/course-detail/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("course-header").innerHTML = data;

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

      function openTab(evt, tabName) {
        // Hide all tab content
        const tabContents = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabContents.length; i++) {
          tabContents[i].classList.remove("active");
        }

        // Remove active class from all buttons
        const tabButtons = document.getElementsByClassName("tab-btn");
        for (let i = 0; i < tabButtons.length; i++) {
          tabButtons[i].classList.remove("active");
        }

        // Show the current tab and add active class to the button
        document.getElementById(tabName).classList.add("active");
        evt.currentTarget.classList.add("active");
      }

