/*
----------------------------------------------------
AgroTorch AI Work Plan Card
Version 1.0.0
----------------------------------------------------
*/

export function workPlanCard(tasks = []) {

    if (!tasks.length) {

        return `

        <div class="dashboard-card">

            <h3>📋 Today's AI Work Plan</h3>

            <p>No tasks generated for today.</p>

        </div>

        `;

    }

    const list = tasks.map(task => `

        <div class="task-row">

            <label>

                <input type="checkbox">

                <strong>${task.title}</strong>

            </label>

            <p>${task.reason}</p>

        </div>

    `).join("");

    return `

    <div class="dashboard-card">

        <h3>📋 Today's AI Work Plan</h3>

        ${list}

    </div>

    `;

}
