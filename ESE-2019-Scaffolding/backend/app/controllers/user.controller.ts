import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';

const router: Router = Router();
const bcrypt = require('bcryptjs');




router.get('/', async (req: Request, res: Response) => {
  const instances = await User.findAll();
  res.statusCode = 200;
  res.send(instances.map(e => e.toSimplification()));
});


/**
 * Method for creating a new user in the database after registration
 * Path: ./user/register
 * The registration form needs to send the following request:
 * Request type: POST
 *
 * Request Body:
 *  {
 *      "username": string,
 *      "password": string,
 *      "email": string,
 *      "userGroup": string
 *
 *  }
 *
 */
router.post('/register', async (req, res) => {
  const user = new User();
  user.fromSimplification(req.body);

  // Check if all necessary information was entered
  if (user.email == null || user.userName == null || user.password == null || user.userGroup == null) {
    res.statusCode = 400; // Bad Request
  }
  // hash password
  user.password = bcrypt.hashSync(user.password, 8);

  // Set default verification status to false
  user.isVerified = false;

  await user.save().then ( async() => {
    res.statusCode = 201;
    res.send(user.toSimplification());
  });

  /**
   *Doesn't work for some reason
    catch( () => {
    res.statusCode = 500;
    res.send('Registration failed');
  });
   */
});

/**
 * Show userdata...
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




// Unused

router.put('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await User.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.fromSimplification(req.body);
  await instance.save();
  res.statusCode = 200;
  res.send(instance.toSimplification());
});
router.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await User.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.fromSimplification(req.body);
  await instance.destroy();
  res.statusCode = 204;
  res.send();
});


export const UserController: Router = router;
