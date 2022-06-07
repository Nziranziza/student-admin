# [Student Administration Framework](https://studaf.herokuapp.com/)

## At Glance

The New-Western high school decided to implement a new, cloud-based administration
software. The admission office would like to collect and store the most important data of
the students in this new product. Additionally, they need to keep records of the study
groups students are enrolled for.

We would like to store these details of all students:
```
- name
- sex
- place of birth
- date of birth
- email address
- study groups (maximum of 4 faculty per student)
```

Properties of a study group:
```
- name of the group
- leader of the group (as string)
- subject (as string)
- date and time of study group
- enrolled students
```

## Features

- Add a new student
- Edit an existing student
- Delete a student (delete all enrollments of the student also)
- Add a student to study group(max 4 groups)
- Remove a student from a study group
- Create a study group
- Edit an existing study group
- Delete a study group

## How to get started

1. Install dependencies
```
npm i or yarn
```
2. Create a .env file and copy .env.example and all the necessary env variables
```
DB_NAME = students
DB_USER = root
DB_HOST = localhost
DB_DRIVER = mysql
DB_PASSWORD = 'yourpassword'
```
3. Build for production
```
npm run build
```
4. Start the server
```
npm start
```
5. Open the app in the browser
```
localhost:3000
```

## Technologies and framework

- NodeJS, ExpressJs, Typescript, SequelizeJs, Joi, MySQL
- ReactJS, Bootstrap, SCSS, React Hooks, Context API