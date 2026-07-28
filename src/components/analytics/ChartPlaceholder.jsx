import React from "react";

export default function ChartPlaceholder({

    title

}) {

    return (

        <div
            style={{
                border: "2px dashed #bbb",
                borderRadius: "10px",
                padding: "30px",
                textAlign: "center",
                marginBottom: "20px"
            }}
        >

            <h3>{title}</h3>

            <p>Chart will be connected here.</p>

        </div>

    );

}
