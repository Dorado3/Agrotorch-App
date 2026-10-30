import { FarmRepository } from "../repositories/FarmRepository.js";
import { auth } from "../core/config/firebase.js";
import { CropRegistry } from "../core/crops/cropRegistry.js";
import "../styles/dashboard.css";

export function addFarmPage() {
  const cropOptions = CropRegistry.map(crop => `<option value="${crop.id}">${crop.name}</option>`).join("");
  return `
    <section class="dashboard">
      <div class="hero-card"><h2>🌾 Register a New Farm</h2><p>Create a farm profile for your individual farm portal.</p></div>
      <form id="farmForm" class="farm-form">
        <label>Farm Name</label><input type="text" id="farmName" required>
        <label>Owner Name</label><input type="text" id="ownerName" required>
        <label>State</label><input type="text" id="state" required>
        <label>LGA</label><input type="text" id="lga" required>
        <label>Farm Size (Acres)</label><input type="number" id="farmSize" min="0.01" step="0.01" required>
        <label>Crop</label><select id="crop" required>${cropOptions}</select>
        <div id="otherCropContainer" style="display:none"><label>Specify Crop</label><input type="text" id="otherCrop" placeholder="Enter crop name"></div>
        <label>Variety</label><input type="text" id="variety">
        <div id="nurseryContainer">
          <label>Nursery Date (if applicable)</label><input type="date" id="nurseryDate">
          <label>Transplant Date</label><input type="date" id="transplantDate">
        </div>
        <div id="plantingContainer" style="display:none"><label>Planting Date</label><input type="date" id="plantingDate"></div>
        <button type="submit" class="action-btn">Save Farm</button>
      </form>
      <div id="saveMessage" role="status" aria-live="polite"></div>
    </section>`;
}

export function initAddFarmPage(onSaved) {
  const form = document.getElementById("farmForm");
  if (!form) return;
  const cropSelect = document.getElementById("crop");
  const nurseryContainer = document.getElementById("nurseryContainer");
  const plantingContainer = document.getElementById("plantingContainer");
  const otherCropContainer = document.getElementById("otherCropContainer");

  function updateCropFields() {
    const cropId = cropSelect.value;
    const crop = CropRegistry.find(item => item.id === cropId);
    otherCropContainer.style.display = cropId === "other" ? "block" : "none";
    nurseryContainer.style.display = crop?.productionMethod === "Nursery" ? "block" : "none";
    plantingContainer.style.display = crop?.productionMethod === "Nursery" ? "none" : "block";
  }
  updateCropFields();
  cropSelect.addEventListener("change", updateCropFields);

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const currentUser = auth.currentUser;
    const message = document.getElementById("saveMessage");
    if (!currentUser) {
      message.textContent = "Please sign in before registering a farm.";
      return;
    }

    const cropId = cropSelect.value;
    const registryCrop = CropRegistry.find(item => item.id === cropId);
    const cropName = cropId === "other"
      ? document.getElementById("otherCrop").value.trim()
      : registryCrop?.name || "";
    if (!cropName) {
      message.textContent = "Enter the crop name.";
      return;
    }

    const farm = {
      farmName: document.getElementById("farmName").value.trim(),
      ownerName: document.getElementById("ownerName").value.trim(),
      state: document.getElementById("state").value.trim(),
      lga: document.getElementById("lga").value.trim(),
      size: Number(document.getElementById("farmSize").value),
      cropId,
      crop: cropName,
      variety: document.getElementById("variety").value.trim(),
      productionMethod: registryCrop?.productionMethod || "Custom",
      nurseryDate: document.getElementById("nurseryDate").value,
      transplantDate: document.getElementById("transplantDate").value,
      plantingDate: document.getElementById("plantingDate").value
    };

    try {
      message.textContent = "Saving farm…";
      await FarmRepository.create(currentUser.uid, farm);
      form.reset();
      updateCropFields();
      message.textContent = "Farm saved successfully.";
      if (typeof onSaved === "function") await onSaved();
    } catch (error) {
      console.error("Farm save failed", error);
      message.textContent = error?.message || "Could not save the farm. Check your connection and try again.";
    }
  });
}
