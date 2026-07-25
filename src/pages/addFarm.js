import { saveFarm } from "../services/farmService.js";
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
<input type="text"
  id="crop"placeholder="e.g. Tomato, Pepper, Maize" required>

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

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    const farm = {

      farmName: document.getElementById("farmName").value,

      ownerName: document.getElementById("ownerName").value,

      state: document.getElementById("state").value,

      lga: document.getElementById("lga").value,

      farmSize: document.getElementById("farmSize").value,

      crop: document.getElementById("crop").value,

      variety: document.getElementById("variety").value,

      plantingDate: document.getElementById("plantingDate").value

    };

    saveFarm(farm);

    form.reset();

    document.getElementById("saveMessage").innerHTML = `
      <p style="color:green;margin-top:20px;font-weight:bold;">
        ✅ Farm saved successfully.
      </p>
    `;

  });

}
