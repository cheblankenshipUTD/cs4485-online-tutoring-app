import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const History = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    //const [objectData, setObjectData] = useState([{}]);
    const [history, setHistory] = useState([]);
    const [totalTutoringHours, setTotalTutoringHours] = useState(0);

    useEffect(() => {
        fetch("/history/" + user.userORtutor_id)
        .then(res => res.json())
        .then(data => {
            let temp = JSON.stringify(data);
            let test = JSON.parse(temp)
            //console.log(test)
            //console.log(test['history'])
            //console.log(test['hours'][0].totalHours)
            setHistory(test['history'])
            setTotalTutoringHours(test['hours'][0].totalHours)
            //console.log(history)
        })
        //.then(data => {setTotalTutoringHours(data.hours)})
    }, [])

    const setObjects = () => {
        
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: 'numeric', hour12: true}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
  
    //{alert( `Data: ${objectData}`)}

    return (
        <div className="div-1">
            <br></br>
            <h2 style={{ textAlign: "center" }}>History</h2>
            <h3>Total tutoring hours completed: {totalTutoringHours}</h3>


            <div>
            <Container>
                <Row
                    style={{
                    padding: "30px",
                    backgroundColor: "#ADE377",
                    borderRadius: "25px",
                    }}
                >
            {(typeof history === 'undefined') ? (
                <p>Loading ...</p>
                ): (
                history.map((appointment, i) => (
                  <Col xs="5">
                    <Card
                    key={i}
                    style={{
                      backgroundColor: "#FEA150",
                      color: "white",
                      borderRadius: "25px",
                    }}
                    >
                      <Card.Header>Appointment #{appointment.appointment_ID}</Card.Header>
                      <Card.Body>
                        <Card.Title>Appointment with: {appointment.first_name} {appointment.last_name}</Card.Title>
                        <Card.Text>
                          <p>Zoom link : https://zoom.us/</p>
                          <p>Time: {formatDate(appointment.start_time)} to {formatDate(appointment.end_time)}</p>
                        </Card.Text>
                        <Button variant="primary">Join</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
                 )}
                </Row>
            </Container>
            </div>
        </div>
    );
}
   
  export default History;
