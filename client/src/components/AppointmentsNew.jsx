import React, { useEffect, useRef, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const AppointmentsNew = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const tutorID = JSON.parse(localStorage.getItem("tutorID"));
    const [tutorsData, setTutorsData] = useState([{}]);
    const [conflictAppData, setConflictAppData] = useState([{}]);
    const [courseReg, setCourseReg] = useState("");
    const [availableTimeReg, setAvailableTimeReg] = useState("");
    const [dateValue, onChange] = useState(new Date());
    const [reservationStatus, setReservationStatus] = useState("");
    const [startTimestamp, setStartTimestamp] = useState("");
    const [endTimestamp, setEndTimestamp] = useState("");
    const navigate = useNavigate();

    const courses = ['CS 2305', 'MATH 1314', 'CS 4349', 'HIST 1301', 'ITSS 3311'];
    const slots = ['01:00 - 02:00', '01:30 - 02:30', '02:00 - 03:00', '02:30 - 03:30', '03:00 - 04:00', '03:30 - 04:30', '04:00 - 05:00', '04:30 - 05:30', '05:00 - 06:00', '05:30 - 06:30', '06:00 - 07:00', '06:30 - 07:30', '07:00 - 08:00', '07:30 - 08:30', '08:00 - 09:00', '08:30 - 09:30', '09:00 - 10:00', '09:30 - 10:30', '10:00 - 11:00', '10:30 - 11:30', '11:00 - 12:00', '11:30 - 12:30', '12:00 - 13:00', '12:30 - 13:30', '13:00 - 14:00', '13:30 - 14:30', '14:00 - 15:00', '14:30 - 15:30', '15:00 - 16:00', '15:30 - 16:30', '16:00 - 17:00', '16:30 - 17:30'];

    useEffect(() => {
      fetch("/reservations/new/" + tutorID)
      .then(res => res.json())
      .then(data => {setTutorsData(data)})
    }, [])

    const firstUpdate = useRef(0);

    //for checking if there are any sheduling conflicts
    useEffect(() => {
      console.log(conflictAppData, '***NEW TEST***');
      console.log(firstUpdate, "- firstUpdate");
      console.log(conflictAppData, '- Has changed');
      
      
      if (firstUpdate.current <= 2) {
        firstUpdate.current += 2;
        console.log("Test for first");
        return;
      }

      if ((conflictAppData.previousAppointment === undefined || conflictAppData.previousAppointment == 0) && firstUpdate.current > 2) { //if no app was found with that date and time 
      setReservationStatus(""); //clears the message
        console.log("No confilcts");
        axios.post("http://localhost:8000/reservations/reserve", {
          tutorID: tutorsData.tutors[0].tutor_id,
          userID: user.userORtutor_id,
          startTime: startTimestamp,
          endTime: endTimestamp,
        });
        localStorage.removeItem("tutorID");
        alert("Success!");
        navigate("/reservations");
      }
      else if (firstUpdate.current > 2) {
        setReservationStatus("Error, scheduling conflict found. Please choose a different date or time");
      } 

   },[conflictAppData]) // <-- here put the parameter to listen

    const formatDate = (dateString) => {
        const options = { weekday:"narrow", hour: 'numeric', minute: 'numeric', hour12: true};
        return (new Date(dateString).toLocaleDateString(undefined, options)).substring(2);
    }

    const formatDay = (dayString) => {
      const options = { weekday:"long"};
      return (new Date(dayString).toLocaleDateString(undefined, options)).substring(0);
    }

    const formatTime = (timeString) => {
      const options = {hour: 'numeric', minute: 'numeric', hour12: false};
      return (new Date(timeString).toLocaleDateString(undefined, options)).substring(2);
    }

    const checkCourse = (courseString) => {
      if (courseString == tutorsData.tutors[0].course_name)
        return true;
      else
        return false;
    }

    const checkDay = () => {
      var tutorsDays = tutorsData.tutors[0].day_of_the_week.split(', ');
      var selectedDay = formatDay(dateValue);
      
      for (var i = 0; i < tutorsDays.length; i++)
      {
        if (selectedDay == tutorsDays[i]) 
            return true;        
      }
      return false;
    }

    const checkTime = (timeString) => {
      var tutorsStartTime = formatTime(tutorsData.tutors[0].start_time).split(', ')[1];
      var tutorsEndTime = formatTime(tutorsData.tutors[0].end_time).split(', ')[1];
      var selectedStartTime = timeString.split(' - ')[0];
      var selectedEndTime = timeString.split(' - ')[1]
      
      if ((selectedStartTime >= tutorsStartTime && selectedStartTime <= tutorsEndTime) && (selectedEndTime >= tutorsEndTime && selectedEndTime <= tutorsEndTime))
        return true;

      return false;
    }

    const checkPreviousApp = (timeString) => {
      //console.log("***WITHIN call***");
      var selectedDate = dateValue.toISOString().substring(0, 10);
      
      var selectedStartTime = timeString.split(' - ')[0];
      var selectedEndTime = timeString.split(' - ')[1]

      //turn into timestamp once combined with time (do for start and end)
      setStartTimestamp(selectedDate + " " + selectedStartTime + ":00");
      setEndTimestamp(selectedDate + " " + selectedEndTime + ":00");

      axios.get("http://localhost:8000/reservations/new/confirm/" + tutorsData.tutors[0].tutor_id + "/" + startTimestamp + "/" + endTimestamp)
      .then(async (response) => {
        //console.log(response.data);
        setConflictAppData(response.data);
      });
    }

 
    const checkAvailability = async (courseString, timeSlotString) => {
      //console.log("Result of course check: " + checkCourse(courseString));
      //console.log("Result of day check: " + checkDay());
      //console.log("Result of time check: " + checkTime(timeSlotString));

      if (checkCourse(courseString) == true && checkDay() == true && checkTime(timeSlotString) == true)
      {
        await checkPreviousApp(timeSlotString);       
      }

      else {
        setReservationStatus("Selected course, day, or time does not match the tutor's availability.")
      }
    }

    return (
        <div className="div-1">
            <br></br>
            <h2 style={{ textAlign: "center" }}>Confirm Reservation</h2>

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
                  <Col xs="12">
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
                        <Card.Title>Select course:</Card.Title>
                        <Card.Text>Available courses: {tutor.course_name}</Card.Text>
                        <Form>
                          {/* Course dropdown */}
                          <Form.Group className="mb-3" controlId="formBasicDropDown">
                            <DropdownButton id="dropdown-basic-button" title="Select course" onSelect={(e) => {setCourseReg(e)}} >
                              {courses.map(course => <Dropdown.Item key={course} eventKey={course}>{course}</Dropdown.Item>)}
                            </DropdownButton>
                            <div>Selected course: {courseReg}</div>
                          </Form.Group>
                        
                        <Card.Title>Select date:</Card.Title>
                        <Card.Text>Available days of the Week: {tutor.day_of_the_week}</Card.Text>
                        <DatePicker onChange={onChange} format="y-MM-dd" value={dateValue} />
                        
                        <Card.Title>Select time:</Card.Title>
                        <Card.Text>Times during days available: {formatDate(tutor.start_time)} to {formatDate(tutor.end_time)}</Card.Text>
                          {/* Available time dropdown */}
                          <Form.Group className="mb-3" controlId="formBasicDropDown">
                            <div>Selected time: {availableTimeReg}</div>
                            <DropdownButton id="dropdown-basic-button" title="Select time" onSelect={(e) => {setAvailableTimeReg(e)}} >
                              {slots.map(t => <Dropdown.Item key={t} eventKey={t}>{t}</Dropdown.Item>)}
                            </DropdownButton>
                          </Form.Group>
                        </Form>

                        <Button variant="primary" onClick={() => checkAvailability(courseReg, availableTimeReg)}>Confirm reservation</Button>

                        <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{reservationStatus}</h1>

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
   
export default AppointmentsNew;
