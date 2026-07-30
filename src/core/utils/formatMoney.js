/*
----------------------------------------------------
AgroTorch Money Formatter
Version 1.0.0
----------------------------------------------------
*/

export function formatMoney(amount, currency) {

    return new Intl.NumberFormat(

        currency.locale,

        {

            style: "currency",

            currency: currency.code

        }

    ).format(Number(amount || 0));

}
