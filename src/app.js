/*
----------------------------------------------------
AgroTorch Application Kernel
Version 5.4.0
----------------------------------------------------
*/

import { splashPage } from "./pages/onboarding/splash.js";
import { startSplash } from "./utils/splash.js";

import { loadWorkspace as initializeWorkspace } from "./core/workspace/workspace.js";
import { renderPage } from "./core/render/renderPage.js";

import { dashboardPage } from "./pages/dashboard.js";

import {
    myFarmPage,
    initMyFarmPage
} from "./pages/myfarm.js";

import { farmWorkspacePage } from "./pages/farm/workspace.js";

import { commandCenterPage } from "./pages/command/index.js";

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
    settingsPage,
    initSettingsPage
} from "./pages/settings.js";

import { authListener } from "./modules/auth/firebase/firebaseAuth.service.js";

import {
    registerNavigator
} from "./services/navigation.js";

export function startApp() {

    document.querySelector("#app").innerHTML = splashPage();

    startSplash(() => {

        authListener(async (user) => {

            if (user) {

                await initializeWorkspace();

                loadAppWorkspace();

            } else {

                document.querySelector("#app").innerHTML = loginPage();

                initLoginPage(async () => {

                    await initializeWorkspace();

                    loadAppWorkspace();

                });

            }

        });

    });

}

function loadAppWorkspace() {

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

<button id="tasksBtn">📋</button>

<button id="reportsBtn">📊</button>

<button id="settingsBtn">⚙️</button>

</nav>
</div>

`;
    const page = document.getElementById("page");

registerNavigator((html) => {

    page.innerHTML = html;

});

    const showHome = () => {

        page.innerHTML = dashboardPage();

    };

    const showMyFarm = async () => {

        await renderPage(page, myFarmPage);

        initMyFarmPage();

    };

    const showFarmWorkspace = () => {
 
        page.innerHTML = commandCenterPage();

     };

    const showAddFarm = () => {

        page.innerHTML = addFarmPage();

        initAddFarmPage();

    };

    const showAddActivity = () => {

        page.innerHTML = addActivityPage();

        initAddActivityPage();

    };

    const showActivities = () => {

        page.innerHTML = activityTimelinePage();

    };

    const showAddExpense = () => {

        page.innerHTML = addExpensePage();

        initAddExpensePage();

    };

    const showExpenseHistory = () => {

        page.innerHTML = expenseTimelinePage();

        initExpenseTimeline();

    };

    const showAddHarvest = () => {

        page.innerHTML = addHarvestPage();

        initAddHarvestPage();

    };

    const showHarvestHistory = () => {

        page.innerHTML = harvestTimelinePage();

        initHarvestTimeline();

    };

    const showAddSale = () => {

        page.innerHTML = addSalePage();

        initAddSalePage();

    };

    const showSalesHistory = () => {

        page.innerHTML = salesTimelinePage();

        initSalesTimeline();

    };

    const showProfitLens = () => {

        page.innerHTML = profitLensPage();

    };


const showTasks = () => {

    page.innerHTML = dashboardPage();

};

const showReports = () => {

    page.innerHTML = profitLensPage();

};

    const showSettings = () => {

        page.innerHTML = settingsPage();

        initSettingsPage(() => {

            document.querySelector("#app").innerHTML = loginPage();

            initLoginPage(async () => {

                await initializeWorkspace();

                loadAppWorkspace();

            });

        });

    };

    showHome();

    window.addEventListener("farm-selected", showFarmWorkspace);

document.getElementById("homeBtn")
    .addEventListener("click", showHome);

document.getElementById("farmBtn")
    .addEventListener("click", showMyFarm);

document.getElementById("tasksBtn")
    .addEventListener("click", showTasks);

document.getElementById("reportsBtn")
    .addEventListener("click", showReports);

document.getElementById("settingsBtn")
    .addEventListener("click", showSettings);
}
