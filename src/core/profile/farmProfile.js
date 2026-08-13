/*
----------------------------------------------------
AgroTorch Farm Profile Engine
Version 1.0.0
----------------------------------------------------
*/

export function buildFarmProfile(farm) {

    return {

        area:
            Number(farm.area || 0),

        unit:
            farm.areaUnit || "acre",

        expectedYield:
            Number(farm.expectedYield || 0),

        marketPrice:
            Number(farm.marketPrice || 0),

        productionMethod:
            farm.productionMethod || "Open Field"

    };

}
