import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import Button from "react-bootstrap/Button";

const Login = () => {
    // State variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const navigate = useNavigate();

    const handleSubmit  = (e) => {
      e.preventDefault();
      axios.post("http://localhost:8000/login", {
          email: email,
          password: password,
      }).then((response) => {
        if (response.data.message) { //if there was something wrong with the username and password form validation
          setLoginStatus(response.data.message);
        }
        else {
          //setLoginStatus(response.data[0].first_name);
          localStorage.setItem("user", JSON.stringify(response.data[0]));
          navigate("/");
        }
      })
    }

    return (
        <MDBContainer className="my-5 rounded-5 login-container">
        <MDBRow>
          <MDBCol col='5' className="mb-5">
              <form className="d-flex flex-column ms-5 me-5" onSubmit={handleSubmit}>

                <div className="text-center pt-5">
                  <img src="https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/App%20Logo.png"
                    style={{width: '185px'}} alt="logo" />
                  <h4 className="mt-1 mb-5 pb-1">UTD TUTOR</h4>
                </div>

                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' required onChange={(e) => setEmail(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' required onChange={(e) => setPassword(e.target.value)}/>

                <div className="text-center pt-1 mb-5 pb-1">
                  <Button className="mb-4 w-100" type="submit" >Sign in</Button>
                  {/* <a className="text-muted" href="#!">Forgot password?</a> */}
                </div>

                {/* <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4 ">
                  <p className="mb-0">Don't have an account?</p>
                  <Button className='mx-2' variant='outline-danger'>Sign Up</Button>
                </div> */}
                
                <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{loginStatus}</h1>
              </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
} 
     
export default Login;
