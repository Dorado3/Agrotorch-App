/*
 * AgroTorch Command Center
 */
import { getWorkspace } from "../../core/workspace/workspace.js";
import { buildFarmDashboard } from "../../core/dashboard/farmDashboard.js";
import { orchestrateFarmDecision } from "../../core/orchestrator/DecisionOrchestrator.js";
import { decisionCard } from "../../components/cdre/decisionCard.js";

function esc(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

export function commandCenterPage() {
  const farm = getWorkspace().activeFarm;
  if (!farm) {
    return `<section class="dashboard"><div class="hero-card"><h2>🚀 Welcome to AgroTorch</h2><p>Create or select a farm first.</p></div></section>`;
  }
  const dashboard = buildFarmDashboard(farm);
  const context = orchestrateFarmDecision(farm);
  const health = context.health === null ? "Not enough data" : context.health + "%";

  return `<section class="dashboard">
    <div class="hero-card"><h1>🌅 Farm Command Centre</h1><h2>${esc(farm.farmName)}</h2><p>${esc(farm.crop || "Crop not specified")}</p></div>
    <div class="agro-card"><h2>🤖 Today's Highest Priority</h2><h3>${esc(context.priority.title)}</h3><p>${esc(context.priority.reason)}</p>
      <p><strong>Economic Impact</strong></p><p>${esc(context.impact.message)}</p></div>
    ${decisionCard(context)}
    <div class="dashboard-grid">
      <div class="dashboard-card"><h3>🌱 Farm Health</h3><h2>${health}</h2></div>
      <div class="dashboard-card"><h3>⚠ Overall Risk</h3><h2>${esc(context.risk)}</h2></div>
      <div class="dashboard-card"><h3>🦠 Disease Risk</h3><h2>${esc(context.disease.risk)}</h2></div>
      <div class="dashboard-card"><h3>🐛 Pest Risk</h3><h2>${esc(context.pest.risk)}</h2></div>
      <div class="dashboard-card"><h3>💰 Profit Status</h3><h2>${esc(context.profit.status)}</h2></div>
      <div class="dashboard-card"><h3>📢 Alerts</h3><h2>${context.alerts.length}</h2></div>
      <div class="dashboard-card"><h3>📊 Execution</h3><h2>${Number(context.execution.score || 0)}%</h2></div>
      <div class="dashboard-card"><h3>📦 Harvest</h3><h2>${dashboard.harvests}</h2></div>
      <div class="dashboard-card"><h3>📈 Revenue</h3><h2>₦${Number(dashboard.revenue).toLocaleString()}</h2></div>
    </div>
  </section>`;
}
