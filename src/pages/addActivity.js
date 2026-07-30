import { saveActivity } from "../services/activityStorage.js";
import { getWorkspace } from "../core/workspace/workspace.js";

export function addActivityPage() {

    return `
    <section class="dashboard">

        <div class="hero-card">

            <h2>📝 Record Activity</h2>

            <p>Record today's farm activity.</p>

        </div>

        <form id="activityForm" class="farm-form">

            <label>Activity</label>

            <input
                type="text"
                id="activity"
                required
            >

            <label>Date</label>

            <input
                type="date"
                id="activityDate"
                required
            >

            <label>Notes</label>

            <textarea
                id="notes"
                rows="3"
            ></textarea>

            <button
                type="submit"
                class="action-btn"
            >
                💾 Save Activity
            </button>

        </form>

        <div id="activityMessage"></div>

    </section>
    `;

}

export function initAddActivityPage() {

    const form =
        document.getElementById("activityForm");

    if (!form) return;

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const workspace =
            getWorkspace();

        const farm =
            workspace.activeFarm;

        if (!farm){

            alert("Please select a farm first.");

            return;

        }

        const activity = {

            farmId: farm.id,

            farmName: farm.farmName,

            activity:
                document.getElementById("activity").value,

            date:
                document.getElementById("activityDate").value,

            notes:
                document.getElementById("notes").value

        };

        saveActivity(activity);

        form.reset();

        document.getElementById("activityMessage").innerHTML = `
            <p style="color:green;font-weight:bold;margin-top:20px;">
                ✅ Activity Saved Successfully
            </p>
        `;

    });

}
