import { saveSale } from "../services/salesStorage.js";

export function addSalePage() {

    return `
    <section class="dashboard">

        <div class="hero-card">

            <h2>💵 Record Sale</h2>

            <p>Record produce sold.</p>

        </div>

        <form id="saleForm" class="farm-form">

            <label>Buyer</label>

            <input
                type="text"
                id="buyer"
                required
            >

            <label>Product</label>

            <input
                type="text"
                id="product"
                required
            >

            <label>Quantity</label>

            <input
                type="number"
                id="quantity"
                required
            >

            <label>Unit Price (₦)</label>

            <input
                type="number"
                id="unitPrice"
                required
            >

            <label>Sale Date</label>

            <input
                type="date"
                id="saleDate"
                required
            >

            <label>Payment Status</label>

            <select id="paymentStatus">

                <option>Paid</option>

                <option>Pending</option>

            </select>

            <button
                type="submit"
                class="action-btn"
            >
                💾 Save Sale
            </button>

        </form>

        <div id="saleMessage"></div>

    </section>
    `;

}

export function initAddSalePage() {

    const form = document.getElementById("saleForm");

    if (!form) return;

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const quantity =
            Number(document.getElementById("quantity").value);

        const unitPrice =
            Number(document.getElementById("unitPrice").value);

        const sale = {

            buyer:
                document.getElementById("buyer").value,

            product:
                document.getElementById("product").value,

            quantity,

            unitPrice,

            total:
                quantity * unitPrice,

            date:
                document.getElementById("saleDate").value,

            paymentStatus:
                document.getElementById("paymentStatus").value

        };

        saveSale(sale);

        form.reset();

        document.getElementById("saleMessage").innerHTML = `
            <p style="color:green;font-weight:bold;margin-top:20px;">
                ✅ Sale Saved Successfully
            </p>
        `;

    });

}
