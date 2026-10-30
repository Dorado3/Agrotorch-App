/*
 * AgroTorch Pepper Knowledge Vault
 * Stage prompts are scouting priorities, not prescriptive input rates.
 */
export const pepperKnowledge = {
  crop: "Pepper",
  stages: {
    establishment: {
      title: "Confirm Pepper Establishment",
      reason: "Recently transplanted pepper plants need uniform moisture and stand checks.",
      impact: "Identify transplant losses early and establish a reliable plant count."
    },
    vegetative: {
      title: "Build a Healthy Pepper Canopy",
      reason: "Vegetative growth needs balanced field management and early pest scouting.",
      impact: "Prepare plants for flowering while avoiding unchecked canopy problems."
    },
    flowering: {
      title: "Protect Pepper Flowering",
      reason: "Flowering and early fruit set are sensitive to water stress, heat and pest damage.",
      impact: "Improve the chance of retaining flowers and setting marketable fruit."
    },
    fruiting: {
      title: "Monitor Pepper Fruit Development",
      reason: "Fruit load, moisture consistency and pest or disease symptoms should be checked regularly.",
      impact: "Protect fruit quality and identify losses before harvest."
    },
    harvest: {
      title: "Harvest and Grade Pepper Regularly",
      reason: "Timely picking and careful handling reduce field and post-harvest losses.",
      impact: "Improve marketable yield and sales records."
    }
  }
};
