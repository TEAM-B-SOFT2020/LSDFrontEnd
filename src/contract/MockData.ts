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
const cd1: ICarrierDetail ={iata: "SK", name: 'Scandinavian Airlines'}
const cd2: ICarrierDetail ={iata: "FR", name: 'Ryanair'}
const cd3: ICarrierDetail ={iata: "AS", name: 'Alaska Airlines'}
const cd4: ICarrierDetail ={iata: "AA", name: 'American Airlines'}
const cd5: ICarrierDetail ={iata: "DA", name: 'Delta Airlines'}
const cd6: ICarrierDetail ={iata: "HA", name: 'Hawaii Airlines'}
const cd7: ICarrierDetail ={iata: "WN", name: 'Southwest Airlines'}
const cd8: ICarrierDetail ={iata: "NK", name: 'Spirit Airlines'}
const cd9: ICarrierDetail ={iata: "UA", name: 'United Airlines'}
const cd10: ICarrierDetail ={iata: "FX", name: 'FedEx Express'}


_CARRIERS.push(cd1,cd2,cd3,cd4,cd5,cd6,cd7,cd8,cd9,cd10);

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
const ad1: IAirportDetail ={iata: "*", name: "Search airport", timeZone: "GMT+1"}
const ad2: IAirportDetail ={iata: "CPH", name: "Copenhagen Airport", timeZone: "Europe/Copenhagen"}
const ad3: IAirportDetail ={iata: "AAL", name: "Aalborg Airport", timeZone: "Europe/Copenhagen"}
const ad4: IAirportDetail ={iata: "LHR", name: "London Heathrow Airport", timeZone: "Europe/London"}
const ad5: IAirportDetail ={iata: "AAR", name: "Aarhus Airport", timeZone: "Europe/Copenhagen"}
const ad6: IAirportDetail ={iata: "BIL", name: "Billund Airpirt", timeZone: "Europe/Copenhagen"}
const ad7: IAirportDetail ={iata: "RNN", name: "Bornholm Airpirt", timeZone: "Europe/Copenhagen"}
const ad8: IAirportDetail ={iata: "RKE", name: "Roskilde Airpirt", timeZone: "Europe/Copenhagen"}
const ad9: IAirportDetail ={iata: "EBJ", name: "Esbjerg Airpirt", timeZone: "Europe/Copenhagen"}
const ad10: IAirportDetail ={iata: "KRP", name: "Karup Airpirt", timeZone: "Europe/Copenhagen"}
const ad11: IAirportDetail ={iata: "BYR", name: "Læsø Airpirt", timeZone: "Europe/Copenhagen"}
_AIRPORTS.push(ad1,ad2,ad3,ad4,ad5,ad6,ad7,ad8,ad9,ad10,ad11);

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

    const carrier: ICarrierDetail = { iata: '1123', name: 'Carrier-1' };
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var todayFormatted = yyyy + '-' + mm + '-' + dd;
    var todayUnix = Math.floor(new Date(todayFormatted).getTime()/1000.0);

    const flight1: IFlightSummary = {
        departureAirport : ad2,
        arrivalAirport : ad3,
        carrier,
        departureDate: todayUnix,
        arrivalDate: randomDateInFuturetToUnix(),
        availableSeats: 100,
        seatPrice: 1500,
        flightCode: 'abc123',
    };
    
    
    const flight2: IFlightSummary = {
        departureAirport : ad2,
        arrivalAirport : ad3,
        carrier,
        departureDate: todayUnix,
        arrivalDate: randomDateInFuturetToUnix(),
        availableSeats: 100,
        seatPrice: 1500,
        flightCode: 'acq-123',
    };
    
    const flight3: IFlightSummary = {
        departureAirport : ad2,
        arrivalAirport : ad3,
        carrier,
        departureDate: todayUnix,
        arrivalDate: randomDateInFuturetToUnix(),
        availableSeats: 9,
        seatPrice: 500,
        flightCode: 'abc789',
    };
    
    
    const flight4: IFlightSummary = {
        departureAirport : ad2,
        arrivalAirport : ad3,
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