import React, { useState } from "react";
import {MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import Button from "react-bootstrap/Button";

function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(pass);
  }
  return (
    <MDBContainer className="my-5 login-container">
      <MDBRow>
        <MDBCol col='5' className="mb-5">
            <form className="d-flex flex-column ms-5" onSubmit={handleSubmit}>

              <div className="text-center">
                <img src="https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/App%20Logo.png"
                  style={{width: '185px'}} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1">UTD TUTOR</h4>
              </div>

              <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' required onChange={(e) => setEmail(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' required onChange={(e) => setPass(e.target.value)}/>

              <div className="text-center pt-1 mb-5 pb-1">
                <Button className="mb-4 w-100" type="submit" >Sign in</Button>
                <a className="text-muted" href="#!">Forgot password?</a>
              </div>

              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4 ">
                <p className="mb-0">Don't have an account?</p>
                <Button className='mx-2' variant='outline-danger'>Sign Up</Button>
              </div>
            </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Login