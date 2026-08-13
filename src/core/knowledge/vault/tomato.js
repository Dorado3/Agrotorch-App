/*
----------------------------------------------------
AgroTorch Knowledge Vault
Tomato
Version 2.0.0
----------------------------------------------------
*/

export const tomatoKnowledge = {

    crop: "Tomato",

    stages: {

        seedling: {

            mission: "Maintain Healthy Seedlings",

            reason:
                "Roots are establishing and require uniform moisture.",

            impact:
                "Improve establishment and reduce transplant losses.",

            risks: [
                "Damping-off",
                "Overwatering",
                "Poor establishment"
            ],

            priorities: [
                "Maintain uniform moisture",
                "Inspect seedlings daily"
            ]

        },

        vegetative: {

            mission: "Promote Vegetative Growth",

            reason:
                "Plants require balanced nutrition and weed control.",

            impact:
                "Develop a strong canopy.",

            risks: [
                "Nitrogen deficiency",
                "Weed competition",
                "Early pest infestation"
            ],

            priorities: [
                "Apply vegetative fertilizer",
                "Scout for early pests",
                "Control weeds"
            ]

        },

        flowering: {

            mission: "Protect Flowers",

            reason:
                "Flower abortion risk increases due to nutrient imbalance and pests.",

            impact:
                "Increase fruit set.",

            risks: [
                "Flower abortion",
                "Thrips",
                "Calcium deficiency"
            ],

            priorities: [
                "Apply calcium",
                "Scout for thrips",
                "Monitor flower retention"
            ]

        },

        fruiting: {

            mission: "Support Fruit Development",

            reason:
                "Potassium and calcium demand are highest during fruit development.",

            impact:
                "Improve fruit size and quality.",

            risks: [
                "Blossom end rot",
                "Fruit cracking",
                "Tuta absoluta"
            ],

            priorities: [
                "Increase potassium",
                "Maintain calcium supply",
                "Scout for Tuta absoluta"
            ]

        },

        harvest: {

            mission: "Harvest Frequently",

            reason:
                "Frequent harvesting improves quality and encourages continuous production.",

            impact:
                "Increase marketable yield.",

            risks: [
                "Overripe fruit",
                "Post-harvest losses"
            ],

            priorities: [
                "Harvest on schedule",
                "Grade produce",
                "Prepare for market"
            ]

        }

    }

};
