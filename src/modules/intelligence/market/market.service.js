/*
----------------------------------------------------
AgroTorch Intelligence
Market Intelligence Service
Version 1.0.0
----------------------------------------------------
*/

import { createMarketRecord } from "./market.model.js";

export function buildMarketRecord(data = {}) {

    return createMarketRecord(data);

}

export function marketRecommendation(record) {

    if (

        record.trend === "rising" &&

        record.demandLevel === "high"

    ) {

        return "Demand is strong and prices are rising. Consider delaying sales briefly if crop quality allows.";

    }

    if (

        record.trend === "falling"

    ) {

        return "Prices are declining. Consider selling soon to reduce market risk.";

    }

    return "Market conditions are stable. Sell according to your harvest schedule.";

}
