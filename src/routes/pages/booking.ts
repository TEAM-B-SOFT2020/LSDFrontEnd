// libraries
import * as express from 'express';
import * as contract from 'contract';
import { uuid } from 'uuidv4';

import ContractMock from '../../contract/ContractMock';
import IBookingIdentifier from 'contract/src/IBookingIdentifier';
import IReservationDetail from 'contract/src/DTO/IReservationDetail';
import { visitFunctionBody } from 'typescript';
import IPassenger from 'contract/src/IPassenger';
import IFlightPassenger from 'contract/src/DTO/IFlightPassenger';
import IAirportIdentifier from 'contract/src/IAirportIdentifier';
import IFlightIdentifier from 'contract/src/IFlightIdentifier';
import IPassengerIdentifier from 'contract/src/IPassengerIdentifier';

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


router.get('/get/:bookingId', async (req, res) => {
    
    // stephan syntax:: just a complex way to make a simple list    
    //Makes a mock of the ContractMock called mock
    let bookingId: IBookingIdentifier = { id: req.params.bookingId };
    const booking = await mock.getBookingOnBookingId(bookingId);
    const content: object = {booking};
    res.render('partials/booking/getBooking', content);
});

router.post('/flight', async (req, res) => {
    let da : string = req.body.departureAirport.toUpperCase();
    let aa : string = req.body.arrivalAirport.toUpperCase();

    const departureAirport : IAirportIdentifier = {iata: da}
    const arrivalAirport : IAirportIdentifier = {iata: aa}
    const departureDate : number  = req.body.departureDate;
    const availableFlights = await mock.getFlightsAvailable(departureAirport, arrivalAirport, departureDate);
    const content: object = {availableFlights};
    res.render('partials/booking/chooseFlight', content);
});


router.post('/reserve', async (req, res) => {
    let selectedFlight = JSON.parse(req.body.flight);
    const flight : IFlightIdentifier = {
        flightCode : selectedFlight.flightCode
    }
    const seatCost = selectedFlight.seatPrice;
    const reservation = await mock.reserveFlight(flight, seatCost);
    const content: object = {message: "Reservation Success", reservation};
    res.render('partials/booking/createBooking', content);
    
});

router.post('/create', async (req, res) => {
    // stephan syntax:: just a complex way to make a simple list    
    //Makes a mock of the ContractMock called mock

    let creditCardNumber = req.body.creditCardNumber;
    let ffNumber = req.body.frequentFlyerNumber;
    let passengerList : IPassenger[] = req.body.passenger;
    let reservationDetailList : IReservationDetail[] = [];
    let reservationDetail : IReservationDetail = {
        id: req.body.reservationId,
        passengers: passengerList
    }; 
    reservationDetailList.push(reservationDetail)
    const booking = await mock.createBooking(reservationDetailList, creditCardNumber, ffNumber);
    res.redirect("/booking/get/" + booking.id);
});


router.post('/cancel', async (req, res) => {
    // stephan syntax:: just a complex way to make a simple list    
    //Makes a mock of the ContractMock called mock
    let bookingId: IPassengerIdentifier = { pnr: req.body.bookingId };
    await mock.cancelBooking(bookingId);
    const content: object = {message: "Booking [" + bookingId.pnr + "] has been cancelled"};
    res.render('partials/booking/cancelBooking', content);
});

router.post('/find', async (req, res) => {
    const bookingId = req.body.bookingId;
    res.redirect('/booking/get/' + bookingId);
});

export default router;