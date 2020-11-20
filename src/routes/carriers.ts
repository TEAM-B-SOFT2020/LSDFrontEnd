// libraries
import * as express from 'express';
import * as contract from 'contract';
import { moveCursor } from 'readline';
import ContractMock from '../contract/ContractMock';
import IAirportIdentifier from 'contract/src/IAirportIdentifier';
import ContractRPC from '../contract/ContractRPC';





// classes, interfaces & functions
const router: express.Router = express.Router();


router.get('/', async (req, res) => {
    // stephan syntax:: just a complex way to make a simple list
    
    //Makes a mock of the ContractMock called mock
    const mock = new ContractMock();

    // uses the mock to get carrier information
    const carrier = await mock.getCarrierInformation("test");

    //create a new object that contains the object carrier
    const content: object = { carrier };
    
    //Return the content to the carriers view
	res.render('carriers', content);
});

export default router;