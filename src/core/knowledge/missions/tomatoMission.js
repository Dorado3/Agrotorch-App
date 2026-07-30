/*
----------------------------------------------------
AgroTorch Tomato Mission Brain
Version 2.0.0
----------------------------------------------------
*/

import { getGrowthStage } from "../../calendar/growthStage.js";

export function getTomatoMission(farm, week) {

    const stage =
        getGrowthStage("Tomato", week);

    switch (stage.toLowerCase()) {

        case "seedling":

            return {

                title:
                    "Maintain Healthy Seedlings",

                reason:
                    "Roots are establishing. Uniform moisture and gentle nutrition are essential.",

                impact:
                    "Strong establishment and lower transplant shock."

            };

        case "vegetative":

            return {

                title:
                    "Build Strong Vegetative Growth",

                reason:
                    "Rapid canopy development requires balanced nutrition and weed control.",

                impact:
                    "Prepare plants for heavy flowering."

            };

        case "flowering":

            return {

                title:
                    "Protect Flowers",

                reason:
                    "Monitor flower abortion, calcium nutrition and thrips pressure.",

                impact:
                    "Increase fruit set."

            };

        case "fruiting":

            return {

                title:
                    "Support Fruit Development",

                reason:
                    "Increase potassium and calcium while maintaining consistent irrigation.",

                impact:
                    "Improve fruit size and quality."

            };

        case "harvest":

            return {

                title:
                    "Harvest Regularly",

                reason:
                    "Frequent harvesting reduces losses and improves continuous production.",

                impact:
                    "Increase marketable yield."

            };

        default:

            return {

                title:
                    "Inspect Farm",

                reason:
                    "Monitor crop performance.",

                impact:
                    "Maintain healthy production."

            };

    }

}
