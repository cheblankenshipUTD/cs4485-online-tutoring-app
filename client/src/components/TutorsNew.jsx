import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import * as FormData  from 'form-data';



const TutorsNew = () => {

    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [firstNameReg, setFirstNameReg] = useState("");
    const [lastNameReg, setLastNameReg] = useState("");
    const [aboutMeReg, setAboutMeReg] = useState("");
    const [courseReg, setCourseReg] = useState("");
    const [dayReg, setDayReg] = useState("");
    const [availableTimeReg, setAvailableTimeReg] = useState("");

    const [availability, setAvailability] = useState([]);

    const [profileImgReg, setProfileImgReg] = useState(null);

    const courses = ['CS 2305', 'MATH 1314', 'CS 4349', 'HIST 1301', 'ITSS 3311'];
    const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const slots = ['8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'];

    const navigate = useNavigate();


    // This function is needed if we want to implement tutor to have multiple availability
    // function hasDuplicate(arr, element) {
    //     for (let i = 0; i < arr.length; i++) {
    //         if(arr[i]['dayOfWeek'] == element['dayOfWeek'] && arr[i]['availableTime'] == element['availableTime']) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    const addAvailability = (e) => {
        e.preventDefault();
        let element = {'dayOfWeek': dayReg, 'availableTime': availableTimeReg};
        // if(!hasDuplicate(availability, element)) {
        //     availability = [];
        //     availability.push(element);
        // }
        while (availability.length) { availability.pop(); }
        availability.push(element);
        setDayReg('');
        setAvailableTimeReg('');
    };

    const register = (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append("email", emailReg);
        formData.append("password", passwordReg);
        formData.append("firstName", firstNameReg);
        formData.append("lastName", lastNameReg);
        formData.append("aboutMe", aboutMeReg);
        formData.append("course", courseReg);
        formData.append("availability", JSON.stringify(availability));
        formData.append("profileImg", profileImgReg);

        const url = 'http://localhost:8000/tutors/new';

        Axios.post(
            url,
            formData,
            // {headers:{'Content-Type': 'multipart/form-data'}}
        )
        .then((res) => {
            console.log("Check if tutors register working >> ", res);
            navigate("/login");
        })
        .catch((error) => {
            console.log("Tutor signup error >> ", error);
            navigate("/login");
        })
        navigate("/login");
    }


    return (
        <>
            <div className="div-1">
                <br></br>
                <h2 style={{ textAlign: "center" }}>Sign Up For Tutor Account</h2>
            </div>
            
            <Form style = {{margins: "20px"}}>
                {/* Email */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => {setEmailReg(e.target.value)}} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                {/* First Name */}
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" onChange={(e) => {setFirstNameReg(e.target.value)}} />
                </Form.Group>
                {/* Last Name */}
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" onChange={(e) => {setLastNameReg(e.target.value)}} />
                </Form.Group>
                {/* About me */}
                <Form.Group className="mb-3" controlId="formBasicInputTextField">
                    <Form.Label>About me</Form.Label>
                    <Form.Control type="inputtextfield" placeholder="Tell us about yourself" onChange={(e) => {setAboutMeReg(e.target.value)}} />
                </Form.Group>
                {/* Profile Iamge */}
                <Form.Group className="mb-3" controlId="formBasicFile">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control type="file" name="file" placeholder="Upload profile image" onChange={(e) => {setProfileImgReg(e.target.files[0])}} />
                </Form.Group>
                {/* Course dropdown */}
                <Form.Group className="mb-3" controlId="formBasicDropDown">
                    <Form.Label>Course</Form.Label>
                    <DropdownButton id="dropdown-basic-button" title="Select course" onSelect={(e) => {setCourseReg(e)}} >
                        {courses.map(course => <Dropdown.Item key={course} eventKey={course}>{course}</Dropdown.Item>)}
                    </DropdownButton>
                    <div>Selected course: {courseReg}</div>
                </Form.Group>
                <div style={{backgroundColor: 'lightgrey'}}>
                    {/* Available days of the week */}
                    <Form.Group className="mb-3" controlId="formBasicDropDown">
                        <Form.Label>Day of the week</Form.Label>
                        <div>Selected day: {dayReg}</div>
                        <DropdownButton id="dropdown-basic-button" title="Select day" onSelect={(e) => {setDayReg(e)}} >
                            {week.map(day => <Dropdown.Item key={day} eventKey={day}>{day}</Dropdown.Item>)}
                        </DropdownButton>
                    </Form.Group>
                    {/* Available time dropdown */}
                    <Form.Group className="mb-3" controlId="formBasicDropDown">
                        <Form.Label>Available time</Form.Label>
                        <div>Selected time: {availableTimeReg}</div>
                        <DropdownButton id="dropdown-basic-button" title="Select time" onSelect={(e) => {setAvailableTimeReg(e)}} >
                            {slots.map(t => <Dropdown.Item key={t} eventKey={t}>{t}</Dropdown.Item>)}
                        </DropdownButton>
                    </Form.Group>
                    <Button variant="secondary" onClick={addAvailability}>
                        Add this time to your availability
                    </Button>
                    <div>List of available time: </div>
                    <ul>
                        {availability.map(slot =>
                            <li key={slot}>{slot.dayOfWeek}: {slot.availableTime}</li>
                        )}
                    </ul>
                </div>
                {/* Password */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => {setPasswordReg(e.target.value)}} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={register}>
                    Submit
                </Button>
            </Form>

            
        </>
    )
}
   
  export default TutorsNew;