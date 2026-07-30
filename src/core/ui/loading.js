/*
----------------------------------------------------
AgroTorch Loading Service
Version 1.0.0
----------------------------------------------------
*/

export function showLoading(containerId) {

    const container =
        document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `

        <p
            style="
                color:#27ae60;
                font-weight:bold;
            ">

            ⏳ Loading...

        </p>

    `;

}

export function hideLoading(containerId) {

    const container =
        document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

}
