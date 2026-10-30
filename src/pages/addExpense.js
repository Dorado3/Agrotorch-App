import { ExpenseRepository } from "../repositories/ExpenseRepository.js";
import { getWorkspace } from "../core/workspace/workspace.js";

export function addExpensePage() {
  return `<section class="dashboard"><div class="hero-card"><h2>💰 Record Expense</h2><p>Track the cost of running this farm.</p></div>
    <form id="expenseForm" class="farm-form">
      <label>Expense</label><input type="text" id="expenseTitle" required>
      <label>Amount (₦)</label><input type="number" id="amount" min="0.01" step="0.01" required>
      <label>Date</label><input type="date" id="expenseDate" required>
      <label>Notes</label><textarea id="notes" rows="3"></textarea>
      <button type="submit" class="action-btn">💾 Save Expense</button>
    </form><div id="expenseMessage" role="status" aria-live="polite"></div></section>`;
}

export function initAddExpensePage() {
  const form = document.getElementById("expenseForm");
  if (!form) return;
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const farm = getWorkspace().activeFarm;
    const message = document.getElementById("expenseMessage");
    if (!farm) { message.textContent = "Select a farm first."; return; }
    const amount = Number(document.getElementById("amount").value);
    if (!Number.isFinite(amount) || amount <= 0) { message.textContent = "Enter a valid amount greater than zero."; return; }
    const result = await ExpenseRepository.create({
      farmId: farm.id, farmName: farm.farmName,
      title: document.getElementById("expenseTitle").value.trim(),
      amount, date: document.getElementById("expenseDate").value,
      notes: document.getElementById("notes").value.trim()
    });
    form.reset();
    message.textContent = result.synced ? "Expense saved and synced to your farm account." : "Expense saved on this device. Cloud sync is pending and will retry when you reconnect.";
  });
}
