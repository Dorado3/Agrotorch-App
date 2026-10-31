/*
 * AgroTorch Impact & Funding Intelligence
 * Reports only values supported by records already in the workspace.
 */
import { getWorkspace } from "../core/workspace/workspace.js";
import { getDashboardSummary } from "../services/dashboardSummary.js";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function number(value) {
  return Number(value || 0).toLocaleString();
}

function hasArea(farm) {
  return ["areaHectares", "hectares", "farmSizeHectares"]
    .some(key => Number.isFinite(Number(farm?.[key])) && Number(farm[key]) > 0);
}

function farmProfileStatus(farm) {
  const checks = [
    Boolean(farm.farmName || farm.name),
    Boolean(farm.crop || farm.cropType),
    Boolean(farm.state || farm.lga || farm.location),
    Boolean(farm.plantingDate || farm.transplantDate),
    hasArea(farm)
  ];
  return { complete: checks.filter(Boolean).length, total: checks.length };
}

export function impactPage() {
  const workspace = getWorkspace();
  const farms = Array.isArray(workspace.farms) ? workspace.farms : [];
  const activeFarm = workspace.activeFarm;
  const summary = getDashboardSummary();
  const profiles = farms.map(farmProfileStatus);
  const profileFields = profiles.reduce((sum, item) => sum + item.complete, 0);
  const profilePossible = profiles.reduce((sum, item) => sum + item.total, 0);
  const profileCoverage = profilePossible ? Math.round(profileFields / profilePossible * 100) : 0;
  const financialAvailable = Boolean(summary.hasFinancialData);
  const activityCount = Number(summary.totalActivities || 0);
  const revenue = financialAvailable ? number(summary.totalRevenue) : "Not recorded";
  const harvest = financialAvailable ? number(summary.totalHarvest) : "Not recorded";
  const locations = [...new Set(farms.map(farm => farm.state || farm.location).filter(Boolean))];
  const cropTypes = [...new Set(farms.map(farm => farm.crop || farm.cropType).filter(Boolean))];

  const checks = [
    { title: "Farm and crop profiles", detail: "Farm name, crop, location, production dates and measured area.", done: farms.length > 0 && profileCoverage >= 60 },
    { title: "Field activity history", detail: "Dated field operations and scouting observations.", done: activityCount > 0 },
    { title: "Production and harvest baseline", detail: "Harvest quantities linked to a farm, crop and production cycle.", done: financialAvailable && Number(summary.totalHarvest || 0) > 0 },
    { title: "Farm financial records", detail: "Recorded expenses and sales that can be reconciled.", done: financialAvailable },
    { title: "Verified impact evidence", detail: "Geotagged field evidence, beneficiary outcomes and supporting documents.", done: false }
  ];

  return `
    <section class="dashboard impact-page">
      <div class="impact-hero">
        <div class="impact-eyebrow">AGROTORCH • IMPACT INTELLIGENCE</div>
        <h2>Measure what matters.<br>Prove what changes.</h2>
        <p>Turn farm operations into credible evidence for partners, investors and development programmes.</p>
        <div class="impact-hero-meta">
          <span>🌍 Multi-farm visibility</span>
          <span>📈 Evidence-led reporting</span>
        </div>
      </div>

      <div class="impact-section-heading">
        <div><span class="impact-kicker">YOUR CURRENT DATA</span><h3>Impact snapshot</h3></div>
        <span class="impact-live-tag">LIVE WORKSPACE DATA</span>
      </div>
      <div class="impact-metrics">
        <article class="impact-metric"><span>Registered farms</span><strong>${number(farms.length)}</strong><small>Farm profiles in this account</small></article>
        <article class="impact-metric"><span>Farm locations</span><strong>${number(locations.length)}</strong><small>Distinct recorded locations</small></article>
        <article class="impact-metric"><span>Crop categories</span><strong>${number(cropTypes.length)}</strong><small>Distinct recorded crops</small></article>
        <article class="impact-metric"><span>Activity records</span><strong>${number(activityCount)}</strong><small>Active farm only</small></article>
      </div>

      <div class="impact-section-heading">
        <div><span class="impact-kicker">ACCOUNTABILITY</span><h3>Grant evidence readiness</h3></div>
        <span class="impact-coverage">${profileCoverage}% profile coverage</span>
      </div>
      <div class="impact-card">
        <p class="impact-note">This is a data-completeness indicator, not a grant eligibility score or funding prediction. Missing evidence is shown openly rather than estimated.</p>
        <div class="impact-progress"><span style="width:${profileCoverage}%"></span></div>
        <div class="impact-checklist">
          ${checks.map(item => `
            <div class="impact-check">
              <span class="impact-check-icon ${item.done ? "is-done" : "is-open"}">${item.done ? "✓" : "○"}</span>
              <div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.detail)}</p></div>
              <span class="impact-check-status">${item.done ? "Recorded" : "Needs data"}</span>
            </div>`).join("")}
        </div>
      </div>

      <div class="impact-section-heading">
        <div><span class="impact-kicker">ACTIVE FARM</span><h3>Production evidence</h3></div>
      </div>
      <div class="impact-card">
        <div class="impact-active-farm">
          <div><span class="impact-muted">Selected farm</span><strong>${escapeHtml(activeFarm?.farmName || activeFarm?.name || "No farm selected")}</strong><small>${escapeHtml(activeFarm?.crop || activeFarm?.cropType || "Crop not recorded")}</small></div>
          <span class="impact-farm-symbol">🌱</span>
        </div>
        <div class="impact-production-grid">
          <div><span>Recorded harvest</span><strong>${harvest}</strong></div>
          <div><span>Recorded revenue</span><strong>${revenue === "Not recorded" ? revenue : "₦" + revenue}</strong></div>
        </div>
        <p class="impact-footnote">Production and financial figures reflect the selected farm's current ProfitLens records. Values are not extrapolated to other farms.</p>
      </div>

      <div class="impact-section-heading">
        <div><span class="impact-kicker">PROGRAMME DEVELOPMENT</span><h3>What AgroTorch is building towards</h3></div>
      </div>
      <div class="impact-programme-grid">
        <article class="impact-programme"><span>01</span><strong>Beneficiary registry</strong><p>Farmer profiles, consent, location and inclusion data.</p><em>Planned capability</em></article>
        <article class="impact-programme"><span>02</span><strong>Outcome measurement</strong><p>Yield, income, jobs, climate resilience and before/after baselines.</p><em>Planned capability</em></article>
        <article class="impact-programme"><span>03</span><strong>Programme finance</strong><p>Approved budgets, disbursements, expenditure evidence and audit trails.</p><em>Planned capability</em></article>
        <article class="impact-programme"><span>04</span><strong>Field verification</strong><p>Time-stamped photos, GPS evidence, inspections and partner reports.</p><em>Planned capability</em></article>
      </div>

      <div class="impact-callout">
        <strong>Our funding principle</strong>
        <p>AgroTorch will never claim grant approval, beneficiary impact or financial results that cannot be supported by records. Every programme should be measurable, auditable and independently verifiable.</p>
      </div>
      <div class="impact-actions">
        <button class="action-btn" id="impactPrintBtn">Print impact snapshot</button>
        <button class="impact-secondary-btn" id="impactFarmBtn">Open farm hub</button>
      </div>
      <p class="impact-disclaimer">Early-stage workspace: grant application management, beneficiary consent workflows, independent verification and programme accounting are not yet implemented.</p>
    </section>`;
}

export function initImpactPage() {
  document.getElementById("impactPrintBtn")?.addEventListener("click", () => window.print());
  document.getElementById("impactFarmBtn")?.addEventListener("click", () => window.dispatchEvent(new CustomEvent("navigate-farms")));
}
