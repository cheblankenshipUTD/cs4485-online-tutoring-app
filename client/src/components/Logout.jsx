import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { logout } = useAuth0();

  // State variables
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem("user");
    navigate("/");
  }

  const handleLogout2 = (e) => {
    localStorage.removeItem("user");
    logout();
  }

  return (
    <MDBContainer className="my-5 rounded-5 login-container">
    <MDBRow className="d-flex flex-column ms-5 me-5">
      <MDBCol className="mb-5">
        {/* Logo */}
        <div className="text-center pt-5">
            <img src="https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/App%20Logo.png"
              style={{width: '185px'}} alt="logo" />
            <h4 className="mt-1 pb-5">UTD TUTOR - Logout</h4>
        </div>

        <div className="login-wrapper">
          {/* <Button className="w-100 mb-5 original-logout" onClick={() => handleLogout()}>Logout (original logout button)</Button> */}
          <Button className="w-100 mb-3 btn btn-danger" onClick={() => handleLogout2()}>Logout</Button>
        </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
     
export default Login;