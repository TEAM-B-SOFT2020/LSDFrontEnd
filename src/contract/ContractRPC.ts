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
    const response: any = await rpc.getCarrierInformation(iata).call();
    	// ATT:: handle all errors...
		// if (response?.success) throw new NotFoundError('Carrier not found');

		// duck typing -> le Quack 🦆
		const carrierDetail: ICarrierDetail = response?.data;
		return carrierDetail;

    }
    async getAirportInformation(iata: string): Promise<IAirportDetail> {
       const response: any = await rpc.getAirportInformation(iata).call();
       
       const airportDetail: IAirportDetail = response?.data;
       return airportDetail;       
    }
    async getFlightsAvailable(departure: IAirportIdentifier, arrival: IAirportIdentifier, depart: number): Promise<IFlightSummary[]> {
        const response: any = await rpc.getFlightsAvailable(departure, arrival, depart).call();
       
       const flightSummeries: IFlightSummary[] = response?.data;
       return flightSummeries;    
    }
    async reserveFlight(id: IFlightIdentifier, amountSeats: number): Promise<IReservationSummary> {
        const response: any = await rpc.reserveFlight(id, amountSeats).call();

		// ATT:: handle all errors...
		// if (response?.success) throw new NotFoundError('Carrier not found');

		// duck typing -> le Quack 🦆
		const reservationSummary: IReservationSummary = response?.data;
		return reservationSummary;
    }
    async createBooking(reservationDetails: IReservationDetail[], creditCardNumber: number, frequentFlyerNumber?: number): Promise<IBookingDetail> {
        throw new Error('Method not implemented.');
    }
    async getBooking(id: IBookingIdentifier): Promise<IBookingDetail> {
        throw new Error('Method not implemented.');
    }
    async cancelBooking(id: IBookingIdentifier): Promise<void> {
        throw new Error('Method not implemented.');
    }

}
