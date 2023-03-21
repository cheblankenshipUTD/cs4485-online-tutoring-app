import React, { useEffect, useState } from 'react'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Header from './Header';
import Footer from './Footer';


function App() {

  const [tutorsData, setTutorsData] = useState([{}]);

  useEffect(() => {
    fetch("/tutors")
    .then(res => res.json())
    .then(data => {setTutorsData(data)})
  }, [])

  return (

    <div className="div-1">
        <Header />
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
            
              {(typeof tutorsData.tutors === 'undefined') ? (
              <p>Loading ...</p>
              ): (
                tutorsData.tutors.map((tutor, i) => (
                  // <p key={i}>{tutor.name}</p>
                  <Col xs="4">
                    <Card
                    key={i}
                    style={{
                      backgroundColor: "#FEA150",
                      color: "white",
                      borderRadius: "25px",
                    }}
                    >
                      <Card.Header>
                      <img
                        src={tutor.profileURL}
                        width="50"
                        height="50"
                        alt="profile img"
                        className="me-1"
                      />
                      <span>{tutor.name}</span>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>{tutor.courseTitle}</Card.Title>
                        <Card.Text>{tutor.rate}/5, {tutor.numberOfReviews} reviews</Card.Text>
                        <Button variant="primary">Schedule</Button>
                      </Card.Body>
                    </Card>
                  </Col>
              ))
              )}
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
        <Footer />
      </div>

  )
}

export default App