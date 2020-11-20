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

export default class ContractMock implements IContract{
    getCarrierInformation(iata: string): Promise<ICarrierDetail> {
        throw new Error('Method not implemented.');
    }
    getAirportInformation(iata: string): Promise<IAirportDetail> {
        throw new Error('Method not implemented.');
    }
    async getFlightsAvailable(departure: IAirportIdentifier, arrival: IAirportIdentifier, depart: number): Promise<IFlightSummary[]> {
        const departureAirport: IAirportIdentifier = { iata: '' };
		const arrivalAirport: IAirportIdentifier = { iata: '' };
		const carrier: ICarrierDetail = { iata: '', name: '' };

		const flightSummary: IFlightSummary = {
			departureAirport,
			arrivalAirport,
			carrier,
			departureDate: 5,
			arrivalDate: 10,
			availableSeats: 9,
			seatPrice: 500,
			flightCode: 'abc123',
		};

		const flightSummaries: IFlightSummary[] = [flightSummary];
		return new Promise((resolve, reject) => resolve(flightSummaries));
    }
    reserveFlight(id: IFlightIdentifier, amountSeats: number): Promise<IReservationSummary> {
        throw new Error('Method not implemented.');
    }
    createBooking(reservationDetails: IReservationDetail[], creditCardNumber: number, frequentFlyerNumber?: number): Promise<IBookingDetail> {
        throw new Error('Method not implemented.');
    }
    getBooking(id: IBookingIdentifier): Promise<IBookingDetail> {
        throw new Error('Method not implemented.');
    }
    cancelBooking(id: IBookingIdentifier): Promise<void> {
        throw new Error('Method not implemented.');
    }


}