import { logoutUser, getCurrentUser } from "../services/authStorage.js";

export function settingsPage(onLogout) {

    const user = getCurrentUser();

    return `
    <section class="dashboard">

        <h2>⚙️ Settings</h2>

        <div class="agro-card">

            <h3>👤 Logged in as</h3>

            <p>${user ? user.name : "Unknown User"}</p>

            <br>

            <button id="logoutBtn">
                🚪 Logout
            </button>

        </div>

    </section>
    `;

}

export function initSettingsPage(onLogout) {

    document
        .getElementById("logoutBtn")
        .addEventListener("click", () => {

            logoutUser();

            onLogout();

        });

}
