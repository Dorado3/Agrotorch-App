/*
 * AgroTorch Farm Hub
 */
import { getWorkspace, setActiveFarm } from "../core/workspace/workspace.js";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

export function myFarmPage() {
  const farms = getWorkspace().farms || [];
  if (!farms.length) {
    return `
      <section class="dashboard">
        <h2>🌾 Farm Hub</h2>
        <div class="agro-card"><h3>No farms yet</h3><p>Create your first farm profile to unlock the farm portal and CDRE.</p><button class="action-btn" id="addFirstFarmBtn">Register your first farm</button></div>
      </section>`;
  }

  return `
    <section class="dashboard">
      <h2>🌾 Farm Hub</h2>
      <button class="action-btn" id="addFarmFromHubBtn">＋ Register another farm</button>
      ${farms.map((farm, index) => `
        <div class="agro-card">
          <h3>${escapeHtml(farm.farmName || "Unnamed Farm")}</h3>
          <p><strong>Crop:</strong> ${escapeHtml(farm.crop || "Not specified")}</p>
          <p><strong>Location:</strong> ${escapeHtml([farm.lga, farm.state].filter(Boolean).join(", ") || farm.location || "Not recorded")}</p>
          <p><strong>Status:</strong> ${escapeHtml(farm.status || "Active")}</p>
          <button class="openFarmBtn agro-btn" data-index="${index}">Open Farm</button>
        </div>`
      ).join("")}
    </section>`;
}

export function initMyFarmPage() {
  document.getElementById("addFirstFarmBtn")?.addEventListener("click", () => window.dispatchEvent(new CustomEvent("navigate-add-farm")));
  document.getElementById("addFarmFromHubBtn")?.addEventListener("click", () => window.dispatchEvent(new CustomEvent("navigate-add-farm")));

  const workspace = getWorkspace();
  document.querySelectorAll(".openFarmBtn").forEach(button => {
    button.addEventListener("click", () => {
      const farm = workspace.farms[Number(button.dataset.index)];
      if (!farm) return;
      setActiveFarm(farm);
      window.dispatchEvent(new CustomEvent("farm-selected"));
    });
  });
}
