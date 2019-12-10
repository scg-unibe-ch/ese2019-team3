import {Request, Response, Router} from 'express';
import {Service} from '../models/service.model';
import {Booking} from '../models/booking.model';
import {filterFunction} from '../serviceFilter';

const fullTextSearch = require('full-text-search');
const search = new fullTextSearch();

let searchResult = [];
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
 */

router.post('/register', async (req, res) => {
    const service = new Service();
    service.fromSimplification(req.body);

    if (req.body.price == null) {
        service.price = "Auf Anfrage"
    }
    service.rating = 0;

    await service.save().then ( async() => {
    });
    res.send('service registered');
    res.status(200);

});


router.get('/', async (req, res) => {
    let service = await Service.findAll();
    for(let i = 0; i < service.length; i++){
       service[i] = await updateRatings(service[i].id.toString());
    }
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
 *  Method to update service data in the database
 * Path: ./service/:id
 * Request type: PUT
 */
router.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    let service = await Service.findByPk(id);
    if (service == null) {
        res.statusCode = 404;
        res.json({
            'message': 'service not found'
        });
        return;
    }
    service = await updateRatings(service.id.toString());
    service.fromSimplification(req.body);
    await service.save();
    res.statusCode = 200;
    res.send(service.toSimplification());
});

/**
 *  Method to delete service data in the database
 * Path: ./service/:id
 * Request type: DELETE
 */
router.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    let service = await Service.findByPk(id);
    if (service == null) {
        res.statusCode = 404;
        res.json({
            'message': 'service not found'
        });
        return;
    }
    service = await updateRatings(service.id.toString());
    service.fromSimplification(req.body);
    await service.destroy();
    res.statusCode = 204;
    res.send('service deleted');
});

/**
 * Method for filtering Services by location or servicetype
 * Request type: POST
 * Request Body:
 * {
 *     city:       string,
 *     serviceType: string,
 *     price: string
 * }
*/

router.post('/filter', async (req: Request, res: Response) => {
    searchResult.length = 0;
    //serach for serviceType and Location
    if (req.body.serviceType == undefined && req.body.city == undefined && req.body.price == undefined) {
        searchResult = await Service.findAll();
    } else if(req.body.price === undefined || req.body.price === null){
    if (req.body.city === undefined || req.body.city === '') {
        searchResult = await Service.findAll({where: {serviceType: req.body.serviceType}});
    } else if (req.body.serviceType === undefined || req.params.serviceType === '') {
        searchResult = await Service.findAll({where: {city: req.body.city}});
    } else {
        searchResult = await Service.findAll({where: {city: req.body.city, serviceType: req.body.serviceType}});
    }
    } else {
        if(req.body.serviceType == undefined && req.body.city == undefined) {
            searchResult = await Service.findAll({where: {price: req.body.price}});
        } else if ((req.body.city === undefined || req.body.city === '') && req.body.serviceType != undefined) {
            searchResult = await Service.findAll({where: {serviceType: req.body.serviceType, price: req.body.price}});
        } else if ((req.body.serviceType === undefined || req.params.serviceType === '') && req.body.city != undefined) {
            searchResult = await Service.findAll({where: {city: req.body.city, price: req.body.price}});
        } else {
            searchResult = await Service.findAll({where: {city: req.body.city, serviceType: req.body.serviceType, price: req.body.price}});
        }
    }


    // add results for fulltextsearch if needed
    if (req.body.description !== undefined && req.body.description !== null) {  //description is the term used in the frontend for the "Search for anything" field
        const description = await req.body.description;
        search.drop();
        const searchBody = await Service.findAll();
        let i;
        for (i = 0; i < searchBody.length; i++) {
            search.add(searchBody[i].dataValues);
        }
        const anySearch = search.search(description.toString());
        const searchResultAny = searchResult.concat(anySearch);
        console.log(req.body.description);
        if (req.body.serviceType == undefined && req.body.city == undefined && req.body.description !== "") {
            res.send(anySearch);
        } else {
        res.send(searchResultAny);
        }
    } else {
    res.statusCode = 200;
    res.send(searchResult);
    }
});

/**
 * Method to show all services provided by a specific user
 * Path: ./service/user/ :id
 * Request type: GET
 */
router.get('/user/:id', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await Service.findAll({where: {providerId: userId}});
    res.statusCode = 200;
    res.send(user.map(e => e.toSimplification()));
});

/**
 * Method to show all services with this exact price
 * Path: ./service/ :preis
 * Request type: GET
 */
router.get('/:preis', async (req: Request, res: Response) => {
    const reqPrice = parseInt(req.params.preis);
    const user = await Service.findAll({where: {price: reqPrice}});
    res.statusCode = 200;
    res.send(user.map(e => e.toSimplification()));
});

/**
 * Method to update Rating and return it
 * Path: ./service/updateRating
 * Request type: PUT
 * Body:
 * {
 *     "serviceId": "number"
 * }
 */
router.put('/updateRating',  async (req: Request, res: Response) => {
    const id = req.body.serviceId;
    let service = await updateRatings(id);
    res.statusCode = 200;
    res.send(service);
});

async function updateRatings(id: string): Promise<Service> {
    let intID = parseInt(id);
    const service = await Service.findOne({where: {id: intID}});
    const ratings = await Booking.findAll({where: {serviceId: intID}});
    let sum = 0;
    let average = 0;
    if(ratings.length > 0) {
        let i = 0;
        for (; i < ratings.length; i++) {
            sum += ratings[i].rating;
        }
        average = sum / (i + 1);
    }
    if(service != null) {
        service.rating = average;
        await service.save();
        return service;
    }
    throw new Error('No service found');
}

export const ServiceController: Router = router;


