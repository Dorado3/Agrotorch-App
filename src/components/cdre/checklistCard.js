/*
----------------------------------------------------
AgroTorch Checklist Card
Version 1.0.0
----------------------------------------------------
*/

export function checklistCard(checklist) {

    return `

    <div class="dashboard-card">

        <h3>✅ Today's Progress</h3>

        ${checklist.map(item => `

            <p>

                ${item.completed ? "✅" : "⬜"} ${item.title}

            </p>

        `).join("")}

    </div>

    `;

}
