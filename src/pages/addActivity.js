import { ActivityRepository } from "../repositories/ActivityRepository.js";
import { getWorkspace } from "../core/workspace/workspace.js";

export function addActivityPage() {
  return `<section class="dashboard"><div class="hero-card"><h2>📝 Record Activity</h2><p>Record a field observation or farm operation.</p></div>
    <form id="activityForm" class="farm-form">
      <label>Activity</label><input type="text" id="activity" required>
      <label>Date</label><input type="date" id="activityDate" required>
      <label>Notes</label><textarea id="notes" rows="3"></textarea>
      <button type="submit" class="action-btn">💾 Save Activity</button>
    </form><div id="activityMessage" role="status" aria-live="polite"></div></section>`;
}

export function initAddActivityPage() {
  const form = document.getElementById("activityForm");
  if (!form) return;
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const farm = getWorkspace().activeFarm;
    const message = document.getElementById("activityMessage");
    if (!farm) { message.textContent = "Select a farm first."; return; }
    const result = await ActivityRepository.create({
      farmId: farm.id, farmName: farm.farmName,
      activity: document.getElementById("activity").value.trim(),
      date: document.getElementById("activityDate").value,
      notes: document.getElementById("notes").value.trim()
    });
    form.reset();
    message.textContent = result.synced ? "Activity saved and synced to your farm account." : "Activity saved on this device. Cloud sync is pending and will retry when you reconnect.";
  });
}
