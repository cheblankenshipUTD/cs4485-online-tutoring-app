import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Profile = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const accountType = () => {
        const isTutor = user.about_me;
        
        if(isTutor == null)
            return false;
        else
            return true;
      };
    
      const isTutor = accountType();

    return (
        <div className="div-1">
            <br></br>
            <h2 style={{ textAlign: "center" }}>Profile</h2>

            <>
                {isTutor &&  
                  <h3>Profile Picture:</h3>
                }
            </>

            <>
                {isTutor &&  
                  <img
                      src= {user.profile_url}
                      width="100"
                      height="100"
                      alt="profile img"
                      className="me-1"
                    />
                }
            </>

            <h3>First Name: {user.first_name}</h3>
            <h3>Last Name: {user.last_name}</h3>
            <h3>Email: {user.email}</h3>

            <>
                {isTutor &&  
                  <h3>About me: {user.about_me}</h3>
                }
            </>

        </div>
    )
}
   
export default Profile;