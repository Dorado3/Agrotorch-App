/*
----------------------------------------------------
AgroTorch Command Centre
Dashboard v3.0
----------------------------------------------------
*/

import { AgroCard } from "../components/Card.js";
import { getDashboardSummary } from "../services/dashboardSummary.js";

export function dashboardPage() {

    const summary = getDashboardSummary();

    return `

    <section class="dashboard">

        <h2>🌞 Good Morning</h2>

        <p>Welcome back to AgroTorch AgriOS.</p>

        ${AgroCard(`
            <h3>🌾 Total Farms</h3>
            <h1>${summary.totalFarms}</h1>
        `)}

        ${AgroCard(`
            <h3>📋 Activities</h3>
            <h1>${summary.totalActivities}</h1>
        `)}

        ${AgroCard(`
            <h3>💵 Revenue</h3>
            <h2>₦${summary.totalRevenue.toLocaleString()}</h2>
        `)}

        ${AgroCard(`
            <h3>💰 Expenses</h3>
            <h2>₦${summary.totalExpenses.toLocaleString()}</h2>
        `)}

        ${AgroCard(`
            <h3>📈 Net Profit</h3>
            <h2>₦${summary.netProfit.toLocaleString()}</h2>
        `)}

        ${AgroCard(`
            <h3>🌾 Harvest</h3>
            <h2>${summary.totalHarvest.toLocaleString()}</h2>
        `)}

        ${AgroCard(`
            <h3>📊 Profit Margin</h3>
            <h2>${summary.profitMargin.toFixed(1)}%</h2>
        `)}

        ${AgroCard(`
            <h3>⏳ Outstanding Payments</h3>
            <h2>₦${summary.outstandingPayments.toLocaleString()}</h2>
        `)}

    </section>

    `;

}
