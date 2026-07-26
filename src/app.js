/*
----------------------------------------------------
AgroTorch AgriOS
File: src/app.js
Version: 0.5.0
Description:
Application Bootstrap
----------------------------------------------------
*/

import { splashPage } from "./pages/onboarding/splash.js";
import { startSplash } from "./utils/splash.js";

import { dashboardPage } from "./pages/dashboard.js";

import {
    myFarmPage,
    initMyFarmPage
} from "./pages/myfarm.js";

import {
    addFarmPage,
    initAddFarmPage
} from "./pages/addFarm.js";

import {
    addActivityPage,
    initAddActivityPage
} from "./pages/addActivity.js";

import {
    activityTimelinePage
} from "./pages/activityTimeline.js";

export function startApp() {

    document.querySelector("#app").innerHTML = splashPage();

    startSplash(loadWorkspace);

}

function loadWorkspace() {

    document.querySelector("#app").innerHTML = `
    <div class="app">

        <header class="header">
            <h1>🌾 AgroTorch AgriOS</h1>
            <p>Powering Smarter Agriculture</p>
        </header>

        <main id="page"></main>

        <nav class="bottom-nav">

            <button id="homeBtn">🏠 Home</button>

            <button id="farmBtn">🌾 Farm Hub</button>

            <button id="addFarmBtn">➕ Add Farm</button>

            <button id="addActivityBtn">📝 Add Activity</button>

            <button id="activityBtn">📋 Activities</button>

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
        initMyFarmPage();
    }

    function showAddFarm() {
        page.innerHTML = addFarmPage();
        initAddFarmPage();
    }

    function showAddActivity() {
        page.innerHTML = addActivityPage();
        initAddActivityPage();
    }

    function showActivities() {
        page.innerHTML = activityTimelinePage();
    }

    showHome();

    document.getElementById("homeBtn").addEventListener("click", showHome);
    document.getElementById("farmBtn").addEventListener("click", showMyFarm);
    document.getElementById("addFarmBtn").addEventListener("click", showAddFarm);
    document.getElementById("addActivityBtn").addEventListener("click", showAddActivity);
    document.getElementById("activityBtn").addEventListener("click", showActivities);

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
            <h2>🛒 AgriMarket</h2>
            <p>Coming Soon...</p>
        </div>
        `;

    });

}