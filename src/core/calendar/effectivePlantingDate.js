/*
----------------------------------------------------
AgroTorch Effective Planting Date
Version 1.0.0
----------------------------------------------------
*/

export function getEffectivePlantingDate(farm) {

    if (!farm) {

        return null;

    }

    return farm.productionMethod === "Nursery"

        ? (

            farm.transplantDate ||

            farm.plantingDate ||

            farm.nurseryDate

        )

        : (

            farm.plantingDate ||

            farm.nurseryDate

        );

}
