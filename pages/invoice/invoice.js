// ======================
// INITIALIZATION & DATA
// ======================
let currentStep = 1;
let invoiceData = {};
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

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

// ======================
// PAGE INITIALIZATION
// ======================
document.addEventListener("DOMContentLoaded", function () {
  // Check for invoice ID in URL
  const urlParams = new URLSearchParams(window.location.search);
  const invoiceId = urlParams.get("id");
  if (invoiceId) searchInvoiceById(invoiceId);

  setupEventListeners();
});

// ======================
// EVENT HANDLERS
// ======================
function setupEventListeners() {
  // Service selection
  document.querySelectorAll('input[name="services"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      document.querySelectorAll(".service-card").forEach((card) => {
        card.classList.remove("selected");
      });
      if (this.checked) this.closest(".service-card").classList.add("selected");
      updateBudgetField();
    });
  });

  // Form controls
  document
    .getElementById("serviceTier")
    .addEventListener("change", updateBudgetField);
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

  document
    .getElementById("customBudget")
    ?.addEventListener("input", function () {
      if (document.getElementById("pricingType").value === "Custom") {
        document.getElementById("budget").value = this.value;
        calculateInvoiceTotal();
      }
    });

  // Navigation
  document.querySelector(".hamburger").addEventListener("click", toggleMenu);
  window.addEventListener("scroll", () => {
    document
      .querySelector(".navbar")
      .classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ======================
// FORM NAVIGATION
// ======================
function nextStep(step) {
  if (!validateStep(currentStep)) return;

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

// ======================
// FORM VALIDATION
// ======================
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

// ======================
// DATA MANAGEMENT
// ======================
function saveStepData(step) {
  switch (step) {
    case 1:
      invoiceData.user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
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
      invoiceData.services = {
        list: Array.from(
          document.querySelectorAll('input[name="services"]:checked')
        ).map((el) => el.value),
        tier: document.getElementById("serviceTier").value,
        pricingType: document.getElementById("pricingType").value,
        notes: document.getElementById("additionalNotes").value,
        budget:
          document.getElementById("pricingType").value === "Custom"
            ? document.getElementById("customBudget").value || 0
            : document.getElementById("budget").value || 0,
      };
      break;
  }
}

function updateBudgetField() {
  const serviceTier = document.getElementById("serviceTier").value;
  const pricingType = document.getElementById("pricingType").value;
  const selectedService = document.querySelector(
    'input[name="services"]:checked'
  );
  const budgetInput = document.getElementById("budget");
  const budgetHelp = document.getElementById("budgetHelp");

  if (pricingType === "Custom") {
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

  const serviceName = selectedService.value;
  const price = servicePricing[serviceTier][serviceName] || 0;

  budgetInput.value = price;
  budgetInput.readOnly = true;
  budgetHelp.textContent = `Budget calculated based on ${serviceTier} tier pricing`;
  calculateInvoiceTotal();
}

// ======================
// INVOICE GENERATION
// ======================
function generateInvoice() {
  const invoiceId = "INV-" + Date.now().toString().slice(-6);
  const today = new Date();
  const dueDate = new Date();
  dueDate.setDate(today.getDate() + 15);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const amounts = calculateInvoiceTotal();

  const invoice = {
    id: invoiceId,
    date: today.toLocaleDateString("en-US", options),
    dueDate: dueDate.toLocaleDateString("en-US", options),
    status: "unpaid",
    user: invoiceData.user,
    project: invoiceData.project,
    services: invoiceData.services,
    amounts: amounts,
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')
      .value,
    createdAt: new Date().toISOString(),
  };

  invoices.push(invoice);
  localStorage.setItem("invoices", JSON.stringify(invoices));
  displayInvoice(invoice);

  document.getElementById("step4").classList.add("hidden");
  document.getElementById("invoiceGenerated").classList.remove("hidden");
}

function displayInvoice(invoice) {
  // Header info
  document.getElementById("invoiceNumber").textContent = invoice.id;
  document.getElementById("invoiceStatus").textContent =
    invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1);
  document.getElementById(
    "invoiceStatus"
  ).className = `invoice-status ${invoice.status}`;

  // Dates
  document.getElementById("invoiceDate").textContent = invoice.date;
  document.getElementById("dueDate").textContent = invoice.dueDate;

  // Client info
  document.getElementById("invoiceTo").innerHTML = `
    <p>${invoice.user.name}</p>
    <p>${invoice.user.address}</p>
    <p>${invoice.user.email}</p>
    <p>${invoice.user.phone}</p>
  `;

  // Items
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

  // Totals
  document.getElementById(
    "invoiceSubtotal"
  ).textContent = `$${invoice.amounts.subtotal.toFixed(2)}`;
  document.getElementById(
    "invoiceTax"
  ).textContent = `$${invoice.amounts.tax.toFixed(2)}`;
  document.getElementById(
    "invoiceTotal"
  ).textContent = `$${invoice.amounts.total.toFixed(2)}`;

  // Payment button
  const payLaterBtn = document.getElementById("payLaterBtn");
  if (payLaterBtn) {
    payLaterBtn.classList.toggle("hidden", invoice.status !== "unpaid");
  }
}

// ======================
// PAYMENT & DOWNLOAD
// ======================
function processPayment() {
  const invoiceId = document.getElementById("invoiceNumber").textContent;
  const invoice = invoices.find((inv) => inv.id === invoiceId);
  if (!invoice) return;

  invoice.status = "paid";
  localStorage.setItem("invoices", JSON.stringify(invoices));
  displayInvoice(invoice);
  alert("Payment processed successfully! Thank you for your business.");
}

function downloadInvoice() {
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

// ======================
// SEARCH FUNCTIONALITY
// ======================
function searchInvoiceById(id) {
  if (!id) {
    alert("Please enter an invoice ID");
    return;
  }

  const invoice = invoices.find((inv) => inv.id === id);
  if (invoice) {
    document
      .querySelectorAll(".invoice-step")
      .forEach((step) => step.classList.add("hidden"));
    document.getElementById("invoiceSearch").classList.add("hidden");
    document.getElementById("invoiceGenerated").classList.remove("hidden");
    displayInvoice(invoice);
  } else { 
    alert("Invoice not found. Please check the ID and try again.");
  }
}

// ======================
// UTILITY FUNCTIONS
// ======================
function calculateInvoiceTotal() {
  const subtotal = parseFloat(invoiceData.services.budget) || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (document.getElementById("subtotal")) {
    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
  }

  return { subtotal, tax, total };
}

function updateReviewSections() {
  document.getElementById("reviewUserInfo").innerHTML = `
    <p><strong>Name:</strong> ${invoiceData.user.name}</p>
    <p><strong>Email:</strong> ${invoiceData.user.email}</p>
    <p><strong>Phone:</strong> ${invoiceData.user.phone}</p>
    <p><strong>Address:</strong> ${invoiceData.user.address}</p>
  `;

  document.getElementById("reviewProjectInfo").innerHTML = `
    <p><strong>Project Name:</strong> ${invoiceData.project.name}</p>
    <p><strong>Description:</strong> ${invoiceData.project.description}</p>
    <p><strong>Timeline:</strong> ${invoiceData.project.timeline}</p>
  `;

  document.getElementById("reviewServicesInfo").innerHTML = `
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
}

function startNewInvoice() {
  document.getElementById("invoiceGenerated").classList.add("hidden");
  document.getElementById("step1").classList.remove("hidden");
  currentStep = 1;
  invoiceData = {};

  document.getElementById("userInfoForm").reset();
  document.getElementById("projectInfoForm").reset();
  document.getElementById("servicesForm").reset();

  const budgetInput = document.getElementById("budget");
  budgetInput.value = "";
  budgetInput.readOnly = false;

  document.getElementById("customBudgetContainer")?.classList.add("hidden");
  document.getElementById("budgetHelp").textContent =
    "Budget will be calculated based on your selections";
  window.scrollTo(0, 0);
}

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}



// ======================
// PAYMENT POPUP FUNCTIONALITY
// ======================
function processPayment() {
  // Create payment popup
  const popup = document.createElement('div');
  popup.className = 'payment-popup';
  popup.innerHTML = `
    <div class="payment-popup-content">
      <span class="close-popup" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <h4>Complete Your Payment</h4>
      <div class="payment-instructions">
        <p><strong>Please transfer the payment to:</strong></p>
        <p>Bank Name: United Bank Limited (UBL)</p>
        <p>Account Title: ECOMSY SMC PVT LTD</p>
        <p>Account Number: 334242866</p>
        <p>Branch Code: 0936</p>
        <p><strong>Amount:</strong> $${document.getElementById('invoiceTotal').textContent}</p>
      </div>
      <form id="paymentProofForm">
        <div class="form-group">
          <label for="transactionId">Transaction ID*</label>
          <input type="text" id="transactionId" required>
        </div>
        <div class="form-group">
          <label for="paymentScreenshot">Upload Payment Screenshot*</label>
          <input type="file" id="paymentScreenshot" accept="image/*" required>
        </div>
        <button type="button" class="btn-submit" onclick="submitPaymentProof()">Submit Payment Proof</button>
      </form>
    </div>
  `;
  
  document.body.appendChild(popup);
}

function submitPaymentProof() {
  const transactionId = document.getElementById('transactionId').value;
  const screenshot = document.getElementById('paymentScreenshot').files[0];
  
  if (!transactionId || !screenshot) {
    alert('Please provide both Transaction ID and Payment Screenshot');
    return;
  }
  
  // In a real implementation, you would upload this to your server
  alert('Payment proof submitted successfully! We will verify your payment shortly.');
  
  // Close popup
  document.querySelector('.payment-popup').remove();
  
  // Update invoice status
  const invoiceId = document.getElementById('invoiceNumber').textContent;
  const invoice = invoices.find(inv => inv.id === invoiceId);
  if (invoice) {
    invoice.status = 'pending';
    invoice.transactionId = transactionId;
    localStorage.setItem('invoices', JSON.stringify(invoices));
    displayInvoice(invoice);
  }
}



