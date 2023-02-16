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



export default class App extends Component {

  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <br></br>
    
        <h2 style={{"textAlign": "center"}}>Recommended Tutors</h2>
        <Container>
          <Row style={{"padding": "30px"}}>
            <Col xs="4">
              <Card>
                <Card.Header>Bob</Card.Header>
                <Card.Body>
                  <Card.Title>Math 1314</Card.Title>
                  <Card.Text>
                    4.1/5
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="4">
              <Card>
                <Card.Header>Bob jr.</Card.Header>
                <Card.Body>
                  <Card.Title>CS 1337/1336</Card.Title>
                  <Card.Text>
                    3.2/5
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="4">
              <Card>
                <Card.Header>Bob Sr.</Card.Header>
                <Card.Body>
                  <Card.Title>ART 1301</Card.Title>
                  <Card.Text>
                    5/5
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row style={{"padding": "30px"}}>
            <Col xs="4">
              <Card>
                <Card.Header>Alice</Card.Header>
                <Card.Body>
                  <Card.Title>HIST 1301</Card.Title>
                  <Card.Text>
                    5/5
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="4">
              <Card>
                <Card.Header>Alice Jr.</Card.Header>
                <Card.Body>
                  <Card.Title>CHEM 2315</Card.Title>
                  <Card.Text>
                    1.2/5
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="4">
              <Card>
                <Card.Header>Alice Jr.Jr.</Card.Header>
                <Card.Body>
                  <Card.Title>GOVT 3314</Card.Title>
                  <Card.Text>
                    3.3/5
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        
        <h2 style={{"textAlign": "center"}}>Upcomming Appointments</h2>
        <div>
        <Container>
          <Row style={{"padding": "30px"}}>
            <Col xs="5">
              <Card>
                <Card.Header>Appintment #49583</Card.Header>
                <Card.Body>
                  <Card.Title>HIST 1301 with Bob</Card.Title>
                  <Card.Text>
                    <p>Zoom link : https://zoom.us/</p>
                    <p>Time: 3:00 pm - 3:45 pm</p>
                  </Card.Text>
                  <Button variant="primary">Join</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="5">
              <Card>
                <Card.Header>Appintment #74294</Card.Header>
                <Card.Body>
                  <Card.Title>MATH 2413 with Alice Jr.Jr.</Card.Title>
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



        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
          <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
            <div className='me-5 d-none d-lg-block'>
              <span>Get connected with us on social networks:</span>
            </div>

            <div>
              <a href='' className='me-4 text-reset'>
                <MDBIcon fab icon="facebook-f" />
              </a>
              <a href='' className='me-4 text-reset'>
                <MDBIcon fab icon="twitter" />
              </a>
              <a href='' className='me-4 text-reset'>
                <MDBIcon fab icon="google" />
              </a>
              <a href='' className='me-4 text-reset'>
                <MDBIcon fab icon="instagram" />
              </a>
              <a href='' className='me-4 text-reset'>
                <MDBIcon fab icon="linkedin" />
              </a>
              <a href='' className='me-4 text-reset'>
                <MDBIcon fab icon="github" />
              </a>
            </div>
          </section>

          <section className=''>
            <MDBContainer className='text-center text-md-start mt-5'>
              <MDBRow className='mt-3'>
                <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>
                    <MDBIcon icon="gem" className="me-3" />
                    Company name
                  </h6>
                  <p>
                    Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit.
                  </p>
                </MDBCol>

                <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                  <p>
                    <a href='#!' className='text-reset'>
                      Angular
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      React
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Vue
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Laravel
                    </a>
                  </p>
                </MDBCol>

                <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                  <p>
                    <a href='#!' className='text-reset'>
                      Pricing
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Settings
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Orders
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Help
                    </a>
                  </p>
                </MDBCol>

                <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                  <p>
                    <MDBIcon icon="home" className="me-2" />
                    New York, NY 10012, US
                  </p>
                  <p>
                    <MDBIcon icon="envelope" className="me-3" />
                    info@example.com
                  </p>
                  <p>
                    <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
                  </p>
                  <p>
                    <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>

          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
            © 2021 Copyright:
            <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
              MDBootstrap.com
            </a>
          </div>
        </MDBFooter>
      </div>
    );
}

}
