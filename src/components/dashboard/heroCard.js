/*
----------------------------------------------------
AgroTorch Hero Card
Version 1.0.0
----------------------------------------------------
*/

export function heroCard(summary){

return`

<div class="hero-card">

<h1>
🌾 AgroTorch Intelligence
</h1>

<h2>

Good Morning Boss

</h2>

<p>

${summary.totalFarms}

Active Farms

</p>

<p>

Revenue

₦${summary.totalRevenue.toLocaleString()}

</p>

<p>

Net Profit

₦${summary.netProfit.toLocaleString()}

</p>

</div>

`;

}
