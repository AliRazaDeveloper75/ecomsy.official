console.log("Head and Footer script loaded.");
// Statc Header
fetch("../../../pages/course/course-detail/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("course-header").innerHTML = data;

    // Initialize behavior after load
    setupHeaderFunctions();
  });

  