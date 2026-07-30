import { saveExpense } from "../services/expenseStorage.js";
import { getWorkspace } from "../core/workspace/workspace.js";

export function addExpensePage() {

    return `
    <section class="dashboard">

        <div class="hero-card">

            <h2>💰 Record Expense</h2>

            <p>Record farm expenses.</p>

        </div>

        <form id="expenseForm" class="farm-form">

            <label>Expense</label>

            <input
                type="text"
                id="expenseTitle"
                required
            >

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

    const form =
        document.getElementById("expenseForm");

    if (!form) return;

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const workspace =
            getWorkspace();

        const farm =
            workspace.activeFarm;

        if (!farm){

            alert("Please select a farm first.");

            return;

        }

        const expense = {

            farmId: farm.id,

            farmName: farm.farmName,

            title:
                document.getElementById("expenseTitle").value,

            amount:
                Number(document.getElementById("amount").value),

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
