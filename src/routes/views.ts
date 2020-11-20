// libraries
import * as express from 'express';
import * as contract from 'contract';
import { moveCursor } from 'readline';
import ContractMock from '../contract/ContractMock';
import IAirportIdentifier from 'contract/src/IAirportIdentifier';

// classes, interfaces & functions
const router: express.Router = express.Router();


router.get('/', async (req, res) => {
	// stephan syntax:: just a complex way to make a simple list
	const content: object = { title: 'Hello TypeScript RPC'};
	res.render('index', content);
});

export default router;