import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Service} from '../models/service.model';
const fullTextSearch = require('full-text-search');
const search = new fullTextSearch();


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
    const service = new Service();
    service.fromSimplification(req.body);


    await service.save().then ( async() => {
    });
    res.send('service registered');
    res.status = 200;

});


router.get('/', async (req, res) => {
    const service = await Service.findAll();
    res.statusCode = 200;
    res.send(service.map(e => e.toSimplification()));
    });

router.post('/search', async (req: Request, res: Response) => {
    const searchTerm = await req.body.searchTerm;
    search.drop();
    const searchBody = await Service.findAll();
    let i;
    for (i = 0; i < searchBody.length; i++) {
        search.add(searchBody[i].dataValues);
    }
    const result = search.search(searchTerm.toString());
    res.send(result);
});



export const ServiceController: Router = router;


