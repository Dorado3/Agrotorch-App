import "../styles/dashboard.css";
export function dashboardPage() {
  return `
    <section class="dashboard">

      <div class="hero-card">
        <h2>Welcome to AgroTorch</h2>
        <p>Your Agricultural Operating System</p>
      </div>

      <div class="stats-grid">

        <div class="stat-card">
          <span class="stat-icon">🌾</span>
          <h3>12</h3>
          <p>Active Farms</p>
        </div>

        <div class="stat-card">
          <span class="stat-icon">🛒</span>
          <h3>248</h3>
          <p>Marketplace Products</p>
        </div>

        <div class="stat-card">
          <span class="stat-icon">👨‍🌾</span>
          <h3>38</h3>
          <p>Registered Farmers</p>
        </div>

        <div class="stat-card">
          <span class="stat-icon">🧠</span>
          <h3>97%</h3>
          <p>CDRE Accuracy</p>
        </div>

      </div>

      <div class="quick-actions">

        <button class="action-btn">
          ➕ Add Farm
        </button>

        <button class="action-btn">
          📋 View Reports
        </button>

        <button class="action-btn">
          🛒 Open Marketplace
        </button>

        <button class="action-btn">
          🤖 Launch CDRE
        </button>

      </div>

    </section>
  `;
}
