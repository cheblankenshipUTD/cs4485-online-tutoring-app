const connection = require("./DB/connection");
const express = require("express");
const app = express();

const cors = require("cors");
const bcrypt = require("bcrypt");
app.use(cors());


app.use(express.json());

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
            const validPassword = bcrypt.compareSync(password, user.password); //check the hashed password
            //const validPassword = password;

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
app.post("/tutors/new", (req, res) => {
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
    "WHERE appointments.tutor_id = ? AND tutors.tutor_id = ? AND people.people_id = users.people_id AND appointments.user_id = users.user_id) " + 
    "UNION " +
    "(SELECT appointment_ID, appointments.user_id, appointments.tutor_id, course_id, Zoom_URL, start_time, end_time, first_name, last_name " + 
    "FROM appointments, people, tutors, users " +
    "WHERE appointments.user_id = ? AND users.user_id = ? AND people.people_id = tutors.people_id AND appointments.tutor_id = tutors.tutor_id);";

  connection.query(sql, [userORtutor_id, userORtutor_id, userORtutor_id, userORtutor_id], (error, result) => {
    if (error) throw error;
    
    res.json({ appointments: result });
  });

});

// // Show information about one specific reservation
// app.get("/reservations:id", (req, res) => {
//     res.json({ 'users': ['userOne', 'userTwo', 'userThree'] })
// })

app.listen(8000, () => {
  console.log("Server running on PORT 8000");
});
