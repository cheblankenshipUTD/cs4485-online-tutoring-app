import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useAuth0 } from "@auth0/auth0-react";

const Welcome = () => {
  // State variables
  const [loginStatus, setLoginStatus] = useState("");
  const [newLogin, setNewLoginStatus] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  // already in DB, make query and place res json in local storage
  const loggedIn = () => {
    axios.post("http://localhost:8000/login", {
        email: user.email,
        password: user.sub,
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

  // first login -> create new database person entry
  const newPerson  = () => {
    console.log("New User")

    const url = 'http://localhost:8000/person/new';
    const body = { 
      email: user.email,
      password: user.sub,
      firstName: user.given_name,
      lastName: user.family_name,
      imageLink: user.picture,
      aboutMe: user.about_me,
      isTutor: user.is_tutor
    };
    
    axios.post(url, body).then((response) => {
      //if there was something wrong with the username and password form validation
      if (response.data.message)
        setNewLoginStatus(response.data.message);
    })
  }

  // check if new user/tutor or already in database 
  const logon  = () => {
    if (user.login_count == 1 && isAuthenticated) {
      newPerson();
      loggedIn();
    } else {
      loggedIn();
    }
  }

  return (
    <MDBContainer className="my-5 rounded-5 login-container">
      <MDBRow className="d-flex flex-column ms-5 me-5">
        <MDBCol className="mb-5">
          {/* Logo */}
          <div className="text-center pt-5">
              <img src="https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/App%20Logo.png"
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 pb-1">WELCOME TO UTD TUTOR</h4>
          </div>

          <div>
            {/* must press button to make query (new person / current person) to DB after auth0 login */}
            <Button className="w-100 mb-3 auth0-logout" onClick={() => logon()}>Please Press this button to continue</Button>
            <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{loginStatus}</h1>
            <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{newLogin}</h1>

            {/* // auth0 profile */}
            <h5 className="mt-1">Auth0 User Profile</h5>
            {isAuthenticated && (
              <div>
                <pre style={{textAlign: 'start' }}>{JSON.stringify(user, null, 2)}</pre> 
                <Image src={user.picture} rounded width={200} />
              </div>
            )}
          </div>
          
          {/* // manually create new DB person entry, temp button */}
          <Button className= "mb-4 mt-4" onClick={() => newPerson()}>Database Create Person Manual (TEMP)</Button>
          
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Welcome;