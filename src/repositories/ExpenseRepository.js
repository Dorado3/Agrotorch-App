/*
----------------------------------------------------
AgroTorch Repository
Expense Repository
Version 3.0.0
----------------------------------------------------
*/

import {

    getExpenses,

    getFarmExpenses,

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

    farmExpenses(farmId) {

        return getFarmExpenses(farmId);

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
