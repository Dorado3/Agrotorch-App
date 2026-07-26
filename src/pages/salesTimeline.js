import {
    getSales,
    deleteSale
} from "../services/salesStorage.js";

export function salesTimelinePage() {

    const sales = getSales();

    if (sales.length === 0) {

        return `
        <section class="dashboard">

            <h2>💵 Sales History</h2>

            <div class="agro-card">

                <h3>No Sales Yet</h3>

                <p>
                    Record your first sale.
                </p>

            </div>

        </section>
        `;

    }

    const totalRevenue = sales.reduce(
        (sum, sale) => sum + Number(sale.total),
        0
    );

    return `
    <section class="dashboard">

        <h2>💵 Sales History</h2>

        <div class="hero-card">

            <h3>Total Revenue</h3>

            <h2>₦${totalRevenue.toLocaleString()}</h2>

        </div>

        ${sales.map(sale => `

            <div class="agro-card">

                <h3>${sale.product}</h3>

                <p><strong>Buyer:</strong> ${sale.buyer}</p>

                <p><strong>Quantity:</strong> ${sale.quantity}</p>

                <p><strong>Unit Price:</strong> ₦${Number(sale.unitPrice).toLocaleString()}</p>

                <p><strong>Total:</strong> ₦${Number(sale.total).toLocaleString()}</p>

                <p><strong>Status:</strong> ${sale.paymentStatus}</p>

                <p><strong>Date:</strong> ${sale.date}</p>

                <button
                    class="deleteSale"
                    data-id="${sale.id}"
                >
                    Delete
                </button>

            </div>

        `).join("")}

    </section>
    `;

}

export function initSalesTimeline() {

    document
        .querySelectorAll(".deleteSale")
        .forEach(button => {

            button.addEventListener("click", () => {

                deleteSale(
                    Number(button.dataset.id)
                );

                location.reload();

            });

        });

}
