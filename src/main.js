import "./styles/style.css";

import { dashboardPage } from "./pages/dashboard.js";
import { myFarmPage } from "./pages/myfarm.js";
import { addFarmPage, initAddFarmPage } from "./pages/addFarm.js";

document.querySelector("#app").innerHTML = `
<div class="app">

  <header class="header">
    <h1>🌾 AgroTorch AgriOS</h1>
    <p>Africa's Agricultural Operating System</p>
  </header>

  <main id="page"></main>

  <nav class="bottom-nav">
    <button id="homeBtn">🏠 Home</button>
    <button id="farmBtn">🌾 My Farm</button>
    <button id="addFarmBtn">➕ Add Farm</button>
    <button id="cdreBtn">🧠 CDRE</button>
    <button id="marketBtn">🛒 Market</button>
  </nav>

</div>
`;

const page = document.getElementById("page");

function showHome() {
  page.innerHTML = dashboardPage();
}

function showMyFarm() {
  page.innerHTML = myFarmPage();
}

function showAddFarm() {
  page.innerHTML = addFarmPage();
  initAddFarmPage();
}

showHome();

document.getElementById("homeBtn").addEventListener("click", showHome);

document.getElementById("farmBtn").addEventListener("click", showMyFarm);

document.getElementById("addFarmBtn").addEventListener("click", showAddFarm);

document.getElementById("cdreBtn").addEventListener("click", () => {
  page.innerHTML = `
    <div class="dashboard">
      <h2>🧠 CDRE</h2>
      <p>Coming Soon...</p>
    </div>
  `;
});

document.getElementById("marketBtn").addEventListener("click", () => {
  page.innerHTML = `
    <div class="dashboard">
      <h2>🛒 Marketplace</h2>
      <p>Coming Soon...</p>
    </div>
  `;
});
