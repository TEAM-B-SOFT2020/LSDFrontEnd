// libraries
import * as express from 'express';
import ContractMock from '../../contract/ContractMock';
import IAirportIdentifier from 'contract/src/IAirportIdentifier';
import IFlightSummary from 'contract/src/DTO/IFlightSummary';
import IFlight from 'contract/src/IFlight';

const router: express.Router = express.Router();

/*
router.get('/', async (req, res) => {
	// stephan syntax:: just a complex way to make a simple list
    const items: string[] = [...Array(20)].map((_, index) => `List item ${index + 1}`);
    const numbers: number = 1
	const content: object = { title: 'Hello TypeScript RPC', items, numbers};
	res.render('index', content);
});
*/


router.get('/', async (req, res) => {
	const departureAirport: IAirportIdentifier = { iata: '' };
	const arrivalAirport: IAirportIdentifier = { iata: '' };

	const mock = new ContractMock();
	const flights : IFlightSummary[] = await mock.getFlightsAvailable(arrivalAirport, departureAirport, 1);	
	const content: object = { title: 'Hello from Flights!', flights, numbers : flights.length};
	res.render('flights.ejs', content);
});

export default router;