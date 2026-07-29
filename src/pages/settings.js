import { auth } from "../core/config/firebase.js";
import { logout } from "../modules/auth/firebase/firebaseAuth.service.js";

export function settingsPage() {

    const user = auth.currentUser;

    return `
    <section class="dashboard">

        <h2>⚙️ Settings</h2>

        <div class="agro-card">

            <h3>👤 Logged in as</h3>

            <p>${user?.email || "Unknown User"}</p>

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
        .addEventListener("click", async () => {

            await logout();

            onLogout();

        });

}
