/*
 * AgroTorch Application Kernel
 */
import { splashPage } from "./pages/onboarding/splash.js";
import { startSplash } from "./utils/splash.js";
import { loadWorkspace as initializeWorkspace } from "./core/workspace/workspace.js";
import { renderPage } from "./core/render/renderPage.js";
import { dashboardPage } from "./pages/dashboard.js";
import { myFarmPage, initMyFarmPage } from "./pages/myfarm.js";
import { commandCenterPage } from "./pages/command/index.js";
import { addFarmPage, initAddFarmPage } from "./pages/addFarm.js";
import { cdrePage } from "./pages/cdre.js";
import { addActivityPage, initAddActivityPage } from "./pages/addActivity.js";
import { activityTimelinePage } from "./pages/activityTimeline.js";
import { addExpensePage, initAddExpensePage } from "./pages/addExpense.js";
import { expenseTimelinePage, initExpenseTimeline } from "./pages/expenseTimeline.js";
import { addHarvestPage, initAddHarvestPage } from "./pages/addHarvest.js";
import { harvestTimelinePage, initHarvestTimeline } from "./pages/harvestTimeline.js";
import { addSalePage, initAddSalePage } from "./pages/addSale.js";
import { salesTimelinePage, initSalesTimeline } from "./pages/salesTimeline.js";
import { profitLensPage } from "./pages/profitLens.js";
import { loginPage, initLoginPage } from "./pages/login.js";
import { settingsPage, initSettingsPage } from "./pages/settings.js";
import { authListener } from "./modules/auth/firebase/firebaseAuth.service.js";
import { registerNavigator } from "./services/navigation.js";

export function startApp() {
  const root = document.querySelector("#app");
  if (!root) return;
  root.innerHTML = splashPage();

  startSplash(() => {
    authListener(async user => {
      try {
        if (user) {
          await initializeWorkspace();
          loadAppWorkspace();
        } else {
          root.innerHTML = loginPage();
          initLoginPage(async () => {
            await initializeWorkspace();
            loadAppWorkspace();
          });
        }
      } catch (error) {
        console.error("AgroTorch startup failed", error);
        root.innerHTML = `<section class="dashboard"><div class="agro-card"><h2>Unable to load AgroTorch</h2><p>${String(error?.message || "Please check your connection and reload.")}</p></div></section>`;
      }
    });
  });
}

function loadAppWorkspace() {
  const root = document.querySelector("#app");
  root.innerHTML = `
    <div class="app">
      <header class="header"><h1>🌾 AgroTorch AgriOS</h1><p>Powering Smarter Agriculture</p></header>
      <main id="page"></main>
      <nav class="bottom-nav" aria-label="Main navigation">
        <button id="homeBtn" aria-label="Home">🏠</button>
        <button id="farmBtn" aria-label="My farms">🌾</button>
        <button id="addFarmBtn" aria-label="Register farm">＋</button>
        <button id="cdreBtn" aria-label="Crop decisions">🧠</button>
        <button id="tasksBtn" aria-label="Farm activities">📋</button>
        <button id="reportsBtn" aria-label="Reports">📊</button>
        <button id="settingsBtn" aria-label="Settings">⚙️</button>
      </nav>
    </div>`;

  const page = document.getElementById("page");
  registerNavigator(html => { page.innerHTML = html; });

  const showHome = () => {
    page.innerHTML = dashboardPage();
    document.getElementById("dashboardTaskBtn")?.addEventListener("click", showCDRE);
  };
  const showMyFarm = async () => {
    await renderPage(page, myFarmPage);
    initMyFarmPage();
  };
  const showFarmWorkspace = () => { page.innerHTML = commandCenterPage(); };
  const showAddFarm = () => {
    page.innerHTML = addFarmPage();
    initAddFarmPage(async () => {
      await initializeWorkspace();
      await showMyFarm();
    });
  };
  const showCDRE = () => {
    page.innerHTML = cdrePage();
    document.getElementById("cdreAddFarmBtn")?.addEventListener("click", showAddFarm);
  };
  const showActivities = () => { page.innerHTML = activityTimelinePage(); };
  const showTasks = () => {
    page.innerHTML = `
      <section class="dashboard">
        <h2>📋 Farm Records</h2>
        <div class="agro-card">
          <p>Keep your farm history accurate by recording field activities, expenses, harvests and sales.</p>
          <button class="action-btn" id="recordActivityBtn">＋ Record activity</button>
          <button class="action-btn" id="activityHistoryBtn">View activity history</button>
          <button class="action-btn" id="recordExpenseBtn">＋ Record expense</button>
          <button class="action-btn" id="expenseHistoryBtn">View expenses</button>
          <button class="action-btn" id="recordHarvestBtn">＋ Record harvest</button>
          <button class="action-btn" id="harvestHistoryBtn">View harvests</button>
          <button class="action-btn" id="recordSaleBtn">＋ Record sale</button>
          <button class="action-btn" id="salesHistoryBtn">View sales</button>
        </div>
      </section>`;
    document.getElementById("recordActivityBtn").onclick = () => { page.innerHTML = addActivityPage(); initAddActivityPage(); };
    document.getElementById("activityHistoryBtn").onclick = showActivities;
    document.getElementById("recordExpenseBtn").onclick = () => { page.innerHTML = addExpensePage(); initAddExpensePage(); };
    document.getElementById("expenseHistoryBtn").onclick = () => { page.innerHTML = expenseTimelinePage(); initExpenseTimeline(); };
    document.getElementById("recordHarvestBtn").onclick = () => { page.innerHTML = addHarvestPage(); initAddHarvestPage(); };
    document.getElementById("harvestHistoryBtn").onclick = () => { page.innerHTML = harvestTimelinePage(); initHarvestTimeline(); };
    document.getElementById("recordSaleBtn").onclick = () => { page.innerHTML = addSalePage(); initAddSalePage(); };
    document.getElementById("salesHistoryBtn").onclick = () => { page.innerHTML = salesTimelinePage(); initSalesTimeline(); };
  };
  const showReports = () => { page.innerHTML = profitLensPage(); };
  const showSettings = () => {
    page.innerHTML = settingsPage();
    initSettingsPage(() => {
      root.innerHTML = loginPage();
      initLoginPage(async () => {
        await initializeWorkspace();
        loadAppWorkspace();
      });
    });
  };

  showHome();
  window.addEventListener("farm-selected", showFarmWorkspace);
  window.addEventListener("navigate-add-farm", showAddFarm);
  document.getElementById("homeBtn").addEventListener("click", showHome);
  document.getElementById("farmBtn").addEventListener("click", showMyFarm);
  document.getElementById("addFarmBtn").addEventListener("click", showAddFarm);
  document.getElementById("cdreBtn").addEventListener("click", showCDRE);
  document.getElementById("tasksBtn").addEventListener("click", showTasks);
  document.getElementById("reportsBtn").addEventListener("click", showReports);
  document.getElementById("settingsBtn").addEventListener("click", showSettings);
}
