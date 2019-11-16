import {Request, Response, Router} from 'express';
import {Service} from '../models/service.model';
import {filterFunction} from '../serviceFilter';

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
 * }
 */
/*
router.post('/filter', async (req: Request, res: Response) => {
    const service = await Service.findAll();

    const q1 = await JSON.stringify(req.body);
    if(q1 != null){
        const f = filterFunction(q1, service);
        res.send(f);
        res.status(200);
    } else res.status(500);
});
*/


/**
 * Method for filtering Services by location or servicetype
 * Request type: POST
 * Request Body:
 * {
 *     city:       string,
 *     serviceType: string,
 *     se
 * }
*/

router.post('/filter', async (req: Request, res: Response) => {
    let searchResult = [];
    //serach for serviceType and Location
    if (req.body.serviceType == undefined && req.body.city == undefined) {
        searchResult = await Service.findAll();
    } else if (req.body.city === undefined || req.body.city === '') {
        searchResult = await Service.findAll({where: {serviceType: req.body.serviceType}});
    } else if (req.body.serviceType === undefined || req.params.serviceType === '') {
        searchResult = await Service.findAll({where: {city: req.body.city}});
    } else {
        searchResult = await Service.findAll({where: {city: req.body.city, serviceType: req.body.serviceType}});
    }

    // add results for fulltextsearch if needed
    if (req.body.description !== undefined && req.body.description !== null) {
        const description = await req.body.description;
        search.drop();
        const searchBody = await Service.findAll();
        let i;
        for (i = 0; i < searchBody.length; i++) {
            search.add(searchBody[i].dataValues);
        }
        const anySearch = search.search(description.toString());
        const searchResultAny = searchResult.concat(anySearch);
        res.send(searchResultAny);
    } else {
    res.statusCode = 200;
    res.send(searchResult);
    }

});

export const ServiceController: Router = router;


