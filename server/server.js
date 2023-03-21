const express = require('express');
const app = express();


// Test api path
app.get("/api", (req, res) => {
    res.json({'users': ['userOne', 'userTwo', 'userThree']})
})

// List all tutors
app.get("/tutors", (req, res) => {
    res.json({
        'tutors': [
            {'name': 'John Lee', 'rate': 4.9, 'numberOfReviews': 3, 'courseTitle': 'CS 2449', 'profileURL': 'https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/John.png'},
            {'name': 'Randy Lee', 'rate': 1.1, 'numberOfReviews': 23, 'courseTitle': 'MATH 1337', 'profileURL': 'https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/Sarah.png'},
            {'name': 'Sarahg Lee', 'rate': 2.1, 'numberOfReviews': 45, 'courseTitle': 'CS 4349', 'profileURL': 'https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/Alex.png'},
            {'name': 'Scharic Lee', 'rate': 4.3, 'numberOfReviews': 11, 'courseTitle': 'HIST 1301', 'profileURL': 'https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/Randy.png'},
            {'name': 'Alex Lee', 'rate': 2.3, 'numberOfReviews': 15, 'courseTitle': 'IT 2300', 'profileURL': 'https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/Sharice.png'}
        ]
    })
})

// // Create new tutor account
// app.post("/tutors", (req, res) => {
//     res.json({ 'users': ['userOne', 'userTwo', 'userThree'] })
// })

// // Show 'signup for tutor account'
// app.get("/tutors/new", (req, res) => {
//     res.json({ 'users': ['userOne', 'userTwo', 'userThree'] })
// })

// // List all reservations (aka 'appointments')
// app.get("/reservations", (req, res) => {
//     res.json({ 'users': ['userOne', 'userTwo', 'userThree'] })
// })

// // Show information about one specific reservation
// app.get("/reservations:id", (req, res) => {
//     res.json({ 'users': ['userOne', 'userTwo', 'userThree'] })
// })




app.listen(8000, () => {console.log("Server running on PORT 8000");})