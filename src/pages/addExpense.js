import { saveExpense } from "../services/expenseStorage.js";

export function addExpensePage() {

    return `
    <section class="dashboard">

        <div class="hero-card">

            <h2>💰 Add Expense</h2>

            <p>Record farm expenses.</p>

        </div>

        <form id="expenseForm" class="farm-form">

            <label>Expense Type</label>

            <select id="expenseType" required>

                <option value="">Select Expense</option>

                <option>Seeds</option>

                <option>Fertilizer</option>

                <option>Chemicals</option>

                <option>Labour</option>

                <option>Diesel</option>

                <option>Machinery Hire</option>

                <option>Transport</option>

                <option>Miscellaneous</option>

            </select>

            <label>Amount (₦)</label>

            <input
                type="number"
                id="amount"
                required
            >

            <label>Date</label>

            <input
                type="date"
                id="expenseDate"
                required
            >

            <label>Notes</label>

            <textarea
                id="notes"
                rows="3"
                placeholder="Optional"
            ></textarea>

            <button
                type="submit"
                class="action-btn"
            >
                💾 Save Expense
            </button>

        </form>

        <div id="expenseMessage"></div>

    </section>
    `;

}

export function initAddExpensePage() {

    const form = document.getElementById("expenseForm");

    if (!form) return;

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const expense = {

            type:
                document.getElementById("expenseType").value,

            amount:
                document.getElementById("amount").value,

            date:
                document.getElementById("expenseDate").value,

            notes:
                document.getElementById("notes").value

        };

        saveExpense(expense);

        form.reset();

        document.getElementById("expenseMessage").innerHTML = `
            <p style="color:green;font-weight:bold;margin-top:20px;">
                ✅ Expense Saved Successfully
            </p>
        `;

    });

}