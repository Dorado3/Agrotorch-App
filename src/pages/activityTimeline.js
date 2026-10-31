import { getFarmActivities } from "../services/activityStorage.js";
import { getWorkspace } from "../core/workspace/workspace.js";

function esc(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

export function activityTimelinePage() {
  const farm = getWorkspace().activeFarm;
  if (!farm) return `<section class="dashboard"><div class="agro-card"><h2>Activity Timeline</h2><p>Select a farm to view its records.</p></div></section>`;
  const activities = getFarmActivities(farm.id);
  if (!activities.length) {
    return `<section class="dashboard"><h2>📝 Activity Timeline</h2><div class="agro-card"><h3>No activities yet</h3><p>Start recording field observations and farm operations for ${esc(farm.farmName)}.</p></div></section>`;
  }
  return `<section class="dashboard"><h2>📝 Activity Timeline</h2><p>${esc(farm.farmName)}</p>
    ${activities.slice().sort((a,b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)).map(activity => `
      <div class="agro-card">
        <h3>${esc(activity.activity || "Farm activity")}</h3>
        <p><strong>Date:</strong> ${esc(activity.date || activity.createdAt || "Not recorded")}</p>
        <p>${esc(activity.notes || "")}</p>
      </div>`).join("")}
  </section>`;
}
