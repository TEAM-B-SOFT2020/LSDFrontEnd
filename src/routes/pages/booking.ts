// libraries
import * as express from 'express';
import * as contract from 'contract';

import ContractMock from '../../contract/ContractMock';


import IBookingIdentifier from 'contract/src/IBookingIdentifier';
import IReservationDetail from 'contract/src/DTO/IReservationDetail';
import { visitFunctionBody } from 'typescript';
import IPassenger from 'contract/src/IPassenger';




// classes, interfaces & functions
const router: express.Router = express.Router();
const mock = new ContractMock();

router.get('/', async (req, res) => {
    /*
    // stephan syntax:: just a complex way to make a simple list    
    //Makes a mock of the ContractMock called mock
    const mock = new ContractMock();
    // uses the mock to get carrier information
    const bookingId: IBookingIdentifier = { id: 'test' };    
    const booking = await mock.getBooking(bookingId);
    //create a new object that contains the object carrier
    const content: object = {booking };    
    //Return the content to the carriers view
    */
	res.render('booking');
});

router.post('/get', async (req, res) => {
    // stephan syntax:: just a complex way to make a simple list    
    //Makes a mock of the ContractMock called mock
    let bookingId: IBookingIdentifier = { id: req.body.bookingId };
    const booking = await mock.getBooking(bookingId);
    const content: object = {booking};
    res.render('partials/booking/getBooking', content);
});

router.post('/cancel', async (req, res) => {
    // stephan syntax:: just a complex way to make a simple list    
    //Makes a mock of the ContractMock called mock

    let passengerList : IPassenger[] = req.body.passenger;
    let reservationDetailList : IReservationDetail[] = [];


    let reservationDetail : IReservationDetail = {
        id: "123123",
        passengers: passengerList
    };
    
    String uniqueID = UUID.randomUUID().toString();

    const booking = mock.createBooking(reservationDetailList, 12312312, 1213123)
    const content: object = {message: "Hey"};
    res.render('partials/booking/cancelBooking', content);
});

router.post('/create', async (req, res) => {
    const content: object = {message: "Booking has been cancelled: "};
    res.render('partials/booking/createBooking', content);
});


export default router;