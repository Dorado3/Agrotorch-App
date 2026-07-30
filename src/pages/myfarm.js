/*
----------------------------------------------------
AgroTorch Farm Hub
Version 5.4.0
----------------------------------------------------
*/

import {
    getWorkspace,
    setActiveFarm
} from "../core/workspace/workspace.js";

export function myFarmPage() {

    const workspace = getWorkspace();

    const farms = workspace.farms || [];

    if (farms.length === 0) {

        return `
        <section class="dashboard">

            <h2>🌾 Farm Hub</h2>

            <div class="agro-card">

                <h3>No Farms Yet</h3>

                <p>Create your first farm.</p>

            </div>

        </section>
        `;
    }

    return `
    <section class="dashboard">

        <h2>🌾 Farm Hub</h2>

        ${farms.map((farm, index) => `

        <div class="agro-card">

            <h3>${farm.farmName || "Unnamed Farm"}</h3>

            <p><strong>Crop:</strong> ${farm.crop || "-"}</p>

            <p><strong>Status:</strong> ${farm.status || "Active"}</p>

            <button
                class="openFarmBtn agro-btn"
                data-index="${index}">
                🌱 Open Farm
            </button>

        </div>

        `).join("")}

    </section>
    `;
}

export function initMyFarmPage() {

    const workspace = getWorkspace();

    document
        .querySelectorAll(".openFarmBtn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const farm =
                    workspace.farms[
                        Number(button.dataset.index)
                    ];

                setActiveFarm(farm);

                console.log("Active Farm:", farm);

                window.dispatchEvent(
                    new CustomEvent("farm-selected")
                );

            });

        });

}
