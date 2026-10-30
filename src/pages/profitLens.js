import { getProfitSummary } from "../services/profitLens.js";
import { getWorkspace } from "../core/workspace/workspace.js";

export function profitLensPage() {
  const farm = getWorkspace().activeFarm;
  if (!farm) {
    return `<section class="dashboard"><div class="agro-card"><h2>📈 ProfitLens</h2><p>Select or register a farm to view its financial performance.</p></div></section>`;
  }
  const summary = getProfitSummary(farm.id);
  const money = value => "₦" + Number(value || 0).toLocaleString();
  return `
    <section class="dashboard">
      <div class="hero-card"><h2>📈 ProfitLens™</h2><p>${farm.farmName} · ${farm.crop || "Crop not specified"}</p><p>Farm Business Intelligence</p></div>
      ${!summary.hasFinancialData ? `<div class="agro-card"><h3>NO FINANCIAL DATA YET</h3><p>Record farm expenses and produce sales to calculate profit, margins and outstanding payments. An empty ledger is not the same as breaking even.</p></div>` : ""}
      <div class="agro-card"><h3>Financial Status</h3><h2>${summary.status}</h2></div>
      <div class="agro-card"><h3>💵 Total Revenue</h3><h2>${money(summary.totalRevenue)}</h2></div>
      <div class="agro-card"><h3>💰 Total Expenses</h3><h2>${money(summary.totalExpenses)}</h2></div>
      <div class="agro-card"><h3>📈 Net Profit / Loss</h3><h2>${money(summary.netProfit)}</h2></div>
      <div class="agro-card"><h3>📊 Profit Margin</h3><h2>${summary.hasFinancialData ? summary.profitMargin.toFixed(1) + "%" : "—"}</h2></div>
      <div class="agro-card"><h3>🌾 Total Harvest</h3><h2>${summary.totalHarvest.toLocaleString()}</h2></div>
      <div class="agro-card"><h3>⏳ Outstanding Payments</h3><h2>${money(summary.outstandingPayments)}</h2></div>
    </section>`;
}
