// libraries
import * as express from 'express';
import IContract from 'contract';
import Contract from "../../contract";
import IBookingIdentifier from 'contract/src/IBookingIdentifier';
import IReservationDetail from 'contract/src/DTO/IReservationDetail';
import IPassenger from 'contract/src/IPassenger';
import IAirportIdentifier from 'contract/src/IAirportIdentifier';
import IFlightIdentifier from 'contract/src/IFlightIdentifier';
import IPassengerIdentifier from 'contract/src/IPassengerIdentifier';
import IBookingDetail from 'contract/src/DTO/IBookingDetail';

// classes, interfaces & functions
const router: express.Router = express.Router();
//const mock = new ContractMock();

const contract: IContract = new Contract();

router.get('/', async (req, res) => {
	res.render('booking');
});


router.get('/get/:pnr', async (req, res) => {
    let booking: IBookingDetail;
    try {
        const pnr: string = req.params.pnr;
        let passengerIdentifier: IPassengerIdentifier = { pnr: pnr };
        booking = await contract.getBooking(passengerIdentifier);
        console.log(booking)
        const content: object = {booking};
        res.render('partials/booking/getBooking', content);
    } catch {
        res.render("partials/error");
    }
});

router.post('/flight', async (req, res) => {
    let da : string = req.body.departureAirport.toUpperCase();
    let aa : string = req.body.arrivalAirport.toUpperCase();
    let travelerCount : number = req.body.travelerCount;
    let availableFlights;
    try {
        const departureAirport : IAirportIdentifier = {iata: da}
        const arrivalAirport : IAirportIdentifier = {iata: aa}
        const departureDate : number  = req.body.departureDate;
        availableFlights = await contract.getFlightsAvailable(departureAirport, arrivalAirport, departureDate);
        const content: object = {availableFlights, travelerCount};
        res.render('partials/booking/chooseFlight', content);
    } catch {
        res.render("partials/error");
    }
});


router.post('/reserve', async (req, res) => {
    let reservation;
    let travelerCount : number = JSON.parse(req.body.travelerCount);
    try {
        let selectedFlight = JSON.parse(req.body.flight);
        const flightCode: string = selectedFlight.flightCode;
        const flightIdentifier: IFlightIdentifier = { flightCode };
        reservation = await contract.reserveFlight(flightIdentifier, travelerCount);

        const content: object = {reservation, travelerCount};
        res.render('partials/booking/createBooking', content);
    } catch {
        res.render("partials/error")
    }
});

router.post('/create', async (req, res) => {
    let booking;
    try {
        let creditCardNumber = req.body.creditCardNumber;
        let ffNumber = req.body.ffNumber;    
        let passengers : IPassenger[] = Object.assign(req.body.passenger);

        let reservationDetail : IReservationDetail = {
            id: req.body.reservationId,
            passengers: passengers
        };

        let reservationDetailList : IReservationDetail[] = [reservationDetail];
        booking = await contract.createBooking(reservationDetailList, creditCardNumber, ffNumber);
        res.redirect("/booking/get/" + booking.flightBookings[0].passengers[0].pnr);
        //res.redirect("/booking/get/" + booking.id);
    } catch {
        res.render("partials/error");
    }
});


router.post('/cancel', async (req, res) => {
    // stephan syntax:: just a complex way to make a simple list    
    //Makes a mock of the ContractMock called mock
    let bookingId: IPassengerIdentifier = { pnr: req.body.bookingId };
    await contract.cancelBooking(bookingId);
    const content: object = {message: "Booking [" + bookingId.pnr + "] has been cancelled"};
    res.render('partials/booking/cancelBooking', content);
});

router.post('/find', async (req, res) => {
    const bookingId = req.body.bookingId;
    res.redirect('/booking/get/' + bookingId);
});

export default router;