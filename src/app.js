
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

import {
addHarvestPage,
initAddHarvestPage
} from "./pages/addHarvest.js";

import {
harvestTimelinePage,
initHarvestTimeline
} from "./pages/harvestTimeline.js";

import {
    addSalePage,
    initAddSalePage
} from "./pages/addSale.js";

import {
    salesTimelinePage,
    initSalesTimeline
} from "./pages/salesTimeline.js";

import {
    profitLensPage
} from "./pages/profitLens.js";

import {
    loginPage,
    initLoginPage
} from "./pages/login.js";

import {
    isLoggedIn
} from "./services/authStorage.js";

import {
    settingsPage,
    initSettingsPage
} from "./pages/settings.js";

export function startApp() {

document.querySelector("#app").innerHTML = splashPage();

startSplash(() => {

    if (isLoggedIn()) {

        loadWorkspace();

    } else {

        document.querySelector("#app").innerHTML = loginPage();

        initLoginPage(loadWorkspace);

    }

});
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

        <button id="harvestBtn">🌾</button>  

        <button id="harvestHistoryBtn">📦</button>  

        <button id="saleBtn">💵</button>

        <button id="salesHistoryBtn">📈</button>

        <button id="profitLensBtn">📊</button>

        <button id="settingsBtn">⚙️</button>

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

function showAddHarvest() {  
    page.innerHTML = addHarvestPage();  
    initAddHarvestPage();  
}  

function showHarvestHistory() {  
    page.innerHTML = harvestTimelinePage();  
    initHarvestTimeline();  
}  

function showAddSale() {
    page.innerHTML = addSalePage();
    initAddSalePage();
}

function showSalesHistory() {
    page.innerHTML = salesTimelinePage();
    initSalesTimeline();
}

function showProfitLens() {
    page.innerHTML = profitLensPage();
}

function showSettings() {

    page.innerHTML = settingsPage(() => {

        document.querySelector("#app").innerHTML = loginPage();

        initLoginPage(loadWorkspace);

    });

    initSettingsPage(() => {

        document.querySelector("#app").innerHTML = loginPage();

        initLoginPage(loadWorkspace);

    });

}

showHome();  

document.getElementById("homeBtn").addEventListener("click", showHome);  

document.getElementById("farmBtn").addEventListener("click", showMyFarm);  

document.getElementById("addFarmBtn").addEventListener("click", showAddFarm);  

document.getElementById("addActivityBtn").addEventListener("click", showAddActivity);  

document.getElementById("activityBtn").addEventListener("click", showActivities);  

document.getElementById("expenseBtn").addEventListener("click", showAddExpense);  

document.getElementById("expenseHistoryBtn").addEventListener("click", showExpenseHistory);  

document.getElementById("harvestBtn").addEventListener("click", showAddHarvest);  

document.getElementById("harvestHistoryBtn").addEventListener("click", showHarvestHistory);

document.getElementById("saleBtn").addEventListener("click", showAddSale);

document.getElementById("salesHistoryBtn").addEventListener("click", showSalesHistory);

document.getElementById("profitLensBtn").addEventListener("click", showProfitLens);

document.getElementById("settingsBtn").addEventListener("click", showSettings);

}
