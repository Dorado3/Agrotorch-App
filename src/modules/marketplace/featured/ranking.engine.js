/*
----------------------------------------------------
AgroTorch Marketplace
Ranking Engine
Version 1.0.0
----------------------------------------------------
*/

export function calculateRankingScore(product = {}) {

    const featured = product.featured ? 20 : 0;

    const trust = product.trustScore || 0;

    const rating = (product.rating || 0) * 5;

    const sales = Math.min(product.sales || 0, 100) * 0.2;

    const stock = product.stock > 0 ? 10 : 0;

    const freshness = product.fresh ? 5 : 0;

    return (

        featured +

        trust +

        rating +

        sales +

        stock +

        freshness

    );

}

export function rankProducts(products = []) {

    return [...products].sort(

        (a, b) =>

            calculateRankingScore(b) -

            calculateRankingScore(a)

    );

}
