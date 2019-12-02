import {Request, Response, Router} from 'express';
import {Booking} from '../models/booking.model';
import {User} from '../models/user.model';
import {Service} from '../models/service.model';
import sequelize, {Op} from 'sequelize';

const router: Router = Router();


router.get('/', async (req: Request, res: Response) => {
    const booking = await Booking.findAll();

     res.send(booking);
});

/**
 * Get all bookings a specific client made (including accepted and declined one, past and future ones
 * => give a client an overview of all his bookings
 */
router.get('/client/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const booking = await Booking.findAll({where: {clientId: id} }); //https://sequelize-guides.netlify.com/search-operators/
    res.statusCode = 200;
    res.send(booking);
});


/**
 * Get all bookings a specific provider had (including accepted and declined one, past and future ones
 * => give a provider an overview of all his bookings
 */
router.get('/provider/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const booking = await Booking.findAll({where: {providerId: id} }); //https://sequelize-guides.netlify.com/search-operators/
    res.statusCode = 200;
    res.send(booking);
});

/**
 * Get all bookings a specific provider has not answered yet
 * => needed to notify a provider when he has unanswered booking requests
 */
router.get('/provider/requests/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    //https://sequelize-guides.netlify.com/search-operators/
    const booking = await Booking.findAll({where: {providerId: id, bookingStatus: 'request'} });
    res.statusCode = 200;
    res.send(booking);
});



/**
 * Get all bookings a specific client made, that have been accepted, and that are in the past (the service has already been done) and that have not been rated yet
 * => Needed for ratings -> show all bookings a client should be able to rate (must be past and must have been accepted).
 */
router.get('/client/rate/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    //https://sequelize-guides.netlify.com/search-operators/
    const booking = await Booking.findAll({where: {date: { [Op.lte]: Date.now()}, clientId: id, bookingStatus: 'accepted', rating: { [Op.is]: null }} });
    res.statusCode = 200;
    res.send(booking);
});

router.post('/register', async (req: Request, res: Response) => {
    const booking = new Booking();
    booking.fromSimplification(req.body);
    booking.bookingStatus = 'request';
    console.log(new Date(req.body.date).getTime());
    booking.date = parseInt(new Date(req.body.dates).getTime()); //convert date format from date picker to unix time stamp

    await booking.save().then ( async() => {
    });
    res.send('booking registered');
    res.status(200);
});

router.put('/rate', async (req: Request, res: Response) => {
    // tslint:disable-next-line:radix
    const rating =  req.body.rating;
    const bookingId =  req.body.bookingId;
    const providerId = req.body.providerId;
    console.log(req.body);
    const booking = await Booking.findOne({where: {id: bookingId}});
    if (booking != null) {
        booking.rating = rating;
    } else {
        res.statusCode = 400;
        res.send ('booking not found');
    }
    await booking.save();

    res.statusCode = 200;
    res.send('Service rated!');
   await updateRating(providerId)
});

async function updateRating(providerId: number) {
    console.log(providerId)
    const user = await User.findOne({where: {id: providerId}});
    const bookings = await Booking.findAll({where: {providerId: providerId}});
    if (bookings != null) {
    let sum = 0;
    let i;
    let count = 0;
    for (i = 0; i < bookings.length; i++) {
        sum += bookings[i].rating;
        count += 1;
    }
    const averageRating = sum / i;
    if (user != null) {
    user.rating = averageRating;
    await user.save();
    }
} else {
    console.log('no bookings found');
    }
}

router.put('/accept/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const booking = await Booking.findOne({where: {id: id}});
    if (booking!=null){
    booking.bookingStatus = 'accepted';
    await booking.save().then ( async() => {
    });
    res.send('booking accepted');
    res.status(200);
    } else {
        res.statusCode = 400;
        res.send('Booking not found');
    }

});

router.put('/decline/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const booking = await Booking.findOne({where: {id: id}});
    if (booking!=null){
        booking.bookingStatus = 'declined';
        await booking.save().then ( async() => {
        });
        res.send('booking declined');
        res.status(200);
    } else {
        res.statusCode = 400;
        res.send('Booking not found');
    }

});

export const BookingController: Router = router;

