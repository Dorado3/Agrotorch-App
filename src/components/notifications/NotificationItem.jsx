import React from "react";

export default function NotificationItem({

    title,

    message,

    time

}) {

    return (

        <div
            style={{
                borderBottom: "1px solid #eee",
                padding: "12px"
            }}
        >

            <h4>{title}</h4>

            <p>{message}</p>

            <small>{time}</small>

        </div>

    );

}
