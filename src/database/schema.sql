-- Step 1. create a databse
-- CREATE DATABASE tutorDB;

-- Step 2. 
-- Disconnect from the local MySQL server, and connect to tutorDB.
USE tutorDB;

-- DROP TABLE IF EXISTS people;
-- DROP TABLE IF EXISTS tutors;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS users_tutors;
-- DROP TABLE IF EXISTS courses;
-- DROP TABLE IF EXISTS tutors_courses;
-- DROP TABLE IF EXISTS tutors_times;

-- Step 3. Create people table
CREATE TABLE people (
    people_id int NOT NULL AUTO_INCREMENT,
    email varchar(255),
    password varchar(255),
    first_name varchar(255),
    last_name varchar(255),
      PRIMARY KEY (people_id)
);

-- Step 4. Create tutors table
CREATE TABLE tutors (
    tutor_id int NOT NULL AUTO_INCREMENT,
        people_id int,
    about_me varchar(255),
    profile_url varchar(255),
      PRIMARY KEY (tutor_id),
        FOREIGN KEY (people_id) REFERENCES people(people_id)
);

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    people_id INT,
    PRIMARY KEY (user_id),
    FOREIGN KEY (people_id)
        REFERENCES people (people_id)
);

CREATE TABLE users_tutors (
    user_id INT NOT NULL,
    tutor_id INT NOT NULL,
    PRIMARY KEY (user_id, tutor_id),
    FOREIGN KEY (user_id)
        REFERENCES users (user_id),
    FOREIGN KEY (tutor_id)
        REFERENCES tutors (tutor_id)
);

CREATE TABLE courses (
    course_id int NOT NULL AUTO_INCREMENT,
    course_name varchar(255),
    course_description varchar(255),
    subject varchar(255),
      PRIMARY KEY (course_id)
);

CREATE TABLE tutors_courses (
    tutor_id INT NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (tutor_id, course_id),
    FOREIGN KEY (tutor_id)
        REFERENCES tutors (tutor_id),
    FOREIGN KEY (course_id)
        REFERENCES courses (course_id)
);

CREATE TABLE tutors_times (
  	tutor_id INT NOT NULL,
  	start_time TIMESTAMP,
  	end_time TIMESTAMP,
  	day_of_the_week varchar(255),
  	PRIMARY KEY (tutor_id),
  	FOREIGN KEY (tutor_id)
  		REFERENCES tutors (tutor_id)
);
