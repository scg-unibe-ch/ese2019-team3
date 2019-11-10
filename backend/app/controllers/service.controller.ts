import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Service} from '../models/service.model';



const router: Router = Router();

const contact = require('../contact');

/**
 * Method to show all services provided
 * Path: ./service/
 * Request type: GET
 */
router.get('/', async (req: Request, res: Response) => {
    const user = await Service.findAll();
    res.statusCode = 200;
    res.send(user.map(e => e.toSimplification()));
});


/**
 * Method for creating a new service in the database
 * Path: ./service/register,
 * The registration form needs to send the following request:
 * Request type: POST
 * Request Body:
 *  {
 *
 * @Column
 * provider!: string;
 *
 * @Column
 * serviceTitle!: string;
 *
 *  @ForeignKey(() => User)
 *  @Column
 * providerId!: number;
 *
 * @Column
 *serviceType!: string;
 *
 * @Column
 * price!: number;
 *
 *  @Column
 *city!: string;
 *
 *  }
 */
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
    console.log(req.params.serviceTitle);
    const service = new Service();
    service.fromSimplification(req.body);


    await service.save().then ( async() => {
    });

});


export const ServiceController: Router = router;


