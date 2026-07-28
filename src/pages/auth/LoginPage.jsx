import React from "react";

export default function LoginPage() {

    return (

        <div>

            <h1>Welcome to AgroTorch</h1>

            <p>Sign in to continue.</p>

            <form>

                <input
                    type="email"
                    placeholder="Email Address"
                />

                <input
                    type="password"
                    placeholder="Password"
                />

                <button>

                    Login

                </button>

            </form>

        </div>

    );

}
