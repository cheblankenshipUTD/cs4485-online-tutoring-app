import { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import logo from './App Logo.svg';
import footerLogo from './Footer Logo.svg';


export default class App extends Component {

  render() {
    return (
      <div className='div-1'>
        <Navbar bg="headOrange" variant="dark">
          <Container>
            <img src={logo} alt="logo" width="50" height="50"/>
            &nbsp; &nbsp; 
            <Navbar.Brand href="#home">UTD TUTOR</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#tutors">Tutors</Nav.Link>
              <Nav.Link href="subjects">Subjects</Nav.Link>
              <Nav.Link href="appointments">Appointments</Nav.Link>
              <Nav.Link href="favorites">Favorites</Nav.Link>
              <Nav.Link href="becomeatutor">Become a Tutor</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <br></br>
        
        <h2 style={{"textAlign": "center"}}>Tutors For Popular Subjects</h2>
        <Container>
          <Row style={{"padding": "30px", backgroundColor: "#ADE377", borderRadius: "25px"}}>
            <Col xs="4">
              <Card style={{ backgroundColor: "#FEA150", color: "white", borderRadius: "25px" }}>
                <Card.Header>Sarah Tran</Card.Header>
                <Card.Body>
                  <Card.Title>CS 3377</Card.Title>
                  <Card.Text>
                    4.1/5, 16 reviews
                  </Card.Text>
                  <Button variant="primary">Schedule</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="4">
              <Card style={{ backgroundColor: "#FEA150", color: "white", borderRadius: "25px" }}>
                <Card.Header>Randy Ran</Card.Header>
                <Card.Body>
                  <Card.Title>MATH 1200</Card.Title>
                  <Card.Text>
                    3.2/5, 10 reviews
                  </Card.Text>
                  <Button variant="primary">Schedule</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="4">
              <Card style={{ backgroundColor: "#FEA150", color: "white", borderRadius: "25px" }}>
                <Card.Header>John Lee</Card.Header>
                <Card.Body>
                  <Card.Title>CS 2499</Card.Title>
                  <Card.Text>
                    5/5, 5 reviews
                  </Card.Text>
                  <Button variant="primary">Schedule</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row style={{"padding": "30px", backgroundColor: "#ADE377", borderRadius: "25px"}}>
            <Col xs="4">
              <Card style={{ backgroundColor: "#FEA150", color: "white", borderRadius: "25px" }}>
                <Card.Header>Alex Shaw</Card.Header>
                <Card.Body>
                  <Card.Title>GEO 3309</Card.Title>
                  <Card.Text>
                    4/5, 8 reviews
                  </Card.Text>
                  <Button variant="primary">Schedule</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="4">
              <Card style={{ backgroundColor: "#FEA150", color: "white", borderRadius: "25px" }}>
                <Card.Header>Tracey Helix</Card.Header>
                <Card.Body>
                  <Card.Title>CHEM 2315</Card.Title>
                  <Card.Text>
                    1.2/5, 11 reviews
                  </Card.Text>
                  <Button variant="primary">Schedule</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="4">
              <Card style={{ backgroundColor: "#FEA150", color: "white", borderRadius: "25px" }}>
                <Card.Header>Sharice Johnson</Card.Header>
                <Card.Body>
                  <Card.Title>GOVT 3314</Card.Title>
                  <Card.Text>
                    3.3/5, 7 reviews
                  </Card.Text>
                  <Button variant="primary">Schedule</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        
        <br></br>
        
        <h2 style={{"textAlign": "center"}}>Upcomming Appointments</h2>
        <div>
        <Container>
          <Row style={{"padding": "30px", backgroundColor: "#ADE377", borderRadius: "25px"}}>
            <Col xs="5">
              <Card style={{ backgroundColor: "#FEA150", color: "white", borderRadius: "25px" }}>
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
              <Card style={{ backgroundColor: "#FEA150", color: "white", borderRadius: "25px" }}>
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

        <MDBFooter bgColor='headOrange' className='text-center text-lg-start text-white border-top'>
          <section className=''>
            <MDBContainer className='text-center text-md-start mt-5'>
              <MDBRow className='mt-3'>
                <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4 '>
                  <h6 className='text-uppercase fw-bold mb-4'>
                    <img src={footerLogo} alt="logo" />
                  </h6>
                  <p>
                    UTD TUTOR mission is to provide students a way to get help from and to help other students.
                  </p>
                </MDBCol>

                <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Support</h6>
                  <p>
                    <a href='#!' className='text-reset'>
                      Contact Us
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Suggestions
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Tutoring Tips
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Report
                    </a>
                  </p>
                </MDBCol>

                <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>About Us</h6>
                  <p>
                    <a href='#!' className='text-reset'>
                      Our Story
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Blog
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      News
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Help
                    </a>
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>

          <div className='text-center p-4' style={{ backgroundColor: "#C9803C" }}>
            © 2023 UTD TUTOR. All Rights Reserved.
          </div>
        </MDBFooter>
      </div>
    );
}

}
