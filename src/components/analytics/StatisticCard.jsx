import React from "react";

export default function StatisticCard({

    title,

    value,

    change

}) {

    return (

        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "16px"
            }}
        >

            <h4>{title}</h4>

            <h2>{value}</h2>

            <small>{change}</small>

        </div>

    );

}
