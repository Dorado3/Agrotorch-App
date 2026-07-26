const STORAGE_KEY = "agrotorch_expenses";

export function getExpenses() {

    const expenses = localStorage.getItem(STORAGE_KEY);

    return expenses ? JSON.parse(expenses) : [];

}

export function saveExpense(expense) {

    const expenses = getExpenses();

    expense.id = Date.now();

    expenses.push(expense);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(expenses)
    );

}

export function deleteExpense(id) {

    const expenses = getExpenses().filter(
        expense => expense.id !== id
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(expenses)
    );

}

export function clearExpenses() {

    localStorage.removeItem(STORAGE_KEY);

}