/*
----------------------------------------------------
AgroTorch CDRE Decision Card
Version 4.0.0
----------------------------------------------------
*/

export function decisionCard(context) {

    const execution =
        context.execution;

    const coach =
        context.coach;

    const workPlan =
        context.workPlan || [];

    return `

    <div class="agro-card">

        <h2>🧠 Today's Decision</h2>

        <p>

            <strong>Overall Risk:</strong>

            ${context.risk}

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

        <h3>📋 Today's Farm Task</h3>

${workPlan.map((task, index) => `

    <div
        class="task-card"
        data-task="${index}"
        style="
            margin-bottom:12px;
            padding:12px;
            border:1px solid #ddd;
            border-radius:8px;
            cursor:pointer;
        ">

        <p>

            ▶ <strong>${task.title}</strong>

        </p>

        <small>

            ${task.reason}

        </small>

    </div>

`).join("")}

        <hr>

        <h3>🤖 Coach</h3>

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
