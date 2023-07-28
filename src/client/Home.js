import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

import Header from "./Header";


function HomePage(){
    let navigate = useNavigate();
    const[data,setData] = useState([]);
useEffect(()=>{
    axios.get("http://localhost:3006/alldevelopers",{
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

    return(


         
        <div>
            <Header />
            <h1>Home</h1>
        </div>

    )
}
export default HomePage;