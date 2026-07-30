/*
----------------------------------------------------
AgroTorch Crop Knowledge
Tomato
Version 1.0.0
----------------------------------------------------
*/

export const TomatoKnowledge = {

    id: "tomato",

    name: "Tomato",

    productionMethod: "Nursery",

    nurseryDurationWeeks: 4,

    totalCropWeeks: 16,

    stages: [

        {
            from: 1,
            to: 2,
            name: "Seedling"
        },

        {
            from: 3,
            to: 5,
            name: "Vegetative"
        },

        {
            from: 6,
            to: 8,
            name: "Flowering"
        },

        {
            from: 9,
            to: 13,
            name: "Fruiting"
        },

        {
            from: 14,
            to: 16,
            name: "Harvest"
        }

    ],

    weeklyTasks: {

        1: [

            "Check irrigation daily",

            "Inspect seedling health",

            "Replace weak seedlings",

            "Remove weeds"

        ],

        2: [

            "Maintain irrigation",

            "Scout for damping-off",

            "Inspect for cutworms",

            "Record plant stand"

        ],

        3: [

            "Support vegetative growth",

            "Remove weeds",

            "Inspect leaves",

            "Monitor nutrient deficiency"

        ],

        4: [

            "Prepare for rapid vegetative growth",

            "Inspect stem strength"

        ],

        5: [

            "Begin flower monitoring",

            "Inspect for pests"

        ],

        6: [

            "Monitor flowering",

            "Prevent blossom drop"

        ],

        7: [

            "Inspect fruit set",

            "Monitor pollination"

        ],

        8: [

            "Increase potassium programme",

            "Remove damaged leaves"

        ]

    },

    majorPests: [

        "Cutworms",

        "Whiteflies",

        "Thrips",

        "Tuta absoluta",

        "Aphids"

    ],

    majorDiseases: [

        "Damping-off",

        "Early Blight",

        "Late Blight",

        "Bacterial Wilt",

        "Fusarium Wilt"

    ]

};
