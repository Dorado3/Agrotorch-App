/*
----------------------------------------------------
AgroTorch Alert Card
Version 1.0.0
----------------------------------------------------
*/

export function alertCard(alerts = []) {

    if (alerts.length === 0) {

        return `

        <div class="agro-card">

            <h3>✅ CDRE</h3>

            <p>No active risks detected.</p>

        </div>

        `;

    }

    return `

    <div class="agro-card">

        <h3>⚠️ CDRE Alerts</h3>

        <ul>

        ${alerts.map(alert => `

            <li>

                <strong>${alert.level}</strong>

                -

                ${alert.message}

            </li>

        `).join("")}

        </ul>

    </div>

    `;

}
