// libraries
import * as express from 'express';

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
	res.send({ method: 'GET', message: 'Hello TypeScript RPC' });
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