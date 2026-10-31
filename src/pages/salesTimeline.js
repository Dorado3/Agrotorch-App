import { getFarmSales } from "../services/salesStorage.js";
import { SalesRepository } from "../repositories/SalesRepository.js";
import { getWorkspace } from "../core/workspace/workspace.js";

function esc(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

export function salesTimelinePage() {
  const farm = getWorkspace().activeFarm;
  if (!farm) return `<section class="dashboard"><div class="agro-card"><h2>Sales History</h2><p>Select a farm to view its sales records.</p></div></section>`;
  const sales = getFarmSales(farm.id);
  if (!sales.length) return `<section class="dashboard"><h2>💵 Sales History</h2><div class="agro-card"><h3>No sales yet</h3><p>Record the first produce sale for ${esc(farm.farmName)}.</p></div></section>`;
  const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  return `<section class="dashboard"><h2>💵 Sales History</h2><p>${esc(farm.farmName)}</p>
    <div class="hero-card"><h3>Total Revenue</h3><h2>₦${totalRevenue.toLocaleString()}</h2></div>
    ${sales.slice().sort((a,b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)).map(sale => `
      <div class="agro-card">
        <h3>${esc(sale.product || "Produce sale")}</h3>
        <p><strong>Buyer:</strong> ${esc(sale.buyer || "Not recorded")}</p>
        <p><strong>Quantity:</strong> ${esc(sale.quantity)}</p>
        <p><strong>Unit price:</strong> ₦${Number(sale.unitPrice || 0).toLocaleString()}</p>
        <p><strong>Total:</strong> ₦${Number(sale.total || 0).toLocaleString()}</p>
        <p><strong>Status:</strong> ${esc(sale.paymentStatus || "Not recorded")}</p>
        <p><strong>Date:</strong> ${esc(sale.date || "Not recorded")}</p>
        <button class="deleteSale" data-id="${esc(sale.id)}">Delete</button>
      </div>`).join("")}
  </section>`;
}

export function initSalesTimeline() {
  document.querySelectorAll(".deleteSale").forEach(button => {
    button.addEventListener("click", async () => {
      button.disabled = true;
      try {
        await SalesRepository.delete(button.dataset.id);
        const page = document.getElementById("page");
        if (page) { page.innerHTML = salesTimelinePage(); initSalesTimeline(); }
      } catch (error) {
        button.disabled = false;
        alert(error?.message || "Could not delete this sale. Try again when connected.");
      }
    });
  });
}
