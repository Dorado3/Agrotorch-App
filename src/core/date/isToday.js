/*
----------------------------------------------------
AgroTorch Date Utility
Version 1.0.0
----------------------------------------------------
*/

export function isToday(dateValue) {

    if (!dateValue) {

        return false;

    }

    const date = new Date(dateValue);

    const today = new Date();

    return (

        date.getFullYear() === today.getFullYear() &&

        date.getMonth() === today.getMonth() &&

        date.getDate() === today.getDate()

    );

}
