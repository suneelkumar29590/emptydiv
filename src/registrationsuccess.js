import React from "react";
import { Link } from "react-router-dom";


function Success(){

     
 
    return(
        <div>
            <h1>
                Registaration Success
            </h1>

           <Link to = '/login'><button>Login</button></Link>
        </div>

    )
}
export default Success;