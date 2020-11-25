// libraries
import * as express from 'express';
import IContract from 'contract';
import Contract from "../../contract/ContractMock";


const contract: IContract = new Contract();

// classes, interfaces & functions
const router: express.Router = express.Router();

router.get('/', async (req, res) => {
    // stephan syntax:: just a complex way to make a simple list
    
    //Makes a mock of the ContractMock called mock
    

    // uses the mock to get carrier information
    const carrier = await contract.getCarrierInformation("test");

    //create a new object that contains the object carrier
    const content: object = { carrier };
    
    //Return the content to the carriers view
	res.render('carriers');
});

router.post('/get', async (req, res) => {
    // stephan syntax:: just a complex way to make a simple list
    
    //Makes a mock of the ContractMock called mock
    
    // uses the mock to get carrier information
    const carrier = await contract.getCarrierInformation(req.body.iata);
    
    //create a new object that contains the object carrier
    const content: object = { carrier };
    
    //Return the content to the carriers view
	res.render('carriers', content);
});



export default router;