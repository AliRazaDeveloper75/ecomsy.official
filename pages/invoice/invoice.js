// Initialize variables
let currentStep = 1;
let invoiceData = {};
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

// Service pricing data
const servicePricing = {
  Basic: {
    "Custom-Coded Websites": 299,
    "Web Development": 1000,
    "Mobile App Development": 1999,
    "Graphic Design": 300, 
    "SEO Services": 500,
    "Shopify Development": 349,
    "WordPress Development": 600,
    "Custom Coding": 700,
    "IT Consulting": 500,
    "(SEO)": 599,
    "digital marketing": 399,
    "business consultation": 120,
    
  },
  Intermediate: {
    "Custom-Coded Websites": 499,
    "Shopify Development": 549,
    "Web Development": 1500,
    "Mobile App Development": 2999,
    "Graphic Design": 500,
    "SEO Services": 800,
    "WordPress Development": 900,
    "Custom Coding": 1000,
    "IT Consulting": 700,
    "(SEO)": 899,
    "business consultation": 120,
  },
  Advanced: {
    "Custom-Coded Websites": 799,
    "Web Development": 2500,
    "Mobile App Development": 3999,
    "Graphic Design": 800,
    "SEO Services": 1200,
    "Shopify Development": 899,
    "WordPress Development": 1500,
    "Custom Coding": 1500,
    "IT Consulting": 1000,
    "(SEO)": 1399,
    "digital marketing": 399,
    "business consultation": 120,
  },
};

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Check if there's an invoice ID in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const invoiceId = urlParams.get("id");

  if (invoiceId) {
    searchInvoiceById(invoiceId);
  }

  // Set up event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Service tier change handler
  document
    .getElementById("serviceTier")
    .addEventListener("change", function () {
      updateBudgetField();
    });

  // Pricing type change handler
  document
    .getElementById("pricingType")
    .addEventListener("change", function () {
      const customBudgetContainer = document.getElementById(
        "customBudgetContainer"
      );
      if (this.value === "Custom") {
        customBudgetContainer.classList.remove("hidden");
        document.getElementById("budget").value = "";
      } else {
        customBudgetContainer.classList.add("hidden");
        updateBudgetField();
      }
    });

  // Service selection change handler
 // Modify the service selection event listeners
document.querySelectorAll('input[name="services"]').forEach((radio) => {
  radio.addEventListener("change", function() {
    // Remove selected class from all cards
    document.querySelectorAll('.service-card').forEach(card => {
      card.classList.remove('selected');
    });
    
    // Add selected class to the clicked card
    if (this.checked) {
      this.closest('.service-card').classList.add('selected');
    }
    
    updateBudgetField();
  });
});

// Update the updateBudgetField function to handle radio buttons
function updateBudgetField() {
  const serviceTier = document.getElementById("serviceTier").value;
  const pricingType = document.getElementById("pricingType").value;
  const selectedService = document.querySelector('input[name="services"]:checked');
  const budgetInput = document.getElementById("budget");
  const budgetHelp = document.getElementById("budgetHelp");

  if (pricingType === "Custom") {
    // Custom pricing - don't auto-calculate
    budgetInput.value = document.getElementById("customBudget").value || "";
    budgetInput.readOnly = true;
    return;
  }

  if (!selectedService) {
    budgetInput.value = "";
    budgetInput.readOnly = true;
    budgetHelp.textContent = "Please select a service";
    return;
  }

  if (!serviceTier) {
    budgetInput.value = "";
    budgetInput.readOnly = true;
    budgetHelp.textContent = "Please select a service tier";
    return;
  }

  // Get the price for the selected service and tier
  const serviceName = selectedService.value;
  const price = servicePricing[serviceTier][serviceName] || 0;
  
  budgetInput.value = price;
  budgetInput.readOnly = true;
  budgetHelp.textContent = `Budget calculated based on ${serviceTier} tier pricing`;
  calculateInvoiceTotal();
}

  // Custom budget input change handler
  document
    .getElementById("customBudget")
    ?.addEventListener("input", function () {
      if (document.getElementById("pricingType").value === "Custom") {
        document.getElementById("budget").value = this.value;
        calculateInvoiceTotal();
      }
    });

  // Phone responsive burger icon
  document.querySelector(".hamburger").addEventListener("click", toggleMenu);

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// Navigation functions
function nextStep(step) {
  if (!validateStep(currentStep)) {
    return;
  }

  saveStepData(currentStep);
  document.getElementById(`step${currentStep}`).classList.add("hidden");

  currentStep = step;
  document.getElementById(`step${currentStep}`).classList.remove("hidden");

  if (currentStep === 4) {
    updateReviewSections();
    calculateInvoiceTotal();
  }
}

function prevStep(step) {
  document.getElementById(`step${currentStep}`).classList.add("hidden");
  currentStep = step;
  document.getElementById(`step${currentStep}`).classList.remove("hidden");
}

function validateStep(step) {
  switch (step) {
    case 1:
      const userForm = document.getElementById("userInfoForm");
      if (!userForm.checkValidity()) {
        userForm.reportValidity();
        return false;
      }
      return true;

    case 2:
      const projectForm = document.getElementById("projectInfoForm");
      if (!projectForm.checkValidity()) {
        projectForm.reportValidity();
        return false;
      }
      return true;

    case 3:
      const servicesForm = document.getElementById("servicesForm");
      const selectedServices = document.querySelectorAll(
        'input[name="services"]:checked'
      );
      const serviceTier = document.getElementById("serviceTier").value;
      const pricingType = document.getElementById("pricingType").value;

      if (selectedServices.length === 0) {
        alert("Please select at least one service");
        return false;
      }

      if (!serviceTier) {
        alert("Please select a service tier");
        return false;
      }

      if (!pricingType) {
        alert("Please select a pricing type");
        return false;
      }

      if (pricingType === "Custom") {
        const customBudget = document.getElementById("customBudget").value;
        if (!customBudget || customBudget <= 0) {
          alert("Please enter a valid custom budget amount");
          return false;
        }
      }

      return true;

    default:
      return true;
  }
}

function saveStepData(step) {
  switch (step) {
    case 1:
      invoiceData.user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        // state: document.getElementById("state").value,
        // postalCode: document.getElementById("postalCode").value,
      };
      break;

    case 2:
      invoiceData.project = {
        name: document.getElementById("projectName").value,
        description: document.getElementById("projectDescription").value,
        timeline: document.getElementById("projectTimeline").value,
      };
      break;

    case 3:
      const selectedServices = Array.from(
        document.querySelectorAll('input[name="services"]:checked')
      ).map((el) => el.value);

      invoiceData.services = {
        list: selectedServices,
        tier: document.getElementById("serviceTier").value,
        pricingType: document.getElementById("pricingType").value,
        notes: document.getElementById("additionalNotes").value,
      };

      if (invoiceData.services.pricingType === "Custom") {
        invoiceData.services.budget =
          document.getElementById("customBudget").value || 0;
      } else {
        invoiceData.services.budget =
          document.getElementById("budget").value || 0;
      }
      break;
  }
}



function updateReviewSections() {
  // User Info
  const userInfoHTML = `
    <p><strong>Name:</strong> ${invoiceData.user.name}</p>
    <p><strong>Email:</strong> ${invoiceData.user.email}</p>
    <p><strong>Phone:</strong> ${invoiceData.user.phone}</p>
    <p><strong>Address:</strong> ${invoiceData.user.address}</p>
    <p><strong>State/Postal:</strong> ${invoiceData.user.state}, ${invoiceData.user.postalCode}</p>
  `;
  document.getElementById("reviewUserInfo").innerHTML = userInfoHTML;

  // Project Info
  const projectInfoHTML = `
    <p><strong>Project Name:</strong> ${invoiceData.project.name}</p>
    <p><strong>Description:</strong> ${invoiceData.project.description}</p>
    <p><strong>Timeline:</strong> ${invoiceData.project.timeline}</p>
  `;
  document.getElementById("reviewProjectInfo").innerHTML = projectInfoHTML;

  // Services Info
  let servicesInfoHTML = `
    <p><strong>Services:</strong> ${invoiceData.services.list.join(", ")}</p>
    <p><strong>Service Tier:</strong> ${invoiceData.services.tier}</p>
    <p><strong>Pricing Type:</strong> ${invoiceData.services.pricingType}</p>
    <p><strong>Budget:</strong> $${parseFloat(
      invoiceData.services.budget
    ).toFixed(2)}</p>
    ${
      invoiceData.services.notes
        ? `<p><strong>Notes:</strong> ${invoiceData.services.notes}</p>`
        : ""
    }
  `;

  document.getElementById("reviewServicesInfo").innerHTML = servicesInfoHTML;
}

function calculateInvoiceTotal() {
  const subtotal = parseFloat(invoiceData.services.budget) || 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  // Update review section
  if (document.getElementById("subtotal")) {
    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
  }

  return { subtotal, tax, total };
}

function generateInvoice() {
  // Generate invoice ID
  const invoiceId = "INV-" + Date.now().toString().slice(-6);

  // Get current date
  const today = new Date();
  const dueDate = new Date();
  dueDate.setDate(today.getDate() + 15); // Due in 15 days

  // Format dates
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const formattedDueDate = dueDate.toLocaleDateString("en-US", options);

  // Calculate amounts
  const amounts = calculateInvoiceTotal();

  // Create invoice object
  const invoice = {
    id: invoiceId,
    date: formattedDate,
    dueDate: formattedDueDate,
    status: "unpaid",
    user: invoiceData.user,
    project: invoiceData.project,
    services: invoiceData.services,
    amounts: amounts,
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')
      .value,
    createdAt: new Date().toISOString(),
  };

  // Save to local storage
  invoices.push(invoice);
  localStorage.setItem("invoices", JSON.stringify(invoices));

  // Display the generated invoice
  displayInvoice(invoice);

  // Hide the form and show the invoice
  document.getElementById("step4").classList.add("hidden");
  document.getElementById("invoiceGenerated").classList.remove("hidden");
}

function displayInvoice(invoice) {
  // Set invoice header info
  document.getElementById("invoiceNumber").textContent = invoice.id;
  document.getElementById("invoiceStatus").textContent =
    invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1);
  document.getElementById(
    "invoiceStatus"
  ).className = `invoice-status ${invoice.status}`;

  // Set invoice dates
  document.getElementById("invoiceDate").textContent = invoice.date;
  document.getElementById("dueDate").textContent = invoice.dueDate;

  // Set invoice to info
  const invoiceToHTML = `
    <p>${invoice.user.name}</p>
    <p>${invoice.user.address}</p>
    <p>${invoice.user.state}, ${invoice.user.postalCode}</p>
    <p>${invoice.user.email}</p>
    <p>${invoice.user.phone}</p>
  `;
  document.getElementById("invoiceTo").innerHTML = invoiceToHTML;

  // Set invoice items
  let itemsHTML = "";
  if (invoice.services.pricingType === "Custom") {
    itemsHTML = `
      <tr>
        <td>${invoice.services.list.join(", ")}</td>
        <td>Custom Plan</td>
        <td>$${invoice.amounts.subtotal.toFixed(2)}</td>
      </tr>
    `;
  } else {
    // Split price equally among services for the tier
    const pricePerService =
      invoice.amounts.subtotal / invoice.services.list.length;
    itemsHTML = invoice.services.list
      .map(
        (service) => `
        <tr>
          <td>${service} (${invoice.services.tier})</td>
          <td>${invoice.services.tier} Tier</td>
          <td>$${pricePerService.toFixed(2)}</td>
        </tr>
      `
      )
      .join("");
  }

  document.getElementById("invoiceItems").innerHTML = itemsHTML;

  // Set invoice totals
  document.getElementById(
    "invoiceSubtotal"
  ).textContent = `$${invoice.amounts.subtotal.toFixed(2)}`;
  document.getElementById(
    "invoiceTax"
  ).textContent = `$${invoice.amounts.tax.toFixed(2)}`;
  document.getElementById(
    "invoiceTotal"
  ).textContent = `$${invoice.amounts.total.toFixed(2)}`;

  // Show/hide pay button based on status
  const payLaterBtn = document.getElementById("payLaterBtn");
  if (payLaterBtn) {
    if (invoice.status === "unpaid") {
      payLaterBtn.classList.remove("hidden");
    } else {
      payLaterBtn.classList.add("hidden");
    }
  }
}

function processPayment() {
  // Find the current invoice
  const invoiceId = document.getElementById("invoiceNumber").textContent;
  const invoice = invoices.find((inv) => inv.id === invoiceId);

  if (!invoice) return;

  // Update status to paid
  invoice.status = "paid";
  localStorage.setItem("invoices", JSON.stringify(invoices));

  // Update the displayed invoice
  displayInvoice(invoice);

  // Show success message
  alert("Payment processed successfully! Thank you for your business.");
}

function downloadInvoice() {
  // Use html2canvas and jsPDF to generate PDF
  const { jsPDF } = window.jspdf;
  const element = document.getElementById("invoiceGenerated");

  html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(
      `invoice_${document.getElementById("invoiceNumber").textContent}.pdf`
    );
  });
}

function startNewInvoice() {
  // Reset form and show step 1
  document.getElementById("invoiceGenerated").classList.add("hidden");
  document.getElementById("step1").classList.remove("hidden");
  currentStep = 1;
  invoiceData = {};

  // Reset all form fields
  document.getElementById("userInfoForm").reset();
  document.getElementById("projectInfoForm").reset();
  document.getElementById("servicesForm").reset();

  // Reset budget field
  const budgetInput = document.getElementById("budget");
  budgetInput.value = "";
  budgetInput.readOnly = false;

  // Hide custom budget container if visible
  const customBudgetContainer = document.getElementById(
    "customBudgetContainer"
  );
  if (customBudgetContainer) customBudgetContainer.classList.add("hidden");

  // Reset help text
  const budgetHelp = document.getElementById("budgetHelp");
  if (budgetHelp)
    budgetHelp.textContent =
      "Budget will be calculated based on your selections";

  // Scroll to top
  window.scrollTo(0, 0);
}

// Search functionality
function searchInvoice() {
  const searchTerm = document.getElementById("searchInvoiceId").value.trim();
  if (!searchTerm) {
    alert("Please enter an invoice number");
    return;
  }

  const results = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  displaySearchResults(results);
}

function searchInvoiceById(id) {
  const invoice = invoices.find((inv) => inv.id === id);
  if (invoice) {
    // Hide all steps and search section
    document.querySelectorAll(".invoice-step").forEach((step) => {
      step.classList.add("hidden");
    });
    document.getElementById("invoiceSearch").classList.add("hidden");

    // Show and display the invoice
    document.getElementById("invoiceGenerated").classList.remove("hidden");
    displayInvoice(invoice);
  } else {
    alert("Invoice not found");
  }
}

function displaySearchResults(results) {
  const resultsContainer = document.getElementById("searchResults");

  if (results.length === 0) {
    resultsContainer.innerHTML =
      "<p>No invoices found matching your search.</p>";
    resultsContainer.classList.remove("hidden");
    return;
  }

  const resultsHTML = results
    .map(
      (invoice) => `
    <div class="invoice-result">
      <h4>Invoice #${invoice.id} - ${invoice.user.name}</h4>
      <p><strong>Date:</strong> ${
        invoice.date
      } | <strong>Status:</strong> <span class="status ${invoice.status}">${
        invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)
      }</span></p>
      <p><strong>Project:</strong> ${invoice.project.name}</p>
      <p><strong>Total:</strong> $${invoice.amounts.total.toFixed(2)}</p>
      <button onclick="viewInvoice('${invoice.id}')">View Invoice</button>
    </div>
  `
    )
    .join("");

  resultsContainer.innerHTML = resultsHTML;
  resultsContainer.classList.remove("hidden");
}

function viewInvoice(id) {
  searchInvoiceById(id);
}

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}
