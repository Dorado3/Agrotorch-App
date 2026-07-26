/*
----------------------------------------------------
AgroTorch AgriOS
File: src/components/Button.js
Version: 1.0.0
Description:
Reusable AgroTorch Button Component
----------------------------------------------------
*/

export function AgroButton(text, id = "", type = "button") {

    return `
        <button
            class="agro-btn"
            id="${id}"
            type="${type}"
        >
            ${text}
        </button>
    `;

}