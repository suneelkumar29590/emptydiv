import { Link,useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Header from "./Header";




function Inddeveloper(){
    const params=useParams();
    const [rating,setRating]=useState('');
   
    const [taskprovider,setTaskprovider]=useState(null);

    const {fullname,email,skills,id}=(params);
    console.log(id);

    const onSubmitHandler=e=>{
        e.preventDefault()
        axios.get('http://localhost:4005/individualprofile',{
            headers:{
                'token':localStorage.getItem('token')
            }

        })
        .then(response=>setTaskprovider(response.data.fullname))
        .catch(error=>console.log(error.response.data))

        let review ={
            taskprovider,
            taskworker:id,
            rating
        }
        console.log(review);
        axios.post('http://localhost:4009/addreview', review ,{
            headers:{
                'token':localStorage.getItem('token')
            }
        })
        .then(response=>alert(response.data))
        .catch(error=>console.log(error.response.data))
        setRating('')
    }

    
    return(
        
        <div>
            <Header />
            <div className="my-container text-center"> 
                    <div>
                     <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" className="w-25 "/>
                     </div>
                     <h1 className="text-primary">{fullname}</h1>
                     <p className="text-danger">{email}</p>
                     
                     <ul className="skills">
                            {skills.split(",").map(skills=>
                               <li className="text-success">
                                    {skills}
                               </li> 
                                )}
                     </ul>
                     <p className="text-primary">India</p>
                     

                     </div>  
                     <div className="rating-container text-center">
                        <h2 className="text-primary">Review and Rating</h2>
                        <form onSubmit={onSubmitHandler} className="form">
                            <label>Enter your review</label>
                            <input type='text' placeholder="enter rating out of 5" value={rating} onChange={(e)=>setRating(e.target.value)} required/>
                            <button type="submit" className="btn btn-success ">Add review</button>

                        </form>



                        </div> 
        </div>
        
    )
}
export default Inddeveloper;