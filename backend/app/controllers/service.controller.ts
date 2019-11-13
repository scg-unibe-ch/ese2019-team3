import {Request, Response, Router} from 'express';
import {Service} from '../models/service.model';
import {filter} from '../serviceFilter';

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
    res.status(200);

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


/**
 * Method for filtering Services by location or servicetype
 * Request type: POST
 * Request Body:
 * {
 *     queries:       string,
 *     searchType:    string
 * }
 */
router.post('/filter', async (req: Request, res: Response) => {
    const service = await Service.findAll();

    const q1 = await req.body.queries;
    const q2 = await req.body.searchType;

    if(q1 != null && (q2 != null || q2 != "")){
    res.send(filter(q1, q2, service).toString());
    res.status(200);
    } else res.status(400);
});
export const ServiceController: Router = router;


