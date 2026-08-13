/*
----------------------------------------------------
AgroTorch Task Engine
Version 3.0.0
----------------------------------------------------
*/

export function buildTasks(context) {

    const tasks = [];

    if (context.profit?.status === "LOSS") {

        tasks.push({
            id: "review-expenses",

            title: "Review Farm Expenses",

            reason:
                context.profit.advice ||
                "Review today's expenses and identify unnecessary costs.",

            objective:
                "Identify the major farm expenses affecting profitability.",

            instructions:
                "Review today's farm expenses, confirm the amounts and identify unnecessary or avoidable costs.",

            materials:
                "Expense records and farm financial records.",

            safety:
                "Do not delete or alter financial records without verification."
        });

    }

    if (
        (context.stage || "").toLowerCase() === "fruiting"
    ) {

        tasks.push({

            id: "fruit-development",

            title: "Support Fruit Development",

            reason:
                "Increase potassium and calcium supply.",

            objective:
                "Support healthy fruit development.",

            instructions:
                "Review the current fertilizer program and confirm adequate potassium and calcium availability.",

            materials:
                "Fertilizer records and current farm inputs.",

            safety:
                "Follow the product label and farm spray/fertigation SOP."
        });

    }

    if (context.pest?.risk !== "LOW") {

        tasks.push({

            id: "scout-pests",

            title: "Scout For Pests",

            reason:
                context.pest?.reason ||
                "Inspect the crop for pest activity.",

            objective:
                "Detect pest activity early before it causes significant crop damage.",

            instructions:
                "Inspect representative plants across the farm. Check leaves, flowers and fruits for insects, feeding damage and other pest symptoms. Record observations.",

            materials:
                "Farm scouting sheet, phone/camera and appropriate PPE.",

            safety:
                "Do not handle pesticides during scouting unless following the approved farm SOP."
        });

    }

    return tasks;

}
