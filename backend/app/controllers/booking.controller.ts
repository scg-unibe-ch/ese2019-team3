import {Request, Response, Router} from 'express';
import {Booking} from '../models/booking.model';
import {User} from '../models/user.model';
import {Service} from '../models/service.model';

const router: Router = Router();


router.get('/', async (req: Request, res: Response) => {
    const booking = await Booking.findAll();

     res.send(booking);
});

router.post('/register', async (req: Request, res: Response) => {
    const booking = new Booking();
    booking.fromSimplification(req.body);
    booking.bookingStatus = 'request';

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

export const BookingController: Router = router;

