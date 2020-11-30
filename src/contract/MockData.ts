import IContract from 'contract';
import IAirportDetail from 'contract/src/DTO/IAirportDetail';
import IBookingDetail from 'contract/src/DTO/IBookingDetail';
import ICarrierDetail from 'contract/src/DTO/ICarrierDetail';
import IFlightSummary from 'contract/src/DTO/IFlightSummary';
import IReservationSummary from 'contract/src/DTO/IReservationSummary';
import IAirportIdentifier from 'contract/src/IAirportIdentifier';
import IPassengerIdentifier from 'contract/src/IPassengerIdentifier';


var _BOOKINGLIST: IBookingDetail[] = [];
var _FLIGHTLIST: IFlightSummary[] = [];
var _RESERVATIONS : IReservationSummary[] = [];
var _CARRIERS : ICarrierDetail[] = [];
var _AIRPORTS : IAirportDetail[] = [];
var _PASSENGERS : IPassengerIdentifier[] = [];

//CARRIERS
const carrierDetail0: ICarrierDetail ={
    iata: "SAS140",
    name: 'SAS'
}

const carrierDetail1: ICarrierDetail ={
    iata: "NW139",
    name: 'Norwegian'
}
const carrierDetail2: ICarrierDetail ={
    iata: "SS150",
    name: 'Sunset'
}
_CARRIERS.push(carrierDetail0,carrierDetail1,carrierDetail2);

//Passangers
const passenger0: IPassengerIdentifier= {
    pnr: "SDRE36",
}
const passenger1: IPassengerIdentifier={
    pnr: "GJT45J",
}
const passenger2: IPassengerIdentifier={
    pnr: "G45H6J",
}
_PASSENGERS.push(passenger0,passenger1,passenger2);




//AIRPORTS
const airportDetails0: IAirportDetail ={
    iata: "*",
    name: "Search airport",
    timeZone: "GMT+1"
}

const airportDetails1: IAirportDetail ={
    iata: "lol",
    name: "lolland",
    timeZone: "GMT+1"}


const airportDetails2: IAirportDetail ={
    iata: "CPH",
    name: "Copenhagen",
    timeZone: "GMT+1"
}
_AIRPORTS.push(airportDetails0,airportDetails1, airportDetails2);

// FLIGHTLIST
function randomDateInFuturetToUnix() {
    var d = new Date();
    d.setDate(d.getDate() + Math.floor(Math.random() * 6) + 1  );
    var ddd = String(d.getDate()).padStart(2, '0');
    var mmm = String(d.getMonth() + 1).padStart(2, '0');
    var yyyyy = d.getFullYear();
    var todayFormatted2 = yyyyy + '-' + mmm + '-' + ddd;
    var todayUnix2 = Math.floor(new Date(todayFormatted2).getTime()/1000.0);
    return todayUnix2;
}
    const departureAirport: IAirportIdentifier = { iata: 'AA-123' };
    const arrivalAirport: IAirportIdentifier = { iata: 'BB-123' };

    const departureAirport2: IAirportIdentifier = { iata: 'CC-123' };
    const arrivalAirport2: IAirportIdentifier = { iata: 'DD-123' };

    const departureAirport3: IAirportIdentifier = { iata: 'EE-123' };
    const arrivalAirport3: IAirportIdentifier = { iata: 'FF-123' };     

    const carrier: ICarrierDetail = { iata: '1123', name: 'Carrier-1' };
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var todayFormatted = yyyy + '-' + mm + '-' + dd;
    var todayUnix = Math.floor(new Date(todayFormatted).getTime()/1000.0);

    const flight1: IFlightSummary = {
        departureAirport : departureAirport,
        arrivalAirport : arrivalAirport,
        carrier,
        departureDate: todayUnix,
        arrivalDate: randomDateInFuturetToUnix(),
        availableSeats: 100,
        seatPrice: 1500,
        flightCode: 'abc123',
    };
    
    
    const flight2: IFlightSummary = {
        departureAirport : departureAirport,
        arrivalAirport : arrivalAirport,
        carrier,
        departureDate: todayUnix,
        arrivalDate: randomDateInFuturetToUnix(),
        availableSeats: 100,
        seatPrice: 1500,
        flightCode: 'acq-123',
    };
    
    const flight3: IFlightSummary = {
        departureAirport : departureAirport2,
        arrivalAirport : arrivalAirport2,
        carrier,
        departureDate: todayUnix,
        arrivalDate: randomDateInFuturetToUnix(),
        availableSeats: 9,
        seatPrice: 500,
        flightCode: 'abc789',
    };
    
    
    const flight4: IFlightSummary = {
        departureAirport : departureAirport,
        arrivalAirport : arrivalAirport3,
        carrier,
        departureDate: todayUnix,
        arrivalDate: randomDateInFuturetToUnix(),
        availableSeats: 100,
        seatPrice: 2500,
        flightCode: 'bcd123',
    };

    if(_FLIGHTLIST.length == 0) {
        _FLIGHTLIST.push(flight1, flight2, flight3, flight4);   
    };


export const FLIGHTLIST = _FLIGHTLIST;
export const BOOKINGLIST = _BOOKINGLIST;
export const CARRIERS = _CARRIERS;
export const RESERVATIONS = _RESERVATIONS;
export const AIRPORTS = _AIRPORTS;
export const PASSENGERS = _PASSENGERS;