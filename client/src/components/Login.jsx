import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      <div className="login-wrapper">
      <h1 style={{ textAlign: "center" }}>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="email" onChange={e => {setEmail(e.target.value)}}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => {setPassword(e.target.value)}}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
        <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{loginStatus}</h1>
      </form>
    </div>
    );
} 
     
export default Login;
