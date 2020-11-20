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

export default class ContractMock implements IContract{
    async getCarrierInformation(iata: string): Promise<ICarrierDetail> {
       
        const carrierDetail: ICarrierDetail ={
        iata: "SAS140",
        name: 'SAS'
       }
       return new Promise((resolve, reject) => resolve(carrierDetail))
    }


    async getAirportInformation(iata: string): Promise<IAirportDetail> {
        const airportDetails: IAirportDetail ={
            iata: "CPH",
            name: "Copenhagen",
            timeZone: "GMT+1"
        }
        return new Promise((resolve, reject) => resolve(airportDetails))
    }


    async getFlightsAvailable(departure: IAirportIdentifier, arrival: IAirportIdentifier, depart: number): Promise<IFlightSummary[]> {
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

		const flightSummaries: IFlightSummary[] = [flight1, flight2, flight3, flight4];
		return new Promise((resolve, reject) => resolve(flightSummaries));
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
    
        const passenger1 : IFlightPassenger = {pnr:'ADJ123KBA',firstName:'Andreas',lastName:'Jorgelsen'};
        const passenger2 : IFlightPassenger = {pnr:'JVH223BLL',firstName:'Jonas',lastName:'Haintz'};
        const carrier: ICarrierDetail = { iata: '', name: '' };
        const departureAirport: IAirportIdentifier = { iata: 'Copenhagen' };
        const arrivalAirport: IAirportIdentifier = { iata: 'Oslo' };
        const passengers : IFlightPassenger[] = [passenger1,passenger2];
        const flightBooking1 : IFlightBookingDetail = {passengers,carrier,departureDate: 5,arrivalDate: 10,arrivalAirport,departureAirport,flightCode: 'bdc123'};
        const flightBooking2 : IFlightBookingDetail = {passengers,carrier,departureDate: 5,arrivalDate: 10,arrivalAirport,departureAirport,flightCode: 'bdc123'};
        const flightBookings : IFlightBookingDetail[] = [flightBooking1,flightBooking2];

        const bookingDetail: IBookingDetail = {
            flightBookings,
            id:"5347",
            frequentFlyerId : "8910",
            creditCardNumber : 1254452035,
            price: 5000,
        };
        return new Promise((resolve, reject) => resolve(bookingDetail));
   
    }
    async getBooking(id: IBookingIdentifier): Promise<IBookingDetail> {
        const passenger1 : IFlightPassenger = {pnr:'1234',firstName:'Jonas',lastName:'Hein'};
        const passenger2 : IFlightPassenger = {pnr:'2234',firstName:'Thomas',lastName:'Ebsen'};
        const carrier: ICarrierDetail = { iata: '', name: '' };
        const departureAirport: IAirportIdentifier = { iata: 'Gatwick' };
        const arrivalAirport: IAirportIdentifier = { iata: 'Heathrow ' };
        const passengers : IFlightPassenger[] = [passenger1,passenger2];        
        const flightBooking1 : IFlightBookingDetail = {passengers,carrier,departureDate: 5,arrivalDate: 10,arrivalAirport,departureAirport,flightCode: 'bdc123'};
        const flightBooking2 : IFlightBookingDetail = {passengers,carrier,departureDate: 5,arrivalDate: 10,arrivalAirport,departureAirport,flightCode: 'bdc123'};
        const flightBookings : IFlightBookingDetail[] = [flightBooking1,flightBooking2];

        const bookingDetail: IBookingDetail = {
            flightBookings,
            id:"1234",
            frequentFlyerId : "1234",
            creditCardNumber : 22334455,
            price: 5000,
        };
        return new Promise((resolve, reject) => resolve(bookingDetail));
    }

    async cancelBooking(id: IBookingIdentifier): Promise<void> {
        throw new Error('Method not implemented.');
    }


}