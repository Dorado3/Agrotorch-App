import { saveActivity } from "../services/activityStorage.js";
import { getFarms } from "../services/farmStorage.js";

export function addActivityPage() {

    const farms = getFarms();

    return `

    <section class="dashboard">

        <h2>📋 Add Activity</h2>

        <form id="activityForm">

            <label>Farm</label>

            <select id="farmName">

                ${farms.map(farm => `
                    <option value="${farm.farmName}">
                        ${farm.farmName}
                    </option>
                `).join("")}

            </select>

            <label>Activity</label>

            <select id="activityType">

                <option>Irrigation</option>

                <option>Fertigation</option>

                <option>Spraying</option>

                <option>Harvest</option>

                <option>Planting</option>

                <option>Labour</option>

                <option>Expense</option>

            </select>

            <label>Notes</label>

            <textarea
                id="notes"
                placeholder="Describe what happened..."
            ></textarea>

            <button
                class="agro-btn"
                type="submit">

                Save Activity

            </button>

        </form>

        <div id="activityMessage"></div>

    </section>

    `;

}

export function initAddActivityPage(){

    const form = document.getElementById("activityForm");

    if(!form) return;

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        saveActivity({

            farmName:
            document.getElementById("farmName").value,

            activity:
            document.getElementById("activityType").value,

            notes:
            document.getElementById("notes").value,

            createdAt:
            new Date().toISOString()

        });

        form.reset();

        document.getElementById("activityMessage").innerHTML=`

        <p style="color:green">

        ✅ Activity Saved

        </p>

        `;

    });

}