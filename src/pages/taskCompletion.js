/*
----------------------------------------------------
AgroTorch Task Completion
Version 1.0.0
----------------------------------------------------
*/

export function taskCompletionPage(task) {

    return `

    <div class="agro-card">

        <h2>✅ Complete Task</h2>

        <h3>${task.title}</h3>

        <hr>

        <label>

            💰 Expense (₦)

        </label>

        <input
            id="expenseAmount"
            type="number"
            placeholder="0">

        <label>

            🌾 Harvest Quantity

        </label>

        <input
            id="harvestQuantity"
            type="number"
            placeholder="0">

        <label>

            💵 Sales (₦)

        </label>

        <input
            id="salesAmount"
            type="number"
            placeholder="0">

        <label>

            📝 Observation

        </label>

        <textarea
            id="taskObservation"
            placeholder="Write observations here..."></textarea>

        <br><br>

        <button
            id="saveTaskBtn"
            class="primary-button">

            ✅ COMPLETE TASK

        </button>

    </div>

    `;

}
