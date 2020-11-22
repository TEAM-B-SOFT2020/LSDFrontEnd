// libraries
import * as express from 'express';

import IAirportIdentifier from 'contract/src/IAirportIdentifier';
import IContract from 'contract';
import Contract from "../contract/ContractMock";

const contract: IContract = new Contract();

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
	const flights = await contract.getFlightsAvailable(arrivalAirport, departureAirport, 1);
	const numbers = flights.length;
	const content: object = { title: 'Hello from', flights, numbers};
	res.render('flights', content);
});

export default router;