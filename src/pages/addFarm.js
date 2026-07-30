import { FarmRepository } from "../repositories/FarmRepository.js";
import { auth } from "../core/config/firebase.js";
import { CropRegistry } from "../core/crops/cropRegistry.js";

import "../styles/dashboard.css";

export function addFarmPage() {

    const cropOptions = CropRegistry.map(crop => `

        <option value="${crop.id}">

            ${crop.name}

        </option>

    `).join("");

    return `

    <section class="dashboard">

        <div class="hero-card">

            <h2>🌾 Register a New Farm</h2>

            <p>Create a new farm profile.</p>

        </div>

        <form id="farmForm" class="farm-form">

            <label>Farm Name</label>

            <input
                type="text"
                id="farmName"
                required
            >

            <label>Owner Name</label>

            <input
                type="text"
                id="ownerName"
                required
            >

            <label>State</label>

            <input
                type="text"
                id="state"
                required
            >

            <label>LGA</label>

            <input
                type="text"
                id="lga"
                required
            >

            <label>Farm Size (Acres)</label>

            <input
                type="number"
                id="farmSize"
                required
            >

            <label>Crop</label>

            <select
                id="crop"
                required
            >

                ${cropOptions}

            </select>

            <div
                id="otherCropContainer"
                style="display:none;"
            >

                <label>Specify Crop</label>

                <input
                    type="text"
                    id="otherCrop"
                    placeholder="Enter crop name"
                >

            </div>

            <label>Variety</label>

            <input
                type="text"
                id="variety"
            >
<div id="nurseryContainer">

                <label>Nursery Date</label>

                <input
                    type="date"
                    id="nurseryDate"
                >

                <label>Transplant Date</label>

                <input
                    type="date"
                    id="transplantDate"
                >

            </div>

            <div
                id="plantingContainer"
                style="display:none;"
            >

                <label>Planting Date</label>

                <input
                    type="date"
                    id="plantingDate"
                >

            </div>

            <button
                type="submit"
                class="action-btn"
            >

                💾 Save Farm

            </button>

        </form>

        <div id="saveMessage"></div>

    </section>

    `;

}

export function initAddFarmPage() {

    const form =
        document.getElementById("farmForm");

    if (!form) return;

    const cropSelect =
        document.getElementById("crop");

    const nurseryContainer =
        document.getElementById("nurseryContainer");

    const plantingContainer =
        document.getElementById("plantingContainer");

    const otherCropContainer =
        document.getElementById("otherCropContainer");

    function updateCropFields() {

        const cropId = cropSelect.value;

        const crop =
            CropRegistry.find(c => c.id === cropId);

        otherCropContainer.style.display =
            cropId === "other"
                ? "block"
                : "none";

        if (
            crop &&
            crop.productionMethod === "Nursery"
        ) {

            nurseryContainer.style.display =
                "block";

            plantingContainer.style.display =
                "none";

        } else {

            nurseryContainer.style.display =
                "none";

            plantingContainer.style.display =
                "block";

        }

    }

    updateCropFields();

    cropSelect.addEventListener(
        "change",
        updateCropFields
    );
form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const currentUser = auth.currentUser;

        if (!currentUser) {

            document.getElementById("saveMessage").innerHTML = `
                <p style="color:red;margin-top:20px;font-weight:bold;">
                    Please login first.
                </p>
            `;

            return;

        }

        const cropId =
            document.getElementById("crop").value;

        const registryCrop =
            CropRegistry.find(c => c.id === cropId);

        const cropName =
            cropId === "other"
                ? document.getElementById("otherCrop").value.trim()
                : registryCrop.name;

        const farm = {

            farmName:
                document.getElementById("farmName").value.trim(),

            ownerName:
                document.getElementById("ownerName").value.trim(),

            state:
                document.getElementById("state").value.trim(),

            lga:
                document.getElementById("lga").value.trim(),

            size:
                Number(document.getElementById("farmSize").value),

            cropId,

            crop:
                cropName,

            variety:
                document.getElementById("variety").value.trim(),

            productionMethod:
                registryCrop.productionMethod,

            nurseryDate:
                document.getElementById("nurseryDate").value,

            transplantDate:
                document.getElementById("transplantDate").value,

            plantingDate:
                document.getElementById("plantingDate").value

        };

        try {

            await FarmRepository.create(
                currentUser.uid,
                farm
            );

            form.reset();

            updateCropFields();

            document.getElementById("saveMessage").innerHTML = `
                <p style="color:green;margin-top:20px;font-weight:bold;">
                    ✅ Farm saved successfully.
                </p>
            `;

        } catch (error) {

            console.error(error);

            document.getElementById("saveMessage").innerHTML = `
                <p style="color:red;margin-top:20px;font-weight:bold;">
                    ❌ Failed to save farm.
                </p>
            `;

        }

    });

}
