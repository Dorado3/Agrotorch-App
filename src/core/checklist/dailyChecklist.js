/*
----------------------------------------------------
AgroTorch Daily Checklist
Version 3.0.0
----------------------------------------------------
*/

import { ActivityRepository } from "../../repositories/ActivityRepository.js";
import { ExpenseRepository } from "../../repositories/ExpenseRepository.js";
import { HarvestRepository } from "../../repositories/HarvestRepository.js";
import { SalesRepository } from "../../repositories/SalesRepository.js";

export function buildDailyChecklist(farm) {

    if (!farm) {

        return [];

    }

    const activities =
        ActivityRepository.todayActivities(farm.id);

    const expenses =
        ExpenseRepository.todayExpenses(farm.id);

    const harvests =
        HarvestRepository.todayHarvests(farm.id);

    const sales =
        SalesRepository.todaySales(farm.id);

    return [

        {

            title: "Farm Activity",

            completed: activities.length > 0

        },

        {

            title: "Expense Recorded",

            completed: expenses.length > 0

        },

        {

            title: "Harvest Recorded",

            completed: harvests.length > 0

        },

        {

            title: "Sales Recorded",

            completed: sales.length > 0

        }

    ];

}
