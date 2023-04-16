import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
const uri = 'http://localhost:3000/welcome'
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="tutor-3132.us.auth0.com"
      clientId="G4XCU1f95JXUC6RshA6j9Rz29hIIqXCR"
      //authorizationParams={{ redirect_uri: window.location.origin }}
      authorizationParams={{ redirect_uri: uri }}
  >
      <App/>
    </Auth0Provider>, 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
