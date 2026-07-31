/*
----------------------------------------------------
AgroTorch AI Coach
Version 1.0.0
----------------------------------------------------
*/

export function buildAICoach(context) {

    const execution =
        context.execution;

    if (execution.score === 100) {

        return {

            title:
                "Excellent Work",

            message:
                "All major farm records have been completed today. Keep the momentum going."

        };

    }

    const pending =
        execution.checklist
            .filter(item => !item.completed);

    if (pending.length > 0) {

        return {

            title:
                "Action Required",

            message:
                `Complete "${pending[0].title}" to improve today's execution score.`

        };

    }

    return {

        title:
            "Stay Consistent",

        message:
            "Continue monitoring your farm throughout the day."

    };

}
