import {
    getHarvests,
    deleteHarvest
} from "../services/harvestStorage.js";

export function harvestTimelinePage() {

    const harvests = getHarvests();

    if (harvests.length === 0) {

        return `
        <section class="dashboard">

            <h2>🌾 Harvest History</h2>

            <div class="agro-card">

                <h3>No Harvest Records</h3>

                <p>
                    Record your first harvest.
                </p>

            </div>

        </section>
        `;

    }

    return `
    <section class="dashboard">

        <h2>🌾 Harvest History</h2>

        ${harvests.map(harvest => `

            <div class="agro-card">

                <h3>${harvest.crop}</h3>

                <p><strong>Quantity:</strong> ${harvest.quantity} ${harvest.unit}</p>

                <p><strong>Date:</strong> ${harvest.date}</p>

                <p>${harvest.notes || ""}</p>

                <button
                    class="deleteHarvest"
                    data-id="${harvest.id}"
                >
                    Delete
                </button>

            </div>

        `).join("")}

    </section>
    `;

}

export function initHarvestTimeline() {

    document
        .querySelectorAll(".deleteHarvest")
        .forEach(button => {

            button.addEventListener("click", () => {

                deleteHarvest(
                    Number(button.dataset.id)
                );

                location.reload();

            });

        });

}