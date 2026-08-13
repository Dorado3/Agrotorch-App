/*
----------------------------------------------------
AgroTorch Executive Dashboard
Sprint 20 — Decision-First Experience
----------------------------------------------------
*/

import { AgroCard } from "../components/Card.js";
import { getDashboardSummary } from "../services/dashboardSummary.js";

export function dashboardPage() {

    const summary = getDashboardSummary();

    const hasFinancialData =
        Number(summary.totalRevenue || 0) > 0 ||
        Number(summary.totalExpenses || 0) > 0;

    const financialStatus =
        !hasFinancialData
            ? "NO DATA"
            : Number(summary.netProfit || 0) > 0
                ? "PROFIT"
                : Number(summary.netProfit || 0) < 0
                    ? "LOSS"
                    : "BREAK EVEN";

    const risk =
        summary.overallRisk || "LOW";

    const mission =
        summary.mission ||
        "Monitor Farm Conditions";

    const priority =
        summary.priority ||
        "Review today's farm conditions";

    const execution =
        summary.execution ?? 0;

    return `

    <section class="dashboard">

        <div class="hero-card">

            <p>🌾 AgroTorch AgriOS</p>

            <h2>
                ${summary.activeFarm || "No Farm Selected"}
            </h2>

            <p>
                Intelligent farm decisions for today.
            </p>

        </div>

        ${AgroCard(`

            <h3>🚨 Today's Decision</h3>

            <h2>
                ${priority}
            </h2>

            <p>
                ${summary.priorityReason ||
                "AgroTorch has identified the highest-priority action for this farm."}
            </p>

            <p>
                <strong>Risk:</strong>
                ${risk}
            </p>

            <p>
                <strong>💰 Estimated value at risk:</strong>
                ₦${Number(
                    summary.profitProtected || 0
                ).toLocaleString()}
            </p>

        `)}

        ${AgroCard(`

            <h3>🎯 Today's Mission</h3>

            <h2>
                ${mission}
            </h2>

            <p>
                ${summary.missionReason ||
                "Complete the highest-value farm action to improve decision accuracy and reduce management risk."}
            </p>

        `)}

        ${AgroCard(`

            <h3>📋 Today's Action</h3>

            <h2>
                ${priority}
            </h2>

            <button
                class="action-btn"
                id="dashboardTaskBtn"
            >
                ▶ START TODAY'S TASK
            </button>

        `)}

        <div class="stats-grid">

            <div class="stat-card">

                <div class="stat-icon">🟢</div>

                <h3>
                    ${summary.farmHealth ?? "--"}%
                </h3>

                <p>Farm Health</p>

            </div>

            <div class="stat-card">

                <div class="stat-icon">🐛</div>

                <h3>
                    ${summary.pestRisk || "--"}
                </h3>

                <p>Pest Risk</p>

            </div>

            <div class="stat-card">

                <div class="stat-icon">🦠</div>

                <h3>
                    ${summary.diseaseRisk || "--"}
                </h3>

                <p>Disease Risk</p>

            </div>

            <div class="stat-card">

                <div class="stat-icon">💰</div>

                <h3>
                    ${financialStatus}
                </h3>

                <p>Financial Status</p>

            </div>

        </div>

        ${AgroCard(`

            <h3>🤖 AgroTorch Coach</h3>

            <p>
                <strong>
                    ${summary.coachTitle ||
                    "Action Required"}
                </strong>
            </p>

            <p>
                ${summary.coachMessage ||
                "Complete today's highest-priority task to improve farm execution."}
            </p>

        `)}

        ${AgroCard(`

            <h3>📊 Today's Execution</h3>

            <h1>
                ${execution}%
            </h1>

            <p>
                Complete today's recommended actions
                to improve your execution score.
            </p>

        `)}

    </section>

    `;

}
