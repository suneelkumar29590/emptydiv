import React from "react";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
    let navigate = useNavigate();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    console.log(email);



    const usersData = {
        
        email: email,
       
        password: password,
        
      };
      console.log(usersData);

      const onSubmitBtn=e=>{
        e.preventDefault();
    if(email && password !== ''){
        axios.post("http://localhost:4009/login",usersData)
        .then(response=>{
            if(response.status === 200){
                let jwtToken = response.data.token
                localStorage.setItem("token",jwtToken)

                toast.success("open Home Page", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });

                      setTimeout(function(){
                        navigate('/home')
                       }, 3000)
                        
            }
        })
        .catch(error =>{
            console.log(error.response.data);
            window.alert(error.response.data)
        })

    }
    else{
        toast.warning("Enter the Required Details");
    }
      }

  return (
    <div className="d-flex  justify-content-center">
        <div>

                    <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
            {/* Same as */}
            <ToastContainer />

        <h4>Doesn't have an account yet? <Link to="/"><span className="text-primary">SignUp</span></Link> </h4>
      <form onSubmit={onSubmitBtn}>
        <Form.Group
          className=""
          controlId="email"
          onChange={(e) => setemail(e.target.value)}
          value={email}
        >
          <Form.Label>Email</Form.Label>
          <Form.Control className="" type="email" placeholder="enetr email" />
        </Form.Group>

        <Form.Group
          className="mb-4"
          controlId="password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
        >
          <Form.Label>password</Form.Label>
          <Form.Control className="" type="password" placeholder="enetr password" />
        </Form.Group>

        <button>Submit</button>
      </form>
      </div>
    </div>
  );
}
export default LoginPage;
