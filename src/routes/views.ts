// libraries
import * as express from 'express';
import ContractRPC from '../contract/ContractRPC';
//import * as contract from 'contract';



// classes, interfaces & functions
const router: express.Router = express.Router();


router.get('/', async (req, res) => {
		
	// stephan syntax:: just a complex way to make a simple list
	const content: object = { title: 'Hello TypeScript RPC'};
	res.render('index', content);
});

export default router;