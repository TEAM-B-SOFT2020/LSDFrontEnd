import { createClient } from '@node-rpc/client';
import { jsonSerializer as serializer } from '@node-rpc/client/dist/serializers/jsonSerializer';
import { axiosXHR as xhr } from '@node-rpc/client/dist/xhr/axios';

// classes, interfaces & functions
import IContract from 'contract';
import IAirportDetail from 'contract/src/DTO/IAirportDetail';
import IBookingDetail from 'contract/src/DTO/IBookingDetail';
import ICarrierDetail from 'contract/src/DTO/ICarrierDetail';
import IFlightSummary from 'contract/src/DTO/IFlightSummary';
import IReservationDetail from 'contract/src/DTO/IReservationDetail';
import IReservationSummary from 'contract/src/DTO/IReservationSummary';
import IAirportIdentifier from 'contract/src/IAirportIdentifier';
import IBookingIdentifier from 'contract/src/IBookingIdentifier';
import IFlightIdentifier from 'contract/src/IFlightIdentifier';
import IPassengerIdentifier from 'contract/src/IPassengerIdentifier';

import logger from '../logger';



// RPC Configuration
const endpoint: string = process.env.RPC_HOST || 'Default string, throws error!';
const rpc = createClient<IContract>({ endpoint, serializer, xhr });


export default class ContractRPC implements IContract {

    async getCarrierInformation(iata: string): Promise<ICarrierDetail> {
        try {
            const response: any = await rpc.getCarrierInformation(iata).call();
            // ATT:: handle all errors...
	        // if (response?.success) throw new NotFoundError('Carrier not found');

		    // duck typing -> le Quack 🦆
            const carrierDetail: ICarrierDetail = response?.data;
            logger.info("Got Carrier Information", carrierDetail);
            return new Promise((resolve, reject) => resolve(carrierDetail))
        }
        catch(error){
            logger.error("Get Carrier Information", error);
            return new Promise((resolve, reject) => reject());
        }
    }

    async getAirportInformation(iata: string): Promise<IAirportDetail> {
       try {
           const response: any = await rpc.getAirportInformation(iata).call();
           const airportDetail: IAirportDetail = response?.data;
           logger.info("Got Airport Information", airportDetail);
           return new Promise((resolve, reject) => resolve(airportDetail));    
       }
       catch(error){
            logger.error("Get Airport Information", error);
           return new Promise((resolve, reject) => reject());
       }
    }

    async getFlightsAvailable(departure: IAirportIdentifier, arrival: IAirportIdentifier, depart: number): Promise<IFlightSummary[]> {
        try {
            const response: any = await rpc.getFlightsAvailable(departure, arrival, depart).call();
            const flightSummeries: IFlightSummary[] = response?.data;
            logger.info("Got available flights", flightSummeries);
            return new Promise((resolve, reject) => resolve(flightSummeries));
        }
        catch(error){
            logger.error("Get Flights Availabie", error);
            return new Promise((resolve, reject) => reject());
        }
    }

    async reserveFlight(id: IFlightIdentifier, amountSeats: number): Promise<IReservationSummary> {
        try {
            const response: any = await rpc.reserveFlight(id, amountSeats).call();
            const reservationSummary: IReservationSummary = response?.data;
            logger.info("Reserved Flight", reservationSummary)
            return new Promise((resolve, reject) => resolve(reservationSummary));
		// ATT:: handle all errors...
		// if (response?.success) throw new NotFoundError('Carrier not found');
		// duck typing -> le Quack 🦆
        }
        catch(error){
            logger.error("Reserve Flight", error);
            return new Promise((resolve, reject) => reject());
        }
    }

    async createBooking(reservationDetails: IReservationDetail[], creditCardNumber: number): Promise<IBookingDetail> {
        try{
            const response: any = await rpc.createBooking(reservationDetails,creditCardNumber);
            const bookingDetail: IBookingDetail = response?.data;
            logger.info("Created Booking", bookingDetail);
            return new Promise((resolve, reject) => resolve(bookingDetail));
        }
        catch(error){
            logger.error("Create Booking", error);
            return new Promise((resolve, reject) => reject());
        }
    }

    async getBooking(passenger: IPassengerIdentifier): Promise<IBookingDetail> {
        try{
            const response: any = await rpc.getBooking(passenger);
            const bookingDetail: IBookingDetail = response?.data;
            logger.info("Got Booking", bookingDetail)
            return new Promise((resolve, reject) => resolve(bookingDetail));
        }
        catch(error){
            logger.error("Get Booking", error);
            return new Promise((resolve, reject) => reject());
        }
    }

    async getBookingOnBookingId(id: IBookingIdentifier): Promise<IBookingDetail>{
        try{
            const response: any = await rpc.getBookingOnBookingId(id);
            const bookingDetail: IBookingDetail = response?.data;
            logger.info("Got Booking", bookingDetail)
            return new Promise((resolve, reject) => resolve(bookingDetail));
        }
        catch(error){
            logger.error("Get Booking", error);
            return new Promise((resolve, reject) => reject());
        }
    }

    async cancelBooking(passenger: IPassengerIdentifier): Promise<void> {
        try{
            const response: any = await rpc.cancelBooking(passenger);
            logger.info("Cancelled Booking", response)
            return new Promise((resolve, reject) => resolve());
        }
        catch(error){
            logger.error("Cancel Booking Error", error);
            return new Promise((resolve, reject) => reject());
        }
    }

}
