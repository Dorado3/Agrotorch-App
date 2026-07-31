/*
----------------------------------------------------
AgroTorch CDRE Decision Card
Version 3.0.0
----------------------------------------------------
*/

export function decisionCard(context) {

    const execution =
        context.execution;

    const coach =
        context.coach;

    return `

    <div class="agro-card">

        <h2>🧠 Today's Decision</h2>

        <p>

            <strong>Overall Risk:</strong>

            ${context.disease.risk}

        </p>

        <p>

            <strong>Disease:</strong>

            ${context.disease.reason}

        </p>

        <p>

            <strong>Pest:</strong>

            ${context.pest.reason}

        </p>

        <p>

            <strong>Profit:</strong>

            ${context.profit.status}

        </p>

        <hr>

        <h3>🎯 Mission</h3>

        <p>

            <strong>

                ${context.mission.title}

            </strong>

        </p>

        <p>

            ${context.mission.reason}

        </p>

        <p>

            <strong>Expected Impact</strong>

        </p>

        <p>

            ${context.mission.impact}

        </p>

        <hr>

        <h3>🤖 AI Coach</h3>

        <p>

            <strong>

                ${coach.title}

            </strong>

        </p>

        <p>

            ${coach.message}

        </p>

        <hr>

        <h3>✅ Today's Progress</h3>

        ${execution.checklist.map(item => `

            <p>

                ${item.completed ? "✅" : "⬜"}

                ${item.title}

            </p>

        `).join("")}

        <hr>

        <h3>📊 Execution Score</h3>

        <h2>

            ${execution.score}%

        </h2>

    </div>

    `;

}
