import { createClient } from '@node-rpc/client';
import { jsonSerializer as serializer } from '@node-rpc/client/dist/serializers/jsonSerializer';
import { axiosXHR as xhr } from '@node-rpc/client/dist/xhr/axios';
import dotenv from 'dotenv';

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

dotenv.config();

// RPC Configuration
const endpoint: string = process.env.RPC_HOST || 'Default string, throws error!';
const rpc = createClient<IContract>({ endpoint, serializer, xhr });


export default class ContractRPC implements IContract {

    async getCarrierInformation(iata: string): Promise<ICarrierDetail> {       
       
            const response: any = await rpc.getCarrierInformation(iata).call();
            // ATT:: handle all errors...
	        // if (response?.success) throw new NotFoundError('Carrier not found');
            // duck typing -> le Quack 🦆
            if(response?.type === 'success'){
                let carrierDetail= response?.data;
                logger.info("Got Carrier Information: " + carrierDetail);
                return carrierDetail;
            }
            else if(response?.type === 'fail'){
                logger.error("Get Carrier Information error: " + response?.error + 
                "--- User input was: " + iata);
                throw new Error(response?.code + ': ' + response?.error);                
            }
            else{
                throw new Error('Unknown error');
            }
    }

    async getAirportInformation(iata: string): Promise<IAirportDetail> {
   
        const response: any = await rpc.getAirportInformation(iata).call();
           if(response?.type === 'success'){   
            const airportDetail: IAirportDetail = response?.data;
            logger.info("Got Airport Information: " +  airportDetail);
            return airportDetail;
            }
            else if(response?.type === 'fail')
            {

            logger.error("Get airport information error: " + response?.error + "--- User input was: " + iata);
            throw new Error(response?.code + ': ' + response?.error);                
        }
        else{
            throw new Error('Unknown error');
        }
    }    

    async getFlightsAvailable(departure: IAirportIdentifier, arrival: IAirportIdentifier, depart: number): Promise<IFlightSummary[]> {
       
        const response: any = await rpc.getFlightsAvailable(departure, arrival, depart).call();           

        if(response?.type === 'success'){   
            const flightSummeries: IFlightSummary[] = response?.data;
            logger.info("Got available flights: " + flightSummeries);
            return flightSummeries;    
            }
            else if(response?.type === 'fail')
            {

            logger.error("Get flights available error: " + response?.error + 
            "--- User input was: " + departure + " -- " + arrival + " -- " + " -- " + depart);
            throw new Error(response?.code + ': ' + response?.error);                
        }
        else{
            throw new Error('Unknown error');
        }
    }

    async reserveFlight(id: IFlightIdentifier, amountSeats: number): Promise<IReservationSummary> {
              
        const response: any = await rpc.reserveFlight(id, amountSeats).call();
        if(response?.type === 'success'){   
         
            const reservationSummary: IReservationSummary = response?.data;
            logger.info("Reserved Flight: " + reservationSummary)
            return new Promise((resolve, reject) => resolve(reservationSummary)); 
            }
            else if(response?.type === 'fail')
            {
            logger.error("reserve flight error: " + response?.error + 
            "--- User input was: " + id + " -- " + amountSeats );
            throw new Error(response?.code + ': ' + response?.error);                
        }
        else{
            throw new Error('Unknown error');
        }
    
    }

    async createBooking(reservationDetails: IReservationDetail[], creditCardNumber: number): Promise<IBookingDetail> {
                
        const response: any = await rpc.createBooking(reservationDetails,creditCardNumber).call();
              
        if(response?.type === 'success'){   
         
            const bookingDetail: IBookingDetail = response?.data;
            logger.info("Created Booking: " + bookingDetail);
            return bookingDetail;
            }
            else if(response?.type === 'fail')
            {
            logger.error("Create booking error: " + response?.error + 
            "--- User input was: " + reservationDetails + " -- " + creditCardNumber);
            throw new Error(response?.code + ': ' + response?.error);                
        }
        else{
            throw new Error('Unknown error');
        }
    }

    async getBooking(passenger: IPassengerIdentifier): Promise<IBookingDetail> {
       
            const response: any = await rpc.getBooking(passenger);
        if(response?.type === 'success'){        
            const bookingDetail: IBookingDetail = response?.data;
            logger.info("Got Booking: " + bookingDetail)
            return bookingDetail;
            }
            else if(response?.type === 'fail')
            {
            logger.error("Get booking information error: " + response?.error + 
            "--- User input was: " + passenger);
            throw new Error(response?.code + ': ' + response?.error);                
        }
        else{
            throw new Error('Unknown error');
        }
    }

    async getBookingOnBookingId(id: IBookingIdentifier): Promise<IBookingDetail>{
       
            const response: any = await rpc.getBookingOnBookingId(id);
          
      

        if(response?.type === 'success'){        
            const bookingDetail: IBookingDetail = response?.data;
            logger.info("Got Booking: " + bookingDetail)
            return bookingDetail;
            }
            else if(response?.type === 'fail')
            {
            logger.error("Get booking information error: " + response?.error + 
            "--- User input was: " + id);
            throw new Error(response?.code + ': ' + response?.error);                
        }
        else{
            throw new Error('Unknown error');
        }
    }

    async cancelBooking(passenger: IPassengerIdentifier): Promise<void> {
        const response: any = await rpc.cancelBooking(passenger);       
    
        if(response?.type === 'success'){      
            logger.info("Cancelled booking: " + response)           
            }
            else if(response?.type === 'fail')
            {
            logger.error("Cancel Booking error: " + response?.error + 
            "--- User input was: " + passenger);
            throw new Error(response?.code + ': ' + response?.error);                
        }
        else{
            throw new Error('Unknown error');
        }
    }

}
