import React from "react";

export default function DashboardCard({

    title,

    value,

    subtitle

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

            <h3>{title}</h3>

            <h2>{value}</h2>

            <p>{subtitle}</p>

        </div>

    );

}
