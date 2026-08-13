/*
----------------------------------------------------
AgroTorch AI Work Plan Engine
Version 1.0.0
----------------------------------------------------
*/

export function buildWorkPlan(context) {

    const tasks = [];

    /*
    ------------------------------------------------
    Growth Stage Tasks
    ------------------------------------------------
    */

    switch ((context.stage || "").toLowerCase()) {

        case "seedling":

            tasks.push({

                id: "irrigation",

                title: "Maintain Uniform Irrigation",

                reason:
                    "Young seedlings require consistent moisture.",

                priority: 100

            });

            break;

        case "vegetative":

            tasks.push({

                id: "fertigation",

                title: "Apply Vegetative Fertigation",

                reason:
                    "Support rapid vegetative growth.",

                priority: 100

            });

            break;

        case "flowering":

            tasks.push({

                id: "flower-scout",

                title: "Inspect Flower Retention",

                reason:
                    "Prevent flower abortion.",

                priority: 100

            });

            break;

        case "fruiting":

            tasks.push({

                id: "fruit-feed",

                title: "Support Fruit Development",

                reason:
                    "Increase potassium and calcium supply.",

                priority: 100

            });

            break;

        case "harvest":

            tasks.push({

                id: "harvest",

                title: "Harvest Mature Fruits",

                reason:
                    "Maintain quality and reduce losses.",

                priority: 100

            });

            break;

    }

    /*
    ------------------------------------------------
    Disease Monitoring
    ------------------------------------------------
    */

    if (context.disease?.risk !== "LOW") {

        tasks.push({

            id: "disease",

            title: "Scout For Disease",

            reason:
                context.disease.reason,

            priority: 95

        });

    }

    /*
    ------------------------------------------------
    Pest Monitoring
    ------------------------------------------------
    */

    if (context.pest?.risk !== "LOW") {

        tasks.push({

            id: "pest",

            title: "Scout For Pests",

            reason:
                context.pest.reason,

            priority: 90

        });

    }

    /*
    ------------------------------------------------
    Profit Monitoring
    ------------------------------------------------
    */

    if (context.profit?.status === "LOSS") {

        tasks.push({

            id: "profit",

            title: "Review Farm Expenses",

            reason:
                context.profit.advice,

            priority: 85

        });

    }

    tasks.sort(

        (a, b) => b.priority - a.priority

    );

    return tasks;

}
