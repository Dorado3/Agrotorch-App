import React from "react";

export default function SearchResults({

    results=[]

}){

    return(

        <div>

            {

                results.map((item,index)=>(

                    <div

                        key={index}

                        style={{

                            padding:"12px",

                            borderBottom:"1px solid #eee"

                        }}

                    >

                        <strong>{item.title}</strong>

                        <p>{item.description}</p>

                    </div>

                ))

            }

        </div>

    );

}
