/*
----------------------------------------------------
AgroTorch Repository
Expense Repository
Version 3.1.0
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

import { isToday } from "../core/date/isToday.js";

export const ExpenseRepository = {

    all() {

        return getExpenses();

    },

    farmExpenses(farmId) {

        return getFarmExpenses(farmId);

    },

    todayExpenses(farmId) {

        return getFarmExpenses(farmId)

            .filter(expense =>

                isToday(

                    expense.createdAt ||

                    expense.date ||

                    expense.timestamp

                )

            );

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
