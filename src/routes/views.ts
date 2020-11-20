// libraries
import * as express from 'express';
import * as contract from 'contract';
import { moveCursor } from 'readline';

import ContractMock from '../contract/ContractMock';
let x = new ContractMock();

// classes, interfaces & functions
const router: express.Router = express.Router();


router.get('/', async (req, res) => {
	// stephan syntax:: just a complex way to make a simple list
    const items: string[] = [...Array(20)].map((_, index) => `List item ${index + 1}`);
	const carrierDetails =  x.getCarrierInformation('SAS140');
	console.log(carrierDetails)
	const content: object = { title: 'Hello TypeScript RPC', items, carrierDetails};
	res.render('index', content);
});


export default router;