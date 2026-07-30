/*
----------------------------------------------------
AgroTorch UI Components
Button Component
Version 1.0.0
----------------------------------------------------
*/

export function button({

    id = "",

    text = "Button",

    icon = "",

    className = "action-btn",

    type = "button"

}) {

    return `

    <button

        id="${id}"

        class="${className}"

        type="${type}">

        ${icon} ${text}

    </button>

    `;

}
