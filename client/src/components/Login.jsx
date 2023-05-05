import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Accordion from 'react-bootstrap/Accordion';
import { useAuth0 } from "@auth0/auth0-react";

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

  const { loginWithPopup, loginWithRedirect, logout, getAccessTokenSilently, user, isAuthenticated } = useAuth0();

  return (
    <MDBContainer className="my-5 rounded-5 login-container">
      <MDBRow className="d-flex flex-column ms-5 me-5">
        <MDBCol className="mb-5">
          {/* Logo */}
          <div className="text-center pt-5">
              <img src="https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/App%20Logo.png"
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">UTD TUTOR</h4>
          </div>

          {/* Original Login Form */}
          <Accordion className="mt-5 w-100 mb-5">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Deprecated Login Form</Accordion.Header>
              <Accordion.Body>
                <form className="d-flex flex-column ms-5 me-5" onSubmit={handleSubmit}>
                  <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' required onChange={(e) => setEmail(e.target.value)}/>
                  <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' required onChange={(e) => setPassword(e.target.value)}/>
                  <Button className="w-100" type="submit" >Sign in</Button>
                  <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{loginStatus}</h1>
                </form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* // auth0 login/signup form */}
          <h4 className="mt-1 mb-3">AUTH0 Login/Signup Form</h4>
          {isAuthenticated ? 
            <div>
              <Button className="w-100 mb-3 auth0-logout" href="/logout" >Logout</Button>
              <h5 className="mt-1">Auth0 User Profile</h5>
              <pre style={{textAlign: 'left' }}>{JSON.stringify(user, null, 2)}</pre> 
              <Image src={user.picture} rounded width={200} />
            </div>
            :
            <div>
              <Button className="w-100 auth0-login" onClick={() => loginWithRedirect()} >Login with Redirect</Button>
            </div>
          }
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;