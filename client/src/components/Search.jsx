import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from 'react-router-dom';

const Search = () => {
     // State variables
    const user = JSON.parse(localStorage.getItem("user"));
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [course, setCourseName] = useState("");
    const [tutorsData, setTutorsData] = useState([{}]);
    const [tutorsData2, setTutorsData2] = useState([{}]);
    const [searchStatus, setSearchStatus] = useState("");
    const [searchStatus2, setSearchStatus2] = useState("");
    const navigate = useNavigate();

    const handleSearchTutor  = (e) => {
        e.preventDefault();
        axios.get("http://localhost:8000/search/" + firstName + "/" + lastName, {
            firstName: firstName,
            lastName: lastName,
        }).then((response) => {
          if (response.data.message) { //if no tutor was found with that first and last name
            setSearchStatus(response.data.message);
          }
          else {
            setTutorsData(response.data);
            setSearchStatus(""); //clears the message
            //console.log(tutorsData)
            //console.log(tutorsData.tutors)
          }
        })
    }

    const handleSearchCourse  = (e) => {
        e.preventDefault();
        axios.get("http://localhost:8000/search/" + course, {
            course: course,
        }).then((response) => {
          if (response.data.message) { //if no tutor was found with that first and last name
            setSearchStatus2(response.data.message);
          }
          else {
            setTutorsData2(response.data);
            setSearchStatus2(""); //clears the message
            //console.log(tutorsData2)
            //console.log(tutorsData2.tutors)
          }
        })
    }

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

    const handleSchedule = (e) => {
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
    
    const formatDate = (dateString) => {
        const options = { weekday:"narrow", hour: 'numeric', minute: 'numeric', hour12: true};
        return (new Date(dateString).toLocaleDateString(undefined, options)).substring(2);
    }

    return (
        <div className="div-1">
            <br></br>
            <h2 style={{ textAlign: "center" }}>Search</h2>

            <h3>Search by name:</h3>

            <form onSubmit={handleSearchTutor}>
                <label>
                    <p>Enter first name</p>
                    <input type="firstName" onChange={e => {setFirstName(e.target.value)}}/>
                </label>
                &ensp;
                <label>
                    <p>Enter last name</p>
                    <input type="lastName" onChange={e => {setLastName(e.target.value)}}/>
                </label>
                
                <div>
                    <br></br>
                    <button type="submit">Submit</button>
                </div>
                
                <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{searchStatus}</h1>

            </form>

            <Container>
                <Row
                    style={{
                    padding: "30px",
                    backgroundColor: "#ADE377",
                    borderRadius: "25px",
                }}
            >
            
              {(typeof tutorsData.tutors === 'undefined') ? (
              <p>Awaiting search ...</p>
              ): (
                tutorsData.tutors?.map((tutor, i) => (
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
                        <Card.Text>Times during days available: {formatDate(tutor.start_time)} to {formatDate(tutor.end_time)}</Card.Text>
                        <>
                        {isUserOrLoggedOut &&  
                          <Button onClick={handleSchedule} variant="primary">Schedule</Button>
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
            
            <h3>Search by subject:</h3>
            <form onSubmit={handleSearchCourse}>
                <label>
                    <p>Enter course name (e.g. CS 2305)</p>
                    <input type="courseName" onChange={e => {setCourseName(e.target.value)}}/>
                </label>
                <div>
                    <br></br>
                    <button type="submit">Submit</button>
                </div>

                <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{searchStatus2}</h1>
            </form>

            <Container>
                <Row
                    style={{
                    padding: "30px",
                    backgroundColor: "#ADE377",
                    borderRadius: "25px",
                }}
            >
            
              {(typeof tutorsData.tutors === 'undefined') ? (
              <p>Awaiting search ...</p>
              ): (
                tutorsData2.tutors?.map((tutor2, i) => (
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
                        src={tutor2.profile_url}
                        width="50"
                        height="50"
                        alt="profile img"
                        className="me-1"
                      />
                      <span>{tutor2.first_name} {tutor2.last_name}</span>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>About Me</Card.Title>
                        <Card.Text>{tutor2.about_me}</Card.Text>
                        <Card.Title>Courses</Card.Title>
                        <Card.Text>{tutor2.course_name}</Card.Text>
                        <Card.Title>Available Times</Card.Title>
                        <Card.Text>Days of the Week: {tutor2.day_of_the_week}</Card.Text>
                        <Card.Text>Times during days available: {formatDate(tutor2.start_time)} to {formatDate(tutor2.end_time)}</Card.Text>
                        <>
                        {isUserOrLoggedOut &&  
                          <Button onClick={handleSchedule} variant="primary">Schedule</Button>
                        }
                        </>
                        &ensp;
                        <>
                        {isUserOrLoggedOut &&  
                          <Button onClick={e => handleFavorites(tutor2.tutor_id)} variant="primary">Add to favorites</Button>
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

export default Search;
