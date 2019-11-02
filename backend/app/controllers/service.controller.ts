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



export const ServiceController: Router = router;


