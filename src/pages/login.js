import { saveCurrentUser } from "../services/authStorage.js";

export function loginPage() {

    return `

    <section class="dashboard">

        <h2>👤 Farmer Login</h2>

        <div class="agro-card">

            <input
                id="farmerName"
                type="text"
                placeholder="Enter Your Name"
            >

            <br><br>

            <button id="loginBtn">
                Login
            </button>

        </div>

    </section>

    `;

}

export function initLoginPage(onLogin) {

    document
        .getElementById("loginBtn")
        .addEventListener("click", () => {

            const name = document
                .getElementById("farmerName")
                .value
                .trim();

            if (!name) {

                alert("Please enter your name.");

                return;

            }

            saveCurrentUser({

                name

            });

            onLogin();

        });

}
