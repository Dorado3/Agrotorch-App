import React from "react";

export default function SearchBar({

    placeholder = "Search AgroTorch..."

}) {

    return (

        <div>

            <input

                type="text"

                placeholder={placeholder}

                style={{

                    width:"100%",

                    padding:"12px",

                    borderRadius:"8px",

                    border:"1px solid #ccc"

                }}

            />

        </div>

    );

}
