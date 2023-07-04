# Medcloud Code Challenge Solution

This repository contains a solution to the code challenge. The requirements provided by Medcloud can be found at the [end](#development-challenge). Follow the instructions below to run the project.

## Prerequisites
- [Node.js](https://nodejs.org) installed on your machine.
- [Docker](https://www.docker.com/) installed on your machine.

## Instructions

1. Clone the repository:
   ```bash
   $ git clone https://github.com/Gus-Vilela/development-challenge-nine
   ```

2. Configure the Node.js API:
   1. Create a `.env` file in the `server` directory of the project. You can use the provided `.env.sample` file as a reference. The file should look like this:

      ```
      # node ports
      NODE_LOCAL_PORT=3001
      NODE_DOCKER_PORT=3000

      # MySQL ports
      MYSQL_LOCAL_PORT=3307
      MYSQL_DOCKER_PORT=3306

      # MySQL credentials
      DB_USERNAME=root
      DB_PASSWORD=root
      DB_NAME=medcloudChallenge
      DB_HOST=mysqldb
      DB_DIALECT=mysql
      ```

   2. Run Docker Compose to set up the required containers:
      ```bash
      $ docker-compose up -d
      ```

   3. Enter the running container using Docker Exec:
      ```bash
      $ docker exec -it server-app sh
      ```

   4. Run the database migrations using the Sequelize CLI:
      ```bash
      $ npx sequelize-cli db:migrate
      ```

   Once the migrations are complete, the API will be ready and running at `http://127.0.0.1:3001/Patient`.

3. Configure the client side:
   1. Enter the `client` folder:
      ```bash
      $ cd client
      ```

    2. Install the required dependencies:
       ```bash
       $ npm install
       ```

    3. Start the client application in development mode:
       ```bash
       $ npm run dev
       ```
# Development challenge

![logo medcloud-03 white copy](https://user-images.githubusercontent.com/46347123/158176045-de9fefb0-35e2-4515-83ff-c132608aa870.png)

About Medcloud:

We make exams and medical data management more flexible, secure and effective by accelerating the transition from clinics and hospitals to the cloud.
The RIS and PACS systems have been practically the same for the past 25 years. Interoperability problems, high costs and a lack of understanding about the patient's access to his medical records.

These points defined limits for the doctor-patient relationship and barriers to radiology workflows. We are revolutionizing this through a Care Coordination based solution that improves workflows for providers and integrates doctors and patients for a better experience.

Since our foundation, almost 10 years ago, we have prioritized excellence in the management of health data, structuring workflows of health professionals, clinics, laboratories and hospitals for assertive and quality diagnostics.

We understand that behind each medical record there is a patient seeking to improve his health and the hope of family members for his well being. After all, we are all patients, and Medcloud's mission is to help you live longer and better. #PatientFirst

Medcloud's challenge for Dev Full Stack.

## Goal

- To develop a web application (CRUD) to manage patient registers (Patient's name, birth date, email and address).

## Required

- You need to develop both the front-end and the back-end.
- In the front-end you MUST use React.
- In the back-end you MUST use Node.js.
- The patient data should not be static  (You MUST use a cloud database or a local database).
- Field validation (date, required fields, etc).

## Extra Points

- Cache the data in-browser.
- Pagination.
- Use Material UI - https://material-ui.com.
- A cool design.
- If you choose a local database: a docker environment of your project.

## References

- Intro to React: https://reactjs.org/tutorial/tutorial.html.

## What will be evaluated:

- Clean and organized code (naming, etc.)
- Knowledge of patterns (PSRs, design patterns, SOLID)
- Be consistent and know how to argue your choices
- Present solutions you master
- Data Modeling
- Code maintainability
- Error handling
- Architecture (structuring thought before writing)
- Affection in decoupling components (other layers, service, repository)

According to the above criteria, we will evaluate your test in order to proceed to the technical interview. If you have not acceptably achieved what we are proposing above, we will not proceed with the process.

## Delivery

You MUST fork this repository to your own account and push you code to it. 
When you finish it, you must send a email to cv@medcloud.com.br with your curriculum and your fork.

Good luck! Any doubts, feel free to send an email to cv@medcloud.com.br.

## For the day of the technical interview and code review

On the date set by the recruiter, have your application running on your local machine to run the tests and to show us the points developed and possible questions. We will do a code review together with you as if you were already on our team, you will be able to explain what you thought, how you architected and how the project can evolve. Good luck!
