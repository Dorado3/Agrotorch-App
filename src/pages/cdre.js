import { getWorkspace } from "../core/workspace/workspace.js";
import { orchestrateFarmDecision } from "../core/orchestrator/DecisionOrchestrator.js";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

export function cdrePage() {
  const farm = getWorkspace().activeFarm;
  if (!farm) {
    return `
      <section class="dashboard">
        <div class="hero-card"><h2>🧠 AgroTorch CDRE</h2><p>Your farm decision centre</p></div>
        <div class="agro-card"><h3>No farm selected</h3><p>Register a farm first. The CDRE needs a crop and field records before it can prepare a useful action plan.</p><button class="action-btn" id="cdreAddFarmBtn">Register a farm</button></div>
      </section>`;
  }

  const decision = orchestrateFarmDecision(farm);
  const risk = decision.risk || "UNKNOWN";
  const riskClass = risk.toLowerCase();
  const alerts = (decision.alerts || []).map(alert =>
    `<li><strong>${escapeHtml(alert.level)}</strong> — ${escapeHtml(alert.message)}</li>`
  ).join("");
  const tasks = (decision.tasks || []).map(task => `
    <article class="agro-card">
      <p><strong>${escapeHtml(task.priority || "NORMAL")} PRIORITY</strong></p>
      <h3>${escapeHtml(task.title)}</h3>
      <p>${escapeHtml(task.reason)}</p>
      <p>${escapeHtml(task.instructions)}</p>
      <small>Safety: ${escapeHtml(task.safety)}</small>
    </article>`
  ).join("");

  return `
    <section class="dashboard">
      <div class="hero-card">
        <p>🧠 CROP DECISION & RISK ENGINE</p>
        <h2>${escapeHtml(farm.farmName || "My Farm")}</h2>
        <p>${escapeHtml(farm.crop || "Crop not specified")} · ${escapeHtml(farm.variety || "Variety not recorded")}</p>
      </div>
      <div class="agro-card">
        <p>OVERALL EVIDENCE-BASED RISK</p>
        <h2 class="cdre-risk cdre-risk-${riskClass}">${escapeHtml(risk)}</h2>
        <p>${risk === "UNKNOWN" ? "Not enough verified field or weather evidence to grade this farm's risk. Complete the actions below to improve the decision." : "Risk is based on the farm records and observations currently available."}</p>
        <p><strong>Estimated crop stage:</strong> ${escapeHtml(decision.stage || "Unknown")} ${decision.week ? "(week " + escapeHtml(decision.week) + ")" : ""}</p>
        <p><strong>Weather:</strong> ${escapeHtml(decision.weather?.status || "UNAVAILABLE")} — ${escapeHtml(decision.weather?.recommendation || "No verified weather feed is connected.")}</p>
      </div>
      <div class="agro-card">
        <h3>Alerts and data gaps</h3>
        ${alerts ? `<ul>${alerts}</ul>` : "<p>No active alerts have been generated from the available records.</p>"}
      </div>
      <h3>Today's recommended actions</h3>
      ${tasks || "<div class='agro-card'><p>No actions are available yet.</p></div>"}
      <p><small>CDRE guidance supports farm decisions; it does not replace field inspection or agronomist diagnosis. Weather-based risk remains unknown until verified readings are connected.</small></p>
    </section>`;
}
