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
        
            return new Promise((resolve, reject) => resolve(carrierDetail))
        }
        catch(error){
            return new Promise((resolve, reject) => reject());
        }
    }

    async getAirportInformation(iata: string): Promise<IAirportDetail> {
       try {
           const response: any = await rpc.getAirportInformation(iata).call();
           const airportDetail: IAirportDetail = response?.data;
           return new Promise((resolve, reject) => resolve(airportDetail));    
       }
       catch(error){
           return new Promise((resolve, reject) => reject());
       }
    }

    async getFlightsAvailable(departure: IAirportIdentifier, arrival: IAirportIdentifier, depart: number): Promise<IFlightSummary[]> {
        try {
            const response: any = await rpc.getFlightsAvailable(departure, arrival, depart).call();
            const flightSummeries: IFlightSummary[] = response?.data;
            return new Promise((resolve, reject) => resolve(flightSummeries));   
        }
        catch(error){
            return new Promise((resolve, reject) => reject());
        }
    }

    async reserveFlight(id: IFlightIdentifier, amountSeats: number): Promise<IReservationSummary> {
        try {
            const response: any = await rpc.reserveFlight(id, amountSeats).call();
            const reservationSummary: IReservationSummary = response?.data;
            return new Promise((resolve, reject) => resolve(reservationSummary));
		// ATT:: handle all errors...
		// if (response?.success) throw new NotFoundError('Carrier not found');
		// duck typing -> le Quack 🦆
        }
        catch(error){
            return new Promise((resolve, reject) => reject());
        }
    }

    async createBooking(reservationDetails: IReservationDetail[], creditCardNumber: number, frequentFlyerNumber?: number): Promise<IBookingDetail> {
        try{
            const response: any = await rpc.createBooking(reservationDetails,creditCardNumber,frequentFlyerNumber);
            const bookingDetail: IBookingDetail = response?.data;
            return new Promise((resolve, reject) => resolve(bookingDetail));
        }
        catch(error){
            return new Promise((resolve, reject) => reject());
        }
    }

    async getBooking(id: IBookingIdentifier): Promise<IBookingDetail> {
        try{
            const response: any = await rpc.getBooking(id);
            const bookingDetail: IBookingDetail = response?.data;
            return new Promise((resolve, reject) => resolve(bookingDetail));
        }
        catch(error){
            return new Promise((resolve, reject) => reject());
        }
    }

    async cancelBooking(id: IBookingIdentifier): Promise<void> {
        try{
            const response: any = await rpc.cancelBooking(id);
            return new Promise((resolve, reject) => resolve());
        }
        catch(error){
            return new Promise((resolve, reject) => reject());
        }
    }

}
