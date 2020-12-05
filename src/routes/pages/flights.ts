// libraries
import * as express from 'express';
import IAirportIdentifier from 'contract/src/IAirportIdentifier';
import IFlightSummary from 'contract/src/DTO/IFlightSummary';
import IContract from 'contract';
import Contract from "../../contract";

const router: express.Router = express.Router();
const contract: IContract = new Contract();

router.get('/', async (req, res) => {
	const departureAirport: IAirportIdentifier = { iata: '' };
	const arrivalAirport: IAirportIdentifier = { iata: '' };
	let flights;
    try {
		flights = await contract.getFlightsAvailable(arrivalAirport, departureAirport, 1);	
    } finally {
		const content: object = {flights};
		res.render('flights.ejs', content);
    }
});

export default router;