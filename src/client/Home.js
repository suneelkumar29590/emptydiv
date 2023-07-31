import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

import Header from "./Header";


function HomePage(){
    let navigate = useNavigate();
    const[data,setData] = useState([]);


useEffect(()=>{
    axios.get("http://localhost:4001/alldevelopers",{
        headers:{
            "token":localStorage.getItem('token')
        }

    })
    .then(response =>setData(response.data))
    .catch(error=>console.log(error.response.data))
},[])



useEffect(()=>{
    if(localStorage.getItem('token') === null){
        navigate("/")
    }
})

console.log(data);

    return(


         
        <div className="container">
            <Header />
            <div className="profiles">
                {data.length >=1 ?
                    data.map(alldevelopers=>
                        <div className="row">
                        <div className="col-md-3">

                        </div>
                     <div key={alldevelopers._id} className="profile-container card mb-5 col-md-6 text-center p-3 "> 
                    <div>
                     <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" className="w-25 "/>
                     </div>
                     <h1 className="text-primary">{alldevelopers.fullname}</h1>
                     <p className="text-danger">{alldevelopers.email}</p>
                     <p className="text-primary">India</p>
                     <ul className="skills">
                            {alldevelopers.skills.split(",").map(skills=>
                               <li className="text-success">
                                    {skills}
                               </li> 
                                )}
                     </ul>
                     <Link to={`/indprofile/${alldevelopers.fullname}/${alldevelopers.email}/${alldevelopers.skills}/${alldevelopers._id}`}>
                     <button className="btn btn-success" type="button">view profile</button>
                     </Link>

                     </div> 
                     </div> 
                        )
            
            
            :null}

            </div>
        </div>

    )
                            }
export default HomePage;