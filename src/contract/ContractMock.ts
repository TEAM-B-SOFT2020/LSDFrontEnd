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

class ContractMock implements IContract{
    getCarrierInformation(iata: string): Promise<ICarrierDetail> {
        throw new Error('Method not implemented.');
    }
    getAirportInformation(iata: string): Promise<IAirportDetail> {
        throw new Error('Method not implemented.');
    }
    public async getFlightsAvailable(departure: IAirportIdentifier, arrival: IAirportIdentifier, depart: number): Promise<IFlightSummary[]> {
        const departureAirport: IAirportIdentifier = { iata: '' };
		const arrivalAirport: IAirportIdentifier = { iata: '' };
		const carrier: ICarrierDetail = { iata: '', name: '' };

		const flight1: IFlightSummary = {
			departureAirport,
			arrivalAirport,
			carrier,
			departureDate: 7,
			arrivalDate: 12,
			availableSeats: 100,
			seatPrice: 1500,
			flightCode: 'abc123',
        };
        
        
		const flight2: IFlightSummary = {
			departureAirport,
			arrivalAirport,
			carrier,
			departureDate: 1,
			arrivalDate: 6,
			availableSeats: 255,
			seatPrice: 1200,
			flightCode: 'abc346',
        };
        
        
		const flight3: IFlightSummary = {
			departureAirport,
			arrivalAirport,
			carrier,
			departureDate: 5,
			arrivalDate: 10,
			availableSeats: 9,
			seatPrice: 500,
			flightCode: 'abc789',
        };
        
        
		const flight4: IFlightSummary = {
			departureAirport,
			arrivalAirport,
			carrier,
			departureDate: 1,
			arrivalDate: 15,
			availableSeats: 100,
			seatPrice: 2500,
			flightCode: 'bcd123',
		};

		const _flightSummaries: IFlightSummary[] = [flight1, flight2, flight3, flight4];
		return new Promise((resolve, reject) => {
			setTimeout(() => {
                resolve(_flightSummaries);
            }, 5000);
		});
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

export default ContractMock; 