import {
    login,
    register
} from "../modules/auth/firebase/firebaseAuth.service.js";

export function loginPage() {

    return `

    <section class="dashboard">

        <div class="agro-card">

            <h2>🌾 AgroTorch Login</h2>

            <input
                id="fullName"
                type="text"
                placeholder="Full Name (Register only)"
            >

            <br><br>

            <input
                id="email"
                type="email"
                placeholder="Email"
            >

            <br><br>

            <input
                id="password"
                type="password"
                placeholder="Password"
            >

            <br><br>

            <button id="loginBtn">
                Login
            </button>

            <button id="registerBtn">
                Register
            </button>

        </div>

    </section>

    `;

}

export function initLoginPage(onLogin) {

    document
        .getElementById("loginBtn")
        .addEventListener("click", async () => {

            try {

                const email =
                    document.getElementById("email").value.trim();

                const password =
                    document.getElementById("password").value;

                await login(email, password);

                onLogin();

            } catch (error) {

                alert(error.message);

            }

        });

    document
        .getElementById("registerBtn")
        .addEventListener("click", async () => {

            try {

                const fullName =
                    document.getElementById("fullName").value.trim();

                const email =
                    document.getElementById("email").value.trim();

                const password =
                    document.getElementById("password").value;

                await register(
                    email,
                    password,
                    fullName
                );

                alert("Registration successful.");

                onLogin();

            } catch (error) {

                alert(error.message);

            }

        });

}
