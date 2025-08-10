// Statc Header
fetch("../../pages/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("pages-header-Container").innerHTML = data;

    // Initialize behavior after load
    setupHeaderFunctions();
  });


// Statc Navbar
fetch("../../pages/footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("pages-footer-Container").innerHTML = data;

    // Initialize behavior after load
    setupHeaderFunctions();
  });
  