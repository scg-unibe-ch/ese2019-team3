# ESE 2019 Scaffolding
Welcome to our Event Service Platform. This projects contains the following compo-nents:
- frontend: an Angular application (created with materialize)
- backend: a Node.js application written in TypeScript, using the express.js web framework

## Purpose of the Event Service Platform
The event service platform is an app which companies can offer their services. On the other hand, clients can browse and book all services listed on the platform. After a booking has been made and the service has been delivered, clients can rate service providers.

## Prerequisites
- You should have Node.js and NPM installed (NPM is installed automatically with latest versions of Node.js) which are needed by both frontend and backend projects. You can verify whether you have both by running node -v and npm -v in terminal or command prompt.
- You should have Angular CLI globally installed on your machine (npm in-stall -g @angular/cli).
- You should have materialize globally installed on your machine (npm install ngx-materialze).


## Understanding project structure
- The main project folder contains two subfolders: frontend and backend. These two are projects on their own which you will run independently.
- The backend folder contains an express project that serves as a REST API, exposes endpoints to accept HTTP requests. For received HTTP requests, it in turn returns JSON data.
- The frontend folder contains an materialize project, which makes HTTP re-quests to the backend and processes the JSON data received i.e. make changes if required and display it on the UI.

## Running the app
- First you need to clone the github repo

- Running the backend:

   - Use npm install in the backend folder to install all dependencies
    - Use the terminal and run the following commands: npm run tsc -- --watch and nodemon build/server.js 
- Running the frontend: 
    - Use npm install in the frontend folder to install all dependencies
    - Start the project by running “ng serve”
- Go to localhost:4200 in your Webbrowser to see the running app.

## Backend/API Documentation
The backend APi is fully documented with swagger. For a detailed description of all API's available (including models, possible request etc.), start the server and go to localhost:3000/swagger API's can be tested manually there.
Swagger documentation can be changed by edition the swagger.json file (in the root folder) 

Its important to know that there are basically three tables in the database used by our app:
- Users: Contains all service providers and clients registered on the platform
- Services: contains all services offered
- Bookings: contains a list of all past and current bookings that have been made

The detailed structure of these tables can be found in the XY.model.ts (e.g. User.model.ts) files in the backend/app/models/ directory.



## Frontend Documentation
...

## Ueeful information
When running the backend an admin user is automatically generated. 

Its login data is: 
- Username:admin 
- Password: admin

Additionally, a dummy service and a dummy booking is created for testing purposes.
