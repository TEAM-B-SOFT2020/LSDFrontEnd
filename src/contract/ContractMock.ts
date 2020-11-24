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
import { lstat } from 'fs';
import { PassThrough } from 'stream';
import { ResolvedTypeReferenceDirective } from 'typescript';
import { uuid } from 'uuidv4';


const bookingList: IBookingDetail[] = [];
const flightList: IFlightSummary[] = [];

export default class ContractMock implements IContract{
    async getCarrierInformation(iata: string): Promise<ICarrierDetail> {       
        const carrierDetail: ICarrierDetail ={
        iata: "SAS140",
        name: 'SAS'
       }
       return new Promise((resolve, reject) => resolve(carrierDetail))
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
        let airportDetails = allairportDetails.find(airport => airport.iata === iata)
        return new Promise((resolve, reject) => resolve(airportDetails));

    }
    catch(error){
        return new Promise((resolve, reject) => reject());
    }
    }


    async getFlightsAvailable(departure: IAirportIdentifier, arrival: IAirportIdentifier, depart: number): Promise<IFlightSummary[]> {
        const departureAirport: IAirportIdentifier = { iata: 'AB-112' };
		const arrivalAirport: IAirportIdentifier = { iata: 'AC-053' };
		const carrier: ICarrierDetail = { iata: '1123', name: 'Carrier-1' };

		const flight1: IFlightSummary = {
			departureAirport,
			arrivalAirport,
			carrier,
			departureDate: 11,
			arrivalDate: 11,
			availableSeats: 100,
			seatPrice: 1500,
			flightCode: 'abc123',
        };
        
        
		const flight2: IFlightSummary = {
			departureAirport,
			arrivalAirport,
			carrier,
			departureDate: 11,
			arrivalDate: 11,
			availableSeats: 255,
			seatPrice: 1200,
			flightCode: 'abc346',
        };
        
        
		const flight3: IFlightSummary = {
			departureAirport,
			arrivalAirport,
			carrier,
			departureDate: 11,
			arrivalDate: 11,
			availableSeats: 9,
			seatPrice: 500,
			flightCode: 'abc789',
        };
        
        
		const flight4: IFlightSummary = {
			departureAirport,
			arrivalAirport,
			carrier,
			departureDate: 11,
			arrivalDate: 11,
			availableSeats: 100,
			seatPrice: 2500,
			flightCode: 'bcd123',
		};

		flightList.push(flight1, flight2, flight3, flight4);
		return new Promise((resolve, reject) => resolve(flightList));
    }
    async reserveFlight(id: IFlightIdentifier, amountSeats: number): Promise<IReservationSummary> {
        const flight: IFlightIdentifier = {flightCode:''};
        const reservationSummary: IReservationSummary= {
            id: '2',
            price: 500*amountSeats
        };

        return new Promise((resolve, reject) => resolve(reservationSummary));        
    }

    async createBooking(reservationDetails: IReservationDetail[], creditCardNumber: number, frequentFlyerNumber?: number): Promise<IBookingDetail> {  
        console.log("[CREATE BOOKING] : Info is being sent correctly, now we just have to handle it!")
        console.log("[CREATE BOOKING] : Creadit Card Number: " + creditCardNumber + "\tFrequent Flyer Number: " + frequentFlyerNumber)
        console.log("[CREATE BOOKING] : Reservation Details:")

        /*var flightBookings : IFlightBookingDetail[] = []        
        var flightPassengers : IFlightPassenger[] = [];


        var pass : IPassenger[];

        var func = reservationDetails.map(x => (
            x.passengers
        ));

        pass = func[0];
        console.log(pass)
        
        var ipas : IPassenger[] = [{firstName : "Thomas", lastName : "Ebsen"}, {firstName : "Jonas", lastName : "Hein"}];        
        flightPassengers = pass.map(x => (
            {pnr: "123", firstName: x.firstName, lastName: x.lastName}
        ));

        console.log(flightPassengers)

        


        const bookingDetail: IBookingDetail = {
            flightBookings,
            id:"1234",
            frequentFlyerId : "123AX4",
            creditCardNumber : 22334455,
            price: 5000,
        };


        //bookingList.push(reservationDetails)

        */

        return new Promise((resolve, reject) => resolve());      
    }
    async getBooking(id: IBookingIdentifier): Promise<IBookingDetail> {
        try {
            const passenger1 : IFlightPassenger = {pnr:'1234',firstName:'Jonas',lastName:'Hein'};
            const passenger2 : IFlightPassenger = {pnr:'2234',firstName:'Thomas',lastName:'Ebsen'};

            const passenger3 : IFlightPassenger = {pnr:'5678',firstName:'Andreas',lastName:'Jørgensen'};
            const passenger4 : IFlightPassenger = {pnr:'6786',firstName:'Peter',lastName:'Nielsen'};

            const carrier: ICarrierDetail = { iata: 'SAS-412', name: 'SAS' };
            const departureAirport: IAirportIdentifier = { iata: 'Gatwick' };
            const arrivalAirport: IAirportIdentifier = { iata: 'Heathrow' };
            const passengers : IFlightPassenger[] = [passenger1,passenger2, passenger3, passenger4];
            const flightBooking1 : IFlightBookingDetail = {passengers : passengers,carrier,departureDate: 5,arrivalDate: 10,arrivalAirport : arrivalAirport,departureAirport : departureAirport,flightCode: 'bdc123'};
            const flightBooking2 : IFlightBookingDetail = {passengers : passengers,carrier,departureDate: 5,arrivalDate: 10,arrivalAirport : arrivalAirport,departureAirport : departureAirport,flightCode: 'bdc123'};
            const flightBookings : IFlightBookingDetail[] = [flightBooking1,flightBooking2];

            const bookingDetail: IBookingDetail = {
                flightBookings,
                id:"1234",
                frequentFlyerId : "123AX4",
                creditCardNumber : 22334455,
                price: 5000,
            };

            
            const bookingDetail2: IBookingDetail = {
                flightBookings,
                id:"4567",
                frequentFlyerId : "673DV",
                creditCardNumber : 9994569,
                price: 4600,
            };


            bookingList.push(bookingDetail, bookingDetail2);
            let availableBooking = bookingList.find(booking => booking.id === id.id)
            return new Promise((resolve, reject) => resolve(availableBooking));
        } catch (error) {
            return new Promise((resolve, reject) => reject());
        }
    }

    async cancelBooking(id: IBookingIdentifier): Promise<void> {
        try {
            console.log(bookingList);
            var index = bookingList.findIndex(function(x) {
                return x.id === id.id;
            })
            if(index !== -1) {
                bookingList.splice(index, 1);
            }
            console.log("ssssssssss")
            console.log(bookingList);

            return new Promise((resolve, reject) => resolve());
        } catch (error) {
            return new Promise((resolve, reject) => reject());
        }
    }
}