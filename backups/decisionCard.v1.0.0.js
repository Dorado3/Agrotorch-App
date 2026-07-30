/*
----------------------------------------------------
AgroTorch CDRE Decision Card
Version 1.0.0
----------------------------------------------------
*/

export function decisionCard(context) {

    return `

    <div class="agro-card">

        <h2>🧠 Today's Decision</h2>

        <p>

            <strong>Overall Risk:</strong>

            ${context.disease.risk}

        </p>

        <p>

            <strong>Disease:</strong>

            ${context.disease.reason}

        </p>

        <p>

            <strong>Pest:</strong>

            ${context.pest.reason}

        </p>

        <p>

            <strong>Profit:</strong>

            ${context.profit.status}

        </p>

        <hr>

        <h3>

            🎯 Mission

        </h3>

        <p>

            <strong>

            ${context.mission.title}

            </strong>

        </p>

        <p>

            ${context.mission.reason}

        </p>

        <hr>

        <p>

            <strong>

            Expected Impact

            </strong>

        </p>

        <p>

            ${context.mission.impact}

        </p>

    </div>

    `;

}
