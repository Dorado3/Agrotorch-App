/*
----------------------------------------------------
AgroTorch Repository
Expense Repository
Version 2.0.0
----------------------------------------------------
*/

import {

    getExpenses,

    saveExpense,

    deleteExpense

} from "../services/expenseStorage.js";

import {

    saveExpenseCloud,

    getExpensesCloud

} from "../firestore/ExpenseFirestore.js";

export const ExpenseRepository = {

    all() {

        return getExpenses();

    },

    async allCloud() {

        return await getExpensesCloud();

    },

    async create(expense) {

        saveExpense(expense);

        return await saveExpenseCloud(expense);

    },

    delete(id) {

        return deleteExpense(id);

    }

};
