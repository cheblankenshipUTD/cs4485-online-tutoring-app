import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from 'react-router-dom';

const Tutors = () => {

  const [tutorsData, setTutorsData] = useState([{}]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/tutors")
    .then(res => res.json())
    .then(data => {setTutorsData(data)})
  }, [])

  const handleSchedule = (e) => {
    navigate("/reservations/new");
  }

    return (
      <div className="div-1">
        <br></br>
        <h2 style={{ textAlign: "center" }}>Tutors Offered</h2>

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
                        src={tutor.profile_url}
                        width="50"
                        height="50"
                        alt="profile img"
                        className="me-1"
                      />
                      <span>{tutor.first_name} {tutor.last_name}</span>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>About Me</Card.Title>
                        <Card.Text>{tutor.about_me}</Card.Text>
                        <Card.Title>Courses</Card.Title>
                        <Card.Text>{tutor.course_name}</Card.Text>
                        <Card.Title>Available Times</Card.Title>
                        <Card.Text>Days of the Week: {tutor.day_of_the_week}</Card.Text>
                        <Card.Text>Times during days available: {Date(tutor.start_time).toLocaleTimeString()} to {Date(tutor.end_time).toLocaleTimeString()}</Card.Text>
                        <Button onClick={handleSchedule} variant="primary">Schedule</Button>
                      </Card.Body>
                    </Card>
                  </Col>
              ))
              )}
          </Row>
        </Container>

        <br></br>


      </div>
    );
  }
   
  export default Tutors;