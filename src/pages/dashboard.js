/*
----------------------------------------------------
AgroTorch Command Centre
Dashboard v2.0
----------------------------------------------------
*/

import { AgroCard } from "../components/Card.js";

export function dashboardPage() {

    return `

    <section class="dashboard">

        <h2>🌞 Good Morning</h2>

        <p>
            Welcome back to AgroTorch AgriOS.
        </p>

        ${AgroCard(`

            <h3>🧠 Today's Best Decision</h3>

            <p>
                Apply Potassium Nitrate before 10:00 AM.
            </p>

        `)}

        ${AgroCard(`

            <h3>🌾 Farm Health</h3>

            <h1>91%</h1>

            <p>
                Excellent condition.
            </p>

        `)}

        ${AgroCard(`

            <h3>💰 Profit Forecast</h3>

            <h2>₦2,450,000</h2>

            <p>
                Estimated profit this season.
            </p>

        `)}

        ${AgroCard(`

            <h3>📋 Today's Mission</h3>

            <ul>

                <li>✅ Irrigate Block A</li>

                <li>⬜ Spray Fungicide</li>

                <li>⬜ Record Labour</li>

                <li>⬜ Contact Buyer</li>

            </ul>

        `)}

        ${AgroCard(`

            <h3>📈 Market Update</h3>

            <p>

                Tomato:

                <strong>₦185,000 / tonne</strong>

            </p>

        `)}

    </section>

    `;

}