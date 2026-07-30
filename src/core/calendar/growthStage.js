/*
----------------------------------------------------
AgroTorch Growth Stage Engine
Version 1.0.0
----------------------------------------------------
*/

export function getGrowthStage(

    crop,

    week

) {

    crop =
        (crop || "").toLowerCase();

    if (crop === "tomato") {

        if (week <= 2)
            return "Seedling";

        if (week <= 4)
            return "Vegetative";

        if (week <= 7)
            return "Flowering";

        if (week <= 12)
            return "Fruiting";

        return "Harvest";

    }

    return "Unknown";

}
