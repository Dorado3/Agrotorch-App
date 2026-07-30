/*
----------------------------------------------------
AgroTorch Farm Workspace
Version 5.0.0
----------------------------------------------------
*/

import { buildFarmDashboard } from "../../core/dashboard/farmDashboard.js";
import { getWorkspace } from "../../core/workspace/workspace.js";

import { getFarmWeek } from "../../core/calendar/farmCalendar.js";
import { getGrowthStage } from "../../core/calendar/growthStage.js";
import { getTodayTasks } from "../../core/calendar/taskScheduler.js";

import { evaluateFarmRisk } from "../../core/cdre/ruleEngine.js";

import { taskCard } from "../../components/taskCard.js";
import { alertCard } from "../../components/alertCard.js";

export function farmWorkspacePage() {

    const workspace = getWorkspace();

    const farm = workspace.activeFarm;

    const dashboard = buildFarmDashboard();

    if (!farm) {

        return `

        <section class="dashboard">

            <div class="agro-card">

                <h2>No Active Farm</h2>

                <p>Please select a farm first.</p>

            </div>

        </section>

        `;

    }

    console.log("ACTIVE FARM", farm);

    const effectivePlantingDate =

        farm.productionMethod === "Nursery"

            ? (

                farm.transplantDate ||

                farm.plantingDate ||

                farm.nurseryDate

            )

            : (

                farm.plantingDate ||

                farm.nurseryDate

            );

    const week =
        getFarmWeek(effectivePlantingDate);

    const stage =
        getGrowthStage(
            farm.crop,
            week
        );

    const tasks =
        getTodayTasks(farm);

    const cdre =
        evaluateFarmRisk(
            farm,
            dashboard
        );

    return `

    <section class="dashboard">

        <div class="hero-card">

            <h2>🌾 ${dashboard.farmName}</h2>

            <p>${dashboard.crop}</p>

            <p>

                <strong>Week:</strong>

                ${week}

            </p>

            <p>

                <strong>Stage:</strong>

                ${stage}

            </p>

        </div>

        ${taskCard(tasks)}

        ${alertCard(cdre.alerts)}

        <div class="dashboard-grid">

            <div class="dashboard-card">

                <h3>📝 Activities</h3>

                <h2>${dashboard.activities}</h2>

            </div>

            <div class="dashboard-card">

                <h3>💰 Expenses</h3>

                <h2>₦${dashboard.expenses}</h2>

            </div>

            <div class="dashboard-card">

                <h3>📦 Harvest</h3>

                <h2>${dashboard.harvests}</h2>

            </div>

            <div class="dashboard-card">

                <h3>💵 Sales</h3>

                <h2>${dashboard.sales}</h2>

            </div>

            <div class="dashboard-card">

                <h3>📈 Revenue</h3>

                <h2>₦${dashboard.revenue}</h2>

            </div>

            <div class="dashboard-card">

                <h3>💹 Profit</h3>

                <h2>₦${dashboard.profit}</h2>

            </div>

            <div class="dashboard-card">

                <h3>🤖 CDRE Status</h3>

                <h2>${cdre.risk}</h2>

            </div>

            <div class="dashboard-card">

                <h3>⚙️ Farm Settings</h3>

                <p>Coming Soon</p>

            </div>

        </div>

    </section>

    `;

}
