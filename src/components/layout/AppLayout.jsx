import React from "react";

export default function AppLayout({ children }) {

    return (

        <div>

            <header>

                <h2>🌱 AgroTorch</h2>

            </header>

            <main>

                {children}

            </main>

        </div>

    );

}
