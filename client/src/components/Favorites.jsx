import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tutorsData, setTutorsData] = useState([{}]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/favorites/" + user.userORtutor_id)
      .then((res) => res.json())
      .then((data) => {
        setTutorsData(data);
      });
  }, []);

  const handleDelete = (e) => {
    axios.get(
      "http://localhost:8000/favorites/delete/" + user.userORtutor_id + "/" + e,
      {
        userID: user.userORtutor_id,
        tutorID: e,
      }
    );
    window.location.reload();
  };

  const handleSchedule = (e) => {
    localStorage.setItem("tutorID", JSON.stringify(e));
    navigate("/reservations/new");
  };

  return (
    <div className="div-1">
      <br></br>
      <h2 style={{ textAlign: "center" }}>Favorite Tutors</h2>

      <Container>
        <Row
          style={{
            padding: "30px",
            backgroundColor: "#ADE377",
            borderRadius: "25px",
          }}
        >
          {typeof tutorsData.tutors === "undefined" ? (
            <p>Loading ...</p>
          ) : (
            tutorsData.tutors.map((tutor, i) => (
              <Col xs="4" className="p-2">
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
                    <span>
                      {tutor.first_name} {tutor.last_name}
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Courses</Card.Title>
                    <Card.Text>{tutor.course_name}</Card.Text>
                    <Button
                      onClick={(e) => handleSchedule(tutor.tutor_id)}
                      variant="primary"
                    >
                      Schedule
                    </Button>
                    &ensp;
                    <Button
                      onClick={(e) => handleDelete(tutor.tutor_id)}
                      variant="primary"
                    >
                      Remove from favorites
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Favorites;
