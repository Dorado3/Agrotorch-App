import { AgroCard } from "../components/Card.js";

export function farmDetailsPage(farm){

return `

<section class="dashboard">

<h2>🌾 ${farm.farmName}</h2>

<p>${farm.crop} • ${farm.variety}</p>

${AgroCard(`

<h3>🧠 Today's Decision</h3>

<p>

No recommendation yet.

CDRE will analyse this farm soon.

</p>

`)}

${AgroCard(`

<h3>📋 Activities</h3>

<button class="agro-btn">

+ Add Activity

</button>

`)}

${AgroCard(`

<h3>💰 Financial Summary</h3>

<p>Expenses : ₦0</p>

<p>Income : ₦0</p>

<p>Profit : ₦0</p>

`)}

${AgroCard(`

<h3>🌱 Crop Status</h3>

<p>Growth Stage :</p>

<p>Not Started</p>

`)}

${AgroCard(`

<h3>🌤 Weather</h3>

<p>

Weather integration coming soon.

</p>

`)}

</section>

`;

}