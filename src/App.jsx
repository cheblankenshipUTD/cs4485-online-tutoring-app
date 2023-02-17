import { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "./svg/App Logo.svg";
import footerLogo from "./svg/Footer Logo.svg";
import ProfileIcon from "./svg/Profile.svg";
import JohnProfileIcon from "./svg/John.svg";
import SarahProfileIcon from "./svg/Sarah.svg";
import RandyProfileIcon from "./svg/Randy.svg";
import AlexProfileIcon from "./svg/Alex.svg";
import ShariceProfileIcon from "./svg/Sharice.svg";

export default class App extends Component {
  render() {
    return (
      <div className="div-1">
        <Navbar bg="headOrange" variant="dark">
          <Container>
            <img src={logo} alt="logo" width="50" height="50" />
            &nbsp; &nbsp;
            <Navbar.Brand href="#home">UTD TUTOR</Navbar.Brand>
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
              <Nav.Link href="#tutors">Tutors</Nav.Link>
              <Nav.Link href="subjects">Subjects</Nav.Link>
              <Nav.Link href="appointments">Appointments</Nav.Link>
              <Nav.Link href="favorites">Favorites</Nav.Link>
              <Nav.Link href="becomeatutor">Become a Tutor</Nav.Link>
            </Nav>
            <NavDropdown
              title={
                <img
                  src={ProfileIcon}
                  width="50"
                  height="50"
                  alt="profile img"
                  className="me-1"
                />
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">
                View Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">History</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" style={{ color: "red" }}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Container>
        </Navbar>

        <br></br>

        <h2 style={{ textAlign: "center" }}>Tutors For Popular Subjects</h2>
        <Container>
          <Row
            style={{
              padding: "30px",
              backgroundColor: "#ADE377",
              borderRadius: "25px",
            }}
          >
            <Col xs="4">
              <Card
                style={{
                  backgroundColor: "#FEA150",
                  color: "white",
                  borderRadius: "25px",
                }}
              >
                {/* <div className="d-flex"> */}

                <Card.Header>
                  <img
                    src={SarahProfileIcon}
                    width="50"
                    height="50"
                    alt="profile img"
                    className="me-1"
                  />
                  <span>Sarah Tran</span>
                </Card.Header>
                {/* </div> */}
                <Card.Body>
                  <Card.Title>CS 3377</Card.Title>
                  <Card.Text>4.1/5, 16 reviews</Card.Text>
                  <Button variant="primary">Schedule</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="4">
              <Card
                style={{
                  backgroundColor: "#FEA150",
                  color: "white",
                  borderRadius: "25px",
                }}
              >
                <Card.Header>
                  <img
                    src={RandyProfileIcon}
                    width="50"
                    height="50"
                    alt="profile img"
                    className="me-1"
                  />
                  <span>Randy Ran</span>
                </Card.Header>
                <Card.Body>
                  <Card.Title>MATH 1200</Card.Title>
                  <Card.Text>3.2/5, 10 reviews</Card.Text>
                  <Button variant="primary">Schedule</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="4">
              <Card
                style={{
                  backgroundColor: "#FEA150",
                  color: "white",
                  borderRadius: "25px",
                }}
              >
                <Card.Header>
                  <img
                    src={JohnProfileIcon}
                    width="50"
                    height="50"
                    alt="profile img"
                    className="me-1"
                  />
                  <span>John Lee</span>
                </Card.Header>
                <Card.Body>
                  <Card.Title>CS 2499</Card.Title>
                  <Card.Text>5/5, 5 reviews</Card.Text>
                  <Button variant="primary">Schedule</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row
            style={{
              padding: "30px",
              backgroundColor: "#ADE377",
              borderRadius: "25px",
            }}
          >
            <Col xs="4">
              <Card
                style={{
                  backgroundColor: "#FEA150",
                  color: "white",
                  borderRadius: "25px",
                }}
              >
                <Card.Header>
                  <img
                    src={AlexProfileIcon}
                    width="50"
                    height="50"
                    alt="profile img"
                    className="me-1"
                  />
                  <span>Alex Shaw</span>
                </Card.Header>
                <Card.Body>
                  <Card.Title>GEO 3309</Card.Title>
                  <Card.Text>4/5, 8 reviews</Card.Text>
                  <Button variant="primary">Schedule</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="4">
              <Card
                style={{
                  backgroundColor: "#FEA150",
                  color: "white",
                  borderRadius: "25px",
                }}
              >
                <Card.Header>
                  <img
                    src={SarahProfileIcon}
                    width="50"
                    height="50"
                    alt="profile img"
                    className="me-1"
                  />
                  <span>Tracey Helix</span>
                </Card.Header>
                <Card.Body>
                  <Card.Title>CHEM 2315</Card.Title>
                  <Card.Text>1.2/5, 11 reviews</Card.Text>
                  <Button variant="primary">Schedule</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="4">
              <Card
                style={{
                  backgroundColor: "#FEA150",
                  color: "white",
                  borderRadius: "25px",
                }}
              >
                <Card.Header>
                  <img
                    src={ShariceProfileIcon}
                    width="50"
                    height="50"
                    alt="profile img"
                    className="me-1"
                  />
                  <span>Sharice Johnson</span>
                </Card.Header>
                <Card.Body>
                  <Card.Title>GOVT 3314</Card.Title>
                  <Card.Text>3.3/5, 7 reviews</Card.Text>
                  <Button variant="primary">Schedule</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <br></br>

        <h2 style={{ textAlign: "center" }}>Upcoming Appointments</h2>
        <div>
          <Container>
            <Row
              style={{
                padding: "30px",
                backgroundColor: "#ADE377",
                borderRadius: "25px",
              }}
            >
              <Col xs="5">
                <Card
                  style={{
                    backgroundColor: "#FEA150",
                    color: "white",
                    borderRadius: "25px",
                  }}
                >
                  <Card.Header>Appintment #49583</Card.Header>
                  <Card.Body>
                    <Card.Title>HIST 1301 with Ryan</Card.Title>
                    <Card.Text>
                      <p>Zoom link : https://zoom.us/</p>
                      <p>Time: 3:00 pm - 3:45 pm</p>
                    </Card.Text>
                    <Button variant="primary">Join</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs="5">
                <Card
                  style={{
                    backgroundColor: "#FEA150",
                    color: "white",
                    borderRadius: "25px",
                  }}
                >
                  <Card.Header>Appintment #74294</Card.Header>
                  <Card.Body>
                    <Card.Title>MATH 2413 with Alice</Card.Title>
                    <Card.Text>
                      <p>Zoom link : https://zoom.us/</p>
                      <p>Time: 5:00 pm - 5:45 pm</p>
                    </Card.Text>
                    <Button variant="secondary">Wait</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <br></br>

        <MDBFooter
          bgColor="headOrange"
          className="text-center text-lg-start text-white border-top"
        >
          <section className="">
            <MDBContainer className="text-center text-md-start mt-5">
              <MDBRow className="mt-3">
                <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4 ">
                  <h6 className="text-uppercase fw-bold mb-4">
                    <img src={footerLogo} alt="logo" />
                  </h6>
                  <p>
                    UTD TUTOR mission is to provide students a way to get help
                    from and to help other students.
                  </p>
                </MDBCol>

                <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Support</h6>
                  <p>
                    <a href="#!" className="text-reset">
                      Contact Us
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Suggestions
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Tutoring Tips
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Report
                    </a>
                  </p>
                </MDBCol>

                <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">About Us</h6>
                  <p>
                    <a href="#!" className="text-reset">
                      Our Story
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Blog
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      News
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Help
                    </a>
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>

          <div
            className="text-center p-4"
            style={{ backgroundColor: "#C9803C" }}
          >
            © 2023 UTD TUTOR. All Rights Reserved.
          </div>
        </MDBFooter>
      </div>
    );
  }
}
