import { HarvestRepository } from "../repositories/HarvestRepository.js";
import { getWorkspace } from "../core/workspace/workspace.js";

export function addHarvestPage() {
  return `<section class="dashboard"><div class="hero-card"><h2>🌾 Record Harvest</h2><p>Record crop quantities harvested from this farm.</p></div>
    <form id="harvestForm" class="farm-form">
      <label>Crop</label><input type="text" id="crop" required>
      <label>Quantity</label><input type="number" id="quantity" min="0.01" step="0.01" required>
      <label>Unit</label><select id="unit"><option>Kg</option><option>Tonnes</option><option>Crates</option><option>Baskets</option><option>Bags</option></select>
      <label>Date</label><input type="date" id="harvestDate" required>
      <label>Notes</label><textarea id="notes" rows="3"></textarea>
      <button type="submit" class="action-btn">🌾 Save Harvest</button>
    </form><div id="harvestMessage" role="status" aria-live="polite"></div></section>`;
}

export function initAddHarvestPage() {
  const form = document.getElementById("harvestForm");
  if (!form) return;
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const farm = getWorkspace().activeFarm;
    const message = document.getElementById("harvestMessage");
    if (!farm) { message.textContent = "Select a farm first."; return; }
    const quantity = Number(document.getElementById("quantity").value);
    if (!Number.isFinite(quantity) || quantity <= 0) { message.textContent = "Enter a valid harvest quantity greater than zero."; return; }
    const result = await HarvestRepository.create({
      farmId: farm.id, farmName: farm.farmName,
      crop: document.getElementById("crop").value.trim(),
      quantity, unit: document.getElementById("unit").value,
      date: document.getElementById("harvestDate").value,
      notes: document.getElementById("notes").value.trim()
    });
    form.reset();
    message.textContent = result.synced ? "Harvest saved and synced to your farm account." : "Harvest saved on this device. Cloud sync is pending and will retry when you reconnect.";
  });
}
