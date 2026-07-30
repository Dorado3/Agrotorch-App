/*
----------------------------------------------------
AgroTorch Task Scheduler
Version 1.1.0
----------------------------------------------------
*/

import { getFarmWeek } from "./farmCalendar.js";
import { getGrowthStage } from "./growthStage.js";
import { getEffectivePlantingDate } from "./effectivePlantingDate.js";

export function getTodayTasks(farm) {

    if (!farm)
        return [];

    const effectivePlantingDate =
        getEffectivePlantingDate(farm);

    const week =
        getFarmWeek(effectivePlantingDate);

    const stage =
        getGrowthStage(
            farm.crop,
            week
        );

    const tasks = [];

    switch (stage) {

        case "Seedling":

            tasks.push(

                "💧 Check irrigation",

                "🌱 Inspect seedling health"

            );

            break;

        case "Vegetative":

            tasks.push(

                "🌿 Weed control",

                "🧪 Apply vegetative fertilizer",

                "🐛 Scout for pests"

            );

            break;

        case "Flowering":

            tasks.push(

                "🌼 Monitor flower retention",

                "🧪 Apply calcium",

                "🐝 Encourage pollination"

            );

            break;

        case "Fruiting":

            tasks.push(

                "🍅 Monitor fruit development",

                "🧪 Potassium fertigation",

                "🐛 Scout for Tuta absoluta"

            );

            break;

        case "Harvest":

            tasks.push(

                "📦 Harvest mature produce",

                "🚚 Prepare produce for market",

                "💵 Record sales"

            );

            break;

        default:

            tasks.push(

                "📝 Update farm records"

            );

    }

    return tasks;

}
