import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";


import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [skills, setskills] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  let navigate = useNavigate();
  const [data, setdata] = useState([]);

  console.log(fullname);

  const usersData = {
    fullname: fullname,
    email: email,
    mobile: mobile,
    skills: skills,
    password: password,
    confirmPassword: confirmPassword,
  };
  console.log(usersData);

  // useEffect(()=>
  // {
  //   onSubmitForm();
  // })

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (
      fullname &&
      email &&
      mobile &&
      skills &&
      password &&
      confirmPassword !== ""
    ) {
      axios
        .post("http://localhost:4001/register", usersData)
        .then((response) =>   {
          setdata(response.data);
        
          console.log(response.data)
          if (response.status === 200) {
            
            toast.success("Registration Successfull", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
           setTimeout(function(){
            navigate('/reg')
           }, 3000)
            
            
          }
          
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    
     else {
      toast.warning("Enter the Required Details");
     
    }
  };

  return (
    <div className="register-continer">
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
        theme="colored"
      />

      <div className="d-flex  justify-content-left mx-4">
        <div>
          <Form className="form-container" onSubmit={onSubmitForm}>
            <Form.Group
              className="mb-3"
              controlId="fullname"
              onChange={(e) => setfullname(e.target.value)}
              value={fullname}
            >
              <Form.Label>Full name</Form.Label>
              <Form.Control type="text" placeholder="enetr full name" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="enetr email" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="mobile"
              onChange={(e) => setmobile(e.target.value)}
              value={mobile}
            >
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" placeholder="enetr mobile number" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="skills"
              onChange={(e) => setskills(e.target.value)}
              value={skills}
            >
              <Form.Label>skills</Form.Label>
              <Form.Control type="text" placeholder="enetr your skills" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            >
              <Form.Label>password</Form.Label>
              <Form.Control type="password" placeholder="enetr password" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="confirm"
              password
              onChange={(e) => setconfirmPassword(e.target.value)}
              value={confirmPassword}
            >
              <Form.Label>confirmPassword</Form.Label>
              <Form.Control
                type="password"
                placeholder="enetr confirmpassword"
              />
            </Form.Group>
            <button variant="primary" type="submit">
              Register
            </button>
          </Form>
        </div>
      </div>
      <div>
        <img src="" />
      </div>
    </div>
  );
}

export default Register;
