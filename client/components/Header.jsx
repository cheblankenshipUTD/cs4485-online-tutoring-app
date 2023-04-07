import React from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const useAuth = () => {
    const user = localStorage.getItem("user");
    return user;
  };

  const isLoggedIn = useAuth();

  return (
    <div>

<Navbar bg="headOrange" variant="dark">
          <Container>
            <img src="https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/App%20Logo.png" alt="logo" width="50" height="50" />
            &nbsp; &nbsp;
            <Nav className="something">
              <Navbar.Brand href="/home">UTD TUTOR</Navbar.Brand>
            </Nav>
            <form
              class="d-flex"
              style={{
                margin: "0 auto",
                width: "35%",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <input
                  class="form-control"
                  placeholder="Search for Classes or Tutors"
                  aria-label="Search"
                  style={{
                    width: "100%",
                    borderRadius: "20px 0 0 20px",
                    borderColor: "#141414",
                    borderRightColor: "#fff",
                  }}
                />
                <button
                  className="btn"
                  type="submit"
                  style={{
                    height: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "0 50px 50px 0",
                    borderColor: "#141414",

                    display: "flex",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.8926 11.6086L17.7343 16.4505C17.9045 16.6208 18.0001 16.8518 18 17.0925C17.9999 17.3333 17.9042 17.5642 17.7339 17.7344C17.5636 17.9045 17.3327 18.0001 17.0919 18C16.8511 17.9999 16.6203 17.9042 16.4501 17.7339L11.6083 12.892C10.1609 14.0131 8.34083 14.5407 6.51828 14.3674C4.69573 14.1941 3.00764 13.333 1.79742 11.9593C0.587202 10.5855 -0.054236 8.80233 0.00359653 6.97243C0.0614291 5.14253 0.814188 3.40339 2.10874 2.10881C3.40329 0.814229 5.14238 0.0614517 6.97224 0.00361771C8.80209 -0.0542163 10.5853 0.587238 11.959 1.79749C13.3327 3.00773 14.1938 4.69587 14.367 6.51846C14.5403 8.34106 14.0136 10.1612 12.8926 11.6086ZM7.20034 12.5995C8.63244 12.5995 10.0059 12.0306 11.0185 11.0179C12.0312 10.0053 12.6001 8.63177 12.6001 7.19964C12.6001 5.7675 12.0312 4.39402 11.0185 3.38134C10.0059 2.36867 8.63244 1.79975 7.20034 1.79975C5.76823 1.79975 4.39479 2.36867 3.38214 3.38134C2.36949 4.39402 1.80059 5.7675 1.80059 7.19964C1.80059 8.63177 2.36949 10.0053 3.38214 11.0179C4.39479 12.0306 5.76823 12.5995 7.20034 12.5995Z"
                      fill="#0B3D86"
                    />
                  </svg>
                </button>
              </div>
            </form>
            <Nav className="me-auto">
            <Nav.Link href="/tutors">Schedule With a Tutor</Nav.Link>
              <Nav.Link href="/courses">Courses</Nav.Link>

              
              <>
                  {isLoggedIn? <Nav.Link href="/reservations">Reservations</Nav.Link> : <Nav.Link href="/login">Log in</Nav.Link>}
              </>

              <>
                  {isLoggedIn? <Nav.Link href="/favorites">Favorites</Nav.Link> : <Nav.Link href="/users/new">Register</Nav.Link>}
              </>

              <Nav.Link href="/tutors/new">Become a Tutor</Nav.Link>
            </Nav>

              <>
                {isLoggedIn &&  
                  <NavDropdown
                  title={
                    <img
                      src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                      width="50"
                      height="50"
                      alt="profile img"
                      className="me-1"
                    />
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/profile">
                    View Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/history">History</NavDropdown.Item>
                  <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/logout" style={{ color: "red" }}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
                }
              </>
              
          </Container>
        </Navbar>


    </div>
  )
}

export default Header