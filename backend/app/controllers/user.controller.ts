import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
const jwt = require('jsonwebtoken'); //JSON Webtoken
import randomString from 'randomstring';
const router: Router = Router();
const bcrypt = require('bcryptjs');  //used to hash passwords
var contact = require('../contact');


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
    if (user.email == null || user.password == null || user.userGroup == null || user.firstname == null || user.lastname == null || user.adress == null || user.birthday == null) {
        res.statusCode = 400; // Bad Request
        res.send('Incomplete information!');
    }
    if (!validateEmail(user.email)) res.send('Typo in email-address.');

    if (await User.findOne({where: {email: user.email}}) !== null) {
        res.send('E-Mail already registered!');
    }
    // hash password
    user.password = bcrypt.hashSync(user.password, 8);

    // Set default verification status to false
    user.isVerified = false;

  await user.save().then ( async() => {
    const payload = {
        id: user.id,
        isVerified: user.isVerified,
        email: user.email,
        userGroup: user.userGroup,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        adress: user.adress,
        number: user.number,
        birthday: user.birthday
    }
    const token = jwt.sign(payload, 'key');  // 'key' could be any string
    res.statusCode = 201; //Status code: created
    res.send({token});
  });
  contact.sendRegistrationConfirmation(user.email);
});

/**
 * Method for user login
 * Path: ./user/login
 * Request type: Post
 *
 */

router.post('/login', async (req: Request, res: Response) => {
  const email = await req.body.email;
  const userPassword = await req.body.password;
  const user = await User.findOne({where: {email: email}});
  console.log(email);
  console.log(userPassword);
  if (user == null) {
    res.statusCode = 401;  //unauthorized
    res.send('Account not found');
  } else {
      if (await (bcrypt.compare(userPassword, user.password)) === false) {
          res.statusCode = 401;
          res.send('Invalid password!');
      }
  }

  const payload = {
    id: user.id,
    isVerified: user.isVerified,
    email: user.email,
    userGroup: user.userGroup,
    password: user.password,
    firstname: user.firstname,
    lastname: user.lastname,
    adress: user.adress,
    number: user.number,
    birthday: user.birthday
  }
  const token = jwt.sign(payload, 'key');
  res.statusCode = 200; //status code: OK
  res.send({token});
}});

/**
 * Middleware to verify token
 * Token must be send in the header of a request from the frontend
 */
function verifyToken (req: Request,res: Response,next) {
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
 // executes verifyToken method
    res.statusCode = 200;
});

/**
 * Method to change password
 */
router.put('/setNewPassword', async (req: Request, res: Response) => {
  const id = parseInt(req.body.id);
  const user = await User.findByPk(id);
  const userPassword = await req.body.password;
  const newPassword = await req.body.newPassword;
  const newPasswordHash = bcrypt.hashSync(newPassword, 8);
  if(user != null){
  if ( await( bcrypt.compare( userPassword, user.password)) === false) {
    res.statusCode = 401;
    res.send('Incorrect Password');
  } else {
    console.log(newPasswordHash);
  }
  user.setPassword(newPasswordHash);
  res.statusCode = 200; //status code: OK
  res.send('Password changed!');
  }});




/**
 * Method to send a new password to a user if he forgot it
 * Path: ./user/forgotPassword
 * Request type: PUT
 *
 */

router.put('/forgotPassword', async (req: Request, res: Response) => {

  const email = req.body.email;
  console.log(email);
  const user = await User.findOne( {where: {email: email}} );
  if(user != null) {
      const newPassword = randomString.generate(8);
      const newPasswordHash = bcrypt.hashSync(newPassword, 8);
      user.setPassword(newPasswordHash);
      console.log(email);
      console.log(newPassword);
      contact.sendNewPassword( email, newPassword);
      console.log(user.email);
      console.log(newPassword);
      res.statusCode = 200;
      res.send(newPassword);
  } else { res.send('User not found'); }
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
  const user = await User.findAll({where: {isVerified: false}});
  if (user == null) {
      res.statusCode = 400;
      res.send('Account not found');
  }
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
  if(user != null) {
      user.isVerified = true;
      res.statusCode = 200;
      res.send('User verified!');
      await user.save();
      contact.sendValidatedEmail(user.email);
  } else console.log('user not found ' + id);
});


/**
 * Method to get information about a specific user
 * Path: ./user/:email
 * Request type: GET
 */
router.get('/:email', async (req: Request, res: Response) => {
  const email = req.params.email;
  console.log(email);
  const user = await User.findAll( {where: {email: email}});
   console.log(user);
  if (user == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  res.statusCode = 200;
    res.send(user.map(e => e.toSimplification()));
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
  res.send('user deleted');
});

export const UserController: Router = router;

/**
 * Validates the form of an email-address
 * @param email email-address to vaildate
 * @return true if email is correct
 * @author rbu
 */
function validateEmail(email : string): boolean {
  let reg = /@/;
  if(reg.test(email)) {
    let domain = email.split("@");
    let regDom = /./;
    return regDom.test(domain[1]);
  }
  return false;
}
