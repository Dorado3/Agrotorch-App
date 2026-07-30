/*
----------------------------------------------------
AgroTorch Task Card
Version 1.0.0
----------------------------------------------------
*/

export function taskCard(tasks = []) {

    return `

    <div class="agro-card">

        <h3>📋 Today's Tasks</h3>

        <ul>

            ${tasks.map(task => `

                <li>${task}</li>

            `).join("")}

        </ul>

    </div>

    `;

}
