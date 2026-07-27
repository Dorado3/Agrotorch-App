import { getCurrentUserId } from "./userService.js";

const STORAGE_KEY = "agrotorch_expenses";

export function getExpenses() {

    const expenses =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const userId = getCurrentUserId();

    return expenses.filter(expense => expense.userId === userId);

}

export function saveExpense(expense) {

    const expenses =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    expense.id = Date.now();

    expense.userId = getCurrentUserId();

    expenses.push(expense);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(expenses)
    );

}

export function deleteExpense(id) {

    const expenses =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const updated =
        expenses.filter(expense => {

            return !(
                expense.id === id &&
                expense.userId === getCurrentUserId()
            );

        });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
    );

}

export function clearExpenses() {

    localStorage.removeItem(STORAGE_KEY);

}
