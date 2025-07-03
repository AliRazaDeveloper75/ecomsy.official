document.addEventListener("DOMContentLoaded", function () {
  // Predefined services with prices and descriptions
  const services = {
    "website-dev": {
      price: 1200,
      description: "Basic Website Development (5 pages)",
    },
    ecommerce: {
      price: 3500,
      description: "E-commerce Website with Shopping Cart",
    },
    "mobile-app": {
      price: 5000,
      description: "Mobile Application Development (iOS/Android)",
    },
    seo: {
      price: 800,
      description: "Basic SEO Package (Monthly)",
    },
    maintenance: {
      price: 300,
      description: "Website Maintenance (Monthly)",
    },
    custom: {
      price: 0,
      description: "Custom Service (Price to be determined)",
    },
  };

  // DOM Elements
  const searchForm = document.getElementById("searchInvoiceForm");
  const invoiceForm = document.getElementById("invoiceForm");
  const fixedPriceRadio = document.getElementById("fixedPrice");
  const customPackageRadio = document.getElementById("customPackage");
  const fixedPriceSection = document.getElementById("fixedPriceSection");
  const customPackageSection = document.getElementById("customPackageSection");
  const invoiceFormSection = document.getElementById("invoiceFormSection");
  const invoiceReviewSection = document.getElementById("invoiceReviewSection");
  const invoicePreview = document.getElementById("invoicePreview");
  const downloadInvoiceBtn = document.getElementById("downloadInvoiceBtn");
  const payNowBtn = document.getElementById("payNowBtn");
  const serviceSelection = document.getElementById("serviceSelection");
  const fixedPriceAmount = document.getElementById("fixedPriceAmount");
  const fixedPriceDescription = document.getElementById(
    "fixedPriceDescription"
  );

  // Service type toggle
  fixedPriceRadio.addEventListener("change", function () {
    if (this.checked) {
      fixedPriceSection.classList.remove("hidden");
      customPackageSection.classList.add("hidden");
    }
  });

  customPackageRadio.addEventListener("change", function () {
    if (this.checked) {
      fixedPriceSection.classList.add("hidden");
      customPackageSection.classList.remove("hidden");
    }
  });

  // Service selection change
  serviceSelection.addEventListener("change", function () {
    const selectedService = this.value;

    if (selectedService && selectedService !== "custom") {
      fixedPriceAmount.value = services[selectedService].price;
      fixedPriceDescription.value = services[selectedService].description;
    } else if (selectedService === "custom") {
      fixedPriceAmount.value = "";
      fixedPriceDescription.value = "";
      fixedPriceAmount.removeAttribute("readonly");
      fixedPriceDescription.removeAttribute("readonly");
    } else {
      fixedPriceAmount.value = "";
      fixedPriceDescription.value = "";
    }
  });

  // Form submission
  invoiceForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Generate random invoice ID
    const invoiceId = "INV-" + Math.floor(100000 + Math.random() * 900000);

    // Get form values
    const formData = {
      invoiceId: invoiceId,
      client: {
        name: document.getElementById("clientName").value,
        email: document.getElementById("clientEmail").value,
        phone: document.getElementById("clientPhone").value,
        address: document.getElementById("clientAddress").value,
        state: document.getElementById("clientState").value,
        postalCode: document.getElementById("clientPostalCode").value,
      },
      project: {
        name: document.getElementById("projectName").value,
        duration: document.getElementById("projectDuration").value,
        description: document.getElementById("projectDescription").value,
      },
      serviceType: document.querySelector('input[name="serviceType"]:checked')
        .value,
      items: [],
      status: "unpaid",
      date: new Date().toLocaleDateString(),
      dueDate: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
    };

    if (formData.serviceType === "fixed") {
      formData.items.push({
        description: document.getElementById("fixedPriceDescription").value,
        amount: parseFloat(document.getElementById("fixedPriceAmount").value),
      });
    } else {
      // Custom package milestones
      if (document.getElementById("milestone1Amount").value) {
        formData.items.push({
          description: document.getElementById("milestone1Description").value,
          amount: parseFloat(document.getElementById("milestone1Amount").value),
        });
      }

      if (document.getElementById("milestone2Amount").value) {
        formData.items.push({
          description: document.getElementById("milestone2Description").value,
          amount: parseFloat(document.getElementById("milestone2Amount").value),
        });
      }

      if (document.getElementById("milestone3Amount").value) {
        formData.items.push({
          description: document.getElementById("milestone3Description").value,
          amount: parseFloat(document.getElementById("milestone3Amount").value),
        });
      }
    }

    // Calculate total
    formData.total = formData.items.reduce((sum, item) => sum + item.amount, 0);

    // Save to localStorage (simulating database)
    localStorage.setItem(invoiceId, JSON.stringify(formData));

    // Generate and show invoice preview
    generateInvoicePreview(formData);
    invoiceFormSection.classList.add("hidden");
    invoiceReviewSection.classList.remove("hidden");
  });

  // Search invoice
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const invoiceId = document.getElementById("invoiceSearch").value.trim();

    if (invoiceId) {
      const invoiceData = localStorage.getItem(invoiceId);

      if (invoiceData) {
        const parsedData = JSON.parse(invoiceData);
        generateInvoicePreview(parsedData);
        invoiceFormSection.classList.add("hidden");
        invoiceReviewSection.classList.remove("hidden");
      } else {
        alert("Invoice not found. Please check the Invoice ID and try again.");
      }
    }
  });

  // Pay now button
  payNowBtn.addEventListener("click", function () {
    const invoiceId = document
      .querySelector("#invoicePreview .invoice-id")
      .textContent.split(": ")[1];
    const invoiceData = JSON.parse(localStorage.getItem(invoiceId));

    if (invoiceData.status === "unpaid") {
      invoiceData.status = "paid";
      localStorage.setItem(invoiceId, JSON.stringify(invoiceData));

      // Regenerate preview with paid status
      generateInvoicePreview(invoiceData);

      alert("Payment successful! Invoice status updated to Paid.");
    } else {
      alert("This invoice has already been paid.");
    }
  });

  // Download invoice button
  downloadInvoiceBtn.addEventListener("click", function () {
    const invoiceContent = invoicePreview.innerHTML;
    const blob = new Blob(
      [
        `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Invoice</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 40px; }
                            .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; }
                            .invoice-details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
                            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                            th { background-color: #f2f2f2; }
                            .total { text-align: right; font-weight: bold; font-size: 18px; margin-top: 20px; }
                            .status-paid { color: green; }
                            .status-unpaid { color: red; }
                        </style>
                    </head>
                    <body>
                        ${invoiceContent}
                    </body>
                    </html>
                `,
      ],
      { type: "text/html" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice_${
      document
        .querySelector("#invoicePreview .invoice-id")
        .textContent.split(": ")[1]
    }.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Helper function to generate invoice preview
  function generateInvoicePreview(data) {
    let itemsHtml = "";
    data.items.forEach((item) => {
      itemsHtml += `
                        <tr>
                            <td>${item.description}</td>
                            <td>$${item.amount.toFixed(2)}</td>
                        </tr>
                    `;
    });

    invoicePreview.innerHTML = `
                    <div class="invoice-header">
                        <div>
                            <h2>IT Services Invoice</h2>
                            <p class="invoice-id">Invoice ID: ${
                              data.invoiceId
                            }</p>
                        </div>
                        <div>
                            <p><strong>Date:</strong> ${data.date}</p>
                            <p><strong>Due Date:</strong> ${data.dueDate}</p>
                            <p><strong>Status:</strong> <span class="status-${
                              data.status
                            }">${
      data.status.charAt(0).toUpperCase() + data.status.slice(1)
    }</span></p>
                        </div>
                    </div>
                    
                    <div class="invoice-details">
                        <div>
                            <h3>Bill To</h3>
                            <p>${data.client.name}</p>
                            <p>${data.client.email}</p>
                            <p>${data.client.phone}</p>
                            <p>${data.client.address}</p>
                            <p>${data.client.state}, ${
      data.client.postalCode
    }</p>
                        </div>
                        <div>
                            <h3>Project Details</h3>
                            <p><strong>Project Name:</strong> ${
                              data.project.name
                            }</p>
                            <p><strong>Duration:</strong> ${
                              data.project.duration
                            }</p>
                            <p><strong>Description:</strong> ${
                              data.project.description
                            }</p>
                        </div>
                    </div>
                    
                    <table class="invoice-items">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                    
                    <div class="invoice-total">
                        <p>Total: $${data.total.toFixed(2)}</p>
                    </div>
                `;
  }
});
