/*
----------------------------------------------------
AgroTorch Notification Service
Version 1.0.0
----------------------------------------------------
*/

export function showNotification({

    containerId,

    message,

    type = "success"

}) {

    const colours = {

        success: "#27ae60",

        error: "#c0392b",

        warning: "#f39c12",

        info: "#2980b9"

    };

    const container =
        document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `

        <div
            style="
                background:${colours[type]};
                color:white;
                padding:12px;
                border-radius:8px;
                margin-top:16px;
                font-weight:bold;
            ">

            ${message}

        </div>

    `;

}
