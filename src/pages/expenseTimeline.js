import { getFarmExpenses } from "../services/expenseStorage.js";
import { ExpenseRepository } from "../repositories/ExpenseRepository.js";
import { getWorkspace } from "../core/workspace/workspace.js";

function esc(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

export function expenseTimelinePage() {
  const farm = getWorkspace().activeFarm;
  if (!farm) return `<section class="dashboard"><div class="agro-card"><h2>Expense History</h2><p>Select a farm to view its expenses.</p></div></section>`;
  const expenses = getFarmExpenses(farm.id);
  if (!expenses.length) return `<section class="dashboard"><h2>💸 Expense History</h2><div class="agro-card"><h3>No expenses yet</h3><p>Record the first expense for ${esc(farm.farmName)}.</p></div></section>`;
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  return `<section class="dashboard">
    <h2>💸 Expense History</h2><p>${esc(farm.farmName)}</p>
    <div class="hero-card"><h3>Total Expenses</h3><h2>₦${total.toLocaleString()}</h2></div>
    ${expenses.slice().sort((a,b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)).map(expense => `
      <div class="agro-card" data-record-id="${esc(expense.id)}">
        <h3>${esc(expense.title || expense.type || "Farm expense")}</h3>
        <p><strong>Amount:</strong> ₦${Number(expense.amount || 0).toLocaleString()}</p>
        <p><strong>Date:</strong> ${esc(expense.date || "Not recorded")}</p>
        <p>${esc(expense.notes || "")}</p>
        <button class="deleteExpense" data-id="${esc(expense.id)}">Delete</button>
      </div>`).join("")}
  </section>`;
}

export function initExpenseTimeline() {
  document.querySelectorAll(".deleteExpense").forEach(button => {
    button.addEventListener("click", async () => {
      button.disabled = true;
      try {
        await ExpenseRepository.delete(button.dataset.id);
        const page = document.getElementById("page");
        if (page) { page.innerHTML = expenseTimelinePage(); initExpenseTimeline(); }
      } catch (error) {
        button.disabled = false;
        alert(error?.message || "Could not delete this expense. Try again when connected.");
      }
    });
  });
}
