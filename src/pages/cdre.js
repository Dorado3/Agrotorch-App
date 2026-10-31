import { getWorkspace } from "../core/workspace/workspace.js";
import { orchestrateFarmDecision } from "../core/orchestrator/DecisionOrchestrator.js";
import { TaskRepository } from "../repositories/TaskRepository.js";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function weatherTimestamp(value) {
  if (!value) return "Not available";
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toLocaleString() : "Not available";
}

export function cdrePage() {
  const farm = getWorkspace().activeFarm;
  if (!farm) {
    return `<section class="dashboard"><div class="hero-card"><h2>🧠 AgroTorch CDRE</h2><p>Your farm decision centre</p></div>
      <div class="agro-card"><h3>No farm selected</h3><p>Register a farm first. The CDRE needs a crop and field records before it can prepare a useful action plan.</p><button class="action-btn" id="cdreAddFarmBtn">Register a farm</button></div></section>`;
  }

  const decision = orchestrateFarmDecision(farm);
  const risk = decision.risk || "UNKNOWN";
  const riskClass = risk.toLowerCase();
  const weather = decision.weather || {};
  const alerts = (decision.alerts || []).map(alert =>
    `<li><strong>${escapeHtml(alert.level)}</strong> — ${escapeHtml(alert.message)}</li>`
  ).join("");
  const tasks = (decision.tasks || []).map(task => {
    const completed = Boolean(task.completed);
    return `<article class="agro-card cdre-task">
      <p><strong>${escapeHtml(task.priority || "NORMAL")} PRIORITY</strong> · ${completed ? "COMPLETED" : "OPEN"}</p>
      <h3>${escapeHtml(task.title)}</h3>
      <p>${escapeHtml(task.reason)}</p>
      <p>${escapeHtml(task.instructions)}</p>
      <small>Safety: ${escapeHtml(task.safety)}</small>
      ${completed
        ? `<p class="task-complete-status">✓ Completed ${escapeHtml(task.completedAt || "")}</p>`
        : `<form class="cdre-completion-form" data-task-id="${escapeHtml(task.id)}">
            <label>Field observation / completion note</label>
            <textarea name="observation" rows="2" placeholder="What did you observe or complete?" required></textarea>
            <button type="submit" class="action-btn">Mark task complete</button>
            <p class="task-save-message" role="status" aria-live="polite"></p>
          </form>`}
    </article>`;
  }).join("");

  return `<section class="dashboard">
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
      <p><strong>Farm health:</strong> ${decision.health === null ? "Not enough data to score" : escapeHtml(decision.health + "%")}</p>
    </div>
    <div class="agro-card">
      <h3>🌦️ Local Weather Context</h3>
      <p><strong>Status:</strong> ${escapeHtml(weather.status || "UNAVAILABLE")}</p>
      <p><strong>Location:</strong> ${escapeHtml(weather.location || [farm.lga, farm.state].filter(Boolean).join(", ") || "Not recorded")}</p>
      <p><strong>Source:</strong> ${escapeHtml(weather.source || "Not connected")}</p>
      <p><strong>Last updated:</strong> ${escapeHtml(weatherTimestamp(weather.observedAt))}</p>
      <p><strong>Temperature:</strong> ${weather.temperature === null || weather.temperature === undefined ? "—" : escapeHtml(weather.temperature + "°C")}</p>
      <p><strong>Relative humidity:</strong> ${weather.humidity === null || weather.humidity === undefined ? "—" : escapeHtml(weather.humidity + "%")}</p>
      <p><strong>Rain probability (next 6 hours):</strong> ${weather.rainfallProbability === null || weather.rainfallProbability === undefined ? "—" : escapeHtml(weather.rainfallProbability + "%")}</p>
      <p>${escapeHtml(weather.recommendation || "Weather readings are environmental context, not a crop diagnosis.")}</p>
      <small>Weather data provided by Open-Meteo. Weather-based risk is withheld when readings are stale or unavailable.</small>
    </div>
    <div class="agro-card"><h3>Alerts and data gaps</h3>
      ${alerts ? `<ul>${alerts}</ul>` : "<p>No active alerts have been generated from the available records.</p>"}
    </div>
    <h3>Today's recommended actions</h3>
    ${tasks || "<div class='agro-card'><p>No actions are available yet.</p></div>"}
    <p><small>CDRE guidance supports farm decisions; it does not replace field inspection or agronomist diagnosis.</small></p>
  </section>`;
}

export function initCDREPage() {
  document.querySelectorAll(".cdre-completion-form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const message = form.querySelector(".task-save-message");
      const observation = form.querySelector('[name="observation"]')?.value.trim();
      if (!observation) { message.textContent = "Add a short field note before completing this task."; return; }
      const task = TaskRepository.complete(form.dataset.taskId, { observation });
      if (!task) { message.textContent = "This task could not be found. Refresh the decision page and try again."; return; }
      form.innerHTML = "<p class='task-complete-status'>✓ Task marked complete. It will sync to your farm account when connected.</p>";
    });
  });
}
