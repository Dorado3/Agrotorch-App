/*
----------------------------------------------------
AgroTorch AgriOS
File: src/app.js
Version: 0.6.0
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

import {
    addExpensePage,
    initAddExpensePage
} from "./pages/addExpense.js";

import {
    expenseTimelinePage,
    initExpenseTimeline
} from "./pages/expenseTimeline.js";

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

            <button id="homeBtn">🏠</button>

            <button id="farmBtn">🌾</button>

            <button id="addFarmBtn">➕</button>

            <button id="addActivityBtn">📝</button>

            <button id="activityBtn">📋</button>

            <button id="expenseBtn">💰</button>

            <button id="expenseHistoryBtn">📊</button>

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

    function showAddExpense() {
        page.innerHTML = addExpensePage();
        initAddExpensePage();
    }

    function showExpenseHistory() {
        page.innerHTML = expenseTimelinePage();
        initExpenseTimeline();
    }

    showHome();

    document.getElementById("homeBtn").addEventListener("click", showHome);

    document.getElementById("farmBtn").addEventListener("click", showMyFarm);

    document.getElementById("addFarmBtn").addEventListener("click", showAddFarm);

    document.getElementById("addActivityBtn").addEventListener("click", showAddActivity);

    document.getElementById("activityBtn").addEventListener("click", showActivities);

    document.getElementById("expenseBtn").addEventListener("click", showAddExpense);

    document.getElementById("expenseHistoryBtn").addEventListener("click", showExpenseHistory);

}