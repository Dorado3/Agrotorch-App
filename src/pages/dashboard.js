/*
 * AgroTorch Executive Dashboard — decision-first home
 */
import { AgroCard } from "../components/Card.js";
import { getDashboardSummary } from "../services/dashboardSummary.js";

export function dashboardPage() {
  const summary = getDashboardSummary();
  const hasFinancialData = Boolean(summary.hasFinancialData);
  const financialStatus = !hasFinancialData
    ? "NO DATA"
    : Number(summary.netProfit || 0) > 0
      ? "PROFIT"
      : Number(summary.netProfit || 0) < 0 ? "LOSS" : "BREAK EVEN";
  const risk = summary.overallRisk || "UNKNOWN";
  const mission = summary.mission || "Complete a field scouting round";
  const priority = summary.priority || "Complete today's farm checks";
  const execution = summary.execution ?? 0;
  const health = summary.farmHealth === null ? "—" : summary.farmHealth;

  return `
    <section class="dashboard">
      <div class="hero-card">
        <p>🌾 AgroTorch AgriOS</p>
        <h2>${summary.activeFarm || "No Farm Selected"}</h2>
        <p>Evidence-led farm decisions for today.</p>
      </div>
      ${AgroCard(`
        <h3>🧠 Today's Decision</h3>
        <h2>${priority}</h2>
        <p>${summary.priorityReason || "Select a farm and complete its profile to generate a reliable plan."}</p>
        <p><strong>Risk:</strong> ${risk}</p>
        <p><strong>Estimated value at risk:</strong> ₦${Number(summary.profitProtected || 0).toLocaleString()}</p>
      `)}
      ${AgroCard(`
        <h3>🎯 Today's Mission</h3>
        <h2>${mission}</h2>
        <p>${summary.missionReason || "Complete the highest-value field action to improve decision accuracy."}</p>
      `)}
      ${AgroCard(`
        <h3>📝 Today's Action</h3>
        <h2>${priority}</h2>
        <button class="action-btn" id="dashboardTaskBtn">✓ OPEN TODAY'S ACTIONS</button>
      `)}
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-icon">🌱</div><h3>${health}${health === "—" ? "" : "%"}</h3><p>Farm Health</p></div>
        <div class="stat-card"><div class="stat-icon">🐛</div><h3>${summary.pestRisk || "UNKNOWN"}</h3><p>Pest Risk</p></div>
        <div class="stat-card"><div class="stat-icon">🦠</div><h3>${summary.diseaseRisk || "UNKNOWN"}</h3><p>Disease Risk</p></div>
        <div class="stat-card"><div class="stat-icon">💹</div><h3>${financialStatus}</h3><p>Financial Status</p></div>
      </div>
      ${AgroCard(`
        <h3>🤖 AgroTorch Coach</h3>
        <p><strong>${summary.coachTitle || "Action Required"}</strong></p>
        <p>${summary.coachMessage || "Complete today's highest-priority field check to improve farm records."}</p>
      `)}
      ${AgroCard(`
        <h3>📊 Today's Execution</h3>
        <h2>${execution}%</h2>
        <p>Complete recommended actions and record observations to improve execution tracking.</p>
      `)}
    </section>`;
}
