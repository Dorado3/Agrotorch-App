import { getFarmHarvests } from "../services/harvestStorage.js";
import { HarvestRepository } from "../repositories/HarvestRepository.js";
import { getWorkspace } from "../core/workspace/workspace.js";

function esc(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

export function harvestTimelinePage() {
  const farm = getWorkspace().activeFarm;
  if (!farm) return `<section class="dashboard"><div class="agro-card"><h2>Harvest History</h2><p>Select a farm to view its harvest records.</p></div></section>`;
  const harvests = getFarmHarvests(farm.id);
  if (!harvests.length) return `<section class="dashboard"><h2>🌾 Harvest History</h2><div class="agro-card"><h3>No harvest records yet</h3><p>Record the first harvest for ${esc(farm.farmName)}.</p></div></section>`;
  return `<section class="dashboard"><h2>🌾 Harvest History</h2><p>${esc(farm.farmName)}</p>
    ${harvests.slice().sort((a,b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)).map(harvest => `
      <div class="agro-card">
        <h3>${esc(harvest.crop || farm.crop || "Harvest")}</h3>
        <p><strong>Quantity:</strong> ${esc(harvest.quantity)} ${esc(harvest.unit || "")}</p>
        <p><strong>Date:</strong> ${esc(harvest.date || "Not recorded")}</p>
        <p>${esc(harvest.notes || "")}</p>
        <button class="deleteHarvest" data-id="${esc(harvest.id)}">Delete</button>
      </div>`).join("")}
  </section>`;
}

export function initHarvestTimeline() {
  document.querySelectorAll(".deleteHarvest").forEach(button => {
    button.addEventListener("click", async () => {
      button.disabled = true;
      try {
        await HarvestRepository.delete(button.dataset.id);
        const page = document.getElementById("page");
        if (page) { page.innerHTML = harvestTimelinePage(); initHarvestTimeline(); }
      } catch (error) {
        button.disabled = false;
        alert(error?.message || "Could not delete this harvest. Try again when connected.");
      }
    });
  });
}
