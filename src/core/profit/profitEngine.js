/*
 * AgroTorch Profit Intelligence Engine
 */
export function evaluateProfit(context, dashboard = {}) {
  const revenue = Number(dashboard.revenue || 0);
  const expenses = Number(dashboard.expenses || 0);
  const profit = revenue - expenses;

  if (!dashboard.financialDataAvailable) {
    return {
      revenue, expenses, profit,
      status: "NO DATA",
      advice: "No farm expense or sales records are available for this farm yet. Record costs and sales before assessing profitability."
    };
  }

  let status = "HEALTHY";
  let advice = "Recorded farm finances show a positive balance for the available records.";
  if (profit < 0) {
    status = "LOSS";
    advice = "Recorded expenses exceed recorded revenue. Confirm the reporting period and check for missing sales before making cost decisions.";
  } else if (profit === 0) {
    status = "BREAK EVEN";
    advice = "Recorded revenue and expenses are currently equal.";
  } else if (profit < expenses * 0.20) {
    status = "LOW PROFIT";
    advice = "The recorded profit margin is low. Review production efficiency and the completeness of the records.";
  }

  return { revenue, expenses, profit, status, advice };
}
