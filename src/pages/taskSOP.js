/*
----------------------------------------------------
AgroTorch Task SOP
Version 1.0.0
----------------------------------------------------
*/

export function taskSOPPage(task) {

    return `

    <div class="agro-card">

        <h2>🌾 ${task.title}</h2>

        <hr>

        <h3>🎯 Objective</h3>

        <p>

            ${task.objective || "Complete today's farm assignment correctly."}

        </p>

        <hr>

        <h3>📖 Instructions</h3>

        <p>

            ${task.instructions || task.reason}

        </p>

        <hr>

        <h3>🧪 Materials</h3>

        <p>

            ${task.materials || "See farm inventory."}

        </p>

        <hr>

        <h3>⚠ Safety</h3>

        <p>

            ${task.safety || "Use appropriate PPE and follow SOP."}

        </p>

        <hr>

        <button
            id="startTaskBtn"
            class="primary-button">

            ▶ START TASK

        </button>

    </div>

    `;

}
