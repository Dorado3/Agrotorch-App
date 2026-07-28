import { FarmRepository } from "../repositories/FarmRepository.js";
import { auth } from "../core/config/firebase.js";
import "../styles/dashboard.css";

export function addFarmPage() {
  return `
    <section class="dashboard">

      <div class="hero-card">
        <h2>🌾 Register a New Farm</h2>
        <p>Create a new farm profile.</p>
      </div>

      <form id="farmForm" class="farm-form">

        <label>Farm Name</label>
        <input type="text" id="farmName" required>

        <label>Owner Name</label>
        <input type="text" id="ownerName" required>

        <label>State</label>
        <input type="text" id="state" required>

        <label>LGA</label>
        <input type="text" id="lga" required>

        <label>Farm Size (Acres)</label>
        <input type="number" id="farmSize" required>

        <label>Crop</label>
        <input
          type="text"
          id="crop"
          placeholder="e.g. Tomato, Pepper, Maize"
          required
        >

        <label>Variety</label>
        <input type="text" id="variety">

        <label>Planting Date</label>
        <input type="date" id="plantingDate">

        <button type="submit" class="action-btn">
          💾 Save Farm
        </button>

      </form>

      <div id="saveMessage"></div>

    </section>
  `;
}

export function initAddFarmPage() {

  const form = document.getElementById("farmForm");

  if (!form) return;

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

    const farm = {

      farmName: document.getElementById("farmName").value.trim(),

      ownerName: document.getElementById("ownerName").value.trim(),

      state: document.getElementById("state").value.trim(),

      lga: document.getElementById("lga").value.trim(),

      size: Number(document.getElementById("farmSize").value),

      crop: document.getElementById("crop").value.trim(),

      variety: document.getElementById("variety").value.trim(),

      plantingDate: document.getElementById("plantingDate").value

    };

    try {

      await FarmRepository.create(currentUser.uid, farm);

      form.reset();

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
