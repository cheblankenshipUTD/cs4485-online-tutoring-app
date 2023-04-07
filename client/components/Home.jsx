import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Home = () => {

    //do this to get the person who is logged in
    //const user = JSON.parse(localStorage.getItem("user"));
    //{user.first_name} {user.last_name}

    const [tutorsData, setTutorsData] = useState([{}]);

  useEffect(() => {
    fetch("/tutors")
    .then(res => res.json())
    .then(data => {setTutorsData(data)})
  }, [])

    return (
        <div className="div-1">
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
                        <Card.Title>Courses</Card.Title>
                        <Card.Text>{tutor.course_name}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
              ))
              )}
          </Row>
        </Container>

        <br></br>

        </div>
        
    )
}
   
  export default Home;