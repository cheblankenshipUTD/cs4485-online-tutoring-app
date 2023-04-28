import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tutors = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const [tutorsData, setTutorsData] = useState([{}]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/tutors")
    .then(res => res.json())
    .then(data => {setTutorsData(data)})
  }, [])

  const UserOrLoggedOut = () => {
    if(user)
    {
      const isTutor = user.about_me;
        
      if(isTutor == null)
          return true; //a user is logged in
      else
          return false; //a tutor is logged in
    }

    else {
      return true; //logged out
    }
  };

  const isUserOrLoggedOut = UserOrLoggedOut();

   //alert(`isUserOrLoggedOut: ${isUserOrLoggedOut}`);

  const handleSchedule = (e) => {
    localStorage.setItem("tutorID", JSON.stringify(e));
    navigate("/reservations/new");
  }

  const handleFavorites = (e) => {
    if (user)
    {
      axios.get("http://localhost:8000/favorites/add/" + user.userORtutor_id + "/" + e, {
        userID: user.userORtutor_id,
        tutorID: e,
      })

      navigate("/favorites");
    }

    else {
      navigate("/login");
    }
  }

  const formatTimes = (dateString) => {
    const options = { weekday:"narrow", hour: 'numeric', minute: 'numeric', hour12: true};
    return (new Date(dateString).toLocaleDateString(undefined, options)).substring(2);
  }

  const formatAvailableTimes = (days, startTimes, endTimes) => {
    var tempDays = days.split(", ");
    var tempStarts = startTimes.split(",");
    var tempEnds = endTimes.split(",");
    var format = "";

    for (var i = 0; i < tempDays.length; i++)
    {
      format += tempDays[i] + ": " + formatTimes(tempStarts[i]) + " to " + formatTimes(tempEnds[i]) +"\n\n";
    }

    return format;
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
                      <span>{tutor.first_name} {tutor.last_name}</span>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>About Me</Card.Title>
                        <Card.Text>{tutor.about_me}</Card.Text>
                        <Card.Title>Courses</Card.Title>
                        <Card.Text>{tutor.course_name}</Card.Text>
                        <Card.Title>Available Times</Card.Title>
                        <Card.Text>Days of the Week: {tutor.days}</Card.Text>
                        <Card.Text>Times during days available:</Card.Text>
                        <Card.Text>{formatAvailableTimes(tutor.days, tutor.start_time, tutor.end_time)}</Card.Text>
                        <>
                        {isUserOrLoggedOut &&  
                          <Button onClick={e => handleSchedule(tutor.tutor_id)} variant="primary">Schedule</Button>
                        }
                        </>
                        &ensp;
                        <>
                        {isUserOrLoggedOut &&  
                          <Button onClick={e => handleFavorites(tutor.tutor_id)} variant="primary">Add to favorites</Button>
                        }
                        </>
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
