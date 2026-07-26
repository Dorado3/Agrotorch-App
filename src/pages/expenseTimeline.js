import {
    getExpenses,
    deleteExpense
} from "../services/expenseStorage.js";

export function expenseTimelinePage() {

    const expenses = getExpenses();

    if (expenses.length === 0) {

        return `
        <section class="dashboard">

            <h2>💰 Expense History</h2>

            <div class="agro-card">

                <h3>No Expenses Yet</h3>

                <p>
                    Record your first farm expense.
                </p>

            </div>

        </section>
        `;

    }

    const total = expenses.reduce(
        (sum, expense) =>
            sum + Number(expense.amount),
        0
    );

    return `
    <section class="dashboard">

        <h2>💰 Expense History</h2>

        <div class="hero-card">

            <h3>Total Expenses</h3>

            <h2>₦${total.toLocaleString()}</h2>

        </div>

        ${expenses.map(expense => `

            <div class="agro-card">

                <h3>${expense.type}</h3>

                <p><strong>Amount:</strong> ₦${Number(expense.amount).toLocaleString()}</p>

                <p><strong>Date:</strong> ${expense.date}</p>

                <p>${expense.notes || ""}</p>

                <button
                    class="deleteExpense"
                    data-id="${expense.id}"
                >
                    Delete
                </button>

            </div>

        `).join("")}

    </section>
    `;

}

export function initExpenseTimeline() {

    document
        .querySelectorAll(".deleteExpense")
        .forEach(button => {

            button.addEventListener("click", () => {

                deleteExpense(
                    Number(button.dataset.id)
                );

                location.reload();

            });

        });

}