// libraries
import * as express from 'express';

import ContractMock from '../../contract/ContractMock';
import IAirportIdentifier from 'contract/src/IAirportIdentifier';


// classes, interfaces & functions
//import Contract from '../contract';
//import { IReservationSummary } from 'contract/src/dto/reservation';

//const contract = new Contract();

const router: express.Router = express.Router();

// middleware for json parsing
router.use(express.json());

// middleware for console logging... can be deleted :)
router.use((req, res, next) => {
	const { body } = req;
	console.log('Request body::', body);
	next();
});

// GET Method (Read)
router.get('/', async (req, res) => {
	res.send({ method: 'GET', message: 'Hello from flights!' });
});

// GET Method (Read)
router.get('/all', async (req, res) => {
	try {
        const departureAirport: IAirportIdentifier = { iata: '' };
        const arrivalAirport: IAirportIdentifier = { iata: '' };
        let mock = new ContractMock();
        let flights = await mock.getFlightsAvailable(arrivalAirport, departureAirport, 1);
        res.send({ method: 'GET', message: flights })
    } catch (error) {
        res.status(500);
        res.json(error);
    }
});

// POST Method (Create)
router.post('/', (req, res) => {
	const { body } = req;
	res.send({ method: 'POST', ...body });
});

// PUT Method (Update)
router.put('/', (req, res) => {
	const { body } = req;
	res.send({ method: 'PUT', ...body });
});

// DELETE Method (Remove)
router.delete('/', (req, res) => {
	const { body } = req;
	res.send({ method: 'DELETE', ...body });
});

export default router;