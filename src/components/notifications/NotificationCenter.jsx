import React from "react";

import NotificationItem from "./NotificationItem";

export default function NotificationCenter({

    notifications = []

}) {

    return (

        <div>

            <h2>Notifications</h2>

            {

                notifications.map((notification,index)=>(

                    <NotificationItem

                        key={index}

                        title={notification.title}

                        message={notification.message}

                        time={notification.time}

                    />

                ))

            }

        </div>

    );

}
