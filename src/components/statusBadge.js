/*
----------------------------------------------------
AgroTorch Status Badge
Version 1.0.0
----------------------------------------------------
*/

export function statusBadge(status) {

    const colour = {

        "LOW RISK": "#27ae60",

        "MEDIUM RISK": "#f39c12",

        "HIGH RISK": "#c0392b",

        "UNKNOWN": "#7f8c8d"

    };

    return `

    <span

        style="
        background:${colour[status] || "#7f8c8d"};
        color:white;
        padding:6px 12px;
        border-radius:20px;
        font-size:12px;
        font-weight:bold;
        ">

        ${status}

    </span>

    `;

}
