import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";


const TutorsNew = () => {

    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [firstNameReg, setFirstNameReg] = useState("");
    const [lastNameReg, setLastNameReg] = useState("");

    const navigate = useNavigate();


    const register = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:8000/tutors/new', {email: emailReg, password: passwordReg, firstName: firstNameReg, lastName: lastNameReg})
            .then((res) => {
                console.log("test >> ", res);
                navigate("/login");
            })
            .catch((error) => {
                console.log("Tutor signup error >> ", error);
                navigate("/login");
            })
    }


    return (
        <>
            <div className="div-1">
                <br></br>
                <h2 style={{ textAlign: "center" }}>Sign Up For Tutor Account</h2>
            </div>
            
            <Form>
                {/* Email */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => {setEmailReg(e.target.value)}} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                {/* First Name */}
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" onChange={(e) => {setFirstNameReg(e.target.value)}} />
                </Form.Group>
                {/* Last Name */}
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" onChange={(e) => {setLastNameReg(e.target.value)}} />
                </Form.Group>
                {/* Password */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => {setPasswordReg(e.target.value)}} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={register}>
                    Submit
                </Button>
            </Form>

            
        </>
    )
}
   
  export default TutorsNew;