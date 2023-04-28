import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Subjects = () => {

    const [coursesData, setCoursesData] = useState([{}]);

    useEffect(() => {
      fetch("/subjects")
      .then(res => res.json())
      .then(data => {setCoursesData(data)})
    }, [])

    return (
        <div className="div-1">
            <br></br>
            <h2 style={{ textAlign: "center" }}>Courses Available For Tutoring</h2>

            <Container>
            <Row
                style={{
                padding: "30px",
                backgroundColor: "#ADE377",
                borderRadius: "25px",
                margin: "20px"
                }}
            >
            
              {(typeof coursesData.courses === 'undefined') ? (
              <p>Loading ...</p>
              ): (
                coursesData.courses.map((course, i) => (
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
                      <span>Course: {course.course_name}</span>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>Description</Card.Title>
                        <Card.Text>{course.course_description}</Card.Text>
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
   
  export default Subjects;