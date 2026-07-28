import React from "react";

export default function RegisterPage() {

    return (

        <div>

            <h1>Create AgroTorch Account</h1>

            <form>

                <input
                    type="text"
                    placeholder="Full Name"
                />

                <input
                    type="email"
                    placeholder="Email"
                />

                <input
                    type="password"
                    placeholder="Password"
                />

                <button>

                    Create Account

                </button>

            </form>

        </div>

    );

}
