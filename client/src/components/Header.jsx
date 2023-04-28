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

  const isUser = () => {
    const user = localStorage.getItem("user");
    if(user)
    {
      const isTutor = JSON.parse(localStorage.getItem("user")).about_me;
        
      if(isTutor == null)
          return true; //a user is logged in
      else
          return false; //a tutor is logged in
    }

    else {
      return false; //logged out
    }
  };

  const constProfilePic = () => {
    const user = localStorage.getItem("user");
    if(user)
    {
      const pic = JSON.parse(localStorage.getItem("user"));
      const isTutor = pic.about_me;
      //console.log(pic.profile_url);
        
      if(isTutor == null)
          return "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="; //a user is logged in
      else
          return pic.profile_url; //a tutor is logged in
    }
  }

  const isLoggedIn = useAuth();
  const IsUser = isUser();

  //const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>

<Navbar bg="headOrange" variant="dark">
          <Container>
            <img src="https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/App%20Logo.png" alt="logo" width="50" height="50" />
            &nbsp; &nbsp;
            <Nav className="something">
              <Navbar.Brand href="/home">UTD TUTOR</Navbar.Brand>
            </Nav>
            
            <Nav className="me-auto">
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/courses">Courses</Nav.Link>

              <>
                {isLoggedIn && IsUser &&  
                  <Nav.Link href="/tutors">Schedule With a Tutor</Nav.Link>
                }
              </>

              <>
                {isLoggedIn &&  
                  <Nav.Link href="/reservations">Reservations</Nav.Link>
                }
              </>

              <>
                {isLoggedIn && IsUser &&  
                  <Nav.Link href="/favorites">Favorites</Nav.Link>
                }
              </>

              <>
                {isLoggedIn && IsUser &&  
                  <Nav.Link href="/tutors/new">Become a Tutor</Nav.Link>
                }
              </>

              <>
                {!isLoggedIn &&  
                  <Nav.Link href="/tutors">Schedule With a Tutor</Nav.Link>
                }
              </>

              <>
                {!isLoggedIn &&  
                  <Nav.Link href="/login">Login</Nav.Link>
                }
              </>

              <>
                {!isLoggedIn &&  
                  <Nav.Link href="/tutors/new">Become a Tutor</Nav.Link>
                }
              </>

              
            </Nav>

                {isLoggedIn && 
                  <NavDropdown
                  title={
                    <img
                      src={constProfilePic()}
                      width="50"
                      height="50"
                      alt="profile img"
                      className="me-1"
                      style={{borderRadius: '50%'}}
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
              
          </Container>
        </Navbar>


    </div>
  )
}

export default Header
