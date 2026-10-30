import { SalesRepository } from "../repositories/SalesRepository.js";
import { getWorkspace } from "../core/workspace/workspace.js";

export function addSalePage() {
  return `<section class="dashboard"><div class="hero-card"><h2>💵 Record Sale</h2><p>Record produce sales and payments.</p></div>
    <form id="saleForm" class="farm-form">
      <label>Buyer</label><input type="text" id="buyer" required>
      <label>Product</label><input type="text" id="product" required>
      <label>Quantity</label><input type="number" id="quantity" min="0.01" step="0.01" required>
      <label>Unit Price (₦)</label><input type="number" id="unitPrice" min="0.01" step="0.01" required>
      <label>Sale Date</label><input type="date" id="saleDate" required>
      <label>Payment Status</label><select id="paymentStatus"><option>Paid</option><option>Pending</option></select>
      <button type="submit" class="action-btn">💾 Save Sale</button>
    </form><div id="saleMessage" role="status" aria-live="polite"></div></section>`;
}

export function initAddSalePage() {
  const form = document.getElementById("saleForm");
  if (!form) return;
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const farm = getWorkspace().activeFarm;
    const message = document.getElementById("saleMessage");
    if (!farm) { message.textContent = "Select a farm first."; return; }
    const quantity = Number(document.getElementById("quantity").value);
    const unitPrice = Number(document.getElementById("unitPrice").value);
    if (!Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(unitPrice) || unitPrice <= 0) {
      message.textContent = "Enter a valid quantity and unit price greater than zero."; return;
    }
    const result = await SalesRepository.create({
      farmId: farm.id, farmName: farm.farmName,
      buyer: document.getElementById("buyer").value.trim(),
      product: document.getElementById("product").value.trim(),
      quantity, unitPrice, total: quantity * unitPrice,
      date: document.getElementById("saleDate").value,
      paymentStatus: document.getElementById("paymentStatus").value
    });
    form.reset();
    message.textContent = result.synced ? "Sale saved and synced to your farm account." : "Sale saved on this device. Cloud sync is pending and will retry when you reconnect.";
  });
}
