import { getFarms, addFarm, deleteFarm } from "../services/storage.js";

export function myFarmPage() {
  return `
    <section class="page">

      <h2>🌾 My Farms</h2>

      <div class="farm-form">

        <input
          id="farmName"
          type="text"
          placeholder="Farm Name"
        />

        <input
          id="farmLocation"
          type="text"
          placeholder="Location"
        />

        <input
          id="farmCrop"
          type="text"
          placeholder="Crop"
        />

        <input
          id="farmSize"
          type="number"
          placeholder="Size (Acres)"
        />

        <button id="saveFarmBtn">
          Save Farm
        </button>

      </div>

      <hr>

      <div id="farmList"></div>

    </section>
  `;
}

export function initMyFarmPage() {

  renderFarmList();

  const btn = document.getElementById("saveFarmBtn");

  if (!btn) return;

  btn.addEventListener("click", () => {

    const name =
      document.getElementById("farmName").value.trim();

    const location =
      document.getElementById("farmLocation").value.trim();

    const crop =
      document.getElementById("farmCrop").value.trim();

    const size =
      document.getElementById("farmSize").value.trim();

    if (!name || !location || !crop || !size) {

      alert("Please complete all fields.");

      return;

    }

    addFarm({
      name,
      location,
      crop,
      size
    });

    document.getElementById("farmName").value = "";
    document.getElementById("farmLocation").value = "";
    document.getElementById("farmCrop").value = "";
    document.getElementById("farmSize").value = "";

    renderFarmList();

  });

}

function renderFarmList() {

  const farms = getFarms();

  const container =
    document.getElementById("farmList");

  if (!container) return;

  if (farms.length === 0) {

    container.innerHTML = `
      <p>No farms added yet.</p>
    `;

    return;

  }

  container.innerHTML = farms.map(farm => `

    <div class="farm-card">

      <h3>${farm.name}</h3>

      <p><strong>Location:</strong> ${farm.location}</p>

      <p><strong>Crop:</strong> ${farm.crop}</p>

      <p><strong>Size:</strong> ${farm.size} Acres</p>

      <button
        class="deleteFarm"
        data-id="${farm.id}"
      >
        Delete
      </button>

    </div>

  `).join("");

  document.querySelectorAll(".deleteFarm")
    .forEach(button => {

      button.addEventListener("click", () => {

        deleteFarm(Number(button.dataset.id));

        renderFarmList();

      });

    });

}