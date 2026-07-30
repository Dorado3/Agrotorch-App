/*
----------------------------------------------------
AgroTorch Dialog Service
Version 1.0.0
----------------------------------------------------
*/

export function showDialog({

    title = "AgroTorch",

    message = "",

    onOk = null

}) {

    alert(`${title}\n\n${message}`);

    if (onOk) {

        onOk();

    }

}

export function confirmDialog({

    title = "Confirm",

    message = "",

    onConfirm = null

}) {

    const result = confirm(

        `${title}\n\n${message}`

    );

    if (result && onConfirm) {

        onConfirm();

    }

}
