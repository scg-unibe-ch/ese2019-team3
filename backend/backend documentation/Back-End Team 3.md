# Back-End Team 3 Documentation

## General Informations
Written by Rafi und Julian <br />

<br />
When running the backend an admin user is automatically generated. <br /><br />
Its login data  is: 
<br />

Username: admin
<br />
Password: admin


## How to run the backend
1. Clone the github repository
2. Use the terminal and run the following commands:
	```npm run tsc -- --watch``` and
	```nodemon build/server.js```
	(It is possible that after cloinung running ```npm install``` is necessary).


If this doesn't work, you are most likely missing some packages. Below you can find a list of all packages included.
<br />
<br />
## API Documentation
For a detailed description of all API's available (including models, possible request etc.), start the server and go to [localhost:3000/swagger](http://localhost:3000/swagger/)
API's can be tested manually there.

Swagger documentation can be changed by edition the swagger.json file (in the root folder)
<br /><br />
## Packages used

Packages can be installed by typing "npm install [package name] in the terminal

The following packages are used and needed for runnung the backend:

1. jsonwebtoken
2. bcrypt
3. nodemailer
4. randomstring
5. swagger-ui-expres
