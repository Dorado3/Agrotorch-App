/*
----------------------------------------------------
AgroTorch Task Card
Version 2.0.0
----------------------------------------------------
*/

export function taskCard(tasks = []) {

    return `

    <div class="agro-card">

        <h2>📋 Today's Farm Tasks</h2>

        ${tasks.map(task => `

            <div class="task-item">

                <h3>

                    ${task.completed ? "✅" : "⬜"}

                    ${task.title}

                </h3>

                <p>

                    ${task.reason}

                </p>

                <button

                    class="primary-button"

                    data-task="${task.id}"

                >

                    ${task.completed ? "Completed" : "Complete"}

                </button>

                <hr>

            </div>

        `).join("")}

    </div>

    `;

}
