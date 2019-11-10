// import everything from express and assign it to the express variable
import express from 'express';
const https = require('https');
const fs = require('fs');
const openssl = require('https')

// import all the controllers. If you add a new controller, make sure to import it here as well.

import {Sequelize} from 'sequelize-typescript';

import {Service} from './models/service.model';
import {User} from './models/user.model';
import {UserController} from './controllers';
import {ServiceController} from './controllers';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import * as path from 'path';
//cross-origin resource sharing; communcation between different ports
const cors = require('cors');

const sequelize =  new Sequelize({
  database: 'development',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: 'db.sqlite'
});
sequelize.addModels([Service, User]);

// create a new express application instance
const app: express.Application = express();
app.use(express.json());
app.use(cors());

//swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// define the port the express app will listen on
var port: number = 3000;
if (process.env.PORT !== undefined) {
  port = parseInt(process.env.PORT);
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Mögliche Routes
app.use('/user', UserController);
app.use('/service', ServiceController);
// Set Port
sequelize.sync().then(() => {
// start serving the application on the given port
  app.listen(port, () => {
    // success callback, log something to console as soon as the application has started
    console.log(`Listening at http://localhost:${port}/`);
  });
  createDummyUser().then();
  createDummyService().then();
  createAdminUser().then();


});

// Start database
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// Test Database connection
app.use('/dbtest', async  (req, res) =>{
  res.statusCode = 200;
  return res.json({Status: 'Connection successful'});
})

// Create admin user as entry in the database
async function createAdminUser() {
  const users = await User.findAll();
  if (users.length === 0) {

    const user = new User();
    user.createAdminUser();
    await user.save();
    console.log('Admin User created!');
  }
}



}

async function createDummyService() {
    const services = await User.findAll();
    if (services.length === 0) {
        const service = new Service();
        service.createDummyService();
        await service.save();
        console.log('Dummy Service created!');
    }
}


async function createDummyUser() {
  const users = await User.findAll();
  if (users.length === 0) {
    const user = new User();
    user.createDummyUser();
    await user.save();
    console.log('Dummy User created!');
  }
}
