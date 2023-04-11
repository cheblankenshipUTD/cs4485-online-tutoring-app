const connection = require("./DB/connection");
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());


app.use(express.json());

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

    const sql = "(SELECT people.people_id, email, password, first_name, last_name, tutor_id as userORtutor_id, about_me, profile_url " +
      "FROM people, tutors " +
      "WHERE (people.email = ? AND people.password = ? AND people.people_id = tutors.people_id)) " + 
      "UNION " +
      "(SELECT people.people_id, email, password, first_name, last_name, user_id as userORtutor_id, Null as about_me, Null as profile_url " +
      "FROM people, users " + 
      "WHERE (people.email = ? AND people.password = ? AND people.people_id = users.people_id));"
    
      connection.query(sql, [email, password, email, password], (error, result) => {
      if (error) {
        req.setEncoding({error: error})
      }

      else {
        if (result.length > 0) { //if the user exists in the database
          res.send(result);
        } 

        else {
        res.send({message: "No records existed, wrong username or password"})
        }
      }
    })
})

// // List all subjects
app.get("/subjects", (req, res) => {

  //query
  const sql = "SELECT * FROM courses";
  connection.query(sql, (error, result) => {
    if (error) throw error;
    
    res.json({ courses: result });
  });

});

// // List all tutors
app.get("/tutors", (req, res) => {

  //query
  const sql = "SELECT DISTINCT first_name, last_name, about_me, profile_url, course_name, start_time, end_time, day_of_the_week FROM people, tutors, courses, tutors_times, tutors_courses WHERE people.people_id = tutors.people_id AND tutors.tutor_id = tutors_times.tutor_id AND tutors_courses.tutor_id = tutors.tutor_id AND tutors_courses.course_id = courses.course_id";

  connection.query(sql, (error, result) => {
    if (error) throw error;
    
    res.json({ tutors: result });
  });

});

// // Show information about one specific tutor
app.get("/tutors/:id", (req, res) => {
  var tutorID = req.params.id;

  //query
  //const sql = "SELECT DISTINCT first_name, last_name, about_me, profile_url, start_time, end_time, day_of_the_week FROM people, tutors, courses, tutors_times WHERE tutors.tutor_id = ? AND people.people_id = tutors.people_id AND tutors.tutor_id = tutors_times.tutor_id";
  const sql = "SELECT DISTINCT first_name, last_name, about_me, profile_url, course_name, start_time, end_time, day_of_the_week FROM people, tutors, courses, tutors_times, tutors_courses WHERE tutors.tutor_id = ? AND people.people_id = tutors.people_id AND tutors.tutor_id = tutors_times.tutor_id AND tutors_courses.tutor_id = tutors.tutor_id AND tutors_courses.course_id = courses.course_id";
  connection.query(sql, tutorID, (error, result) => {
    if (error) throw error;

    res.json({ tutors: result });
  });

});

// //Show specific information for person's profile depending on if they are a user or a tutor

// Show 'signup for tutor account'
app.post("/tutors/new", (req, res) => {
	
	const email = req.body.email;
	const password = req.body.password;
	const first_name = req.body.firstName;
	const last_name = req.body.lastName;

	const query1 = `INSERT INTO people (email, password, first_name, last_name) VALUES (?, ?, ?, ?);`;
	const query2 = `SELECT people_id FROM people WHERE email = ? AND first_name = ? AND last_name = ?;`; // needs 
	const query3 = `INSERT INTO tutors (people_id, about_me, profile_url) VALUES (?, ?, ?);`;


	let pId;

	connection.query(query1, [email, password, first_name, last_name], (error, result) => {
			if (error) throw error;
			console.log("result >> ", result);
		})
		.then(
			connection.query(query2, [email, first_name, last_name], (error, result) => {
				if (error) throw error;
				pId = result[0]['people_id'];
				console.log("query 2 pid result >> ", pId);
				connection.query(query3, [pId, 'testtest...', 'https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/John.png'], (error, result) => {
					if (error) throw error;
					console.log("query 3 result >> ", result);
				})
			})
		);
})

// // List all reservations (aka 'appointments')
// app.get("/reservations", (req, res) => {
//     res.json({ 'users': ['userOne', 'userTwo', 'userThree'] })
// })

// // Show information about one specific reservation
// app.get("/reservations:id", (req, res) => {
//     res.json({ 'users': ['userOne', 'userTwo', 'userThree'] })
// })

app.listen(8000, () => {
  console.log("Server running on PORT 8000");
});
