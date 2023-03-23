USE tutorDB;

-- Mock data for courses
INSERT INTO courses (course_id, course_name, course_description, subject)
VALUES 
(01, 'CS 2305', 'Discrete Mathematics for Computing I.', 'Computer Science'),
(02, 'MATH 1314', 'College Algebra.', 'Mathematics'),
(03, 'CS 4349', 'Advanced Algorithm Design and Analysis.', 'Computer Science'),
(04, 'HIST 1301', 'U.S. History Survey to Civil War.', 'History'),
(05, 'ITSS 3311', 'Introduction to Programming.', 'Information Technology & Systems');

-- Mock data for people (all tutors and users)
INSERT INTO people (people_id, email, password, first_name, last_name) 
VALUES 
(1, 'abc@gmail.com', 'test1', 'John', 'Lee'),
(2, 'def@gmail.com', 'test2', 'Sarah', 'Tran'),
(3, 'ghi@gmail.com', 'test3', 'Randy', 'Swanson'),
(4, 'jkl@gmail.com', 'test4', 'Alex', 'Shaw'),
(5, 'mno@gmail.com', 'test5', 'Tracey', 'Helix'),
(6, '123@gmail.com', 'test6', 'Jessica', 'Jones'),
(7, '456@gmail.com', 'test7', 'Sharice', 'Johnson'),
(8, '789@gmail.com', 'test8', 'Tommy', 'Fowler');

-- Mock data for tutors
INSERT INTO tutors (tutor_id, people_id, about_me, profile_url)
VALUES 
(10, 1, 'I am a current graduate student at UTD studying computer science.', 'https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/John.png'),
(20, 2, 'I am a current undergraduate student at UTD studying mathematics.', 'https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/Sarah.png'),
(30, 3, 'I am a current graduate student at UTD studying history.', 'https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/Randy.png'),
(40, 4, 'I am a current undergraduate student at UTD studying information technology.', 'https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/Alex.png'),
(50, 5, 'I am a current graduate student at UTD studying computer science.', 'https://raw.githubusercontent.com/cheblankenshipUTD/ml-dataset/main/img/Sharice.png');

-- Mock data for users
INSERT INTO users (user_id, people_id)
VALUES 
(100, 6),
(200, 7),
(300, 8);

-- Mock data for tutors_times (5 sets; 1 set for each tutor)
INSERT INTO tutors_times (tutor_id, start_time, end_time, day_of_the_week)
VALUES 
(10, '2023-01-17 10:00:00', '2023-05-05 11:00:00', 'Monday, Wednesday'),
(20, '2023-01-17 03:30:00', '2023-05-05 04:30:00', 'Tuesday, Thursday'),
(30, '2023-01-17 01:00:00', '2023-05-05 02:15:00', 'Friday'),
(40, '2023-01-17 04:00:00', '2023-05-05 06:00:00', 'Monday, Thursday'),
(50, '2023-01-17 08:30:00', '2023-05-05 09:30:00', 'Tuesday, Thuesday');

-- Mock data for tutors_courses (5 sets; 1 set for each tutor)
INSERT INTO tutors_courses (tutor_id, course_id)
VALUES 
(10, 01),
(20, 02),
(30, 04),
(40, 03),
(50, 05);

-- Mock data for users_tutors (3 sets; 1 set for each user)
INSERT INTO users_tutors (user_id, tutor_id)
VALUES 
(100, 10),
(100, 20),
(100, 30),
(200, 20),
(200, 50),
(300, 40);

-- Mock data for appointments
INSERT INTO appointments (appointment_ID, appointment_name, user_id, tutor_id, course_id, Zoom_URL, start_time, end_time)
VALUES 
(1000, 'CS 2305 with John', 100, 10, 01, 'https://zoom.us/', '2023-04-17 10:00:00', '2023-04-17 11:00:00'),
(2000, 'ITSS 3311 with Tracey', 200, 50, 05, 'https://zoom.us/', '2023-04-18 08:30:00', '2023-04-18 09:30:00'),
(3000, 'CS 4349 with Alex', 300, 40, 03, 'https://zoom.us/', '2023-04-19 04:00:00', '2023-04-19 05:00:00');
