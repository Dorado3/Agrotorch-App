import { getProfitSummary } from "../services/profitLens.js";

export function profitLensPage() {

    const summary = getProfitSummary();

    return `
    <section class="dashboard">

        <div class="hero-card">

            <h2>📈 ProfitLens™</h2>

            <p>Farm Business Intelligence</p>

        </div>

        <div class="agro-card">

            <h3>💵 Total Revenue</h3>

            <h2>₦${summary.totalRevenue.toLocaleString()}</h2>

        </div>

        <div class="agro-card">

            <h3>💰 Total Expenses</h3>

            <h2>₦${summary.totalExpenses.toLocaleString()}</h2>

        </div>

        <div class="agro-card">

            <h3>📈 Net Profit</h3>

            <h2>₦${summary.netProfit.toLocaleString()}</h2>

        </div>

        <div class="agro-card">

            <h3>📊 Profit Margin</h3>

            <h2>${summary.profitMargin.toFixed(1)}%</h2>

        </div>

        <div class="agro-card">

            <h3>🌾 Total Harvest</h3>

            <h2>${summary.totalHarvest.toLocaleString()}</h2>

        </div>

        <div class="agro-card">

            <h3>⏳ Outstanding Payments</h3>

            <h2>₦${summary.outstandingPayments.toLocaleString()}</h2>

        </div>

    </section>
    `;

}
