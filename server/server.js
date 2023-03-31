const connection = require("./DB/connection");
const express = require("express");
const app = express();

// Test api path
app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });

  //  Example query
  /*const sql = "select * from people";
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.json({ tutors: result });
  });*/
});

// List all tutors
app.get("/tutors", (req, res) => {
  res.json({
    tutors: [
      {
        name: "John Lee",
        rate: 4.9,
        numberOfReviews: 3,
        courseTitle: "CS 2449",
        profileURL:
          "https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/John.png",
      },
      {
        name: "Randy Lee",
        rate: 1.1,
        numberOfReviews: 23,
        courseTitle: "MATH 1337",
        profileURL:
          "https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/Sarah.png",
      },
      {
        name: "Sarahg Lee",
        rate: 2.1,
        numberOfReviews: 45,
        courseTitle: "CS 4349",
        profileURL:
          "https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/Alex.png",
      },
      {
        name: "Scharic Lee",
        rate: 4.3,
        numberOfReviews: 11,
        courseTitle: "HIST 1301",
        profileURL:
          "https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/Randy.png",
      },
      {
        name: "Alex Lee",
        rate: 2.3,
        numberOfReviews: 15,
        courseTitle: "IT 2300",
        profileURL:
          "https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/Sharice.png",
      },
    ],
  });
});

// // Show information about one specific tutor
app.get("/tutors/:id", (req, res) => {
  var tutorID = req.params.id;

  const sql = "SELECT * FROM tutors WHERE tutor_id = ?";
  connection.query(sql, tutorID, (error, result) => {
    if (error) throw error;

    res.json({ tutors: result });
  });
});

// // Show 'signup for tutor account'
// app.get("/tutors/new", (req, res) => {

//     res.json({ 'users': ['userOne', 'userTwo', 'userThree'] })
// })

// // List all reservations (aka 'appointments')
app.get("/reservations", (req, res) => {
  res.json({
    appointments: [
      {
        //unsure if we should have appointment numbers like this, but there's numbers on our figma mockup
        //need to add user auth, for now, can do hardcoded userIDs, will do those soon
        appointmentNum: 1,
        name: "CS 2305 with John",
        zoomURL: "https://zoom.us/",
        startTime: "2023-04-17 10:00:00",
        endTime:  "2023-04-17 11:00:00"
      },
      {
        appointmentNum: 2,
        name: "ITSS 3311 with Tracey",
        zoomURL: "https://zoom.us/",
        startTime: "2023-04-18 08:30:00",
        endTime:  "2023-04-18 09:30:00"
      },
      {
        appointmentNum: 3,
        name: "CS 4349 with Alex",
        zoomURL: "https://zoom.us/",
        startTime: "2023-04-19 04:00:00",
        endTime:  "2023-04-19 05:00:00"
      }
    ] 
  });
});

// // Show information about one specific reservation
app.get("/reservations/:id", (req, res) => {
  var appointmentID = req.params.id;

  const sql = "SELECT * FROM appointments WHERE appointment_ID = ?";
  connection.query(sql, appointmentID, (error, result) => {
    if(error) throw error;

    res.json({appointments : result});
  });
});

app.listen(8000, () => {
  console.log("Server running on PORT 8000");
});
