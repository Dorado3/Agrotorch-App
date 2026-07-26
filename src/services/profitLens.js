import { getExpenses } from "./expenseStorage.js";
import { getHarvests } from "./harvestStorage.js";
import { getSales } from "./salesStorage.js";

export function getProfitSummary() {

    const expenses = getExpenses();
    const harvests = getHarvests();
    const sales = getSales();

    const totalExpenses = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    const totalRevenue = sales.reduce(
        (sum, sale) => sum + Number(sale.total),
        0
    );

    const totalHarvest = harvests.reduce(
        (sum, harvest) => sum + Number(harvest.quantity),
        0
    );

    const outstandingPayments = sales
        .filter(sale => sale.paymentStatus === "Pending")
        .reduce(
            (sum, sale) => sum + Number(sale.total),
            0
        );

    const netProfit = totalRevenue - totalExpenses;

    const profitMargin =
        totalRevenue === 0
            ? 0
            : ((netProfit / totalRevenue) * 100);

    return {

        totalRevenue,

        totalExpenses,

        totalHarvest,

        outstandingPayments,

        netProfit,

        profitMargin

    };

}
