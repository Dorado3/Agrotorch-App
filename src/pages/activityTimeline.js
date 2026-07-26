import { getActivities } from "../services/activityStorage.js";

export function activityTimelinePage() {

    const activities = getActivities();

    if (activities.length === 0) {

        return `

        <section class="dashboard">

            <h2>📋 Activity Timeline</h2>

            <div class="agro-card">

                <h3>No Activities Yet</h3>

                <p>
                    Start recording activities.
                </p>

            </div>

        </section>

        `;

    }

    return `

    <section class="dashboard">

        <h2>📋 Activity Timeline</h2>

        ${activities.reverse().map(activity=>`

        <div class="agro-card">

            <h3>${activity.activity}</h3>

            <p><strong>Farm:</strong> ${activity.farmName}</p>

            <p>${activity.notes}</p>

            <small>${new Date(activity.createdAt).toLocaleString()}</small>

        </div>

        `).join("")}

    </section>

    `;

}