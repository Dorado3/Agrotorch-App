import "../../styles/onboarding.css";
import logo from "../../assets/agrotorch-logo.png";

export function splashPage() {
  return `
    <section class="splash-screen">

      <div class="splash-content">

        <img
          src="${logo}"
          alt="AgroTorch Logo"
          class="splash-logo"
        />

        <h1 class="splash-title">
          AgroTorch AgriOS
        </h1>

        <p class="splash-tagline">
          Powering Smarter Agriculture
        </p>

        <div class="loader"></div>

        <p id="loadingText" class="loading-text">
          Preparing your agricultural workspace...
        </p>

      </div>

    </section>
  `;
}
