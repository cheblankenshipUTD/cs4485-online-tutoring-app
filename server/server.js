const connection = require("./DB/connection");
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const fileupload = require("express-fileupload");
const fs = require('fs');
const axios = require('axios');
const base64 = require('base-64');
const multer = require('multer');
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));


app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

   //Do this to hash a new password, but it will cause an error
  /*
   const hash = bcrypt.hashSync(password, 10);
  const query = "UPDATE people SET people.password = ? WHERE people.email = ?;";
  
  connection.query(query, [hash, email], (error, t) => {
    if (error) throw error;
    
    res.json({ courses: t });
  });
  */

  const query1 = "SELECT DISTINCT * FROM people WHERE people.email = ?;"

  const query2 = "(SELECT people.people_id, email, password, first_name, last_name, tutor_id as userORtutor_id, about_me, profile_url " +
      "FROM people, tutors " +
      "WHERE (people.email = ? AND people.people_id = tutors.people_id)) " + 
      "UNION " +
      "(SELECT people.people_id, email, password, first_name, last_name, user_id as userORtutor_id, Null as about_me, Null as profile_url " +
      "FROM people, users " + 
      "WHERE (people.email = ? AND people.people_id = users.people_id));"

      connection.query(query1, email, (error, result) => {
        if (error) {
          req.setEncoding({error: error})
        }
  
        else {
          const user = result[0];

          console.log("user from database >> ", user);

          if (user) {
            //const validPassword = bcrypt.compareSync(password, user.password); //check the hashed password
            const validPassword = password;

            //if the passwords match
            if(validPassword) {
              connection.query(query2, [email, email], (error, result2) => {
                if (error) {
                  req.setEncoding({error: error})
                }
                
                else {
                  if (result2.length > 0) { //if the user exists in the database
                    res.send(result2);
                  } 
                }
              });
            }

            else {
              res.send({message: "No records existed, wrong password"})
              }
          }

          else {
            res.send({message: "Account with this email does not exist"})
          }
        }
      });
})

// List all subjects
app.get("/subjects", (req, res) => {

  //query
  const sql = "SELECT * FROM courses";
  connection.query(sql, (error, result) => {
    if (error) throw error;
    
    res.json({ courses: result });
  });

});

// List all tutors
app.get("/tutors", (req, res) => {

  //query
  const sql = "SELECT DISTINCT first_name, last_name, about_me, profile_url, course_name, start_time, end_time, day_of_the_week, tutors.tutor_id FROM people, tutors, courses, tutors_times, tutors_courses WHERE people.people_id = tutors.people_id AND tutors.tutor_id = tutors_times.tutor_id AND tutors_courses.tutor_id = tutors.tutor_id AND tutors_courses.course_id = courses.course_id";

  connection.query(sql, (error, result) => {
    if (error) throw error;
    
    res.json({ tutors: result });
  });

});

// Show information about one specific tutor
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

// //List all users favorites
app.get("/favorites/:userID", (req, res) => {
  var userID = req.params.userID;

  //query
  const sql = "SELECT profile_url, first_name, last_name, course_name, tutors.tutor_id FROM people, users_tutors, tutors, courses, tutors_courses WHERE users_tutors.user_id = ? AND users_tutors.tutor_id = tutors.tutor_id AND people.people_id = tutors.people_id AND tutors_courses.tutor_id = tutors.tutor_id AND tutors_courses.course_id = courses.course_id;";

  connection.query(sql, userID, (error, result) => {
    if (error) throw error;
    
    res.json({ tutors: result });
  });

});

// //Add a tutor to a users list of favorites (NOTE: if trying to add a tutor that's already there, it will crash)
app.get("/favorites/add/:userID/:tutorID", (req, res) => {
  var userID = req.params.userID;
  const tutorID = req.params.tutorID;

  const sql = "INSERT IGNORE INTO users_tutors (user_id, tutor_id) VALUES (?, ?);";

  connection.query(sql, [userID, tutorID], (error, result) => {
    if (error) throw error;
    console.log("The tutor was added to the users favorites");
  });

});

// //Delete a tutor from a users list of favorites
app.get("/favorites/delete/:userID/:tutorID", (req, res) => {
  var userID = req.params.userID;
  const tutorID = req.params.tutorID;

  const sql = "DELETE FROM users_tutors WHERE users_tutors.user_id = ? AND users_tutors.tutor_id = ?;";

  connection.query(sql, [userID, tutorID], (error, result) => {
    if (error) throw error;
    console.log("The tutor was deleted from the users favorites");
  });

});


// Show 'signup for tutor account'
const upload = multer({ dest: 'upload/'});
let githubToken = process.env.GITHUB_TOKEN;
let gitRepoURL = process.env.GITHUB_URL;

app.post("/tutors/new", upload.single('profileImg'), async (req, res) => {

  console.log("body: ", req.body);
	
  const email = req.body.email;
	const password = req.body.password;
	const first_name = req.body.firstName;
	const last_name = req.body.lastName;
  const about_me = req.body.aboutMe;
  const selectedCourse = req.body.course;
  console.log("check: ", req.body.availability);
  let availability = JSON.parse(req.body.availability);
  let profile_url = 'https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/John.png'; //default set
  let rawGitURL = process.env.RAW_GITHUB_URL;


  const file = req.file;
  const fileName = file.originalname;
  
  let readFile = fs.readFileSync(`${req.file.path}`, 'base64');

  var fileUploadData = JSON.stringify({
    "message": "upload profile image via UTD Tutor app",
    "content": `${readFile}`
  });

  var gitAPIConfig = {
    method: 'put',
    url: `${gitRepoURL}${fileName}`,
    headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Content-Type': 'application/json'
    },
    data: fileUploadData
  };


  // IDs that you get from query
  let q_people_id = null;
  let q_tutor_id = null;
  let q_course_id = null;

  axios(gitAPIConfig)
  .then(function (res) {
      const hash = bcrypt.hashSync(password, 10);
      const query1 = `INSERT INTO people (email, password, first_name, last_name) VALUES (?, ?, ?, ?);`;
      const query2 = `SELECT people_id FROM people WHERE email = ? AND first_name = ? AND last_name = ?;`;
      const query3 = `INSERT INTO tutors (people_id, about_me, profile_url) VALUES (?, ?, ?);`;
      const query4 = `SELECT course_id FROM courses WHERE course_name = ?;`;
      const query5 = `SELECT tutor_id FROM tutors WHERE people_id = ?;`;
      const query6 = `INSERT INTO tutors_courses (course_id, tutor_id) VALUES (?, ?);`;
      const query7 = `INSERT INTO tutors_times (tutor_id, start_time, end_time, day_of_the_week) VALUES (?, ?, ?, ?);`;

      connection.query(query1, [email, hash, first_name, last_name], (error, result) => {
			  if (error) throw error;
        connection.query(query2, [email, first_name, last_name], (error, result) => {
				  if (error) throw error;
          q_people_id = result[0]['people_id'];
          profile_url = rawGitURL + fileName;
          console.log("people id value before getting insert >> ", q_people_id);
          connection.query(query3, [q_people_id, about_me, profile_url], (error, result) => {
            if (error) throw error;
            connection.query(query4, [selectedCourse], (error, result) => {
              if (error) throw error;
              q_course_id = result[0]['course_id'];
              connection.query(query5, [q_people_id], (error, result) => {
                if (error) throw error;
                q_tutor_id = result[0]['tutor_id'];
                connection.query(query6, [q_course_id, q_tutor_id], (error, result) => {
                  if (error) throw error;
                  for (let i = 0; i < availability.length; i++) {
                    let timeSlice = availability[i]['availableTime'].split(' ');
                    let startTime = timeSlice[0].split(':');
                    let endTime = timeSlice[2].split(':');
                    let start = `2023-01-17 ${startTime[0]}:00:00`;
                    let end = `2023-01-17 ${endTime[0]}:00:00`;
                    connection.query(query7, [q_tutor_id, start, end, availability[i]['dayOfWeek']], (error, result) => {
                      if (error) throw error;
                      console.log("Success: ", result);
                    })
                  }
                })
              })
            })
          })
        })
		  })
  })
  .catch(function (error) {
    console.log("Upload img git error >>> ");
  });
})

// adds new person to DB
app.post("/person/new", (req, res) => {
	// get what is request body
	const email =  req.body.email;
	const password = req.body.password;
	const first_name = req.body.firstName;
	const last_name = req.body.lastName;
  const image_link = req.body.imageLink;
  const about_me = req.body.aboutMe;
  const is_tutor = req.body.isTutor;
  
  // DB queries
  const query0 = "SELECT DISTINCT * FROM people WHERE people.email = ?;"
	const query1 = `INSERT INTO people (email, password, first_name, last_name) VALUES (?, ?, ?, ?);`;
	const query2 = `SELECT people_id FROM people WHERE email = ? AND first_name = ? AND last_name = ?;`; // needs 
	const query3 = `INSERT INTO tutors (people_id, about_me, profile_url) VALUES (?, ?, ?);`;
  const query4 = `INSERT INTO users (people_id) VALUES (?);`;

  // hash password
  const hash = bcrypt.hashSync(password, 10);

  // holds people_id
	let pId;
  let exist;

  // check if duplicates
  connection.query(query0, [email], (error, result) => {
    if (error) {
      throw error;
    } 
    else {
      exist = result.length;
      console.log("query 0 result >> ", result);

      if (!exist) {
        // add new person to DB
        connection.query(query1, [email, hash, first_name, last_name], (error, result) => {
          if (error) {
            throw error;
          } 
          else {
            console.log("query 1 result >> ", result);

            // get people_id from query
            connection.query(query2, [email, first_name, last_name], (error, result) => {
              if (error) {
                throw error;
              } 
              else {
                pId = result[0]['people_id'];
                console.log("query 2 result >> ", pId);

                // new person is tutor
                if (is_tutor == 'true') {
                  connection.query(query3, [pId, about_me, image_link], (error, result) => {
                    if (error) throw error;
                    console.log("query 3 result >> ", result);
                    res.send({message: "Added new tutor"})
                  })
                }
                // new person is user
                else {
                  connection.query(query4, [pId], (error, result) => {
                    if (error) throw error;
                    console.log("query 4 result >> ", result);
                    res.send({message: "Added new user"})
                  })
                }
              }
            })
          }
        })
      }
      else {
        res.send({message: "Person already exists"})
      }
    }
  })
})

app.get("/reservations/:id", (req, res) => {
  var userORtutor_id = req.params.id;

  //query
  const sql = "(SELECT appointment_ID, appointments.user_id, appointments.tutor_id, course_id, Zoom_URL, start_time, end_time, first_name, last_name " +
    "FROM appointments, people, tutors, users " + 
    "WHERE appointments.tutor_id = ? AND tutors.tutor_id = ? AND people.people_id = users.people_id AND appointments.user_id = users.user_id " + 
    "AND appointments.start_time >= now()) " +
    "UNION " +
    "(SELECT appointment_ID, appointments.user_id, appointments.tutor_id, course_id, Zoom_URL, start_time, end_time, first_name, last_name " + 
    "FROM appointments, people, tutors, users " +
    "WHERE appointments.user_id = ? AND users.user_id = ? AND people.people_id = tutors.people_id AND appointments.tutor_id = tutors.tutor_id " +
    "AND appointments.start_time >= now());";

  connection.query(sql, [userORtutor_id, userORtutor_id, userORtutor_id, userORtutor_id], (error, result) => {
    if (error) throw error;
    
    res.json({ appointments: result });
  });

});

app.get("/history/:id", (req, res) => {

  var userORtutor_id = req.params.id;

  // Have a json object that holds all the results
  let jsonObj = {'hours': 0, 'history': []};

  const q1 = "(SELECT appointment_ID, appointments.user_id, appointments.tutor_id, course_id, Zoom_URL, start_time, end_time, first_name, last_name " +
  "FROM appointments, people, tutors, users " + 
  "WHERE appointments.tutor_id = ? AND tutors.tutor_id = ? AND people.people_id = users.people_id AND appointments.user_id = users.user_id " +
  "AND appointments.start_time <= now()) " + 
  "UNION " +
  "(SELECT appointment_ID, appointments.user_id, appointments.tutor_id, course_id, Zoom_URL, start_time, end_time, first_name, last_name " + 
  "FROM appointments, people, tutors, users " +
  "WHERE appointments.user_id = ? AND users.user_id = ? AND people.people_id = tutors.people_id AND appointments.tutor_id = tutors.tutor_id " +
  "AND appointments.start_time <= now());";

  const q2 = "(SELECT SUM(TIMESTAMPDIFF(HOUR, appointments.start_time, appointments.end_time)) AS totalHours " +
  "FROM appointments, people, tutors, users " +
  "WHERE appointments.tutor_id = ? AND tutors.tutor_id = ? AND people.people_id = users.people_id AND appointments.user_id = users.user_id " +
  "AND appointments.start_time <= now() " +
  "HAVING ISNULL(totalHours) = 0) " +
  "UNION " +
  "(SELECT SUM(TIMESTAMPDIFF(HOUR, appointments.start_time, appointments.end_time)) AS totalHours " +
  "FROM appointments, people, tutors, users " +
  "WHERE appointments.user_id = ? AND users.user_id = ? AND people.people_id = tutors.people_id AND appointments.tutor_id = tutors.tutor_id " +
  "AND appointments.start_time <= now()  " +
  "HAVING ISNULL(totalHours) = 0);";

  // query 1: get the list of past appointments and store it to jsonObj['history']
  connection.query(q1, [userORtutor_id, userORtutor_id, userORtutor_id, userORtutor_id], (error, result) => {
    if (error) throw error;
    jsonObj['history'] = result;
    
    // query 2: get the sum of total hours and store it to jsonObj['hours']
    connection.query(q2, [userORtutor_id, userORtutor_id, userORtutor_id, userORtutor_id], (error, result2) => {
      if (error) throw error;
      jsonObj['hours'] = result2;

      // At the end, return the jsonObj as a result
      res.json(jsonObj);
    });  
  });
})

app.get("/search/:firstName/:lastName", (req, res) => {
  var firstName = req.params.firstName;
  const lastName = req.params.lastName;

  const sql = "SELECT first_name, last_name, about_me, profile_url, course_name, start_time, end_time, day_of_the_week, tutors.tutor_id " +
  "FROM people, tutors, courses, tutors_times, tutors_courses " +
  "WHERE people.people_id = tutors.people_id AND tutors.tutor_id = tutors_times.tutor_id AND tutors_courses.tutor_id = tutors.tutor_id " +
  "AND tutors_courses.course_id = courses.course_id AND people.first_name = ? AND people.last_name = ?;";

  connection.query(sql, [firstName, lastName], (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      console.log("Search returned results");
      res.json({ tutors: result });
    }

    else {
      res.send({message: "No tutors exist with that first name and last name"})
    }
  });

})

app.get("/search/:course", (req, res) => {
  var course = req.params.course;

  const sql = "SELECT first_name, last_name, about_me, profile_url, course_name, start_time, end_time, day_of_the_week, tutors.tutor_id " +
  "FROM people, tutors, courses, tutors_times, tutors_courses " +
  "WHERE people.people_id = tutors.people_id AND tutors.tutor_id = tutors_times.tutor_id AND tutors_courses.tutor_id = tutors.tutor_id " + 
  "AND tutors_courses.course_id = courses.course_id AND courses.course_name = ?;";

  connection.query(sql, course, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      console.log("Search returned results");
      res.json({ tutors: result });
    }

    else {
      res.send({message: "No tutors offer that course"})
    }
  });
})

// // Show information about one specific reservation
// app.get("/reservations:id", (req, res) => {
//     res.json({ 'users': ['userOne', 'userTwo', 'userThree'] })
// })

app.listen(8000, () => {
  console.log("Server running on PORT 8000");
});
