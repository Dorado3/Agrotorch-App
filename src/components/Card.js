/*
----------------------------------------------------
AgroTorch Design System
ADS Card Component
Version: 1.0.0
----------------------------------------------------
*/

export function AgroCard(content, extraClass = "") {

    return `
        <div class="agro-card ${extraClass}">
            ${content}
        </div>
    `;

}