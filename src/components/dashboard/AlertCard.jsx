import React from "react";

export default function AlertCard({

    title,

    message

}) {

    return (

        <div
            style={{
                border: "1px solid #f39c12",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "16px"
            }}
        >

            <h3>⚠ {title}</h3>

            <p>{message}</p>

        </div>

    );

}
