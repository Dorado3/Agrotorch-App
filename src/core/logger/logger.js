/*
----------------------------------------------------
AgroTorch Logger
Version 1.0.0
----------------------------------------------------
*/

export const Logger = {

    info(message, data = null) {

        console.log(
            "[INFO]",
            message,
            data || ""
        );

    },

    warning(message, data = null) {

        console.warn(
            "[WARNING]",
            message,
            data || ""
        );

    },

    error(message, error = null) {

        console.error(
            "[ERROR]",
            message,
            error || ""
        );

    }

};
