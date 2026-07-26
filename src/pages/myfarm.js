import { getFarms } from "../services/farmStorage.js";

export function myFarmPage() {

  const farms = getFarms();

  if (farms.length === 0) {

    return `
      <section class="dashboard">

        <h2>🌾 Farm Hub</h2>

        <div class="agro-card">
          <h3>No Farms Yet</h3>

          <p>
            Start by registering your first farm.
          </p>
        </div>

      </section>
    `;

  }

  return `
    <section class="dashboard">

      <h2>🌾 Farm Hub</h2>

      ${farms.map(farm => `

        <div class="agro-card">

          <h3>${farm.farmName}</h3>

          <p><strong>Owner:</strong> ${farm.ownerName}</p>

          <p><strong>Crop:</strong> ${farm.crop}</p>

          <p><strong>State:</strong> ${farm.state}</p>

          <p><strong>LGA:</strong> ${farm.lga}</p>

          <p><strong>Size:</strong> ${farm.farmSize} Acres</p>

        </div>

      `).join("")}

    </section>
  `;

}

export function initMyFarmPage() {}