INSERT INTO people (people_id, email, password, first_name, last_name)
VALUES (1, 'abc@gmail.com', 'test1', 'test-first', 'test-last');

INSERT INTO people (people_id, email, password, first_name, last_name)
VALUES (2, '123@gmail.com', 'test2', 'Jane', 'Doe');

INSERT INTO tutors (tutor_id, people_id, about_me, profile_url)
VALUES (10, 1, 'I am a current graduate student at UTD studying computer science.', 'https://images.app.goo.gl/KwVDQRseHgvAaFVv7');

INSERT INTO users (user_id, people_id)
VALUES (20, 2);

SHOW TABLES;

SELECT * FROM people;

SELECT * FROM tutors;

SELECT * FROM users;
