import { saveHarvest } from "../services/harvestStorage.js";
import { getWorkspace } from "../core/workspace/workspace.js";

export function addHarvestPage() {

    return `
    <section class="dashboard">

        <div class="hero-card">

            <h2>🌾 Record Harvest</h2>

            <p>Record today's harvest.</p>

        </div>

        <form id="harvestForm" class="farm-form">

            <label>Crop</label>

            <input
                type="text"
                id="crop"
                required
            >

            <label>Quantity</label>

            <input
                type="number"
                id="quantity"
                required
            >

            <label>Unit</label>

            <select id="unit">

                <option>Kg</option>

                <option>Tonnes</option>

                <option>Crates</option>

                <option>Baskets</option>

                <option>Bags</option>

            </select>

            <label>Date</label>

            <input
                type="date"
                id="harvestDate"
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
                🌾 Save Harvest
            </button>

        </form>

        <div id="harvestMessage"></div>

    </section>
    `;

}

export function initAddHarvestPage() {

    const form =
        document.getElementById("harvestForm");

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

        const harvest = {

            farmId: farm.id,

            farmName: farm.farmName,

            crop:
                document.getElementById("crop").value,

            quantity:
                Number(document.getElementById("quantity").value),

            unit:
                document.getElementById("unit").value,

            date:
                document.getElementById("harvestDate").value,

            notes:
                document.getElementById("notes").value

        };

        saveHarvest(harvest);

        form.reset();

        document.getElementById("harvestMessage").innerHTML = `
            <p style="color:green;font-weight:bold;margin-top:20px;">
                ✅ Harvest Saved Successfully
            </p>
        `;

    });

}
