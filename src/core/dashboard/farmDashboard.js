/*
----------------------------------------------------
AgroTorch Farm Dashboard
Version 7.0.0
----------------------------------------------------
*/

import { getWorkspace } from "../workspace/workspace.js";

import { ActivityRepository } from "../../repositories/ActivityRepository.js";
import { ExpenseRepository } from "../../repositories/ExpenseRepository.js";
import { HarvestRepository } from "../../repositories/HarvestRepository.js";
import { SalesRepository } from "../../repositories/SalesRepository.js";

export function buildFarmDashboard() {

    const workspace = getWorkspace();

    const farm = workspace.activeFarm;

    if (!farm) {

        return {

            farmName: "No Active Farm",
            crop: "-",

            activities: 0,
            expenses: 0,
            harvests: 0,
            sales: 0,

            revenue: 0,
            profit: 0,

            cdreStatus: "UNKNOWN"

        };

    }

    const activities =
        ActivityRepository.farmActivities(farm.id);

    const expenses =
        ExpenseRepository.farmExpenses(farm.id);

    const harvests =
        HarvestRepository.farmHarvests(farm.id);

    const sales =
        SalesRepository.farmSales(farm.id);

    const totalExpenses =
        expenses.reduce(

            (sum, expense) =>

                sum + Number(expense.amount || 0),

            0

        );

    const totalHarvest =
        harvests.reduce(

            (sum, harvest) =>

                sum + Number(harvest.quantity || 0),

            0

        );

    const totalRevenue =
        sales.reduce(

            (sum, sale) =>

                sum + Number(sale.total || 0),

            0

        );

    const totalProfit =
        totalRevenue - totalExpenses;

    return {

        farmName: farm.farmName,

        crop: farm.crop,

        activities: activities.length,

        expenses: totalExpenses,

        harvests: totalHarvest,

        sales: sales.length,

        revenue: totalRevenue,

        profit: totalProfit,

        cdreStatus: "LOW RISK"

    };

}
