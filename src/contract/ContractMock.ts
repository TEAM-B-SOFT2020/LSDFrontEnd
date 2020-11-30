import { rejects } from 'assert';
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
import IPassengerIdentifier from 'contract/src/IPassengerIdentifier';
import { uuid } from 'uuidv4';
import logger from '../logger';

import {AIRPORTS, BOOKINGLIST, CARRIERS, FLIGHTLIST, PASSENGERS, RESERVATIONS} from './MockData';

const _BOOKINGLIST: IBookingDetail[] = BOOKINGLIST;
const _FLIGHTLIST: IFlightSummary[] = FLIGHTLIST;
const _RESERVATIONS : IReservationSummary[] = RESERVATIONS;
const _CARRIERS :ICarrierDetail[] = CARRIERS;
const _AIRPORTS : IAirportDetail[] = AIRPORTS;
const _PASSENGERS : IPassengerIdentifier[] = PASSENGERS;

export default class ContractMock implements IContract{
    async getCarrierInformation(iata: string): Promise<ICarrierDetail> {       
        try {             
            let carrierDetail = _CARRIERS.find(carrier => carrier.iata.toLocaleLowerCase() === iata.toLocaleLowerCase())
            if(!carrierDetail){
                throw new Error('Carrier not found')
            }
            return new Promise((resolve) => resolve(carrierDetail))
            
        } catch(error){
            logger.error(error.message);
            return new Promise((reject) => reject(error.message));
        } 
        
    }

    async getAirportInformation(iata: string): Promise<IAirportDetail> {
        try {
            let airportDetails = _AIRPORTS.find(airport => airport.iata.toUpperCase() === iata.toUpperCase())
            if(!airportDetails) {
                throw new Error("Error");
            }
            return new Promise((resolve, reject) => resolve(airportDetails));
        } catch(error) {
            logger.error(error);
            return new Promise((resolve, reject) => reject());
        }
    }


    async getFlightsAvailable(departure: IAirportIdentifier, arrival: IAirportIdentifier, depart: number): Promise<IFlightSummary[]> {
        try {
            let availableFlightList = _FLIGHTLIST.filter(airport => airport.departureAirport.iata == departure.iata && airport.arrivalAirport.iata == arrival.iata && airport.departureDate == Math.floor(new Date(depart).getTime()/1000.0));
            console.log(availableFlightList)
            console.log(availableFlightList)
            return new Promise((resolve, reject) => resolve(availableFlightList));
        } catch (error) {
            logger.error(error);
            return new Promise((resolve, reject) => reject()); 
        }
    }
    async reserveFlight(id: IFlightIdentifier, amountSeats: number): Promise<IReservationSummary> {
        try {
            const reservationSummary: IReservationSummary= {
                id: uuid(),
                price: amountSeats
            };
            _RESERVATIONS.push(reservationSummary);
            return new Promise((resolve, reject) => resolve(reservationSummary));      
        } catch (error) {
            logger.error("Get Flights Available", error);
            return new Promise((resolve, reject) => reject()); 
        }  
    }

    async createBooking(reservationDetails: IReservationDetail[], creditCardNumber: number, frequentFlyerNumber?: string): Promise<IBookingDetail> {  
        try {
            var flightBookings : IFlightBookingDetail[] = []        
            var flightPassengers : IFlightPassenger[] = [];


            var passList : IPassenger[] = [];
            reservationDetails.map(x => {
                passList = Object.assign(passList, x.passengers)
            })
            

            flightPassengers = Object.assign(flightPassengers, passList);
            flightPassengers.forEach(x => {
            let pnr : string[] = uuid().split("-");
            x.pnr = pnr[0];
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
            logger.info("Create Booking", _BOOKINGLIST);
            return new Promise((resolve, reject) => resolve(bookingDetail)); 
        } catch (error) {
            logger.error("Create Booking", error);
            return new Promise((resolve, reject) => reject());  
        }
    }
    async getBookingOnBookingId(id: IBookingIdentifier): Promise<IBookingDetail>{
        try{
        let availableBooking = _BOOKINGLIST.find(booking => booking.id === id.id)
        logger.info("Created Booking", _BOOKINGLIST);
        return new Promise((resolve, reject) => resolve(availableBooking));
        }
        catch(error){
            logger.info("Get Booking", error);
            return new Promise((resolve, reject) => reject());
        }
    }

    async getBooking(passenger: IPassengerIdentifier): Promise<IBookingDetail> {
        /*
        try {
            let availableBooking = _BOOKINGLIST.find(booking => booking.id === passengers.pnr)
            logger.info("Created Booking", _BOOKINGLIST);
            return new Promise((resolve, reject) => resolve(availableBooking));
        } catch (error) {
            logger.info("Get Booking", error);
            return new Promise((resolve, reject) => reject());
        }*/

        try {
            let availableBooking = _BOOKINGLIST.find(booking => booking.flightBookings.find(flightBook => flightBook.passengers.find(passengers => passenger.pnr === passengers.pnr)))
            logger.info("Created Booking", _BOOKINGLIST);
            return new Promise((resolve, reject) => resolve(availableBooking));
        }         
        catch(error){
            logger.info("Get Booking", error);
            return new Promise((resolve, reject) => reject());
        }
        
    }

    async cancelBooking(passenger: IPassengerIdentifier): Promise<void> {
        /*const bookingTemp = this.getBooking(passenger);
        
        try {
            var index = _BOOKINGLIST.findIndex(function(x) {
                let availableBooking = _BOOKINGLIST.find(booking => booking.id === bookingTemp )
                var index2 = x.flightBookings.findIndex(function(y) {
                })
            });

            if(index !== -1) {
                _BOOKINGLIST.splice(index, 1);
                logger.info("Cancel Booking", _BOOKINGLIST);
                return new Promise((resolve, reject) => resolve());
            }
        } catch (error) {
            logger.info("Cancel Booking", error);
            return new Promise((resolve, reject) => reject());
        }*/
        return new Promise((resolve,reject) => resolve());


        


    }
}