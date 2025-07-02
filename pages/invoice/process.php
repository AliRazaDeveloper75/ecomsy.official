<?php
// Process the form data and generate an invoice

// Create invoices directory if it doesn't exist
if (!file_exists('invoices')) {
    mkdir('invoices', 0777, true);
}

// Generate a unique invoice ID
$invoice_id = 'INV-' . date('Ymd') . '-' . substr(uniqid(), -6);

// Get form data
$customer_data = [
    'invoice_id' => $invoice_id,
    'date' => date('F j, Y'),
    'due_date' => date('F j, Y', strtotime('+30 days')),
    'customer_name' => $_POST['customer_name'],
    'company_name' => $_POST['company_name'] ?? '',
    'email' => $_POST['email'],
    'phone' => $_POST['phone'],
    'address' => $_POST['address'],
    'services' => $_POST['services'] ?? [],
    'notes' => $_POST['notes'] ?? '',
    'payment_method' => $_POST['payment_method']
];

// Calculate totals
$subtotal = 0;
$services_with_prices = [];

// Define service prices (should match the form values)
$service_prices = [
    'Web Design' => 1200,
    'Web Hosting' => 300,
    'SEO' => 500,
    'Maintenance' => 150
];

foreach ($customer_data['services'] as $service) {
    $price = $service_prices[$service] ?? 0;
    $services_with_prices[] = [
        'name' => $service,
        'price' => $price,
        'quantity' => 1
    ];
    $subtotal += $price;
}

$tax_rate = 0.10; // 10% tax
$tax = $subtotal * $tax_rate;
$total = $subtotal + $tax;

// Add calculated values to data
$customer_data['services_with_prices'] = $services_with_prices;
$customer_data['subtotal'] = $subtotal;
$customer_data['tax_rate'] = $tax_rate * 100;
$customer_data['tax'] = $tax;
$customer_data['total'] = $total;

// Save the invoice data as JSON
file_put_contents("invoices/{$invoice_id}.json", json_encode($customer_data));

// Redirect to the invoice view page
header("Location: view-invoice.php?id={$invoice_id}");
exit();
?>