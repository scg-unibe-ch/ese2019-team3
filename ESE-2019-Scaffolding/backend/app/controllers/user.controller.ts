import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';

const router: Router = Router();
const bcrypt = require('bcryptjs');

/**
 * Method for creating a new user in the database after registration
 * Path: ./user/register,
 * The registration form needs to send the following request:
 * Request type: POST
 * Request Body:
 *  {
 *      "username": string,
 *      "password": string,
 *      "email": string,
 *      "userGroup": string
 *  }
 */
router.post('/register', async (req, res) => {
  const user = new User();
  user.fromSimplification(req.body);

  // Check if all necessary information was entered
  if (user.email == null || user.userName == null || user.password == null || user.userGroup == null) {
    res.statusCode = 400; // Bad Request
    // res.send('Incomplete information!');
  }
  // hash password
  user.password = bcrypt.hashSync(user.password, 8);

  // Set default verification status to false
  user.isVerified = false;

  await user.save().then ( async() => {
    res.statusCode = 201;
    res.send(user.toSimplification());
  });

});


/**
 * Method to show all registered users
 * Path: ./user/
 * Request type: GET
 */

router.get('/', async (req: Request, res: Response) => {
  const instances = await User.findAll();
  res.statusCode = 200;
  res.send(instances.map(e => e.toSimplification()));
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
  const user = await User.findById(id);
  user.isVerified = true;
  res.statusCode = 200;
  res.send('User verified!');
  await user.save();
});


/**
 * Method to get information about a specific user
 * Path: ./user/:id
 * Request type: GET
 */

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await User.findById(id);
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
  const user = await User.findById(id);
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
  const user = await User.findById(id);
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
