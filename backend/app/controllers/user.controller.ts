import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
const jwt = require('jsonwebtoken'); //JSON Webtoken

const router: Router = Router();
const bcrypt = require('bcryptjs');  //used to hash passwords


/**
 * Method for creating a new user in the database after registration
 * Path: ./user/register,
 * The registration form needs to send the following request:
 * Request type: POST
 * Request Body:
 *  {
 *
 *      "password": string,
 *      "email": string,
 *      "userGroup": string
 *  }
 */
router.post('/register', async (req, res) => {
  const user = new User();
  user.fromSimplification(req.body);

  // Check if all necessary information was entered
  if (user.email == null || user.password == null || user.userGroup == null) {
    res.statusCode = 400; // Bad Request
    res.send('Incomplete information!');
  }
  if (await User.findOne({where: {email: user.email}})  !== null) {
    res.send('E-Mail already registered!');
  }
  // hash password
  user.password = bcrypt.hashSync(user.password, 8);

  // Set default verification status to false
  user.isVerified = false;

  await user.save().then ( async() => {
    const payload = {
      id: user.id,
      userGroup: user.userGroup
    }
    const token = jwt.sign(payload, 'key');  // 'key' could be any string
    res.statusCode = 201; //Status code: created
    res.send({token});
  });
});

/**
 * Method for user login
 * Path: ./user/login
 * Request type: GET
 *
 */

router.get('/login', async (req: Request, res: Response) => {
  const email = await req.body.email;
  const userPassword = await req.body.password;
  const user = await User.findOne({where: {email: email}});
  console.log(email);
  console.log(userPassword);
  if (user == null) {
    res.statusCode = 401;  //unauthorized
    res.send('Account not found');
  }
   if ( await( bcrypt.compare( userPassword, user.password)) === false) {
    res.statusCode = 401;
    res.send('Invalid password!');
  }
  const payload = {
     id: user.id,
    userGroup: user.userGroup
  }
  const token = jwt.sign(payload, 'key');
  res.statusCode = 200; //status code: OK
  res.send({token});
});

/**
 * Middleware to verify token
 * Token must be send in the header of a request from the frontend
 */
function verifyToken (req,res,next) {
    if (!req.headers.authorization) {   // The word authorization may need to be changed, depends on the naming of the header in the frontend
      res.statusCode = 401;
      res.send('Unauthorized request');
    }
    let token = req.headers.authorization;

    if (token ==='null') {
      res.statusCode = 401;
      res.send('Unauthorized request');
    }

    let payload = jwt.verify(token, 'key');
    if (!payload) {
      res.statusCode = 401;
      res.send('Unauthorized request');
    }
    req.id = payload.id;
    next();
}

/**
 * Template Method
 *  => VerifyToken wird aufgerufen
 *  Wenn dieser Pfad aufgerufen wird, wird der Token überprüft
 *  Für Seiten nach dem Login zu nutzen
 */

router.get('/verifyToken', verifyToken, async (req, res) => {
  //  ....

});

/**
 * Method to change password
 * Doesn't work yet, the password is not really changed...
 */

router.put('/setNewPassword', async (req: Request, res: Response) => {
  const id = parseInt(req.body.id);
  const user = await User.findByPk(id);
  const userPassword = await req.body.password;
  const newPassword = await req.body.newPassword;
  const newPasswordHash = bcrypt.hashSync(newPassword, 8);

  if ( await( bcrypt.compare( userPassword, user.password)) === false) {
    res.statusCode = 401;
    res.send('Incorrect Password');
  } else {
    console.log(newPasswordHash);
  }
  user.setPassword(newPasswordHash);
  res.statusCode = 200; //status code: OK
  res.send('Password changed!');
  }

});


/**
 * Method to show all registered users
 * Path: ./user/
 * Request type: GET
 */

router.get('/', async (req: Request, res: Response) => {
  const user = await User.findAll();
  res.statusCode = 200;
  res.send(user.map(e => e.toSimplification()));
});

/**
 * Method to show all non-verified users
 * Path: ./user/verified
 * Request type: GET
 */

router.get('/verify', async (req: Request, res: Response) => {
  const user = await User.findAll({where: {isVerified: false});
  res.statusCode = 200;
  res.send(user.map(e => e.toSimplification()));
});

/**
 * Method to verify users (to be used by the admin)
 * Path: ./user/verify/:id
 * Request type: PUT
 * Example: Put request to http://localhost:3000/user/validate/4 sets status of isVerified of user with id 4 to true
 */

router.put('/verify/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await User.findByPk(id);
  user.isVerified = true;
  res.statusCode = 200;
  res.send('User verified!');
  await user.save();
});


/**
 * Method to get information about a specific user
 * Path: ./user/:email
 * Request type: GET
 */

router.get('/:email', async (req: Request, res: Response) => {
  const email = req.params.email;
  console.log(email);
  const user = await User.find( {where: {email: email});
   console.log(user);
  if (user == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  res.statusCode = 200;
  res.send(user.toSimplification());
});



/**
 *  Method to update userdata in the database
 * Path: ./user/:id
 * Request type: PUT
 */

router.put('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await User.findByPk(id);
  if (user == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  user.fromSimplification(req.body);
  await user.save();
  res.statusCode = 200;
  res.send(user.toSimplification());
});

/**
 * Method to  delete a user from the database
 * Path: ./user/:id
 * Request type: DELETE
 */

router.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await User.findByPk(id);
  if (user == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  user.fromSimplification(req.body);
  await user.destroy();
  res.statusCode = 204;
  res.send('user deleted'});
});


export const UserController: Router = router;
