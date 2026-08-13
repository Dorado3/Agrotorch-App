/*
----------------------------------------------------
AgroTorch Command Center
Version 4.0.0
----------------------------------------------------
*/

import { getWorkspace } from "../../core/workspace/workspace.js";
import { buildFarmDashboard } from "../../core/dashboard/farmDashboard.js";
import { orchestrateFarmDecision } from "../../core/orchestrator/DecisionOrchestrator.js";

import { decisionCard } from "../../components/cdre/decisionCard.js";

export function commandCenterPage() {

    const workspace =
        getWorkspace();

    const farm =
        workspace.activeFarm;

    if (!farm) {

        return `

        <section class="dashboard">

            <div class="hero-card">

                <h2>🚀 Welcome to AgroTorch</h2>

                <p>Create or select a farm first.</p>

            </div>

        </section>

        `;

    }

    const dashboard =
        buildFarmDashboard();

    const context =
        orchestrateFarmDecision(farm);

    return `

<section class="dashboard">

<div class="hero-card">

<h1>🌅 Good Morning</h1>

<h2>${farm.farmName}</h2>

<p>${farm.crop}</p>

</div>

<div class="agro-card">

<h2>🤖 Today's Highest Priority</h2>

<h3>${context.priority.title}</h3>

<p>${context.priority.reason}</p>

<hr>

<p>

<strong>💰 Economic Impact</strong>

</p>

<p>

${context.impact.message}

</p>

</div>

${decisionCard(context)}

<div class="dashboard-grid">

<div class="dashboard-card">

<h3>🟢 Farm Health</h3>

<h1>${context.health}%</h1>

</div>

<div class="dashboard-card">

<h3>⚠ Overall Risk</h3>

<h2>${context.risk}</h2>

</div>

<div class="dashboard-card">

<h3>🦠 Disease Risk</h3>

<h2>${context.disease.risk}</h2>

</div>

<div class="dashboard-card">

<h3>🐛 Pest Risk</h3>

<h2>${context.pest.risk}</h2>

</div>

<div class="dashboard-card">

<h3>💰 Profit Status</h3>

<h2>${context.profit.status}</h2>

</div>

<div class="dashboard-card">

<h3>📢 Alerts</h3>

<h2>${context.alerts.length}</h2>

</div>

<div class="dashboard-card">

<h3>📊 Execution</h3>

<h2>${context.execution.score}%</h2>

</div>

<div class="dashboard-card">

<h3>📦 Harvest</h3>

<h2>${dashboard.harvests}</h2>

</div>

<div class="dashboard-card">

<h3>📈 Revenue</h3>

<h2>₦${dashboard.revenue}</h2>

</div>

</div>

</section>

`;

}
