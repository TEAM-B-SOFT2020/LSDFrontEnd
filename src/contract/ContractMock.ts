import { Console } from 'console';
import IContract from 'contract';
import IAirportDetail from 'contract/src/DTO/IAirportDetail';
import IBookingDetail from 'contract/src/DTO/IBookingDetail';
import ICarrierDetail from 'contract/src/DTO/ICarrierDetail';
import IFlightBookingDetail from 'contract/src/DTO/IFlightBookingDetail';
import IFlightPassenger from 'contract/src/DTO/IFlightPassenger';
import IFlightSummary from 'contract/src/DTO/IFlightSummary';
import IReservationDetail from 'contract/src/DTO/IReservationDetail';
import IReservationSummary from 'contract/src/DTO/IReservationSummary';
import IAirportIdentifier from 'contract/src/IAirportIdentifier';
import IBookingIdentifier from 'contract/src/IBookingIdentifier';
import IFlightIdentifier from 'contract/src/IFlightIdentifier';
import IPassenger from 'contract/src/IPassenger';
import { uuid } from 'uuidv4';


const _BOOKINGLIST: IBookingDetail[] = [];
const _FLIGHTLIST: IFlightSummary[] = [];
const _RESERVATIONS : IReservationSummary[] = [];

export default class ContractMock implements IContract{
        async getCarrierInformation(iata: string): Promise<ICarrierDetail> {       
            try {
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

       const allcarrierDetail: ICarrierDetail[] = [carrierDetail0,carrierDetail1,carrierDetail2];
       let carrierDetail = allcarrierDetail.find(carrier => carrier.iata.toLocaleLowerCase() === iata.toLocaleLowerCase())

       return new Promise((resolve, reject) => resolve(carrierDetail))
    }
    catch(error){
        return new Promise((resolve, reject) => reject());
    }
    }

    async getAirportInformation(iata: string): Promise<IAirportDetail> {
        try {
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
            const allairportDetails: IAirportDetail[] = [airportDetails0,airportDetails1, airportDetails2];
            let airportDetails = allairportDetails.find(airport => airport.iata.toLowerCase() === iata.toLowerCase())
            return new Promise((resolve, reject) => resolve(airportDetails));

    }
    catch(error){
        return new Promise((resolve, reject) => reject());
    }
    }


    async getFlightsAvailable(departure: IAirportIdentifier, arrival: IAirportIdentifier, depart: number): Promise<IFlightSummary[]> {
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
        var departDateUnix = new Date(depart).getTime() / 1000


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
        
        const flight5: IFlightSummary = {
			departureAirport : departureAirport3,
			arrivalAirport : arrivalAirport2,
			carrier,
			departureDate: todayUnix,
			arrivalDate: randomDateInFuturetToUnix(),
			availableSeats: 100,
			seatPrice: 2500,
			flightCode: 'bcd123',
        };
        
        if(_FLIGHTLIST.length == 0) {
            _FLIGHTLIST.push(flight1, flight2, flight3, flight4);   
        }

        let availableFlightList = _FLIGHTLIST.filter(airport => airport.departureAirport.iata == departure.iata && airport.arrivalAirport.iata == arrival.iata && airport.departureDate == departDateUnix);
		return new Promise((resolve, reject) => resolve(availableFlightList));
    }
    async reserveFlight(id: IFlightIdentifier, amountSeats: number): Promise<IReservationSummary> {
        const reservationSummary: IReservationSummary= {
            id: uuid(),
            price: amountSeats
        };
        _RESERVATIONS.push(reservationSummary);
        return new Promise((resolve, reject) => resolve(reservationSummary));        
    }

    async createBooking(reservationDetails: IReservationDetail[], creditCardNumber: number, frequentFlyerNumber?: number): Promise<IBookingDetail> {  
        console.log("[CREATE BOOKING] : Info is being sent correctly, now we just have to handle it!")
        console.log("[CREATE BOOKING] : Creadit Card Number: " + creditCardNumber + "\tFrequent Flyer Number: " + frequentFlyerNumber)
        console.log("[CREATE BOOKING] : Reservation Details:");


        var flightBookings : IFlightBookingDetail[] = []        
        var flightPassengers : IFlightPassenger[] = [];


        var passList : IPassenger[] = [];
        reservationDetails.map(x => {
            passList = Object.assign(passList, x.passengers)
        })
        

       flightPassengers = Object.assign(flightPassengers, passList);
       flightPassengers.forEach(x => {
           x.pnr = uuid()
       });
       
       //Hardcoded Carrier
       const carrier: ICarrierDetail = { iata: 'SAS-412', name: 'SAS' };
       const departureAirport: IAirportIdentifier = { iata: 'Gatwick' };
       const arrivalAirport: IAirportIdentifier = { iata: 'Heathrow' };
       const flightBooking1 : IFlightBookingDetail = {passengers : flightPassengers,carrier,departureDate: 5,arrivalDate: 10,arrivalAirport : arrivalAirport,departureAirport : departureAirport,flightCode: 'bdc123'};
       
       flightBookings.push(flightBooking1);
        
        const bookingDetail: IBookingDetail = {
            flightBookings,
            id: uuid(),
            frequentFlyerId : "123AX4",
            creditCardNumber : 22334455,
            price: 5000,
        };     
        _BOOKINGLIST.push(bookingDetail);
        return new Promise((resolve, reject) => resolve(bookingDetail));      
    }
    async getBooking(id: IBookingIdentifier): Promise<IBookingDetail> {
        try {
            let availableBooking = _BOOKINGLIST.find(booking => booking.id === id.id)
            return new Promise((resolve, reject) => resolve(availableBooking));
        } catch (error) {
            return new Promise((resolve, reject) => reject());
        }
    }

    async cancelBooking(id: IBookingIdentifier): Promise<void> {
        try {
            var index = _BOOKINGLIST.findIndex(function(x) {
                return x.id === id.id;
            })
            if(index !== -1) {
                _BOOKINGLIST.splice(index, 1);
            }
            return new Promise((resolve, reject) => resolve());
        } catch (error) {
            return new Promise((resolve, reject) => reject());
        }
    }
}