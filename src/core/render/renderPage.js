/*
----------------------------------------------------
AgroTorch Render Engine
Version 1.0.0
----------------------------------------------------
*/

export async function renderPage(container, pageFunction) {

    try {

        container.innerHTML = `
            <div class="loading-page">
                <p>Loading...</p>
            </div>
        `;

        const html = await pageFunction();

        container.innerHTML = html;

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <section class="dashboard">
                <div class="agro-card">
                    <h2>⚠️ Something went wrong</h2>
                    <p>${error.message}</p>
                </div>
            </section>
        `;

    }

}
