<?php
// Check if invoice ID is provided
if (!isset($_GET['id'])) {
    die('Invoice ID is required');
}

$invoice_id = $_GET['id'];
$invoice_file = "invoices/{$invoice_id}.json";

// Check if invoice exists
if (!file_exists($invoice_file)) {
    die('Invoice not found');
}

// Load invoice data
$invoice_data = json_decode(file_get_contents($invoice_file), true);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice <?= htmlspecialchars($invoice_id) ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div class="company-info">
                <h1>Your Company Name</h1>
                <p>123 Business Street<br>
                City, State 12345<br>
                Phone: (123) 456-7890<br>
                Email: info@yourcompany.com</p>
            </div>
            <div class="invoice-info">
                <h2>INVOICE</h2>
                <p><strong>Invoice #:</strong> <?= htmlspecialchars($invoice_data['invoice_id']) ?></p>
                <p><strong>Date:</strong> <?= htmlspecialchars($invoice_data['date']) ?></p>
                <p><strong>Due Date:</strong> <?= htmlspecialchars($invoice_data['due_date']) ?></p>
            </div>
        </div>
        
        <div class="invoice-details">
            <div class="bill-to">
                <h3>Bill To:</h3>
                <p><?= htmlspecialchars($invoice_data['customer_name']) ?><br>
                <?php if (!empty($invoice_data['company_name'])): ?>
                    <?= htmlspecialchars($invoice_data['company_name']) ?><br>
                <?php endif; ?>
                <?= nl2br(htmlspecialchars($invoice_data['address'])) ?><br>
                Phone: <?= htmlspecialchars($invoice_data['phone']) ?><br>
                Email: <?= htmlspecialchars($invoice_data['email']) ?></p>
            </div>
            <div class="payment-method">
                <h3>Payment Method:</h3>
                <p><?= htmlspecialchars($invoice_data['payment_method']) ?></p>
            </div>
        </div>
        
        <table class="items-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($invoice_data['services_with_prices'] as $service): ?>
                <tr>
                    <td><?= htmlspecialchars($service['name']) ?></td>
                    <td><?= htmlspecialchars($service['name']) ?> Service</td>
                    <td><?= htmlspecialchars($service['quantity']) ?></td>
                    <td>$<?= number_format($service['price'], 2) ?></td>
                    <td>$<?= number_format($service['price'] * $service['quantity'], 2) ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        
        <div class="totals">
            <table>
                <tr>
                    <td class="label">Subtotal:</td>
                    <td class="amount">$<?= number_format($invoice_data['subtotal'], 2) ?></td>
                </tr>
                <tr>
                    <td class="label">Tax (<?= htmlspecialchars($invoice_data['tax_rate']) ?>%):</td>
                    <td class="amount">$<?= number_format($invoice_data['tax'], 2) ?></td>
                </tr>
                <tr>
                    <td class="label grand-total">Total:</td>
                    <td class="amount grand-total">$<?= number_format($invoice_data['total'], 2) ?></td>
                </tr>
            </table>
        </div>
        
        <?php if (!empty($invoice_data['notes'])): ?>
        <div class="notes">
            <h3>Notes</h3>
            <p><?= nl2br(htmlspecialchars($invoice_data['notes'])) ?></p>
        </div>
        <?php endif; ?>
        
        <div class="footer">
            <p>Thank you for your business!</p>
        </div>
        
        <div class="action-buttons">
            <button class="btn btn-print" onclick="window.print()">Print Invoice</button>
            <button class="btn btn-download" onclick="downloadInvoice()">Download PDF</button>
        </div>
    </div>

    <script>
        function downloadInvoice() {
            // In a real implementation, this would generate a PDF
            alert('PDF download would be implemented here');
        }
    </script>
</body>
</html>