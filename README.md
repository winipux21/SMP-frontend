# The idea of the project and my contribution

## Project concept
We built a “Missing Persons Finder” platform in preparation for a hackathon, with a focus on locating missing seniors—a demographic at particularly high risk. Our goal was to make search, reporting and real‑time alerting as simple and effective as possible, so family members and volunteers can coordinate faster when an elderly person goes missing

[english](https://github.com/idonix21/SMP-frontend/blob/master/README.md) [русский](https://github.com/idonix21/SMP-frontend/blob/master/README/ru.md)
## My role and contributions
### Backend development 
* Designed and implemented a RESTful API using Node.js and Express
* Modeled and managed user, report and alert data with Sequelize and PostgreSQL
* Secured endpoints with JWT authentication and bcrypt password hashing
* Handled file uploads (photos, last‑seen locations) via Multer
* Configured CORS, environment variables (dotenv) and development workflows with nodemon
### Frontend development
* Built a responsive single‑page application with React 17 and Vite.js
* Managed application state using MobX and mobx-react-lite
* Implemented client‑side routing with React Router v6
* Integrated interactive UI components:
  * react-yandex-maps for geolocation and map views
  * react-input-mask for structured form inputs 
  * react-color for tag‑color selection and styling
  * styled-components for scoped, themeable styling
* Fetching and error handling via Axios
* Enforced code quality with ESLint and the official React plugins

Together with my teammates’ Figma designs, this full‑stack implementation delivers a polished, end‑to‑end solution for quickly finding and sharing information about missing persons

## Below are the key screens of our application, demonstrating the main user scenarios

At the beginning of the page is the choice of the role (assistant / seeker), an interactive map with the points of the last location of the missing
![main](https://github.com/user-attachments/assets/92d79572-4b65-47bc-9fe6-91e97cdddc55)

The "How to help" section is an instruction for volunteers: departure by coordinates, search by data from the site, the process of transferring the found person
![next](https://github.com/user-attachments/assets/eae14259-30d6-417f-9d3a-4d0ed40485ff)

The application form contains a detailed report on the disappearance: the applicant's contact, the missing person's parameters (photo, clothing, time and place of disappearance) and the ability to instantly transfer data to the database
![nextnext](https://github.com/user-attachments/assets/d34f8ade-b804-46a8-b53d-251e24290ed1)

# SMP Frontend Setup Guide

Welcome! This guide will help you set up and run the **SMP Frontend** project locally  
Technologies used: **Node.js**, **Vite.js** and **React 17**

![Static Badge](https://img.shields.io/badge/Node.js-20.18.3-green?link=https%3A%2F%2Fnodejs.org%2Fen%2Fdownload) ![Static Badge](https://img.shields.io/badge/Vite.js-5.4.10-purple)
 ![Static Badge](https://img.shields.io/badge/React.js-17-blue)

---

## 1. Clone the Repository

Create a folder for the project, for example "SMP"

Next, use this command to ```git clone https://github.com/idonix21/SMP-backend``` the repository into the created folder

## 2. Install Dependencies

Use the ```npm install``` command to install all required dependencies

Use the ```npm run build``` command to build a project 

## 3. Run the Server
Start the backend server with: to run it, use the command ```node server.js```

And of course, don't forget to download the frontend part - [SMP-Backend](https://github.com/winipux21/SMP-backend/tree/master)
